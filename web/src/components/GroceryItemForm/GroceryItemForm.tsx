import { FC, ReactElement } from "react";

import { Grid, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import TextInput from "../TextInput";
import Typography from "../Typography";
import Button from "../Button";
import { InputAdornment } from "@material-ui/core";
import Chip from "../Chip";
import FormHeader from "../FormHeader/FormHeader";
import { Formik, Form, FormikValues } from "formik";
import useStyles from "./GroceryItemFormStyles";
import AddGroceryItemSchema from "../../ValidationSchema/GroceryForm/AddGroceryItemSchema";

interface IGroceryItemFormProps {
  onFormSubmit: (values: FormikValues) => void;
  isError: boolean;
  error: string;
  onHandleDelete: (
    index: number,
    setFieldValue: any,
    values: FormikValues
  ) => void;
  onHandleCategoryClick: (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    values: FormikValues,
    name: string
  ) => void;
}

const GroceryItemFrom: FC<IGroceryItemFormProps> = ({
  onFormSubmit,
  isError,
  error,
  onHandleDelete,
  onHandleCategoryClick,
}) => {
  const initialValues = {
    item: "",
    details: "",
    quantity: 0,
    category: "",
    categories: [] as string[],
  };
  const classes = useStyles();

  function renderChips(
    values: FormikValues,
    setFieldValue: any
  ): ReactElement[] {
    const categories = values["categories"];
    return categories.map((c: string, index: number) => {
      return (
        <Chip
          key={index}
          size="small"
          color="primary"
          label={c}
          onDelete={() => onHandleDelete(index, setFieldValue, values)}
        />
      );
    });
  }

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
                <Grid item className={classes.textInput} xs={12} md={10}>
                  <TextInput
                    name="category"
                    id="category"
                    label="Category"
                    variant="outlined"
                    placeholder="Enter a category..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() =>
                              onHandleCategoryClick(
                                setFieldValue,
                                values,
                                "category"
                              )
                            }>
                            Add
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <div className={classes.chipContainer}>
                  {renderChips(values, setFieldValue)}
                </div>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GroceryItemFrom;
