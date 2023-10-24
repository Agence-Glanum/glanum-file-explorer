/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import { FileImage, FileText, Folder, FolderOpen } from "lucide-react";
import { AiFillFolderOpen, AiFillFolder } from "react-icons/ai";
import {
  BsFillFileTextFill,
  BsFillFileEarmarkTextFill,
  BsFillFileImageFill,
  BsFileEarmarkImage,
  BsFileImage,
} from "react-icons/bs";
import { FaFolderClosed, FaFolderOpen } from "react-icons/fa6";
import { folders } from "./data";
import FolderExplorer from "./folder-explorer";
import FileExplorer from "./file-explorer";
import { FolderInterface } from "./interfaces/file-explorer-interface";

const customImageIcon: JSX.Element = (
  <FileImage color="black" strokeWidth="0.5px" />
);
const customImageIcon2: JSX.Element = (
  <BsFillFileImageFill color="black" fontSize={24} />
);
const customImageIcon3: JSX.Element = (
  <BsFileEarmarkImage color="black" fontSize={24} />
);
const customImageIcon4: JSX.Element = (
  <BsFileImage color="black" fontSize={24} />
);

const customTextIcon: JSX.Element = (
  <FileText color="black" strokeWidth="0.5px" />
);
const customTextIcon2: JSX.Element = (
  <BsFillFileEarmarkTextFill color="black" fontSize={24} />
);
const customTextIcon3: JSX.Element = (
  <BsFillFileTextFill color="black" fontSize={24} />
);

const customOpenFolderIcon: JSX.Element = (
  <FolderOpen color="black" fill="#f79862" strokeWidth="0.5px" />
);
const customOpenFolderIcon2: JSX.Element = (
  <FaFolderOpen
    color="black"
    fill="#f79862"
    strokeWidth="0.5px"
    fontSize={24}
  />
);
const customOpenFolderIcon3: JSX.Element = (
  <AiFillFolderOpen
    color="black"
    fill="#f79862"
    strokeWidth="0.5px"
    fontSize={24}
  />
);

const customFolderIcon: JSX.Element = (
  <Folder color="black" fill="#f79862" strokeWidth="0.5px" />
);
const customFolderIcon2: JSX.Element = (
  <FaFolderClosed
    color="black"
    fill="#f79862"
    strokeWidth="0.5px"
    fontSize={24}
  />
);
const customFolderIcon3: JSX.Element = (
  <AiFillFolder
    color="black"
    fill="#f79862"
    strokeWidth="0.5px"
    fontSize={24}
  />
);

const fileTexticons = {
  customTextIcon,
  customTextIcon2,
  customTextIcon3,
};
const fileImageicons = {
  customImageIcon,
  customImageIcon2,
  customImageIcon3,
  customImageIcon4,
};

const folderIcons = {
  customFolderIcon2,
  customFolderIcon,
  customFolderIcon3,
};
const folderOpenIcons = {
  customOpenFolderIcon,
  customOpenFolderIcon2,
  customOpenFolderIcon3,
};

export default {
  title: "ReactComponentLibrary/FolderExplorer",
  component: FolderExplorer,
  argTypes: {
    customTextIcons: {
      options: Object.keys(fileTexticons),
      control: {
        type: "select",
      },
    },
    customImageIcons: {
      options: Object.keys(fileImageicons),
      control: {
        type: "select",
      },
    },
    customFolderIcons: {
      options: Object.keys(folderIcons),
      control: {
        type: "select",
      },
    },
    customOpenFolderIcons: {
      options: Object.keys(folderOpenIcons),
      control: {
        type: "select",
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof FolderExplorer>;
export interface FileExplorerProps {
  customTextIcons: keyof typeof fileTexticons;
  customFolderIcons: keyof typeof folderIcons;
  customImageIcons: keyof typeof fileImageicons;
  customOpenFolderIcons: keyof typeof folderOpenIcons;
}

export const Folderexplorer: Story = {
  render: (args: FileExplorerProps) => {
    const {
      customTextIcons,
      customImageIcons,
      customFolderIcons,
      customOpenFolderIcons,
    } = args;

    return (
      <>
        <ul>
          {folders?.map((item: FolderInterface) => {
            return (
              <li key={item.id}>
                <FolderExplorer
                  folder={item}
                  TextIcon={fileTexticons[customTextIcons]}
                  foldersIcon={folderIcons[customFolderIcons]}
                  openFolderIcon={folderOpenIcons[customOpenFolderIcons]}
                  imageIcon={fileImageicons[customImageIcons]}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  },
};
Folderexplorer.args = {
  customTextIcons: "customTextIcon",
  customFolderIcons: "customFolderIcon",
  customImageIcons: "customImageIcon",
  customOpenFolderIcons: "customOpenFolderIcon",
};
