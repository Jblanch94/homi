import { FormikValues } from "formik";
import { DropzoneArea, DropzoneAreaProps } from "material-ui-dropzone";
import { FC } from "react";

interface IDropzoneProps extends DropzoneAreaProps {
  setValues: any;
  values: FormikValues;
}

const Dropzone: FC<IDropzoneProps> = (props) => {
  const onFileChange = (file: File[]): void => {
    props.setValues({ ...props.values, profileAvatar: file[0] });
  };

  return (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      dropzoneText={"Drag and drop a profile picture or click"}
      onChange={onFileChange}
      filesLimit={1}
      clearOnUnmount
      {...props}
    />
  );
};

export default Dropzone;
