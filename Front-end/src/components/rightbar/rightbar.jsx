import './rightbar.css'
import {Users} from "../../dummyData";
import Online from "../online/Online";


export default function rightbar({profile}) {

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
        <h4 className='rightBarTitle'>User Information</h4>
        <div className="rightBarInfo">
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">City:</span>
                <span className="rightBarInfoValue">New York</span>
            </div>
            <div className="rightBarInfoItem">
                <span className="rightBarInfoKey">From:</span>
                <span className="rightBarInfoValue">Madrid</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightBarInfoKey">Relationship:</span>
                <span className="rightBarInfoValue">Single</span>
            </div>
        </div>
        <h4 className='rightBarTitle'>User Friends</h4>
        <div className="rigthBarFollowings">
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/1.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/2.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/3.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/4.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/5.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
            <div className="rightBarFollowing">
                <img className="rightBarFollowingImg" src="assets/person/6.jpeg" alt="" />
                <span className="rightBarFollwingName">John Carter</span>
            </div>
        </div>
        </>)
    }
  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
        {profile ? <ProfileRightBar/>:<HomeRightBar/>}
        </div>
    </div>
  )
}
