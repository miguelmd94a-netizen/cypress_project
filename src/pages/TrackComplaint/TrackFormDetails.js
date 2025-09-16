import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import moment from 'moment';
import ImageDownload from '../../components/ImageDownload';
import formatTxt from '../../utils/formatTxt';
import { formatPhoneNumber } from '../../utils';

export const timeRangeOptions = [
  { text: 'Night - 12:00am - 5:59am', value: 1 },
  { text: 'Morning - 6:00am - 11:59am', value: 2 },
  { text: 'Afternoon - 12:00pm - 5:59pm', value: 3 },
  { text: 'Evening - 6:00pm - 11:59pm', value: 4 },
];

const useStyles = makeStyles(() => ({
  sectionDivider: {
    background: '#FAFAFA',
    padding: '5px 10px',
    borderRadius: 5,
  },
  formSection: {
    fontSize: 14,
    color: '#000000DE',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  label: {
    fontSize: 12,
  },
}));

export const getAboutUsValue = (value) => {
  if (!value) {
    return;
  }
  const aboutUsMapArray = [
    { value: 'WEBSITE', text: 'Website' },
    { value: 'SEARCH_ENGINE', text: 'Search Engine (e.g. Google)' },
    { value: 'SOCIAL_MEDIA', text: 'Social Media (e.g. Facebook)' },
    { value: 'EMAIL', text: 'Email' },
    { value: 'RADIO', text: 'Radio' },
    { value: 'TV', text: 'TV' },
    { value: 'NEWSPAPER', text: 'Newspaper' },
    { value: 'WORD_OF_MOUTH', text: 'Word of Mouth' },
    { value: 'OTHER', text: 'Other' },
  ];

  const arrayValue = aboutUsMapArray.filter((about) => about.value === value);
  return arrayValue[0]?.text;
};

const isDate = (date) =>
  new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));

const checkValueType = (value, type) => {
  // eslint-disable-next-line no-restricted-globals
  if (type === 'shortText') {
    return value;
  }
  if (type === 'date' || (type === 'demographics' && isDate(value))) {
    return moment(value).format('MM-DD-YYYY');
  }
  if (typeof value === 'boolean') {
    return value === true ? 'Yes' : 'No';
  }

  return formatPhoneNumber(value);
};

export const getTypeText = (type) => {
  switch (type) {
    case 'basicInformation':
      return 'Basic Information';
    case 'demographics':
      return 'Demographics';
    case 'incidentExternalLinks':
      return 'Incident External Links';
    case 'statement':
      return 'Statement';
    case 'uploadDocument':
      return 'Attachments';
    case 'policeOrEmployee':
      return 'Name of Police Officer (if Known)';
    case 'witnesses':
      return 'Name of Witness(es) or Others Involved';
    case 'isEnglishPrimaryLanguage':
      return 'Is English your primary language?';
    case 'whyYouWantToThank':
      return 'Why would you like to thank this employee?';
    case 'howDidYouHearAboutUs':
      return 'How did you hear about us?';
    case 'whatBestDescribesYou':
      return 'What best describes you?';
    case 'firstName':
      return 'First Name';
    case 'email':
      return 'Email';
    case 'fileAnonymously':
      return 'Anonymously';
    case 'lastName':
      return 'Last Name';
    case 'street':
      return 'Street';
    case 'aptUnit':
      return 'Apt Unit#';
    case 'state':
      return 'State';
    case 'city':
      return 'City';
    case 'zipCode':
      return 'Zip Code';
    case 'phone':
      return 'Home/Cell Telephone';
    case 'relationship':
      return 'Relationship';
    case 'badgeNumber':
      return 'Badge Number';
    case 'officerDescription':
      return 'Officer Description';
    case 'dateOfBirth':
      return 'Date Of Birth';
    case 'gender':
      return 'Gender';
    case 'race':
      return 'Race';
    case 'ethnicity':
      return 'Ethnicity';
    case 'raceEthnicity':
      return 'Race/Ethnicity';
    case 'sexual':
      return 'Sexual Orientation';
    case 'workTelephone':
      return 'Work Telephone';
    case 'sexualOrientation':
      return 'Sexual Orientation';
    case 'birthdate':
      return 'Birthday';
    default:
      return 'Not support';
  }
};
export const getDemographicsLabel = (index) => {
  if (index === 0) {
    return 'dateOfBirth';
  }
  if (index === 1) {
    return 'gender';
  }
  if (index === 2) {
    return 'race';
  }

  return 'sexual';
};

