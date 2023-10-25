import { useState } from "react";
import { fromEvent } from "file-selector";
import { useDropzone } from "react-dropzone";

function DragDropComponent() {
  const [filesFromFolder, setFilesFromFolder] = useState([])
  // HANDLE FOLDER DROP 
  //https://github.com/react-dropzDropzoneFileone/file-selector
  document.addEventListener("drop", async (evt) => {
    const data = await fromEvent(evt);
    setFilesFromFolder(data);
  });

  //BASIC USAGE DROPZONE
  //https://react-dropzone.js.org/
  async function myCustomFileGetter(event) {
    const files = [];
    const fileList = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);

      //IF ADD PROP NEEDED
      /*
      Object.defineProperty(file, "myProp", {
        value: true,
      });
      */

      files.push(file);
    }

    return files;
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => myCustomFileGetter(event),
  });

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.name}>
        {file.name}
      </li>
    );
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files !</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        <ul>{filesFromFolder.map((file) => {
          return (
            <li key={file.name}>
              {file.name}
            </li>
          );
        })}
        </ul>
      </aside>
    </section>
  );
}

export default DragDropComponent;
