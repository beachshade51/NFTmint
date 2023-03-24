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

const metadataDir = path.join("metadatas");
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
const smartContract = new ethers.Contract(contractAddress, ABI, signer);


const checkDir = async () => {
   try {
      // check if directory already exists
      if (!fs.existsSync(metadataDir)) {
         fs.mkdirSync(metadataDir);
      }
   } catch (err) {
      console.log(err);
   }
}

const saveMetaData = async (ipfsHash, number) => {
   for (let i = 0; i < number; i++) {

      try {
         const data = await fs.promises.readFile(`metadata/${i}.json`);

         let IPFSimage = {
            "image": `https://gateway.pinata.cloud/ipfs/${ipfsHash}/${i}.jpeg`,
         }

         const originalJson = JSON.parse(data);
         originalJson.image = IPFSimage.image
         const modifiedJson = JSON.stringify(originalJson, null, 2);
         const newPath = `${metadataDir}/${i}.json`;
         await fs.promises.writeFile(newPath, modifiedJson);
         console.log(`Successfully wrote modified JSON to ${newPath}`);
      } catch (err) {
         console.log(err);
      }
   }
}

const pinMetaDataToPinata = async (ipfsHash, number) => {
   try {

      await checkDir();
      await saveMetaData(ipfsHash, number);
      for (let i = 0; i < number; i++) {

         const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

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

         // console.log(data)
         await mintNFT(url, data, i)
      }
   }
   catch (error) {
      console.log(error)
   }
   finally {
      return true
   }
}
async function mintNFT(url, data, j) {
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

      if (res.data) {

         console.log(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}/${j}.json`);
         // let txn = await smartContract.mintNFT(signer.address, `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}/${j}.json`);
         // console.log("txn hash", txn.hash);

      }


   } catch (error) {
      console.log(error)
      return false
   }
   finally {
      return true
   }
}

module.exports = {
   pinMetaDataToPinata
};
