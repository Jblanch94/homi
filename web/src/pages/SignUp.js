import FamilyRegistrationForm from '../components/FamilyRegistrationForm/FamilyRegistrationForm';
import OwnerRegistration from '../components/OwnerRegistration/OwnerRegistration';
import familyRegistrationSchema from '../ValidationSchema/SignUpForm/FamilyRegistration';
import userRegistrationSchema from '../ValidationSchema/SignUpForm/UserRegistration';

import Wizard from '../components/Wizard';
import WizardStep from '../components/WizardStep';

const SignUp = () => {
  console.log(userRegistrationSchema);
  return (
    <>
      <Wizard
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
      </Wizard>
    </>
  );
};

export default SignUp;
