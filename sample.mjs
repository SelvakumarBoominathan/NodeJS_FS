import fs from "fs"; // Importing file system
import path from "path"; // Importing path to create directory paths using 'join'
import express from "express"; // importing express

const server = express(); //creating server
const port = 5000; // defining potr

// Middleware to parse JSON bodies
server.use(express.json());

// Define the directory path { process.cwd() to take current working directory.then using Join we are creating path of the newly created folder.}
const dirPath = path.join(process.cwd(), "new_Folder");

// Create the directory if it does not exist. to aoid err happening due to same folder name
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdirSync(dirPath);
    console.log("Directory created successfully!.");
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`); // error handling
  }
}

// POST endpoint to create a new file with content from the request body
server.post("/new-file", (req, res) => {
  const timestap = new Date().toISOString(); // creating timestamp to put it inside the .txt file
  const content = timestap;

  // Generate a safe file name based on the current date and time. to avoid restricted punctuation symbols
  const newFileName = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dirPath, `${newFileName}.txt`); // creating file path for newly created file

  try {
    fs.writeFileSync(filePath, content); // Write the content to the file
    console.log("File created successfully");
    res.status(201).send({ message: "File created successfully", filePath }); // response with HTTP codes 201 successful response
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    res.status(500).send({ error: "Error writing file" }); // response with HTTP codes 201 Error response
  }
});

// GET endpoint to read all files in the folder and return their contents
server.get("/files", (req, res) => {
  // read the file content
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      //handling error while reading
      console.error("Error reading directory:", err);
      return res.status(500).send("Error reading directory");
    }

    const fileContents = [];

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      // console.log(`Reading file: ${filePath}`);
      const content = fs.readFileSync(filePath, "utf8"); // encode and decoding file content
      fileContents.push({ file, content });
    });

    res.send({ files: fileContents });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// run server
// node sample.mjs
