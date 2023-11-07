import { useState } from "react";
import Preview from "./preview";

const PreviewEx = () => {
  const [file, setFile] = useState<any>("");

  const placeHolder =
    "https://festival-avignon.com/storage/image/35/337235_642c26b14f967.jpeg";

  const data = [
    {
      label: "video",
      filePath: "video.mp4",
    },
    {
      label: "musique",
      filePath: "m4a.m4a",
    },
    {
      label: "text",
      filePath: "txt.txt",
    },
    {
      label: "image croissants",
      filePath: "",
    },
    {
      label: "url",
      filePath:
        "https://media.licdn.com/dms/image/C4E0BAQFZgbzrV_GuJg/company-logo_200_200/0/1617862478806?e=2147483647&v=beta&t=4BkJVlG-7gAvIf4EY9tXTBgkD4t3akjaVS28DbZzaMU",
    },
    {
      label: "reset",
      filePath: "",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-black border rounded-lg p-6 justify-center gap-6">
        <h1>File list</h1>
        <div className="flex flex-row gap-4">
          {data.map((el: any, i: number) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setFile(el);
                }}
                className="bg-[#9797bf] border inline-block cursor-pointer text-white text-[17px] no-underline px-[31px] py-4 rounded-[28px] border-solid hover:bg-gray-700 active:relative active:top-px;
                "
              >
                {el.label}
              </button>
            );
          })}
        </div>
        <h4 className="text-sm italic text-right">{file.filePath}</h4>
      </div>
      <Preview file={file} placeHolder={placeHolder} />
    </div>
  );
};

export default PreviewEx;
