import { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const Mint = () => {
   const [loading, setLoading] = useState(false);

   const handleMintClick = async () => {
      setLoading(true);
      try {
         const response = await axios.post('http://localhost:4000/mint');
         // Handle successful response here
         response.status === 200 && console.log(response.data);
      } catch (error) {
         // Handle error here
      } finally {
         setLoading();
      }
   };

   return (
      <div className='p-4'>
         <Button loading={loading} onClick={handleMintClick}>
            Mint
         </Button>
      </div>
   );
};

export default Mint;
