const fs = require('fs');

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
      description: 'Awesome NFT Created by sid21.0',
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
      const fileName = `${i}.json`;
      fs.writeFileSync(`metadatas/${fileName}`, JSON.stringify(nft));
      console.log(`Saved NFT to file: ${fileName}`);
   }
}

generateAndSaveNFTs(100);
