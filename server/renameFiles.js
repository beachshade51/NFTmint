const path = require('path');
const fs = require('fs');

function renameImage(folderPath) {
   try {
      const files = fs.readdirSync(folderPath);

      let start = 0;

      for (const file of files) {
         const fileInfo = path.parse(file);

         const oldPath = path.join(folderPath, file);
         const newPath = path.join(folderPath, `${start}${fileInfo.ext}`);
         console.log(oldPath, newPath)

         fs.renameSync(oldPath, newPath);

         start += 1;
      }
   } catch (error) {
      // Handle error here
      console.log(error);
   }
}

module.exports = {
   renameImage,
}