const TrackFormDetails = ({ form }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const getTimeRange = () => {
    const timeRange = timeRangeOptions.filter(
      (time) => time.value === form?.location?.time
    );

    return timeRange[0]?.text;
  };

  const getParentLabel = (component, text) => (
    <Grid
      item
      xs={12}
      style={{
        display: !matches ? 'flex' : 'grid',
      }}
      justify="space-between"
      alignItems="center"
    >
      <Typography
        variant="body2"
        style={{ fontSize: 14, fontWeight: '500', color: '#3B70FE' }}
      >
        {component?.data?.question ||
          getTypeText(
            text ||
              (component.type === 'questionBank'
                ? component.data.type
                : component.type)
          )}
      </Typography>
    </Grid>
  );
  const renderContent = () => {
    if (form.hasOwnProperty('formType')) {
      return form?.formType?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.sections.map((section, sectionIndex) => (
            <Fragment key={`sectionIndex-${sectionIndex}`}>
              <Box
                className={classes.sectionDivider}
                style={{ marginBottom: 15 }}
              >
                <Typography variant="body2" style={{ fontWeight: '500' }}>
                  {section.name}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {section.components.map((component, componentIndex) => {
                  if (component.type === 'title') {
                    return (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: !matches ? 'flex' : 'grid',
                          marginBottom: 10,
                        }}
                        justify="space-between"
                        alignItems="center"
                        key={componentIndex}
                      >
                        <Typography variant="body2" className={classes.title}>
                          {component?.data?.text}
                        </Typography>
                      </Grid>
                    );
                  }
                  if (component.type === 'subtitle') {
                    return (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: !matches ? 'flex' : 'grid',
                          marginBottom: 10,
                        }}
                        justify="space-between"
                        alignItems="center"
                        key={componentIndex}
                      >
                        <Typography variant="body2" className={classes.title}>
                          {component?.data?.text}
                        </Typography>
                      </Grid>
                    );
                  }

                  if (component.value === null) {
                    return (
                      <Fragment key={componentIndex}>
                        {getParentLabel(component)}
                        <Grid
                          item
                          xs={4}
                          style={{
                            display: !matches ? 'flex' : 'grid',
                            marginBottom: 10,
                          }}
                          justify="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="subtitle"
                            style={{ fontSize: 16 }}
                          >
                            Not Specified
                          </Typography>
                        </Grid>
                      </Fragment>
                    );
                  }
                  if (Array.isArray(component.value)) {
                    if (!component.value[0] && component.value?.length === 1) {
                      return (
                        <Fragment key={`component-${componentIndex}`}>
                          {getParentLabel(component)}
                          <Grid
                            item
                            xs={4}
                            style={{
                              display: !matches ? 'flex' : 'grid',
                              marginBottom: 10,
                            }}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="subtitle"
                              style={{ fontSize: 16 }}
                            >
                              Not Specified
                            </Typography>
                          </Grid>
                        </Fragment>
                      );
                    }
                    return component.value.map((objkey, objIndex) => {
                      if (Array.isArray(objkey)) {
                        if (objkey[0].hasOwnProperty('firstName')) {
                          return objkey.map((obKey, objIndex2) => {
                            const keysObj = Object.keys(obKey);

                            return (
                              <Fragment key={objIndex2}>
                                {getParentLabel(component)}
                                {keysObj.map((key, idx) => (
                                  <Grid
                                    item
                                    xs={4}
                                    style={{
                                      display: !matches ? 'flex' : 'grid',
                                      marginBottom: 10,
                                    }}
                                    justify="space-between"
                                    alignItems="center"
                                    key={`objIndex-${idx}`}
                                  >
                                    <Typography
                                      variant="body2"
                                      className={classes.label}
                                    >
                                      {getTypeText(key)}
                                    </Typography>
                                    <Typography
                                      variant="subtitle"
                                      style={{ fontSize: 16 }}
                                    >
                                      {formatPhoneNumber(obKey[key]) ||
                                        'Not Specified'}
                                    </Typography>
                                  </Grid>
                                ))}
                              </Fragment>
                            );
                          });
                        }
                        return (
                          <>
                            {getParentLabel(
                              component,
                              component?.data?.type === 'demographics' &&
                                getDemographicsLabel(objIndex)
                            )}
                            <Grid
                              item
                              xs={
                                component?.data?.type ===
                                'incidentExternalLinks'
                                  ? 12
                                  : 4
                              }
                              style={{
                                display: !matches ? 'flex' : 'grid',
                                marginBottom: 10,
                                ...(component?.data?.type ===
                                'incidentExternalLinks'
                                  ? { overflowWrap: 'break-word' }
                                  : {}),
                              }}
                              justify="space-between"
                              alignItems="center"
                              // key={`nested-${objIndex}-${index}`}
                            >
                              {component.data.type ===
                              'howDidYouHearAboutUs' ? (
                                <Typography
                                  variant="subtitle"
                                  style={{ fontSize: 16 }}
                                >
                                  {objkey
                                    .map((key) => getAboutUsValue(key))
                                    .join(', ') || 'Not Specified'}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="subtitle"
                                  style={{ fontSize: 16 }}
                                >
                                  {objkey.join(', ') || 'Not Specified'}
                                </Typography>
                              )}
                            </Grid>
                          </>
                        );
                      }
                      if (!objkey) {
                        return (
                          <>
                            {getParentLabel(
                              component,
                              component?.data?.type === 'demographics' &&
                                getDemographicsLabel(objIndex)
                            )}
                            <Grid
                              item
                              xs={4}
                              style={{
                                display: !matches ? 'flex' : 'grid',
                                marginBottom: 10,
                              }}
                              justify="space-between"
                              alignItems="center"
                              key={`objIndex-${objIndex}`}
                            >
                              <Typography
                                variant="subtitle"
                                style={{ fontSize: 16 }}
                              >
                                Not Specified
                              </Typography>
                            </Grid>
                          </>
                        );
                      }

                      if (component.type === 'fileUpload') {
                        return (
                          <>
                            {objIndex === 0 && getParentLabel(component)}
                            <Grid
                              item
                              xs={4}
                              style={{
                                display: !matches ? 'flex' : 'grid',
                                marginBottom: 10,
                              }}
                              justify="space-between"
                              alignItems="center"
                              key={`objIndex-${objIndex}`}
                            >
                              <Typography
                                variant="body2"
                                className={classes.label}
                              >
                                File-{objIndex + 1}
                              </Typography>
                              <Typography
                                variant="subtitle"
                                style={{ fontSize: 16 }}
                              >
                                {formatTxt(objkey?.name, 20)}
                              </Typography>
                            </Grid>
                          </>
                        );
                      }

                      if (typeof objkey === 'object') {
                        const objKeysFromArray = Object.keys(objkey);
                        return (
                          <>
                            {getParentLabel(component)}
                            {objKeysFromArray.map(
                              (keyFromArray, indexFromArray) => (
                                <Grid
                                  item
                                  xs={4}
                                  style={{
                                    display: !matches ? 'flex' : 'grid',
                                    marginBottom: 10,
                                  }}
                                  justify="space-between"
                                  alignItems="center"
                                  key={`component-${indexFromArray}`}
                                >
                                  <Typography
                                    variant="body2"
                                    className={classes.label}
                                  >
                                    {getTypeText(keyFromArray)}
                                  </Typography>

                                  {keyFromArray === 'fileAnonymously' ? (
                                    <Typography
                                      variant="subtitle"
                                      style={{ fontSize: 16 }}
                                    >
                                      {objkey[keyFromArray] ? 'Yes' : 'No'}
                                    </Typography>
                                  ) : (
                                    <Typography
                                      variant="subtitle"
                                      style={{ fontSize: 16 }}
                                    >
                                      {formatPhoneNumber(
                                        objkey[keyFromArray]
                                      ) || 'Not Specified'}
                                    </Typography>
                                  )}
                                </Grid>
                              )
                            )}
                          </>
                        );
                      }

                      return (
                        <>
                          {getParentLabel(
                            component,
                            component?.data?.type === 'demographics' &&
                              'dateOfBirth'
                          )}
                          <Grid
                            item
                            xs={
                              component?.data?.type === 'statement' ||
                              component?.type === 'url'
                                ? 12
                                : 4
                            }
                            style={{
                              display: !matches ? 'flex' : 'grid',
                              marginBottom: 10,
                            }}
                            justify="space-between"
                            alignItems="center"
                            key={`objIndex-${objIndex}`}
                          >
                            {component?.data?.type ===
                            'isEnglishPrimaryLanguage' ? (
                              <Typography variant="subtitle">
                                {formatTxt(
                                  objkey !== 'yes' ? `No, ${objkey}` : 'Yes'
                                ) || 'Not Specified'}
                              </Typography>
                            ) : (
                              <Typography variant="subtitle">
                                {formatTxt(
                                  checkValueType(objkey, component?.data?.type)
                                ) || 'Not Specified'}
                              </Typography>
                            )}
                          </Grid>
                        </>
                      );
                    });
                  }
                  if (typeof component.value === 'object') {
                    const objKeys = Object.keys(component.value);
                    return (
                      <>
                        {getParentLabel(component)}
                        {objKeys.map((objkey, objIndex) => (
                          <Grid
                            item
                            xs={4}
                            style={{
                              display: !matches ? 'flex' : 'grid',
                              marginBottom: 10,
                            }}
                            justify="space-between"
                            alignItems="center"
                            key={`objIndex-${objIndex}`}
                          >
                            <Typography
                              variant="body2"
                              className={classes.label}
                            >
                              {getTypeText(objkey) || objkey}
                            </Typography>
                            {objkey === 'fileAnonymously' ? (
                              <Typography variant="subtitle">
                                {component.value[objkey] === true
                                  ? 'Yes'
                                  : 'No' || 'Not Specified'}
                              </Typography>
                            ) : (
                              <Typography variant="subtitle">
                                {formatPhoneNumber(
                                  component.value[objkey]?.name
                                ) ||
                                  formatPhoneNumber(
                                    component.value[objkey],
                                    component.value[objkey]
                                  ) ||
                                  'Not Specified'}
                                {/* {'test' || 'Not Specified'} */}
                              </Typography>
                            )}
                          </Grid>
                        ))}
                      </>
                    );
                  }

                  return (
                    <>
                      {getParentLabel(component)}
                      <Grid
                        item
                        xs={
                          component?.type === 'longText' ||
                          component?.type === 'shortText'
                            ? 12
                            : 4
                        }
                        style={{
                          display: !matches ? 'flex' : 'grid',
                          marginBottom: 10,
                        }}
                        justify="space-between"
                        alignItems="center"
                        key={`componentIndex-${componentIndex}`}
                      >
                        <Typography variant="subtitle" style={{ fontSize: 16 }}>
                          {checkValueType(component?.value, component?.type)}
                        </Typography>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Fragment>
          ))}
        </Fragment>
      ));
    }

    return (
      <>
        <Box className={classes.sectionDivider}>
          <Typography variant="body2" style={{ fontWeight: '500' }}>
            Personal Information
          </Typography>
        </Box>

        <Box style={{ marginLeft: 10 }}>
          <Typography className={classes.formSection}>Basic Info</Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="body2" className={classes.label}>
                First name
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.firstName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="body2" className={classes.label}>
                Last name
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.lastName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="body2" className={classes.label}>
                Email
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.email || 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="body2" className={classes.label}>
                Phone
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.phone || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.formSection}>Contact Info</Typography>
          <Grid container spacing={2}>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                Address line 1
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.addressLine1 || 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={4}
            >
              <Typography variant="body2" className={classes.label}>
                Address line 2
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.addressLine2 || 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                City
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.city?.name || 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                State
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.state?.name || 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={1}
            >
              <Typography variant="body2" className={classes.label}>
                ZIP code
              </Typography>
              <Typography variant="subtitle">
                {form?.civilian?.zipCode || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          className={classes.sectionDivider}
          style={{ margin: '30px 0 10px' }}
        >
          <Typography variant="body2" style={{ fontWeight: '500' }}>
            Incident Details
          </Typography>
        </Box>

        <Box style={{ marginLeft: 10 }}>
          <Typography className={classes.formSection}>
            Statement/Description of incident
          </Typography>
          {form?.type === 'COMPLIMENT' && (
            <Box>
              <Grid container spacing={2}>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={6}
                >
                  <Typography variant="body2" className={classes.label}>
                    Why would you like to thank this employee?
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.whyYouWantToThank || 'Not specified'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Grid container spacing={2} style={{ marginTop: 15 }}>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={12}
            >
              <Typography variant="body2" className={classes.label}>
                Statement
              </Typography>
              <Typography variant="subtitle">{form?.statement}</Typography>
            </Grid>
          </Grid>
          <Typography className={classes.formSection}>
            External link URL
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={12}
            >
              {form?.links?.map((link, i) => (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgb(75, 123, 255)',
                    width: '100%',
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  {link}
                </a>
              ))}
            </Grid>
          </Grid>
          <Typography className={classes.formSection}>
            Upload Document
          </Typography>
          <Grid container spacing={2}>
            {form?.files?.map((file, i) => (
              <Grid
                item
                style={{ display: !matches ? 'flex' : 'grid' }}
                justify="space-between"
                alignItems="center"
                xs={4}
              >
                <ImageDownload
                  index={i}
                  name={file.name}
                  extenstion={file.mimetype.split('/')[1]}
                  urlImg={file.url}
                />
              </Grid>
            ))}
          </Grid>
          {form?.type === 'COMPLAINT' && (
            <>
              <Typography className={classes.formSection}>Location</Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={3}
                >
                  <Typography variant="body2" className={classes.label}>
                    Address
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.location?.address || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={2}
                >
                  <Typography variant="body2" className={classes.label}>
                    City
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.location?.city?.name || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={2}
                >
                  <Typography variant="body2" className={classes.label}>
                    State
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.location?.state?.name || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={2}
                >
                  <Typography variant="body2" className={classes.label}>
                    Incident date
                  </Typography>
                  <Typography variant="subtitle">
                    {' '}
                    {form?.location?.datetime
                      ? moment(form?.location?.datetime).format('MM/DD/YYYY')
                      : 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={3}
                >
                  <Typography variant="body2" className={classes.label}>
                    Incident time
                  </Typography>
                  <Typography variant="subtitle">
                    {' '}
                    {getTimeRange() || 'Not specified'}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
          <Typography className={classes.formSection}>
            Name of Police officers (if Known)
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">N.</TableCell>
                  <TableCell align="left">First name</TableCell>
                  <TableCell align="left">Last name</TableCell>
                  <TableCell align="left">Badge/Serial number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form?.employees?.map((row, i) => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{i + 1}</TableCell>
                    <TableCell align="left">
                      {row?.firstName || 'N/A'}
                    </TableCell>
                    <TableCell align="left">{row?.lastName || 'N/A'}</TableCell>
                    <TableCell align="left">{row?.id || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {form?.type === 'COMPLAINT' && (
            <>
              <Typography className={classes.formSection}>
                Name of Police witness(es) or others involved
              </Typography>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">N.</TableCell>
                      <TableCell align="left">First name</TableCell>
                      <TableCell align="left">Last name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {form?.others?.map((row, i) => (
                      <TableRow key={row.name}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">
                          {row?.firstName || 'N/A'}
                        </TableCell>
                        <TableCell align="left">
                          {row?.lastName || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {form?.type === 'COMPLIMENT' && (
            <>
              <Typography className={classes.formSection}>
                Event information
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={4}
                >
                  <Typography variant="body2" className={classes.label}>
                    Location of event
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.location?.address || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={3}
                >
                  <Typography variant="body2" className={classes.label}>
                    Date of event
                  </Typography>
                  <Typography variant="subtitle">
                    {form?.location?.datetime
                      ? moment(form?.location?.datetime).format('MM/DD/YYYY')
                      : 'Not specified'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ display: !matches ? 'flex' : 'grid' }}
                  justify="space-between"
                  alignItems="center"
                  xs={4}
                >
                  <Typography variant="body2" className={classes.label}>
                    Time of event
                  </Typography>
                  <Typography variant="subtitle">
                    {' '}
                    {getTimeRange() || 'Not specified'}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
        <Box
          className={classes.sectionDivider}
          style={{ marginBottom: 15, marginTop: 30 }}
        >
          <Typography variant="body2" style={{ fontWeight: '500' }}>
            Additional Information
          </Typography>
        </Box>
        <Box style={{ marginLeft: 10 }}>
          <Grid container spacing={2}>
            <Grid
              item
              style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={3}
            >
              <Typography variant="body2" className={classes.label}>
                What best describes you?
              </Typography>
              <Typography variant="subtitle">
                {form?.whatBestDescribesYou || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.formSection}>Demographics</Typography>
          <Grid container spacing={2}>
            <Grid
              item
              // style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                Date of Birth
              </Typography>
              <Typography variant="subtitle">
                {form?.demographic?.birthdate
                  ? moment(form?.demographic?.birthdate).format('MM/DD/YYYY')
                  : 'Not specified'}
              </Typography>
            </Grid>
            <Grid
              item
              // style={{ display: !matches ? 'flex' : 'flex' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                Gender
              </Typography>
              <Typography variant="subtitle">
                {form?.demographic?.gender.map((gd, i) => (
                  <span>
                    {gd}
                    {form?.demographic?.gender?.length > 1 &&
                      form?.demographic?.gender?.length !== i + 1 &&
                      ','}{' '}
                  </span>
                ))}
                {form?.demographic?.gender.length === 0 && (
                  <span>Not specified</span>
                )}
              </Typography>
            </Grid>
            <Grid
              item
              // style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={3}
            >
              <Typography variant="body2" className={classes.label}>
                Race/Ethnicity
              </Typography>
              {form?.demographic?.raceEthnicity.map((rc, i) => (
                <span>
                  {rc}
                  {form?.demographic?.raceEthnicity?.length > 1 &&
                    form?.demographic?.raceEthnicity?.length !== i + 1 &&
                    ','}{' '}
                </span>
              ))}
              {form?.demographic?.raceEthnicity.length === 0 && (
                <span>Not specified</span>
              )}
            </Grid>
            <Grid
              item
              // style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={3}
            >
              <Typography variant="body2" className={classes.label}>
                Sexual Orientatioin
              </Typography>
              {form?.demographic?.sexualOrientation.map((so, i) => (
                <span>
                  {so}
                  {form?.demographic?.sexualOrientation?.length > 1 &&
                    form?.demographic?.sexualOrientation?.length !== i + 1 &&
                    ','}{' '}
                </span>
              ))}
              {form?.demographic?.sexualOrientation.length === 0 && (
                <span>Not specified</span>
              )}
            </Grid>
            <Grid
              item
              // style={{ display: !matches ? 'flex' : 'grid' }}
              justify="space-between"
              alignItems="center"
              xs={2}
            >
              <Typography variant="body2" className={classes.label}>
                Is English your primary language?
              </Typography>
              <Typography variant="subtitle">
                {form?.demographic?.primaryLanguage || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box style={{ background: '#F8F8FB' }}>
        <Typography
          variant="subtitle1"
          style={{
            color: '#3868ec',
            borderBottom: '1px solid #3868ec',
            width: 'fit-content',
            padding: 10,
          }}
        >
          Case Information
        </Typography>
      </Box>
      <div
        style={{
          padding: '20px 23px',
          marginBottom: 20,
        }}
      >
        {renderContent()}
      </div>
    </>
  );
};

export default TrackFormDetails;
