/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

// const extensionsVideo = [
//   "3g2",
//   "3gp",
//   "avi",
//   "flv",
//   "m4v",
//   "mkv",
//   "mov",
//   "mp4",
//   "mpeg",
//   "mpg",
//   "ogv",
//   "rm",
//   "rmvb",
//   "swf",
//   "vob",
//   "webm",
//   "wmv",
// ];
// const extensionsTexte = [
//   "txt",
//   "doc",
//   "docx",
//   "odt",
//   "pdf",
//   "rtf",
//   "tex",
//   "wpd",
//   "wps",
// ];
// const extensionsMusique = ["aac", "flac", "m4a", "mp3", "ogg", "wav", "wma"];
// const extensionsImage = [
//   "bmp",
//   "gif",
//   "jpg",
//   "jpeg",
//   "png",
//   "svg",
//   "tiff",
//   "webp",
// ];

const Preview = (file: any, placeHolder: string) => {

  return (
    <div className="flex flex-col border-black border rounded-lg p-6 mt-4">
      <h1>Preview file</h1>
      {/* <div>{getPreview()}</div> */}
      {/* <img src={t} alt="place_holder" width="300" height="300" /> */}
     
    </div>
  );
};

export default Preview;
