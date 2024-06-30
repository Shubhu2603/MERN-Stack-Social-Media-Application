import "./feed.css"
import Share from "../share/Share"
import Post from "../posts/Post"
import React, { useState,useEffect } from 'react';
import axios from "axios";

export default function Feed({username}) {

  const [posts,setPosts]=useState([]);

  useEffect(()=>{

    const fetchPosts= async ()=>{
      const res= username ? await axios.get("/posts/profile/"+username)
      : await axios.get("posts/timeline/66774677a6ec30083dbe9158");
      setPosts(res.data);
    };

    fetchPosts();

  },[]);
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=>(
            <Post key={p._id} post={p}/>
        )
        )} 
      </div>
    </div>
  )
}
