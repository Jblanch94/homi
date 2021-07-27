import { FC } from "react";

import GroceryItemForm from "../components/GroceryItemForm/GroceryItemForm";

const AddGroceryItem: FC<{}> = () => {
  return (
    <>
      <main>
        <GroceryItemForm />
      </main>
    </>
  );
};

export default AddGroceryItem;
