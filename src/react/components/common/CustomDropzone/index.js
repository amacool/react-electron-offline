import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../assets/icons/upload/upload.svg';

export const CustomDropzone = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const { name, path, type } = acceptedFiles[0];
      props.onHandleLoad({ name, path, type, result: reader.result });
    };

    acceptedFiles.forEach(file => {
      reader.readAsText(file);
    })
  }, [props]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    onDrop
  });

  const dropzoneInput = React.useRef(null);
  React.useEffect(() => {
    if (props.autoOpen) {
      dropzoneInput.current.click();
    }
  }, [props.autoOpen, dropzoneInput]);

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="upload-photo-inner-container" style={{display: props.hidden ? 'none' : 'block'}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} ref={dropzoneInput} />
        <img src={UploadIcon} alt='' />
        <p>{props.description}</p>
      </div>
      <aside>
        <ul>
          {acceptedFilesItems}
        </ul>
      </aside>
    </section>
  );
};
