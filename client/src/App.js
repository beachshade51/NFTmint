// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import UploadImage from './components/Upload/UploadImage';
import UploadMeta from './components/Upload/UploadMeta'

function App() {
   return (
      <div className="App">
         <Navbar />
         <div className='container2 mx-auto'>
            <UploadImage />
            <UploadMeta />
         </div>
      </div>
   );
}

export default App;
