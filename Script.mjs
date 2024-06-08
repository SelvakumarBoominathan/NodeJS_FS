import fs from "fs";

fs.mkdirSync("new_Folder");

fs.writeFileSync(
  `new_Folder/${new Date().toISOString()}.txt`,
  `Time_Stamp: ${Date.now().toString()}`
);
