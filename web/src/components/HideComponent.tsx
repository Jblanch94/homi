import { Hidden, HiddenProps } from "@material-ui/core";
import { FC } from "react";

interface IHideComponentProps extends HiddenProps {}

const HideComponent: FC<IHideComponentProps> = ({ children, ...props }) => {
  // const extractedProps = {};
  // for (let prop in props) {
  //   if (prop !== "location" && prop !== "computedMatch") {
  //     extractedProps[prop] = props[prop];
  //   }
  // }
  return <Hidden {...props}>{children}</Hidden>;
};

export default HideComponent;
