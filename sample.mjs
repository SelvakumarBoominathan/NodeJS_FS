import fs from "fs"; // Importing file system
import path from "path"; // Importing path to create directory paths using 'join'
import express from "express";

const server = express();
const port = 5000;

// Middleware to parse JSON bodies
server.use(express.json());

// Define the directory path
const dirPath = path.join(process.cwd(), "new_Folder");

// Create the directory if it does not exist
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdirSync(dirPath);
    console.log("Directory created successfully.");
  } catch (error) {
    console.error(`Error creating directory: ${error.message}`);
  }
}

// POST endpoint to create a new file with content from the request body
server.post("/new-file", (req, res) => {
  const content = req.body.content;

  if (!content) {
    console.error("Content is required");
    return res.status(400).send({ error: "Content is required" });
  }

  // Generate a safe file name based on the current date and time
  const safeFileName = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dirPath, `${safeFileName}.txt`);

  console.log(`Writing to file: ${filePath}`);

  try {
    fs.writeFileSync(filePath, content); // Write the content to the file
    console.log("File created successfully");
    res.status(201).send({ message: "File created successfully", filePath });
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    res.status(500).send({ error: "Error writing file" });
  }
});

// GET endpoint to read all files in the folder and return their contents
server.get("/files", (req, res) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Error reading directory");
    }

    const fileContents = [];

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      console.log(`Reading file: ${filePath}`);
      const content = fs.readFileSync(filePath, "utf8");
      fileContents.push({ file, content });
    });

    res.send({ files: fileContents });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
