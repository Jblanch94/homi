import { DropzoneArea } from "material-ui-dropzone";

const Dropzone = (props) => {
  const onFileChange = (file) => {
    props.setValues({ ...props.values, profileAvatar: file[0]?.path });
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
