import { FC } from "react";
import FormHeader from "../components/FormHeader/FormHeader";
import UserFormContainer from "../containers/UserFormContainer";

const UserAccountCreation: FC<{}> = () => {
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
