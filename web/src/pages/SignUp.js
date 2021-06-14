import FamilyRegistrationForm from '../components/FamilyRegistrationForm/FamilyRegistrationForm';
import OwnerRegistration from '../components/OwnerRegistration/OwnerRegistration';
import familyRegistrationSchema from '../ValidationSchema/SignUpForm/FamilyRegistration';
import userRegistrationSchema from '../ValidationSchema/SignUpForm/UserRegistration';
import WizardContainer from '../containers/WizardContainer';
import WizardStep from '../components/WizardStep';

const SignUp = () => {
  const handleSubmit = (values, ...args) => {
    // Handle two asynchorous requests
    // 1. Register Family and handle any errors
    // 2. Register User with Family and handle any error
  };

  return (
    <>
      <WizardContainer
        initialValues={{
          familyName: '',
          familyPassword: '',
          reEnterPassword: '',
          userName: '',
          email: '',
          age: '',
          profileAvatar: null,
        }}
        onSubmit={handleSubmit}>
        <WizardStep
          validationSchema={familyRegistrationSchema}
          title="Sign up with Homi">
          <FamilyRegistrationForm />
        </WizardStep>
        <WizardStep
          title="Set up User Profile"
          validationSchema={userRegistrationSchema}>
          <OwnerRegistration />
        </WizardStep>
      </WizardContainer>
    </>
  );
};

export default SignUp;
