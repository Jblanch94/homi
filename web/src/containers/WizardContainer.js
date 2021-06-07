import { useState, Children, cloneElement } from 'react';
import Wizard from '../components/Wizard/Wizard';

const WizardContainer = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);
  const steps = Children.toArray(children);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const nextPage = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previousPage = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }

    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      nextPage(values);
    }
  };

  function renderFormChildren(props) {
    return Children.map(step.props.children, (child, index) => {
      return cloneElement(child, { ...props });
    });
  }

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
