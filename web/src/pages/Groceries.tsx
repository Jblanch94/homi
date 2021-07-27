import { FC } from "react";
import ResourceHeader from "../components/ResourceHeader/ResourceHeader";
import { Divider } from "@material-ui/core";
import GroceryListContainer from "../containers/GroceryListContainter";

const Groceries: FC<{}> = () => {
  return (
    <>
      <header>
        <ResourceHeader title="Groceries" path="/add-grocery" />
        <Divider />
      </header>
      <main>
        <GroceryListContainer />
      </main>
    </>
  );
};

export default Groceries;
