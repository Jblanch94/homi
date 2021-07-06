import FormHeader from "../components/FormHeader/FormHeader";
import UserFormContainer from "../containers/UserFormContainer";

const UserAccountCreation = () => {
  return (
    <>
      <FormHeader name="Add User" />
      <main>
        <UserFormContainer />
      </main>
    </>
  );
};

export default UserAccountCreation;
