import React from "react";
import './Topbar.css';
import {Search, Person,Chat,Notifications} from '@mui/icons-material';

export default function TopBar(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">LamaSocial</span>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post, or videos" className="searchInput" />
                    </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topBarLinks">Homepage</span>
                    <span className="topBarLinks">Timeline</span>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Chat/>
                        <span className="topBarIconBadge">2</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/person/1.jpeg" alt="" className="topBarImg" />
            </div>
        </div>
    )
}