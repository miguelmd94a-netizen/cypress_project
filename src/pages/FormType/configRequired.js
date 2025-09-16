export const contactInfoData = (showRequired) => ({
  firstName: {
    text: 'First Name',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  lastName: {
    text: 'Last Name',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  email: {
    text: 'Email Address',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  phone: {
    text: 'Home/Cell Telephone',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  workTelephone: {
    text: 'Work Telephone',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
});

export const addressInfoData = (showRequired) => ({
  street: {
    text: 'Street Name',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  aptUnit: {
    text: 'Apt/Unit #',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  state: {
    text: 'State',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  city: {
    text: 'City',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
  zipCode: {
    text: 'Zip Code',

    ...(showRequired ? { showRequired: true } : { showRequired: false }),
  },
});
