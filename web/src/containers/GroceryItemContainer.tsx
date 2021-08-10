import { FC, useState } from "react";
import GroceryItem from "../components/GroceryItem/GroceryItem";
import { useDispatch } from "react-redux";
import actions from "../state/actions";
import { SyntheticEvent } from "react";

interface ICategory {
  id: number;
  title: string;
}

interface IGroceryItemContainerProps {
  hasBeenBought: boolean;
  item: string;
  name: string;
  profileUrl: string;
  id: number;
  quantity: number;
  details: string;
  familyId: number;
  categories: ICategory[];
}

const GroceryItemContainer: FC<IGroceryItemContainerProps> = (props) => {
  const dispatch = useDispatch();
  const { groceryActions } = actions;
  const [open, setOpen] = useState(false);

  const updateGroceryItem = (
    e: SyntheticEvent,
    id: number,
    familyId: number,
    data: any
  ) => {
    e.stopPropagation();
    dispatch(groceryActions.updateGroceryItem(id, familyId, data));
  };

  const toggleDialog = () => setOpen(!open);

  const groceryItemProps = { ...props, updateGroceryItem, toggleDialog, open };
  return <GroceryItem {...groceryItemProps} />;
};

export default GroceryItemContainer;
