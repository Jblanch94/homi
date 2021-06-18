import FamilyRegistrationForm from "../components/FamilyRegistrationForm/FamilyRegistrationForm";
import OwnerRegistration from "../components/OwnerRegistration/OwnerRegistration";
import WizardContainer from "../containers/WizardContainer";
import WizardStep from "../components/WizardStep";
import DuplicateAccountModal from "../components/DuplicateAccountModal";

const SignUp = ({
  initialValues,
  handleSubmit,
  userRegistrationSchema,
  familyRegistrationSchema,
  setValues,
  auth,
  modalOpen,
  modalToggle,
}) => {
  return (
    <>
      {auth.isError && auth.error === "User already exists" && (
        <DuplicateAccountModal open={modalOpen} modalToggle={modalToggle} />
      )}
      <WizardContainer initialValues={initialValues} onSubmit={handleSubmit}>
        <WizardStep
          validationSchema={familyRegistrationSchema}
          title="Sign up with Homi">
          <FamilyRegistrationForm />
        </WizardStep>
        <WizardStep
          title="Set up User Profile"
          validationSchema={userRegistrationSchema}>
          <OwnerRegistration setValues={setValues} />
        </WizardStep>
      </WizardContainer>
    </>
  );
};

export default SignUp;
