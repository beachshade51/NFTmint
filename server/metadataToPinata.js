let axios = require("axios");
const path = require("path");

const { ethers } = require("ethers");
const {
   ABI,
   contractAddress
} = require("./config");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
fs = require('fs');

require("dotenv").config()

const metadataDir = path.join(__dirname, "uploads/metadatas");
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
const smartContract = new ethers.Contract(contractAddress, ABI, signer);


const pinMetaDataToPinata = async (ipfsHash, number, sampleJson) => {
   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
   for (let i = 0; i < number; i++) {

      let pinJson = {
         "name": `React.0#${i}`,
         "image": `https://gateway.pinata.cloud/ipfs/${ipfsHash}/${i}.jpeg`,
         "description": "Awesome NFT Created by sid21.0",
         "attributes": []
      }
      pinJson["attributes"].push(getAttribute('Icons', sampleJson[i].Icons));
      pinJson["attributes"].push(getAttribute('Material', sampleJson[i].Material));
      pinJson["attributes"].push(getAttribute('Plaques', sampleJson[i].Plaques));
      pinJson["attributes"].push(getAttribute('Frames', sampleJson[i].Frames));
      pinJson["attributes"].push(getAttribute('Backgrounds', sampleJson[i].Backgrounds));
      console.log(pinJson)
      try {
         // check if directory already exists
         if (!fs.existsSync(metadataDir)) {
            fs.mkdirSync(metadataDir);
            console.log("Directory is created.");
            fs.writeFileSync(`${metadataDir}/${i}.json`, JSON.stringify(pinJson));
         } else {
            fs.writeFileSync(`${metadataDir}/${i}.json`, JSON.stringify(pinJson));
         }
      } catch (err) {
         console.log(err);
      }
   }
   const {
      dirs,
      files
   } = await rfs.read(metadataDir);
   let data = new FormData();
   for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
         filepath: basePathConverter(metadataDir, file),
      });
   }

   try {
      let res = await axios.post(url,
         data, {
         headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            "pinata_api_key": process.env.APIKey,
            'pinata_secret_api_key': process.env.APISecret,
         }
      }
      )
      console.log("res.data", res.data);

      for (let i = 0; i < files.length; i++) {
         console.log(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}/${i}.json`);
         // let txn = await smartContract.mintNFT(signer.address, `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}/${i}.json`);
      }


   } catch (error) {
      console.log(error)
   }


}


const getAttribute = (key, value) => {
   return {
      "trait_type": key,
      "value": value
   }
}
module.exports = {
   pinMetaDataToPinata
};