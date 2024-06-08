import fs from "fs";

fs.writeFileSync(
  `new_Folder/${new Date.toISOString()}`,
  `Time_Stamp: ${Date.now()}`
);
