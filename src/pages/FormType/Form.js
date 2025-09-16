import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, navigate } from '@reach/router';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import set from 'lodash.set';
import get from 'lodash.get';
import shortid from 'shortid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import { createFormType, getFormType, getQuestionBank } from '../../services/unarmed';
import Section from './Section';
import useOrganization from '../../hooks/useOrganization';
import LoadingScreen from '../../components/LoadingScreen';
import { addressInfoData, contactInfoData } from './configRequired';
import { RECAPCHAP_STATIC_KEY } from '../../utils/const';
import Footer from '../../components/Footer';
import { getFormTypeColor } from '../TrackComplaint/TrackFormInfo';

const useStyles = makeStyles(() => ({
  topBar: {
    width: '100%',
    height: 104,
    background: '#364F74',
    display: 'flex',
    alignItems: 'center',
  },
  formSection: {
    fontSize: 14,
    color: '#000000DE',
    fontWeight: 'bold',
    marginTop: 20,
  },
  stepper: {
    background: 'transparent',
    width: '100%',
    maxWidth: 660,
  },
  unarmedlogo: {
    width: 150,
    height: 50,
    objectFit: 'contain',
    cursor: 'pointer',
  },
  stepLabel: {
    color: '#fff',
  },
}));

const filterObjectTypesComponents = (components) => components.filter((component) => component.require);
const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Form({ id }) {
  const classes = useStyles();
  const [questionsBanks, setQuestionsBanks] = useState([]);
  const [pages, setPages] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const capchapRef = useRef(null);
  const [reCapchapToken, setReCapchapToken] = useState('');
  const { organizationData } = useOrganization();
  const [loading, setLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState({});
  const [formType, setFormType] = useState(null);
  const containerRef = React.useRef();
  const [openStepperMobile, setOpenStepperMobile] = useState(false);
  const isMobile = useMediaQuery('(max-width: 999px)');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const scrollToTop = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  };

  const onSubmit = async () => {
    if (!reCapchapToken) {
      toast.error('Please verify captcha');
      return;
    }
    try {
      setLoading(true);
      const form = {
        organizationId: organizationData?._id,
        formTypeId: id,
        values: formValues,
        recaptchaToken: reCapchapToken,
      };
      const { data } = await createFormType(form);
      setLoading(false);
      toast.success('Form created successfully!');
      navigate(`/successForm/${data.code}?t=1`, {
        state: { formId: data._id, type: data.type },
      });
    } catch (error) {
      capchapRef.current.props.grecaptcha.reset();
      const errorResponse = error.response?.data?.error?.details || error.response?.data?.error?.error?.details || null;
      setLoading(false);
      if (Array.isArray(errorResponse) && errorResponse?.length > 0) {
        return errorResponse.map((res) => toast.error(res.message || 'Something went wrong creating the form'));
      }
      return toast.error('Something went wrong creating the form');
    }
  };

  useEffect(() => {
    const onGetFormType = async () => {
      try {
        const { data } = await getFormType(organizationData?._id);
        const form = data.find((dt) => dt._id === id);
        const pagesFormatted = form.pages.map((page, pageIndex) => ({
          ...page,
          sections: page.sections.map((section, sectionIndex) => ({
            ...section,
            components: section.components.map((component, componentIndex) => {
              if (component.type === 'demographics') {
                const demographicskeys = Object.keys(component.data);
                const demographicsComps = demographicskeys.map((key) => ({
                  type: key,
                  data: {
                    ...component.data[key],
                    questionBankIndex: demographicskeys.indexOf(key),
                    isDemographics: true,
                    demographicKey: key,
                  },
                  id: shortid.generate(),
                  path: `[${pageIndex}].sections[${sectionIndex}].components[${componentIndex}].components[${demographicskeys.indexOf(
                    key
                  )}]`,
                }));

                const getDemographicsComponentByType = (type) =>
                  demographicsComps.find((comp) => comp.type === type) || null;

                const demographicsComponentsOrdered = [
                  getDemographicsComponentByType('birthdate'),
                  getDemographicsComponentByType('gender'),
                  getDemographicsComponentByType('raceEthnicity'),
                  getDemographicsComponentByType('race'),
                  getDemographicsComponentByType('ethnicity'),
                  getDemographicsComponentByType('sexualOrientation'),
                ];
                return {
                  ...component,
                  components: demographicsComponentsOrdered.filter((comp) => comp?.data?.visible),
                  path: `[${pageIndex}].sections[${sectionIndex}].components[${componentIndex}]`,
                };
              }
              return {
                ...component,
                path: `[${pageIndex}].sections[${sectionIndex}].components[${componentIndex}]`,
              };
            }),
          })),
        }));

        setPages(pagesFormatted);

        setFormType(form);
        const formatArrayValues = form.pages.map((page) => ({
          sections: page.sections.map((section) => ({
            components: section.components.map((component) => {
              if (component.type === 'questionBank') {
                return [null];
              }
              if (component.type === 'addressInformation') {
                return {
                  street: null,
                  aptUnit: null,
                  state: null,
                  city: null,
                  zipCode: null,
                };
              }
              if (component.type === 'contactInformation') {
                return {
                  email: null,
                  firstName: null,
                  lastName: null,
                  phone: null,
                  fileAnonymously: null,
                  workTelephone: null,
                };
              }
              return null;
            }),
          })),
        }));
        setFormValues(formatArrayValues);
      } catch (error) {
        console.log(error);
      }
    };
    const onGetQuestionsBanks = async () => {
      try {
        const { data } = await getQuestionBank();
        setQuestionsBanks(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && organizationData) {
      onGetFormType();
      onGetQuestionsBanks();
    }
  }, [id, organizationData]);

  const onSaveFormValues = (pageIndex, sectionIndex, componentIndex, value, dmographicIndex) => {
    if (formValues.length === 0) {
      return;
    }
    const formValuesCopy = Array.from(formValues);

    if (typeof demographicIndex === 'number') {
      formValuesCopy[pageIndex].sections[sectionIndex].components[componentIndex].components[dmographicIndex] = value;
    } else {
      formValuesCopy[pageIndex].sections[sectionIndex].components[componentIndex] = value;
    }
    setFormValues(formValuesCopy);
  };

  const getFormValue = (pageIndex, sectionIndex, componentIndex) => {
    if (formValues.length === 0) {
      return;
    }
    return formValues[pageIndex]?.sections?.[sectionIndex]?.components[componentIndex];
  };

  const getComponents = (components) => {
    const questionBankComponents = components.map((component) => {
      if (component.type === 'questionBank') {
        const comps = questionsBanks.find((q) => q.type === component.data.type);
        return {
          ...component,
          components: comps.components.map((comp, index) => ({
            ...comp,
            data: {
              ...comp.data,
              questionBankIndex: index,
            },
          })),
        };
      }
      return component;
    });
    return questionBankComponents;
  };

  const getRequiredFields = (callBack) => {
    let shouldDoNextPage = true;
    let shouldDoNextPageWithSubComponentsRequired = true;
    const pagesCopy = Array.from(pages);
    const currentPageComponents = pagesCopy[currentPage].sections?.map((section) => section.components);
    const components = currentPageComponents.reduce((acc, curr) => [...acc, ...curr], []);

    const filteredComponents = getComponents(components).filter((component) => component.type !== 'questionBank');

    const filteredQuestionBankComponents = getComponents(components);

    const requiredComponents = filteredComponents.filter((component) => component?.data?.required);

    const requiredSubComponents = filteredComponents.filter(
      (component) => component?.type === 'contactInformation' || component?.type === 'addressInformation'
    );

    if (requiredSubComponents.length > 0) {
      requiredSubComponents.forEach((component) => {
        if (component.type === 'contactInformation') {
          const keys = Object.keys(contactInfoData());
          const keysRequired = keys.filter((key) => component.data[key].required && component.data[key].visible);

          const subRequired = (condition) =>
            keysRequired.reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: {
                  ...component?.data[curr],
                  ...contactInfoData(condition)[curr],
                },
              }),
              {}
            );

          keysRequired.forEach((key) => {
            if (!get(formValues, component.path)[key]) {
              set(pagesCopy, component.path, {
                type: component.type,
                path: component.path, // '[0].sections[0].componets[0]'
                data: {
                  ...component.data,
                  ...subRequired(true),
                  showFileanonymouslyError: get(formValues, component.path).fileAnonymously === null && true,
                },
              });
              shouldDoNextPageWithSubComponentsRequired = false;
            } else {
              set(pagesCopy, component.path, {
                type: component.type,
                path: component.path,
                data: {
                  ...component.data,
                  ...subRequired(false),
                  showFileanonymouslyError: false,
                },
              });
            }
          });

          if (get(formValues, component.path).fileAnonymously === null && component?.data?.showFileAnonymously) {
            toast.error('Do you want to file Anonymously? is a required question');

            shouldDoNextPageWithSubComponentsRequired = false;
          }

          if (get(formValues, component.path).fileAnonymously === false && !get(formValues, component.path).email) {
            toast.error('An email is required to continue');

            shouldDoNextPageWithSubComponentsRequired = false;
          }

          if (get(formValues, component.path).email && !emailRgx.test(get(formValues, component.path).email)) {
            toast.error('"email" must be a valid email');

            shouldDoNextPageWithSubComponentsRequired = false;
          }
        }

        if (component.type === 'addressInformation') {
          const keys = Object.keys(addressInfoData());
          const keysRequired = keys.filter((key) => component.data[key].required && component.data[key].visible);

          const subRequired = (condition) =>
            keysRequired.reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: {
                  ...component?.data[curr],
                  ...addressInfoData(condition)[curr],
                },
              }),
              {}
            );

          keysRequired.forEach((key) => {
            if (!get(formValues, component.path)[key]) {
              set(pagesCopy, component.path, {
                type: component.type,
                path: component.path,
                data: {
                  ...component.data,
                  ...subRequired(true),
                },
              });
              shouldDoNextPageWithSubComponentsRequired = false;
            } else {
              set(pagesCopy, component.path, {
                type: component.type,
                path: component.path,
                data: {
                  ...component.data,
                  ...subRequired(false),
                },
              });
            }
          });
        }
      });
    }

    if (requiredComponents.length > 0) {
      requiredComponents.forEach((component) => {
        if (get(formValues, component.path) === null) {
          set(pagesCopy, component.path, {
            type: component.type,
            path: component.path,
            data: { ...component.data, showRequired: true },
          });

          shouldDoNextPage = false;
        } else {
          set(pagesCopy, component.path, {
            type: component.type,
            path: component.path,
            data: { ...component.data, showRequired: false },
          });
        }

        if (get(formValues, component.path) !== null && typeof get(formValues, component.path) === 'object') {
          if (component.type === 'contactInformation') {
            const comps = Object.keys(component.data).filter((comp) => typeof comp === 'object');
            const requiredComps = filterObjectTypesComponents(comps).map((filterObj) => ({
              ...filterObj,
              showRequired: true,
            }));
            set(pagesCopy, component.path, {
              type: component.type,
              path: component.path,
              data: { ...component.data, ...requiredComps },
            });
          }
        }
      });
    }

    filteredQuestionBankComponents.forEach((comps) => {
      if (comps?.data?.type === 'witnesses') {
        if (
          get(formValues, comps.path)?.[0]?.[0]?.email &&
          !emailRgx.test(get(formValues, comps.path)?.[0]?.[0]?.email)
        ) {
          toast.error('"email" must be a valid email');

          shouldDoNextPageWithSubComponentsRequired = false;
        }
      }

      if (comps?.data?.type === 'basicInformation') {
        if (get(formValues, comps.path)?.[0]?.email && !emailRgx.test(get(formValues, comps.path)?.[0]?.email)) {
          toast.error('"email" must be a valid email');

          shouldDoNextPageWithSubComponentsRequired = false;
        }
      }

      if (comps.type === 'email') {
        if (get(formValues, comps.path) && !emailRgx.test(get(formValues, comps.path))) {
          toast.error('"email" must be a valid email');

          shouldDoNextPageWithSubComponentsRequired = false;
        }
      }
    });

    setPages([...pagesCopy]);
    if (shouldDoNextPage && shouldDoNextPageWithSubComponentsRequired) {
      if (typeof callBack === 'function') {
        callBack();
      } else {
        setCurrentPage(currentPage + 1);
      }

      scrollToTop();
    }
  };

  const steps = formType?.pages?.map((page) => page?.name) || [];
  const currentPageData = formType?.pages?.find((page, pageIndex) => currentPage === pageIndex);
  const currentPageDataIndex = steps?.indexOf(currentPageData?.name);
  const activeColor = getFormTypeColor(formType?.type?.toLowerCase());
  const activeCircleColor = formType?.type === 'COMPLIMENT' ? '#008858' : '#FF4242';

  if (questionsBanks.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <Layout withFooter={false}>
      <div className={classes.topBar}>
        <Box style={{ padding: isMobile ? '0px 21px' : '0px 120px' }}>
          <Logo logo="white" />
        </Box>
      </div>
      <Box position="relative" display="flex" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        {!isMobile ? (
          <FixedMenu>
            <Box style={{ overflow: 'hidden visible' }}>
              <StyledStepper>
                {steps.map((step, stepIndex) => {
                  const active = currentPage >= stepIndex;
                  const completed = currentPage > stepIndex;

                  return (
                    <StyledStep
                      active={active}
                      activeColor={activeCircleColor}
                      key={stepIndex}
                      withLine={stepIndex < steps.length - 1}
                    >
                      <StyledStepIndex active={active} activeColor={activeCircleColor}>
                        {completed ? <CheckIcon htmlColor="#fff" fontSize="small" /> : stepIndex + 1}
                      </StyledStepIndex>
                      <StyledStepLabel>{step}</StyledStepLabel>
                    </StyledStep>
                  );
                })}
              </StyledStepper>
            </Box>
            <Box mt={2} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: 16 }}>
              <Link to="/faq">
                <Button variant="contained" style={{ background: '#2F4F77', color: '#fff', marginTop: 8 }}>
                  FAQ
                </Button>
              </Link>
            </Box>
          </FixedMenu>
        ) : (
          <>
            <Box height={75} />
            <StyledStepperMobile
              heightPerItem={formType?.pages?.length * 75}
              open={openStepperMobile}
              onClick={() => setOpenStepperMobile(!openStepperMobile)}
            >
              {!openStepperMobile ? (
                <>
                  <StyledStepMobile active activeColor={activeCircleColor}>
                    <Box display="flex" alignItems="center" style={{ flexDirection: 'row' }}>
                      <StyledStepIndex active activeColor={activeCircleColor}>
                        {currentPage > currentPageDataIndex ? (
                          <CheckIcon htmlColor="#fff" fontSize="small" />
                        ) : (
                          currentPage + 1
                        )}
                      </StyledStepIndex>
                      <StyledStepLabel>{currentPageData?.name}</StyledStepLabel>
                    </Box>
                    {openStepperMobile ? (
                      <ExpandLessIcon htmlColor="rgba(136, 141, 160, 1)" />
                    ) : (
                      <ExpandMoreIcon htmlColor="rgba(136, 141, 160, 1)" />
                    )}
                  </StyledStepMobile>
                </>
              ) : (
                <>
                  {steps.map((step, stepIndex) => {
                    const active = currentPage >= stepIndex;
                    const completed = currentPage > stepIndex;

                    return (
                      <StyledStepMobile active={active} activeColor={activeCircleColor} key={stepIndex}>
                        <Box display="flex" alignItems="center" style={{ flexDirection: 'row' }}>
                          <StyledStepIndex active={active} activeColor={activeCircleColor}>
                            {completed ? <CheckIcon htmlColor="#fff" fontSize="small" /> : stepIndex + 1}
                          </StyledStepIndex>
                          <StyledStepLabel>{step}</StyledStepLabel>
                        </Box>
                        {stepIndex === 0 ? (
                          <>
                            {openStepperMobile ? (
                              <ExpandLessIcon htmlColor="rgba(136, 141, 160, 1)" />
                            ) : (
                              <ExpandMoreIcon htmlColor="rgba(136, 141, 160, 1)" />
                            )}
                          </>
                        ) : (
                          <span />
                        )}
                      </StyledStepMobile>
                    );
                  })}
                </>
              )}
            </StyledStepperMobile>
          </>
        )}
        <FixedContent ref={containerRef}>
          <Box marginTop="30px" padding="20px" maxWidth="600px" width="100%" margin="auto">
            {pages.map((page, pageIndex) => {
              if (pageIndex === currentPage) {
                return (
                  <Fragment key={pageIndex}>
                    <Typography variant="h4">{formType?.name}</Typography>
                    {page.sections.map((section, sectionIndex) => (
                      <Section
                        name={section.name}
                        components={section.components}
                        key={sectionIndex}
                        getComponents={getComponents}
                        onSaveFormValues={(componentIndex, value, demographicIndex) =>
                          onSaveFormValues(pageIndex, sectionIndex, componentIndex, value, demographicIndex)
                        }
                        imagesPreview={imagesPreview}
                        setImagesPreview={setImagesPreview}
                        organizationId={organizationData?._id}
                        getFormValue={(componentIndex) => getFormValue(pageIndex, sectionIndex, componentIndex)}
                        pageIndex={pageIndex}
                        sectionIndex={sectionIndex}
                      />
                    ))}
                  </Fragment>
                );
              }
              return <></>;
            })}

            {currentPage === pages.length - 1 && (
              <>
                <Typography variant="body2" className={classes.formSection}>
                  Acknowledgement
                </Typography>
                <Typography variant="body2">
                  By submitting the complaint above, you acknowledge that the information provided is accurate to the
                  best of your knowledge.
                </Typography>
              </>
            )}

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: 20, flexWrap: 'wrap' }}
            >
              <Box>
                {currentPage !== pages.length - 1 ? (
                  <Box />
                ) : (
                  <>
                    <ReCAPTCHA
                      style={{ display: 'inline-block' }}
                      ref={capchapRef}
                      sitekey={organizationData?.test ? RECAPCHAP_STATIC_KEY : process.env.REACT_APP_RECAPTCHAP_KEY}
                      onChange={(value) => setReCapchapToken(value)}
                    />
                    <FormHelperText error style={{ marginBottom: 20 }}>
                      {!reCapchapToken && 'Please check the reCAPTCHA'}
                    </FormHelperText>
                  </>
                )}
              </Box>
              <Box>
                {currentPage > 0 && (
                  <Button
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      scrollToTop();
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Back
                  </Button>
                )}

                {currentPage !== pages.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={getRequiredFields}
                    style={{ background: '#2F4F77', color: '#fff' }}
                  >
                    Next
                  </Button>
                )}

                {currentPage === pages.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={() => getRequiredFields(onSubmit)}
                    disabled={loading}
                    style={{
                      background: '#2F4F77',
                      color: '#fff',
                    }}
                  >
                    Submit {loading && <CircularProgress color="#364F74" size="20px" style={{ marginLeft: 10 }} />}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Footer withFaq={false} />
        </FixedContent>
      </Box>
    </Layout>
  );
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

