import './SideBar.css'
import {RssFeed,Chat,PlayCircle,Groups2,Bookmark,Help,Work,Event,School} from '@mui/icons-material';
import CloseFriend from "../closeFriend/CloseFriend"
import {Users} from "../../dummyData"

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
            <li className="sidebarListItem">
                <RssFeed className="sidebarIcon"/>
                <span className="sideBarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
                <Chat className="sidebarIcon"/>
                <span className="sideBarListItemText">Chat</span>
            </li>
            <li className="sidebarListItem">
                <PlayCircle className="sidebarIcon"/>
                <span className="sideBarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
                <Groups2 className="sidebarIcon"/>
                <span className="sideBarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
                <Bookmark className="sidebarIcon"/>
                <span className="sideBarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
                <Help className="sidebarIcon"/>
                <span className="sideBarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
                <Work className="sidebarIcon"/>
                <span className="sideBarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
                <Event className="sidebarIcon"/>
                <span className="sideBarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
                <School className="sidebarIcon"/>
                <span className="sideBarListItemText">Courses</span>
            </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
            {Users.map((u)=>
                <CloseFriend key={u.id} user={u}/> 
            )}
            </ul>
      </div>
    </div>
  )
}
