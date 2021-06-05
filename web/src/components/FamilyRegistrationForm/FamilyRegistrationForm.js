import { Grid } from '@material-ui/core';
import TextInput from '../TextInput';
import useStyles from './FamilyRegistrationStyles';

const FamilyRegistrationForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column">
        <Grid item xs={12} md={12} lg={10} xl={6}>
          <TextInput
            label="Family Name"
            name="familyName"
            id="familyName"
            type="text"
            placeholder="Family Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={10} xl={6}>
          <TextInput
            label="Family Password"
            name="familyPassword"
            id="familyPassword"
            type="password"
            placeholder="Family Password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={10} xl={6}>
          <TextInput
            label="Re enter Password"
            name="reEnterPassword"
            id="reEnterPassword"
            type="password"
            placeholder="Re enter Password"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FamilyRegistrationForm;
