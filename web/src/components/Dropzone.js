import { DropzoneArea } from 'material-ui-dropzone';

const Dropzone = ({ setValues, ...props }) => {
  const onFileChange = (file) => {
    setValues({ ...props.values, profileAvatar: file.path });
  };

  return (
    <DropzoneArea
      acceptedFiles={['image/*']}
      dropzoneText={'Drag and drop a profile picture or click'}
      onChange={onFileChange}
      filesLimit={1}
      clearOnUnmount
      {...props}
    />
  );
};

export default Dropzone;
