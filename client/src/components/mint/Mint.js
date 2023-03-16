import { useState } from 'react';
import axios from 'axios';
import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';

const Mint = () => {
   const [loading, setLoading] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   const openNotification = () => {
      api.open({
         message: 'Mint Success',
         description:
            'Congratulations! You have successfully minted your NFTs',
         icon: (
            <SmileOutlined
               style={{
                  color: '#108ee9',
               }}
            />
         ),
      });
   };
   const handleMintClick = async () => {
      setLoading(true);
      try {
         const response = await axios.post('http://localhost:4000/mint');
         // Handle successful response here
         if (response.status === 200) {
            openNotification()
            console.log("ehehhehe")
            console.log(response.data);
         }
      } catch (error) {
         // Handle error here
      } finally {
         setLoading();
      }
   };

   return (
      <div className='p-4'>
         {contextHolder}
         <Button loading={loading} onClick={handleMintClick}>
            Mint
         </Button>
      </div>
   );
};

export default Mint;
