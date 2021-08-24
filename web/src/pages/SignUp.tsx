import { FC, SetStateAction, useState } from 'react'
import { FormikValues } from 'formik'
import { History, Location } from 'history'
import { match } from 'react-router-dom'

import FamilyRegistrationForm from '../components/FamilyRegistrationForm/FamilyRegistrationForm'
import OwnerRegistration from '../components/OwnerRegistration/OwnerRegistration'
import Wizard from '../components/Wizard/Wizard'
import WizardStep from '../components/WizardStep'
import Dialog from '../components/Dialog'
import DuplicateAccountDialog from '../components/DuplicateAccountDialog/DuplicateAccountDialog'
import useTypedSelector from '../hooks/useTypedSelector'
import useToggle from '../hooks/useToggle'
import useActions from '../hooks/useActions'
import FamilyRegistrationSchema from '../ValidationSchema/SignUpForm/FamilyRegistration'
import UserRegistrationSchema from '../ValidationSchema/SignUpForm/UserRegistration'
import actions from '../state/actions'

interface IInitialValues {
  familyName: string
  familyPassword: string
  reEnterPassword: string
  userName: string
  email: string
  age: string
  profileAvatar: File | null
}

interface ISignUpProps {
  history: History<unknown>
  location: Location<unknown>
  match: match<{}>
}

const SignUp: FC<ISignUpProps> = () => {
  const [setValues, getSetValues] = useState()
  const auth = useTypedSelector((state) => state.auth)
  const { registerFamilyAndUser } = useActions(actions.authActions)
  const [modalOpen, modalToggle] = useToggle(false)

  const initialValues: IInitialValues = {
    familyName: '',
    familyPassword: '',
    reEnterPassword: '',
    userName: '',
    email: '',
    age: '',
    profileAvatar: null,
  }

  const handleSubmit = (
    values: FormikValues,
    setValues: SetStateAction<undefined>
  ): void => {
    getSetValues(setValues)
    registerFamilyAndUser(values)
    if (auth.isError && auth.error === 'User already exists') {
      modalToggle()
    }
  }

  return (
    <>
      {auth.isError && auth.error === 'User already exists' && (
        <Dialog open={modalOpen} modalToggle={modalToggle}>
          <DuplicateAccountDialog modalToggle={modalToggle} />
        </Dialog>
      )}
      <Wizard initialValues={initialValues} onSubmit={handleSubmit}>
        <WizardStep
          validationSchema={FamilyRegistrationSchema}
          title='Sign up with Homi'>
          <FamilyRegistrationForm />
        </WizardStep>
        <WizardStep
          title='Set up User Profile'
          validationSchema={UserRegistrationSchema}>
          <OwnerRegistration setValues={setValues} values={initialValues} />
        </WizardStep>
      </Wizard>
    </>
  )
}

export default SignUp
