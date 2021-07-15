import { FormikValues } from "formik";
import { FC } from "react";

interface IWizardStepProps {
  onSubmit?: (values: FormikValues) => void;
  title?: string;
  validationSchema?: any;
}

const WizardStep: FC<IWizardStepProps> = ({ children }) => <>{children}</>;

export default WizardStep;
