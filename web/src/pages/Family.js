import { memo } from "react";
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

const checkIfPropsChanged = (prevProps, nextProps) => {
  if (prevProps.family.name !== nextProps.family.name) {
    return false;
  }

  return true;
};

export default memo(Family, checkIfPropsChanged);
