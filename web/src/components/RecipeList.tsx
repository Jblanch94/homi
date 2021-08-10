import { FC } from "react";

import RecipeItem from "./RecipeItem/RecipeItem";

interface IUser {
  id: number;
  name: string;
  profileUrl: string | null;
}

interface IRecipeListProps {
  isError: boolean;
  isSuccess: boolean;
  data: any[];
  error: string;
  userProfiles: IUser[];
  currentUserId: number;
  familyId: number;
}

const RecipeList: FC<IRecipeListProps> = ({
  isError,
  isSuccess,
  data,
  error,
  userProfiles,
  currentUserId,
  familyId,
}) => {
  const recipes = data.map((recipe) => {
    const user = userProfiles.find((x) => x.id === currentUserId);
    console.log(recipe);

    return (
      <div key={recipe.id}>
        <RecipeItem
          {...recipe}
          profileUrl={user?.profileUrl}
          username={user?.name}
          id={recipe.id}
          familyId={familyId}
        />
      </div>
    );
  });

  return (
    <>
      {isSuccess && recipes}
      {isError && <div>{error}</div>}
    </>
  );
};

export default RecipeList;
