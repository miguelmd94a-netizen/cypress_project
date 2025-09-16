import React from 'react';
import { getStatesOfCountry } from '../../services/countryStateService';
import AddressInfo from '../components/AddressInfo';
import ContactInfo from '../components/ContactInfo';
import Date from '../components/Date';
import Demographics from '../components/Demographics';
import Dropdown from '../components/Dropdown';
import Email from '../components/Email';
import File from '../components/File';
import Hour from '../components/Hour';
import LongText from '../components/LongText';
import MultipleChoice from '../components/MultipleChoice';
import Phone from '../components/Phone';
import Police from '../components/Police';
import PrimaryLanguage from '../components/PrimaryLanguage';
import QuestionBank from '../components/QuestionBank';
import ShortText from '../components/ShortText';
import SingleChoice from '../components/SingleChoice';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Url from '../components/Url';
import Witnesses from '../components/Witnesses';
import YesNo from '../components/YesNo';

const onAddPropsToComponent = ({
  Component,
  componentEnhanced,
  imagesPreview,
}) => {
  componentEnhanced.component = Component;
  componentEnhanced.imagesPreview = imagesPreview;
};

export const getConfig = ({ componentsFromServer = [], imagesPreview }) =>
  componentsFromServer.map((component) => {
    const componentEnhanced = { ...component };
    switch (component.type) {
      case 'questionBank':
        onAddPropsToComponent({
          componentEnhanced,
          Component: QuestionBank,
          imagesPreview,
        });
        break;
      case 'demographics':
        onAddPropsToComponent({
          componentEnhanced,
          Component: Demographics,
        });
        break;
      case 'title':
        onAddPropsToComponent({ componentEnhanced, Component: Title });
        break;
      case 'subtitle':
        onAddPropsToComponent({ componentEnhanced, Component: Subtitle });
        break;
      case 'singleChoice':
        onAddPropsToComponent({ componentEnhanced, Component: SingleChoice });
        break;
      case 'multipleChoices':
        onAddPropsToComponent({ componentEnhanced, Component: MultipleChoice });
        break;
      case 'dropdown':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'gender':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'raceEthnicity':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'race':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'ethnicity':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'sexualOrientation':
        onAddPropsToComponent({ componentEnhanced, Component: Dropdown });
        break;
      case 'birthdate':
        onAddPropsToComponent({ componentEnhanced, Component: Date });
        break;
      case 'shortText':
        onAddPropsToComponent({ componentEnhanced, Component: ShortText });
        break;
      case 'longText':
        onAddPropsToComponent({ componentEnhanced, Component: LongText });
        break;
      case 'fileUpload':
        onAddPropsToComponent({
          componentEnhanced,
          Component: File,
          imagesPreview,
        });
        break;
      case 'url':
        onAddPropsToComponent({ componentEnhanced, Component: Url });
        break;
      case 'contactInformation':
        onAddPropsToComponent({ componentEnhanced, Component: ContactInfo });
        break;
      case 'addressInformation':
        onAddPropsToComponent({
          componentEnhanced,
          Component: AddressInfo,
        });
        break;
      case 'date':
        onAddPropsToComponent({ componentEnhanced, Component: Date });
        break;
      case 'hour':
        onAddPropsToComponent({ componentEnhanced, Component: Hour });
        break;
      case 'phone':
        onAddPropsToComponent({ componentEnhanced, Component: Phone });
        break;
      case 'email':
        onAddPropsToComponent({ componentEnhanced, Component: Email });
        break;

      case 'yesNo':
        onAddPropsToComponent({ componentEnhanced, Component: YesNo });
        break;

      case 'policeOfficersOrEmployees':
        onAddPropsToComponent({ componentEnhanced, Component: Police });
        break;
      case 'witnesses':
        onAddPropsToComponent({ componentEnhanced, Component: Witnesses });
        break;
      case 'primaryLanguage':
        onAddPropsToComponent({
          componentEnhanced,
          Component: PrimaryLanguage,
        });
        break;

      default:
        return <div>Unsupported Component</div>;
    }

    return componentEnhanced;
  });
