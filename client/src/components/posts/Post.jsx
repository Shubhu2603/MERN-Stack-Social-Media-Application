import React from 'react';
import "./post.css";
import { MoreVert } from '@mui/icons-material';
import {Users} from "../../dummyData";
import {useState} from 'react';

export default function Post({post}) {
    const [like,setlike]=useState(post.like);
    const [isliked,setisliked]=useState(false);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler=()=>{
        setlike(isliked ? like-1: like+1)
        setisliked(!isliked)
    }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src={Users.filter((u)=>u.id===post.userId)[0].profilePicture} alt="" />
                    <span className='postUsername'>{Users.filter((u)=>u.id===post.userId)[0].username}</span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className='postText'>{post?.desc}</span>
                <img className="postImg" src={PF+post.photo} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler} alt="" />
                    <img className="likeIcon"src={PF+"heart.png"} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
