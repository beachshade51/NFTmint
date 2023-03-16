// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import UploadImage from './components/upload/UploadImage';
import UploadMeta from './components/upload/UploadMeta'
import Mint from './components/mint/Mint';

function App() {
   return (
      <div className="App">
         <Navbar />
         <div className='container2 mx-auto'>
            <UploadImage />
            <UploadMeta />
            <Mint />
         </div>
      </div>
   );
}

export default App;
