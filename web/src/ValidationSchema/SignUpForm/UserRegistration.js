import * as Yup from 'yup';

const UserRegistrationSchema = Yup.object().shape({
  userName: Yup.string('Enter a unique user name').required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  age: Yup.number('Enter a valid number').min(0, 'Age must be a valid age'),
  profileAvatar: Yup.string('Provide a valid file path for your avatar'),
});

export default UserRegistrationSchema;
