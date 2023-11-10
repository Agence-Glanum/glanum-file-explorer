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
  const regex = /^https:/;
  if (regex.test(filepath)) {
    return (
      <button
        className="bg-[#9797bf] border inline-block cursor-pointer text-white text-[17px] no-underline px-[31px] py-4 rounded-[28px] border-solid hover:bg-gray-700 active:relative active:top-px w-[250px] mt-16"
      >
        <a href={filepath} target="_blank" rel="noreferrer">Ouvrez le lien ici</a>
      </button>
    );
  }

  const segments = filepath.split(".");
  if (segments.length > 1) {
    const extension = segments[segments.length - 1].toLowerCase();

    for (const category in allowedExtensions) {
      if (allowedExtensions[category].includes(extension)) {
        if (category === "video") return <FileVideo size={150} />;
        if (category === "text") return <FileText size={150} />;
        if (category === "music") return <FileAudio size={150} />;
        if (category === "image") return <FileImage size={150} />;
      }
    }

    return <FileQuestion size={150} />;
  } else {
    return <img src={image} alt="no-extension" style={{ width: "50px" }} />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Preview = ({ file, placeHolder }: { file: any; placeHolder: string }) => {
  return (
    <div className="flex flex-col border-black border rounded-lg p-6 mt-4">
      <h1>Preview file</h1>
      {getFileExtension(file.filePath, allowedExtensions)}
    </div>
  );
};

export default Preview;
