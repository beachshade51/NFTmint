const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fsx = require('fs-extra')

const app = express()

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

const appDir = path.dirname(require.main.filename);
const uploadDir = path.join(appDir);


const { renameImage } = require("./renameFiles");
const { pinDirectoryToPinata } = require("./imagesToPinata");
const { pinMetaDataToPinata } = require("./metadataToPinata");

app.post("/upload", (req, res) => {
   const { files } = req;
   if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
   }

   const uploadDir = path.join(__dirname, "images");
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

const emptyDir = (dir) => {
   fsx.emptyDir(dir, err => {
      if (err) return console.error(err)
      console.log(`Files removed from ${dir}`)
   })

}

const clearUploadDir = () => {
   emptyDir(path.join(__dirname, "images"))
   emptyDir(path.join(__dirname, "metadata"))
   emptyDir(path.join(__dirname, "metadatas"))
   // emptyDir(__dirname + "/metadata")
   // emptyDir(__dirname + "/metadatas")
}

app.post("/mint", async (req, res) => {
   renameImage(uploadDir + "/images/");
   let imageDir = uploadDir + "/images/";
   let response = await pinDirectoryToPinata(imageDir);



   const filePath = path.join(uploadDir + "/metadata/", "metadata.json");
   fs.readFile(filePath, 'utf8', async function (err, data) {
      if (err) throw err;
      let obj = JSON.parse(data);

      if (response) {
         console.log("response.data.totalNumber", response.totalNumber)

         if (await pinMetaDataToPinata(response.data.IpfsHash, response.totalNumber, obj)) {
            res.status(200).send('Mint Successful');
         }
         else {
            res.status(400).send('Mint Failed');
         }
      }
      clearUploadDir();
   });

});




app.post('/json', (req, res) => {
   const { file } = req.files;

   if (!file) {
      return res.status(400).send('No file uploaded');
   }
   if (file.mimetype !== 'application/json') {
      return res.status(400).send('File must be in JSON format');
   }
   const uploadDir = path.join(__dirname, 'metadata');
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
