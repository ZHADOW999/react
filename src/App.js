import axios from "axios";
import { useState } from "react";

function App() {
const[data, setData] = useState('')
const getQuote= ()=>{
  axios.get('http://127.0.0.1:8000')
  .then(res =>{
    console.log(res.data.message)
    setData(res.data.message)

  }).catch(err=>{
      //console.log(err)
      window.alert(err)
  })
} 

  return (
    
    <div>
      <button onClick={getQuote}>get</button>
      {data ? <p>{data}</p>:""}
    </div>
  );
}

export default App;
