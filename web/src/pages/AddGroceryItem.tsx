import { FC } from "react";

import GroceryItemFormContainer from "../containers/GroceryItemFormContainer";

const AddGroceryItem: FC<{}> = () => {
  return (
    <>
      <main>
        <GroceryItemFormContainer />
      </main>
    </>
  );
};

export default AddGroceryItem;
