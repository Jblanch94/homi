import FamilyHeader from "../components/FamilyHeader/FamilyHeader";

const Family = (props) => {
  return (
    <main>
      <FamilyHeader
        name={props.family.name}
        isAdmin={props.currentUser.isAdmin}
      />
    </main>
  );
};

export default Family;
