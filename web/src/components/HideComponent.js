import { Hidden } from '@material-ui/core';

const HideComponent = (props) => {
  return <Hidden {...props}>{props.children}</Hidden>;
};

export default HideComponent;
