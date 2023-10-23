/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import {
  FileImage,
  FileText,
  Folder,
  FolderOpen,
  AirVent,
  Fan,
  UtilityPole,
  Cable,
} from "lucide-react";
import FileExplorer from "./file-explorer";

const customImageIcon: JSX.Element = (
  <FileImage color="black" strokeWidth={1} />
);
const customImageIcon2: JSX.Element = <Fan color="black" strokeWidth={1} />;

const customTextIcon: JSX.Element = <FileText color="black" strokeWidth={1} />;
const customTextIcon2: JSX.Element = <AirVent color="black" strokeWidth={1} />;

const customOpenFolderIcon: JSX.Element = (
  <FolderOpen color="black" fill="#f79862" strokeWidth="0.5px" />
);
const customOpenFolderIcon2: JSX.Element = (
  <Cable color="black" fill="#f79862" strokeWidth="0.5px" />
);

const customFolderIcon: JSX.Element = (
  <Folder color="black" fill="#f79862" strokeWidth="0.5px" />
);
const customFolderIcon2: JSX.Element = (
  <UtilityPole color="black" fill="#f79862" strokeWidth="0.5px" />
);

const fileTexticons = {
  customTextIcon,
  customTextIcon2,
};
const fileImageicons = {
  customImageIcon,
  customImageIcon2,
};

const folderIcons = {
  customFolderIcon2,
  customFolderIcon,
};
const folderOpenIcons = {
  customOpenFolderIcon,
  customOpenFolderIcon2,
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
