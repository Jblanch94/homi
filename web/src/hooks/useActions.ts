import { bindActionCreators, ActionCreatorsMapObject } from "redux";
import useTypedDispatch from "./useTypedDispatch";

const useActions = (actionSource: ActionCreatorsMapObject<any>) => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(actionSource, dispatch);
};

export default useActions;
