# Timestamp File Server
A simple Express.js server that creates and reads text files with timestamps. The server allows you to create new files with only timestamps and retrieve the contents of all files in a specific directory.

# Features
POST /new-file: Create a new file with content or a timestamp.
GET /files: Retrieve all files and their contents from the directory.

# Setup
Node.js (v12 or later)
npm (Node package manager)

# Create a New File (POST /new-file)
You can create a new file by making a POST request to /new-file

### URL: http://localhost:5000/new-file

## Note: Body content cannot be read. as the timestamp from the folders are given as the read content


# Retrieve All Files (GET /files)
You can retrieve all files and their contents by making a GET request to /files.

Request
Method: GET
URL: http://localhost:5000/files

Response will be a Json. {[ {}, {}, {} ]}
