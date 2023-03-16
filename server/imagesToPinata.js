const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
let axios = require("axios");

const pinDirectoryToPinata = async (src) => {
   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
   var status = 0;
   try {
      const {
         dirs,
         files
      } = await rfs.read(src);
      let data = new FormData();
      for (const file of files) {
         data.append(`file`, fs.createReadStream(file), {
            filepath: basePathConverter(src, file),
         });
      }

      const response = await axios.post(url, data, {
         headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': process.env.APIKey,
            'pinata_secret_api_key': process.env.APISecret,
         },
      })
      return {
         data: response.data,
         totalNumber: files.length - 1
      }
   } catch (error) {
      console.log(error);
   }
};
module.exports = {
   pinDirectoryToPinata
};
