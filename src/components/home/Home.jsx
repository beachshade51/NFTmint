import InputImage from "./InputImage"
import InputJson from "./InputJson"
import Mint from "./Mint"

export default function Home() {
   return (
      <div className="container mx-auto px-4">
         <InputImage />
         <InputJson />
         <Mint />
      </div>
   )
}