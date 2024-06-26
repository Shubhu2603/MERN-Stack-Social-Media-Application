import React from "react";
import TopBar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import "./home.css";

export default function Home(){
    return(
        <>
        <TopBar/>
        <div className="homeContainer">
            <SideBar/>
            <Feed/>
            <Rightbar/>
        </div>
        </>
        
    )
}