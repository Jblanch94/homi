import { memo, FC } from "react";
import FamilyHeader from "../components/FamilyHeader/FamilyHeader";

interface IFamilyProps {
  family: { name: string };
  currentUser: { isAdmin: boolean };
}

const Family: FC<IFamilyProps> = (props) => {
  return (
    <main>
      <FamilyHeader
        name={props.family.name}
        isAdmin={props.currentUser.isAdmin}
      />
    </main>
  );
};

const checkIfPropsChanged = (
  prevProps: IFamilyProps,
  nextProps: IFamilyProps
) => {
  if (prevProps.family.name !== nextProps.family.name) {
    return false;
  }

  return true;
};

export default memo(Family, checkIfPropsChanged);
