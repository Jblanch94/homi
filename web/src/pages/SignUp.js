import FamilyRegistrationForm from '../components/FamilyRegistrationForm/FamilyRegistrationForm';
import OwnerRegistration from '../components/OwnerRegistration/OwnerRegistration';
import familyRegistrationSchema from '../ValidationSchema/SignUpForm/FamilyRegistration';
import userRegistrationSchema from '../ValidationSchema/SignUpForm/UserRegistration';

import WizardContainer from '../containers/WizardContainer';
import WizardStep from '../components/WizardStep';

const SignUp = () => {
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
        onSubmit={(values) => console.log(values)}>
        <WizardStep
          onSubmit={() => console.log('on step 1')}
          validationSchema={familyRegistrationSchema}
          title="Sign up with Homi">
          <FamilyRegistrationForm />
        </WizardStep>
        <WizardStep
          onSubmit={() => console.log('on step 2')}
          title="Set up User Profile"
          validationSchema={userRegistrationSchema}>
          <OwnerRegistration />
        </WizardStep>
      </WizardContainer>
    </>
  );
};

export default SignUp;
