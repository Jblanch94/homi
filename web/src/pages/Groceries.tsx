import { FC } from "react";
import ResourceHeader from "../components/ResourceHeader/ResourceHeader";
import { Divider } from "@material-ui/core";

const Groceries: FC<{}> = () => {
  return (
    <>
      <header>
        <ResourceHeader title="Groceries" path="/add-grocery" />
        <Divider />
      </header>
    </>
  );
};

export default Groceries;
