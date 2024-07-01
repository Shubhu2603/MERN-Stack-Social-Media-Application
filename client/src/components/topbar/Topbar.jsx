import React, { useContext } from "react";
import './Topbar.css';
import {Search, Person,Chat,Notifications} from '@mui/icons-material';
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function TopBar(){

    const {user,dispatch}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="customLink" style={{textDecoration:"none",color:"inherit"}}>
                <span className="logo">LamaSocial</span>
                </Link>
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

                <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" className="topBarImg" />
                </Link>
                <span className="topbarLink" >Sign out</span>
                
            </div>
        </div>
    )
}