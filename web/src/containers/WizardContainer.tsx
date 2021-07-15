import { FormikProps, FormikValues } from "formik";
import { ReactElement } from "react";
import { useState, Children, cloneElement, FC } from "react";
import Wizard from "../components/Wizard/Wizard";

interface IWizardContainerProps {
  initialValues: FormikValues;
  onSubmit: (values: FormikValues, bag: any) => void;
}

const WizardContainer: FC<IWizardContainerProps> = ({
  children,
  initialValues,
  onSubmit,
}) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);
  const steps = Children.toArray(children) as ReactElement[];

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const nextPage = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previousPage = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: FormikValues, bag: any) => {
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      console.log("Going to next page");
      bag.setTouched({});
      nextPage(values);
    }
  };

  const renderFormChildren = (props: FormikProps<{}>) => {
    return Children.map(step.props.children, (child: ReactElement, index) => {
      return cloneElement(child, { ...props });
    });
  };

  const props = {
    step,
    stepNumber,
    snapshot,
    nextPage,
    previousPage,
    handleSubmit,
    renderFormChildren,
    children,
    isLastStep,
  };

  return <Wizard {...props} />;
};

export default WizardContainer;