const FixedMenu = styled.div`
  width: 25%;
  min-height: calc(100vh - 104px);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 25px solid #f3f3f3;

  @media screen and (max-width: 1200px) {
    width: 35%;
  }
`;

const FixedContent = styled.div`
  width: 75%;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: calc(100vh - 104px);

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    width: 65%;
  }

  @media screen and (max-width: 999px) {
    width: 100%;
  }
`;

const StyledStepper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: scroll;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    display: none;
  }

  overflow: visible;
  height: calc(100vh - 244px);
`;

const StyledStep = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;

  ${(props) =>
    props.withLine &&
    `
  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 24px;
    bottom: -24px;
    left: 21px;
    width: 1px;
    background-color: ${props.active ? props.activeColor : 'rgba(153, 153, 153, 1)'};
  }
  `}
`;

const StyledStepIndex = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 84px;
  display: flex;
  justify-content: center;
  font-weight: 500;
  align-items: center;
  font-size: 18px;
  color: #fff;
  background-color: ${(props) => (props.active ? props.activeColor : '#fff')};

  ${(props) =>
    !props.active
      ? `
      color:  rgba(87, 90, 102, 1);
      border: 1px solid rgba(153, 153, 153, 1);
  `
      : `
      color: #fff;
  `}
`;

const StyledStepLabel = styled.span`
  margin-left: 16px;
  font-weight: bold;
  font-size: 14px;
`;

const StyledStepperMobile = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #fff;
  z-index: 999;
  transition: all 0.25s ease;
  cursor: pointer;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) =>
    props.open
      ? `
     animation-delay: 0s;
     animation-name: slideDown;
     animation-timing-function: ease-out;
     animation-duration: 0.5s;
     animation-iteration-count: 1;
     animation-fill-mode: forwards;
  `
      : `
     animation-delay: 0s;
     animation-name: slideUp;
     animation-timing-function: ease-out;
     animation-duration: 0.5s;
     animation-iteration-count: 1;
     animation-fill-mode: forwards;
  `}

  @keyframes slideDown {
    from {
      height: 75px;
    }
    to {
      height: ${(props) => `${props.heightPerItem}px`};
    }
  }

  @keyframes slideUp {
    from {
      height: ${(props) => `${props.heightPerItem}px`};
    }
    to {
      height: 75px;
    }
  }
`;

const StyledStepMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
`;
