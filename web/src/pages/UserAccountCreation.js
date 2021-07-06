import FormHeader from "../components/FormHeader/FormHeader";
import UserForm from "../components/UserForm/UserForm";

const UserAccountCreation = () => {
  return (
    <>
      <FormHeader name="Add User" />
      <main>
        <UserForm />
      </main>
    </>
  );
};

export default UserAccountCreation;
