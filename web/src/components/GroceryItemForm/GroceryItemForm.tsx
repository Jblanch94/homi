import { FC } from "react";

import { Grid } from "@material-ui/core";
import TextInput from "../TextInput";
import FormHeader from "../FormHeader/FormHeader";
import { Formik, Form } from "formik";

const GroceryItemFrom: FC<{}> = () => {
  const initialValues = { item: "", details: "", quantity: 0, categories: [] };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("values submitted")}>
      <Form>
        <FormHeader name="Grocery Item" />

        <Grid container direction="column" spacing={2}>
          <Grid item xs={12} md={10}>
            <TextInput name="item" id="item" label="Item" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={10}>
            <TextInput
              name="quantity"
              id="quantity"
              label="Quantity"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item>
            <TextInput
              name="details"
              id="details"
              label="Details"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default GroceryItemFrom;
