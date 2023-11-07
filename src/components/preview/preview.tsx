/* eslint-disable @typescript-eslint/no-explicit-any */

const allowedExtensions = {
  video: [
    "3g2",
    "3gp",
    "avi",
    "flv",
    "m4v",
    "mkv",
    "mov",
    "mp4",
    "mpeg",
    "mpg",
    "ogv",
    "rm",
    "rmvb",
    "swf",
    "vob",
    "webm",
    "wmv",
  ],
  text: ["txt", "doc", "docx", "odt", "pdf", "rtf", "tex", "wpd", "wps"],
  image: ["bmp", "gif", "jpg", "jpeg", "png", "svg", "tiff", "webp"],
  music: ["aac", "flac", "m4a", "mp3", "ogg", "wav", "wma"],
};

const getFileExtension = (filepath: string, allowedExtensions: any) => {
  if (!filepath) return "";
  const segments = filepath.split(".");

  if (segments.length > 1) {
    const extension = segments[segments.length - 1].toLowerCase();

    for (const category in allowedExtensions) {
      if (allowedExtensions[category].includes(extension)) {
        return `L'extension "${extension}" est autorisée pour la catégorie ${category}.`;
      }
    }
    
    return `L'extension "${extension}" n'est pas autorisée.`;
  } else {
    return "Aucune extension trouvée.";
  }
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Preview = ({ file, placeHolder }: { file: any; placeHolder: string }) => {
  return (
    <div className="flex flex-col border-black border rounded-lg p-6 mt-4">
      <h1>Preview file</h1>
      <p>
        Extension : {getFileExtension(file.filePath, allowedExtensions)}{" "}
      </p>
    </div>
  );
};

export default Preview;
