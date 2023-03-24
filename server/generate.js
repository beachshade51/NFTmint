const fs = require('fs');
const sharp = require('sharp');

const traits = {
   icons: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐚', '🐞', '🐜', '🕷', '🦂'],
   materials: ['Stone', 'Wood', 'Metal', 'Glass', 'Plastic', 'Paper', 'Ceramic', 'Leather'],
   plaques: ['black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'brown', 'grey', 'pink'],
   frames: ['Round', 'Square', 'Rectangle', 'Oval', 'Heart', 'Star', 'Triangle', 'Diamond'],
   backgrounds: ['Dark Marbel', 'Light Marbel', 'Dark Wood', 'Light Wood', 'Dark Metal', 'Light Metal', 'Dark Plastic', 'Light Plastic', 'Dark Paper', 'Light Paper', 'Dark Ceramic', 'Light Ceramic', 'Dark Leather', 'Light Leather'],
};

function generateRandomTrait(traitType) {
   const traitValues = traits[traitType];
   return traitValues[Math.floor(Math.random() * traitValues.length)];
}

function generateRandomNFT() {
   const nft = {
      name: 'sid',
      description: 'Awesome NFT\'s Created by Xid',
      attributes: [
         {
            trait_type: 'Icons',
            value: generateRandomTrait('icons'),
         },
         {
            trait_type: 'Material',
            value: generateRandomTrait('materials'),
         },
         {
            trait_type: 'Plaques',
            value: generateRandomTrait('plaques'),
         },
         {
            trait_type: 'Frames',
            value: generateRandomTrait('frames'),
         },
         {
            trait_type: 'Backgrounds',
            value: generateRandomTrait('backgrounds'),
         },
      ],
   };
   return nft;
}

function generateAndSaveNFTs(count) {
   for (let i = 0; i < count; i++) {
      const nft = generateRandomNFT();
      const fileName = `metadatas/${i}.json`;
      fs.writeFileSync(fileName, JSON.stringify(nft));
      console.log(`Saved NFT to file: ${fileName}`);
   }
}




function createCopyOfImage(count) {

   for (let i = 0; i < count; i++) {

      fs.copyFile('images/0.jpeg', `images/${i}.jpeg`, (err) => {
         if (err) throw err;
         console.log(`${count}.jpeg was copied to destination`);
      });

   }
}
createCopyOfImage(500);
generateAndSaveNFTs(500);