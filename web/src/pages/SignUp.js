import FamilyRegistrationForm from '../components/FamilyRegistrationForm/FamilyRegistrationForm';
import OwnerRegistration from '../components/OwnerRegistration/OwnerRegistration';
import familyRegistrationSchema from '../ValidationSchema/SignUpForm/FamilyRegistration';

import Wizard from '../components/Wizard';
import WizardStep from '../components/WizardStep';

const SignUp = () => {
  // const onFileChange = (file) => {
  //   console.log(file);
  //   setFile(file);
  // };

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
          title="Set up User Profile">
          <OwnerRegistration />
        </WizardStep>
      </Wizard>
    </>
  );
};

export default SignUp;
