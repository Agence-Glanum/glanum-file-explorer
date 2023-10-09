/* eslint-disable @typescript-eslint/no-explicit-any */
export const folder: any = [];

const generateRandomFolderName = () => {
    const randomIndex = Math.floor(Math.random() * 1000000000000);
    return `folder${randomIndex}`;
};

const generateFolder = (name: string, depth: number, maxDepth: number) => {
    if (depth > maxDepth) {
        return [];
    }
    
    const folder: any = {
        name: name,
        content: [
            { name: `file${depth}.txt` },
            { name: `file${depth}.jpg` },
            { name: `file${depth}.pdf` },
        ],
  };
  
  const subfolder: any = generateFolder(
      generateRandomFolderName(),
      depth + 1,
      maxDepth
      );
      
      if (subfolder.length > 0) {
          folder.content.push({
              name: generateRandomFolderName(),
              content: subfolder,
            });
        }
        
        return [folder];
    };
    
    const generateCompleteStructure = (numFolders: number) => {
        const structure = [];
        
        for (let i = 1; i <= numFolders; i++) {
            const folder = generateFolder(`folder${i}`, 1, 7);
            structure.push(...folder);
        }
        
        return structure;
    };
    
    const additionalFolders = generateCompleteStructure(2000);
    
    folder.push(...additionalFolders);
