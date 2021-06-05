import { Grid } from '@material-ui/core';
import TextInput from '../TextInput';
import Dropzone from '../Dropzone';
import useStyles from './OwnerRegistrationStyles';

const OwnerRegistration = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Dropzone {...props} />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.textInputContainer}>
        <TextInput
          name="userName"
          id="userName"
          label="Name"
          type="text"
          placeholder="Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.textInputContainer}>
        <TextInput
          name="email"
          id="email"
          label="email"
          type="email"
          placeholder="Email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.textInputContainer}>
        <TextInput
          name="age"
          id="age"
          label="Age"
          type="number"
          placeholder="Age e.g. 12 (optional)"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default OwnerRegistration;
