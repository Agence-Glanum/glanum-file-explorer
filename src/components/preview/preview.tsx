/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileAudio,
  FileImage,
  FileQuestion,
  FileText,
  FileVideo,
} from "lucide-react";
import { allowedExtensions } from "./assets/data-extension";
import image from "./assets/img.png";

const getFileExtension = (filepath: string, allowedExtensions: any) => {
  if (!filepath) return "";
  const segments = filepath.split(".");

  if (segments.length > 1) {
    const extension = segments[segments.length - 1].toLowerCase();

    for (const category in allowedExtensions) {
      if (allowedExtensions[category].includes(extension)) {
        if (category === "video") return <FileVideo />;
        if (category === "text") return <FileText />;
        if (category === "music") return <FileAudio />;
        if (category === "image") return <FileImage />;
      }
    }

    return <FileQuestion />;
  } else {
    return <img src={image} alt="no-extension" style={{ width: "50px" }} />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Preview = ({ file, placeHolder }: { file: any; placeHolder: string }) => {
  return (
    <div className="flex flex-col border-black border rounded-lg p-6 mt-4">
      <h1>Preview file</h1>
      {/* <p>Extension : {getFileExtension(file.filePath, allowedExtensions)} </p> */}
      {/* <img src={image} alt="no-extension"></img> */}
      {getFileExtension(file.filePath, allowedExtensions)}
    </div>
  );
};

export default Preview;
