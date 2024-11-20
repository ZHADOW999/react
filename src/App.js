import axios from "axios";
import { useState } from "react";

function App() {
const[data, setData] = useState('')
const[post, setPost] = useState('')
const getQuote= ()=>{
  axios.get('http://127.0.0.1:8000')
  .then(res =>{
    console.log(res.data.message)
    setData(res.data.message)

  }).catch(err=>{
      //console.log(err)
      window.alert("could not get server")
  })
} 
const handleSunbmit = (e)=>{
  e.preventDefault()
  axios.post('http://127.0.0.1:8000', {
    
    "content": post
    })
    .then(res =>{
      console.log(res.data.message)
    }).catch(err=>{
      window.alert(err)
    })
}


  return (
    
    <div>
      <button onClick={getQuote}>get</button>
      {data ? <p>{data}</p>:""}
      <form className="form" onSubmit={handleSunbmit}>
        <label for="form">post:</label>
        <input
        id="form"
        type="text"
        required
        value={post}
        onChange={(e)=>setPost(e.target.value)}
        ></input>
        <p>{post}</p>
        <button>post</button>
      </form>
    </div>
  );
}

export default App;
