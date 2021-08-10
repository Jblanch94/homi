import { FC } from "react";
import { Grid } from "@material-ui/core";
import GroceryItemContainer from "../../containers/GroceryItemContainer";
import useStyles from "./GroceryListStyles";

interface ICategory {
  id: number;
  title: string;
}

interface IGrocery {
  id: number;
  item: string;
  quantity: number;
  details: string;
  UserId: number;
  FamilyId: number;
  bought: boolean;
  Categories: ICategory[];
}

interface IGroceryListProps {
  groceries: IGrocery[];
  users: any[];
  familyId: number;
}

const GroceryList: FC<IGroceryListProps> = ({ groceries, users, familyId }) => {
  const classes = useStyles();
  const groceryItems = groceries?.map((g: IGrocery) => {
    const { name, profileUrl } = users.find((user) => user.id === g.UserId);
    const props = {
      id: g.id,
      hasBeenBought: g.bought,
      name,
      profileUrl,
      item: g.item,
      quantity: g.quantity,
      details: g.details,
      familyId,
      categories: g.Categories,
    };
    return <GroceryItemContainer key={g.id} {...props} />;
  });
  return (
    <>
      <Grid container direction="column" className={classes.root}>
        {groceryItems}
      </Grid>
    </>
  );
};

export default GroceryList;
