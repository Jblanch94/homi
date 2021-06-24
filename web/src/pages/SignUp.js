import FamilyRegistrationForm from "../components/FamilyRegistrationForm/FamilyRegistrationForm";
import OwnerRegistration from "../components/OwnerRegistration/OwnerRegistration";
import WizardContainer from "../containers/WizardContainer";
import WizardStep from "../components/WizardStep";
import Dialog from "../components/Dialog";
import DuplicateAccountDialog from "../components/DuplicateAccountDialog/DuplicateAccountDialog";

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
        <Dialog open={modalOpen} modalToggle={modalToggle}>
          <DuplicateAccountDialog modalToggle={modalToggle} />
        </Dialog>
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
