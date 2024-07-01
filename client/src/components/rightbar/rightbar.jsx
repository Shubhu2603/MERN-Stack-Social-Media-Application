import './rightbar.css'
import {Users} from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {Add,Remove} from "@mui/icons-material";


export default function Rightbar({user}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    const {user:currentUser,dispatch}=useContext(AuthContext);
    const [friends,setFriends]=useState([]);
    const [followed,setFollowed]=useState(currentUser.following.includes(user?._id));

    useEffect(()=>{
       setFollowed(currentUser.following.includes(user?._id))
    },[currentUser,user]);
    
    useEffect(()=>{
        const getFriends= async()=>{
            try {
                const friendList=await axios.get("/users/friends/"+user._id);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriends();
    },[user]);

    const handleClick=async()=>{
        try {
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow",{userId: currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }
            else{
                await axios.put("/users/"+user._id+"/follow",{userId: currentUser._id});
                dispatch({type:"FOLLOW",payload:user._id});
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }

    const HomeRightBar=()=>{
        return(
            <>
            <div className="birthdayContainer">
                <img className="birthdayImg" src="/assets/gift.png" alt="" />
                <span className="birthdayText"><b>Pola Foster</b> and <b>3 others</b> have a birthday today</span>
            </div>
            <img className="rightBarAd" src="/assets/ad.png" alt="" />
            <h4 className="rightBarTitle">Online Friends</h4>
            <ul className="rightBarFriendList">
                {Users.map((u)=>(
                   <Online key={u.id} user={u}/>
                ))}
            </ul>
            </>
        );
    };

    const ProfileRightBar=()=>{
        return (<>

        {user.username!==currentUser.username && (
            <button className="followButton" onClick={handleClick}>
                {followed ? "Unfollow":"Follow"}
                {followed ? <Remove/>:<Add/>}
            </button>
        )}
        <h4 className='rightBarTitle'>User Information</h4>
        <div className="rightBarInfo">
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City:</span>
                <span className="rightBarInfoValue">{user.city}</span>
            </div>
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">From:</span>
                <span className="rightBarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightBarInfoKey">Relationship:</span>
                <span className="rightBarInfoValue">{user.relationship===1 ? "Single":user.relationship===2 ? "Married": "-"}</span>
            </div>
        </div>
        <h4 className='rightBarTitle'>User Friends</h4>
        <div className="rigthBarFollowings">
            {friends.map((friend)=>(
                <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
            <div className="rightBarFollowing">
            <img className="rightBarFollowingImg" src={friend.profilePicture ? PF+friend.profilePicture : PF+'person/noAvatar.png'} alt="" />
            <span className="rightBarFollowingName">{friend.username}</span>
        </div>
        </Link>
            ))}
        </div>
        </>)
    }
  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
        {user ? <ProfileRightBar/>:<HomeRightBar/>}
        </div>
    </div>
  )
}
