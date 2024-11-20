import axios from "axios";
import { useState } from "react";

function App() {
const[data, setData] = useState('')
const[post, setPost] = useState('')
const[posts, setPosts] = useState([])
const [idToFetch, setIdToFetch] = useState('')
const [idToDelete, setIdToDelete] = useState('')
const [getall, setGetall] = useState([])
const [specificPost, setSpecificPost] = useState(null)

const getQuote= ()=>{
  axios.get('http://127.0.0.1:8000')
  .then(res =>{
    setData(res.data.message)
  }).catch(err=>{
      window.alert("could not get server")
  })
} 

const getAll= ()=>{
  axios.get('http://127.0.0.1:8000/getposts')
  .then(res =>{
    setGetall(res.data.message)
  }).catch(err=>{
      window.alert("could not get server")
  })
} 

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post('http://127.0.0.1:8000/testPost', {
    "content": post
  })
  .then(response => {
    setPosts(response.data.message)
    console.log(response.data.message)
    setPost('')
  }).catch(err => {
    window.alert(err)
  })
}

const fetchPostById = (e) => {
  e.preventDefault()
  axios.get(`http://127.0.0.1:8000/getContentid/${idToFetch}`)
    .then(response => {
      setSpecificPost(response.data.message)
      setIdToFetch('')
    })
    .catch(err => {
      window.alert('Post not found or invalid ID')
      setSpecificPost(null)
    })
}

const deletePost = (e) => {
  e.preventDefault()
  axios.delete(`http://127.0.0.1:8000/deletePost/${idToDelete}`)
    .then(response => {
      setPosts(response.data.message)
      setIdToDelete('')
    })
    .catch(err => {
      window.alert('Failed to delete post')
    })
  
} 



return (

  <div>

    <button onClick={getAll}>getall</button>
    {getall.map((item,index)=>{
      return <p key={index}>{item.id}: {item.content}</p>
    })}
    <button onClick={getQuote}>get</button>
    {data ? <p>{data}</p>:""}
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="form">post:</label>
      <input
        id="form"
        type="text"
        required
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button>post</button>
    </form>

    <div>
      <h2>Posts:</h2>
      {posts.map((item, index) => (
        <p key={index}>{item.content}</p>
      ))}
      
    <form onSubmit={fetchPostById}>
      <label htmlFor="postId">Fetch Post by ID:</label>
      <input
        id="postId"
        type="number"
        value={idToFetch}
        onChange={(e) => setIdToFetch(e.target.value)}
        required
      />
      <button type="submit">Fetch Post</button>
    </form>

    {specificPost && (
      <div>
        <h3>Fetched Post:</h3>
        <p>Content: {specificPost.content}</p>
        {/* <p>ID: {specificPost.id}</p> */}
      </div>
    )}
  </div>
  <form onSubmit={deletePost}>
    <label htmlFor="deleteId">Delete Post by ID:</label>
    <input
      id="deleteId"
      type="number"
      value={idToDelete}
      onChange={(e) => setIdToDelete(e.target.value)}
      required
    />
    <button type="submit">Delete Post</button>
  </form>
    </div>


);
}

export default App;
