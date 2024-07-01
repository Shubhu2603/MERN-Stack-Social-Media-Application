import React, { useContext } from "react";
import TopBar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";


import "./home.css";
import { AuthContext } from "../../context/AuthContext";

export default function Home(){
    const user=useContext(AuthContext);
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