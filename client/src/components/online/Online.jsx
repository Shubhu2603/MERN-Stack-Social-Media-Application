import React from 'react'
import './online.css'

export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightBarFriend">
    <div className="rightBarProfieImageContainer">
        <img className="rightBarProfileImg" src={PF+user.profilePicture} alt=""/>
        <span className='rightBarOnline'></span>
    </div>
    <span className='rightBarUsername'>{user.username}</span>
</li>
  )
}
