import React from 'react'
import './profile.css'

import TopBar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";

export default function Profile() {
  return (
    <>
    <TopBar/>
    <div className="profile">
        <SideBar/>
        <div className="profileRight">
            <div className="profileRightTop"></div>
            <div className="profileCover">
            <img src="assets/post/3.jpeg" className="profileCoverImg" alt="" />
            <img src="assets/person/7.jpeg" className="profileUserImg" alt="" />
            </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>ab</h4>
                <span className='profileInfoDesc'>Hello</span>
            </div>
            <div className="profileRightBottom">
            <Feed/>
            <Rightbar profile/>
            </div>

        </div>

    </div>
    </>
  )
}
