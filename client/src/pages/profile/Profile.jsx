import React, { useEffect, useState } from 'react'
import './profile.css'

import TopBar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from 'axios';
import {useParams} from "react-router";


export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState({});
  const username=useParams().username;

  useEffect(()=>{

      const fetchUser= async ()=>{
        const res=await axios.get("/users?username="+username);
        setUser(res.data);
      };
      
      fetchUser();
      console.log(user);
  
    },[username]);
  return (
    <>
    <TopBar/>
    <div className="profile">
        <SideBar/>
        <div className="profileRight">
            <div className="profileRightTop"></div>
            <div className="profileCover">
            <img src={user.coverPicture || PF+"person/noCover.png"} className="profileCoverImg" alt="" />
            <img src={user.profilePicture || PF+"person/noAvatar.png"} className="profileUserImg" alt="" />
            </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>{username}</h4>
                <span className='profileInfoDesc'>{user.desc}</span>
            </div>
            <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
            </div>

        </div>

    </div>
    </>
  )
}
