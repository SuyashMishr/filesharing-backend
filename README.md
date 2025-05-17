# FileSharing Backend

A simple backend server for file sharing built with Node.js, Express, and MongoDB. This service allows users to upload files and share download links. It tracks the number of downloads for each file.

## Features

- Upload files via a REST API
- Download files using unique file IDs
- Tracks download counts for each file
- Serves uploaded files as static resources

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests
- dotenv for environment variable management
- bcrypt for hashing (potentially for authentication)
- nodemon for development auto-reloading

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd FileSharing-Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables (e.g., MongoDB connection string, PORT).

## Usage

Start the server in development mode with nodemon:
```bash
npm start
```

The server will run on the port specified in your `.env` file or default to port 8000.

## API Endpoints

### Upload a File

- **URL:** `/upload`
- **Method:** `POST`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** Form data with a file field named `file`
- **Response:** JSON containing the URL to access the uploaded file

Example response:
```json
{
  "path": "https://filesharing-backend-khaki.vercel.app//file/60d21b4667d0d8992e610c85"
}
```

### Download a File

- **URL:** `/file/:fileId`
- **Method:** `GET`
- **Response:** Initiates download of the file with the given ID

## File Model Schema

The files are stored in MongoDB with the following schema:

| Field         | Type   | Description                      |
| ------------- | ------ | --------------------------------|
| `path`        | String | Server path to the uploaded file |
| `name`        | String | Original name of the uploaded file |
| `downloadCount`| Number | Number of times the file has been downloaded (default 0) |

## Environment Variables

- `PORT` - Port number for the server (default: 8000)
- `MONGODB_URI` - MongoDB connection string

## Author

Suyash Mishra 

let,s connect on Linkedin

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suyash-mishra-b8667a253/)



