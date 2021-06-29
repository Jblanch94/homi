import { Hidden } from "@material-ui/core";

const HideComponent = (props) => {
  const extractedProps = {};
  for (let prop in props) {
    if (prop !== "location" && prop !== "computedMatch") {
      extractedProps[prop] = props[prop];
    }
  }
  return <Hidden {...extractedProps}>{extractedProps.children}</Hidden>;
};

export default HideComponent;
