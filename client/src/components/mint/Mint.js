import { useState } from 'react';
import axios from 'axios';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { Button, Form, notification } from 'antd';

const Mint = () => {
   const [loading, setLoading] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   const [mint, setMinting] = useState(false);
   const openNotification = (data) => {
      api.open(data);
   };
   const handleMintClick = async () => {
      setLoading(true);
      setMinting(!mint);
      try {
         const response = await axios.post('http://localhost:4000/mint');
         // Handle successful response here
         console.log(response.data, "response.dataj")
         if (response.data === 'Mint Successful') {
            console.log(response)
            const notificationData = {
               message: 'Mint Success',
               description: "Congratulations! You have successfully minted your NFTs",
               icon: (<SmileOutlined
                  style={{
                     color: '#108ee9',
                  }}
               />)
            }
            openNotification(notificationData)
         }
      } catch (error) {
         setMinting(false);
         const notificationData = {
            message: 'Mint Failed',
            description: "You have failed minting your NFTs",
            icon: (<FrownOutlined
               style={{
                  color: '#108ee9',
               }}
            />)
         }
         openNotification(notificationData)
      } finally {
         setLoading(false);
         setMinting(false);
         // Form.resetFields();
      }
   };

   return (
      <div className='p-4'>
         {contextHolder}
         <Button loading={loading} onClick={handleMintClick}>
            {mint ? "Minting" : "Mint"}
         </Button>
      </div>
   );
};

export default Mint;
