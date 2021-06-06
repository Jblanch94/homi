import { Grid } from '@material-ui/core';
import TextInput from '../TextInput';
import useStyles from './FamilyRegistrationStyles';

const FamilyRegistrationForm = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <TextInput
          label="Family Name"
          name="familyName"
          id="familyName"
          type="text"
          placeholder="Family Name"
          variant="outlined"
          className={classes.formField}
        />
      </Grid>
      <Grid item>
        <TextInput
          label="Family Password"
          name="familyPassword"
          id="familyPassword"
          type="password"
          placeholder="Family Password"
          variant="outlined"
          className={classes.formField}
        />
      </Grid>
      <Grid item>
        <TextInput
          label="Re enter Password"
          name="reEnterPassword"
          id="reEnterPassword"
          type="password"
          placeholder="Re enter Password"
          variant="outlined"
        />
      </Grid>
    </>
  );
};

export default FamilyRegistrationForm;
