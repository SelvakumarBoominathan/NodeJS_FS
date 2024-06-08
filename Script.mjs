import fs from "fs"; //importing file system
import path from "path"; // importing path to create directory paths using 'join'
import { fileURLToPath } from "url"; // used to convert the URL to path
import { dirname } from "path"; // to extract the directory path from the file path.

// Get the directory name of the current module file
const Filename = fileURLToPath(import.meta.url); // File name will hold the URL of the this current file (ie : script.mjs) (eg: home/files/NODEJS_FS.script.mjs)
const Dirname = dirname(Filename); // This will extract the directry path from file path (eg: home/files/NODEJS_FS)

const dirPath = path.join(Dirname, "new_Folder"); // creating new Dirpath for creating files with TimeStamp.

//if the dir path is not exists it will create one.
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdirSync(dirPath);
    console.log("Directory created successfully.");
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`);
  }
}

// Replace characters that are not allowed in file names. prevent us to encounter any error with unauthorised filename charecters like ":[]/"
const safeFileName = new Date().toISOString().replace(/[:.]/g, "-"); // replace all un authorised charecters with "-"
const filePath = path.join(dirPath, `${safeFileName}.txt`);

try {
  fs.writeFileSync(filePath, Date.now().toString()); // filepath will ceate a new file, then content inside will be placed.
  console.log("File created successfully");
} catch (error) {
  console.error(`Error writing file: ${error.message}`);
}

//Run command
//node script.mjs
