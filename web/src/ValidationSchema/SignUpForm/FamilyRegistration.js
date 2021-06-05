import * as yup from 'yup';

const validationSchema = yup.object({
  familyName: yup
    .string('Enter your family name')
    .required('Family name is required'),
  familyPassword: yup
    .string('Enter a family password')
    .required('Family password is required')
    .min(6, 'Password must be at least 6 characters'),

  reEnterPassword: yup
    .string('Re enter password')
    .required('Re enter Password')
    .when('familyPassword', {
      is: (val) => (val && val.length > 6 ? true : false),
      then: yup
        .string('Re enter password')
        .oneOf([yup.ref('familyPassword')], 'Passwords do not match'),
    }),
});

export default validationSchema;
