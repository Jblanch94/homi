import { FC } from "react";

import { Grid, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import TextInput from "../TextInput";
import Typography from "../Typography";
import FormHeader from "../FormHeader/FormHeader";
import { Formik, Form, FormikValues } from "formik";
import useStyles from "./GroceryItemFormStyles";
import AddGroceryItemSchema from "../../ValidationSchema/GroceryForm/AddGroceryItemSchema";

interface IGroceryItemFormProps {
  onFormSubmit: (values: FormikValues) => void;
  isError: boolean;
  error: string;
}

const GroceryItemFrom: FC<IGroceryItemFormProps> = ({
  onFormSubmit,
  isError,
  error,
}) => {
  const initialValues = { item: "", details: "", quantity: 0, categories: [] };
  const classes = useStyles();

  return (
    <>
      {isError && <Typography variant="h4">{error}</Typography>}
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={AddGroceryItemSchema}>
        {({ setFieldValue, values }) => (
          <Form>
            <FormHeader name="Grocery Item" />

            <div className={classes.root}>
              <Grid container direction="column" spacing={4}>
                <Grid item xs={12} md={10} className={classes.textInput}>
                  <TextInput
                    name="item"
                    id="item"
                    label="Item"
                    variant="outlined"
                    placeholder="Enter a grocery item..."
                  />
                </Grid>
                <div className={classes.quantityContainer}>
                  <Grid
                    container
                    item
                    justify="space-between"
                    alignItems="center"
                    xs={12}
                    md={10}>
                    <Grid item xs={2} className={classes.quantityButton}>
                      <IconButton
                        onClick={() =>
                          setFieldValue("quantity", values["quantity"] - 1)
                        }>
                        <Remove fontSize="medium" />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={6}
                      className={classes.textInput}
                      style={{ textAlign: "center" }}>
                      <TextInput
                        name="quantity"
                        id="quantity"
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        disabled
                        fullWidth={false}
                        placeholder="Enter a quantity..."
                        error={values["quantity"] < 0}
                      />
                    </Grid>
                    <Grid item xs={2} className={classes.quantityButton}>
                      <IconButton
                        onClick={() =>
                          setFieldValue("quantity", values["quantity"] + 1)
                        }>
                        <Add fontSize="medium" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
                <Grid item className={classes.textInput} xs={12} md={10}>
                  <TextInput
                    name="details"
                    id="details"
                    label="Details"
                    variant="outlined"
                    placeholder="Enter some details about the item..."
                  />
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GroceryItemFrom;
