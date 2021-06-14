import FamilyRegistrationForm from "../components/FamilyRegistrationForm/FamilyRegistrationForm";
import OwnerRegistration from "../components/OwnerRegistration/OwnerRegistration";
import WizardContainer from "../containers/WizardContainer";
import WizardStep from "../components/WizardStep";

const SignUp = ({
  initialValues,
  handleSubmit,
  userRegistrationSchema,
  familyRegistrationSchema,
}) => {
  return (
    <>
      <WizardContainer initialValues={initialValues} onSubmit={handleSubmit}>
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
