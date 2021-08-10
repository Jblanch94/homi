import { FC } from "react";

import ResourceHeader from "../components/ResourceHeader/ResourceHeader";
import RecipeListContainer from "../containers/RecipeListContainer";
import { Divider } from "@material-ui/core";

const Recipes: FC<{}> = () => {
  return (
    <>
      <ResourceHeader path="/add-recipe" title="Recipes" />
      <Divider />
      <main>
        <RecipeListContainer />
      </main>
    </>
  );
};

export default Recipes;
