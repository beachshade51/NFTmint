import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
   name: 'file',
   action: 'http://localhost:4000/json',
   headers: {
      authorization: 'authorization-text',
   },
   onChange(info) {
      if (info.file.status !== 'uploading') {
         console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
         message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
         message.error(`${info.file.name} file upload failed.`);
      }
   },
};
const UploadMeta = () => (
   <div className='p-4'>
      <p className='p-2'>Upload metadata <br></br><span className='text-gray-500 text-sm'>should be named as metadata.json</span></p>
      <Upload directory {...props}>
         <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
   </div >
);
export default UploadMeta;