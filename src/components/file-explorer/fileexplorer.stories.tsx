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

import FileExplorer from "./file-explorer";

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
  title: "ReactComponentLibrary/FileExplorer",
  component: FileExplorer,
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

type Story = StoryObj<typeof FileExplorer>;
export interface FileExplorerProps {
  customTextIcons: keyof typeof fileTexticons;
  customFolderIcons: keyof typeof folderIcons;
  customImageIcons: keyof typeof fileImageicons;
  customOpenFolderIcons: keyof typeof folderOpenIcons;
}

export const Fileexplorer: Story = {
  render: (args: FileExplorerProps) => {
    const {
      customTextIcons,
      customImageIcons,
      customFolderIcons,
      customOpenFolderIcons,
    } = args;

    return (
      <FileExplorer
        TextIcon={fileTexticons[customTextIcons]}
        foldersIcon={folderIcons[customFolderIcons]}
        openFolderIcon={folderOpenIcons[customOpenFolderIcons]}
        imageIcon={fileImageicons[customImageIcons]}
      />
    );
  },
};
Fileexplorer.args = {
  customTextIcons: "customTextIcon",
  customFolderIcons: "customFolderIcon",
  customImageIcons: "customImageIcon",
  customOpenFolderIcons: "customOpenFolderIcon",
};
