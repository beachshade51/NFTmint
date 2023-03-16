const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

const appDir = path.dirname(require.main.filename);
const uploadDir = path.join(appDir, "uploads");

app.post("/upload", (req, res) => {
   console.log("req.files >>>", req.files)
   const { files } = req;
   if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
   }

   const uploadDir = path.join(__dirname, "uploads/images");
   if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
   }

   const uploadedFiles = Object.values(files);
   uploadedFiles.forEach((file) => {
      const filePath = path.join(uploadDir, file.name);
      file.mv(filePath, (err) => {
         if (err) {
            console.error(err);
            return res.status(500).send(err);
         }
      });
   });

   res.status(200).send("Files uploaded successfully.");
});


app.post('/json', (req, res) => {
   const { file } = req.files;
   if (!file) {
      return res.status(400).send('No file uploaded');
   }
   if (file.mimetype !== 'application/json') {
      return res.status(400).send('File must be in JSON format');
   }
   const uploadDir = path.join(__dirname, 'uploads/metadata');
   if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
   }
   const filePath = path.join(uploadDir, file.name);
   file.mv(filePath, (err) => {
      if (err) {
         console.error(err);
         return res.status(500).send(err);
      }
      res.status(200).send('File uploaded successfully');
   });
});

app.listen(4000, () => {
   console.log("Server is listening on port 4000");
});
