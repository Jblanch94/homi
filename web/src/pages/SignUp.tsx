import { FC, SetStateAction } from "react";
import FamilyRegistrationForm from "../components/FamilyRegistrationForm/FamilyRegistrationForm";
import OwnerRegistration from "../components/OwnerRegistration/OwnerRegistration";
import WizardContainer from "../containers/WizardContainer";
import WizardStep from "../components/WizardStep";
import Dialog from "../components/Dialog";
import DuplicateAccountDialog from "../components/DuplicateAccountDialog/DuplicateAccountDialog";
import { FormikValues } from "formik";

interface IInitialValues {
  familyName: string;
  familyPassword: string;
  reEnterPassword: string;
  userName: string;
  email: string;
  age: string;
  profileAvatar: File | null;
}

interface ISignUpProps {
  initialValues: IInitialValues;
  userRegistrationSchema: any;
  familyRegistrationSchema: any;
  setValues: undefined;
  auth: { isError: boolean; error: string };
  modalOpen: boolean;
  modalToggle: () => void;
  handleSubmit: (
    values: FormikValues,
    setValues: SetStateAction<undefined>
  ) => void;
}

const SignUp: FC<ISignUpProps> = ({
  initialValues,
  userRegistrationSchema,
  familyRegistrationSchema,
  setValues,
  auth,
  modalOpen,
  modalToggle,
  ...props
}) => {
  console.log(auth);
  return (
    <>
      {auth.isError && auth.error === "User already exists" && (
        <Dialog open={modalOpen} modalToggle={modalToggle}>
          <DuplicateAccountDialog modalToggle={modalToggle} />
        </Dialog>
      )}
      <WizardContainer
        initialValues={initialValues}
        onSubmit={props.handleSubmit}>
        <WizardStep
          validationSchema={familyRegistrationSchema}
          title="Sign up with Homi">
          <FamilyRegistrationForm />
        </WizardStep>
        <WizardStep
          title="Set up User Profile"
          validationSchema={userRegistrationSchema}>
          <OwnerRegistration setValues={setValues} values={initialValues} />
        </WizardStep>
      </WizardContainer>
    </>
  );
};

export default SignUp;
