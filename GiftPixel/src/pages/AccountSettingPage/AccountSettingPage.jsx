import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { FaToggleOn } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import "../../styles/AccountSetting.css"
import { useNavigate } from 'react-router-dom';


const navigate = useNavigate()


const handleProfileSettings = () => {
    navigate("/profileSettings")
  }

const AccountSettingPage = () => {
   
  return (
   <div className='AccountsettingPage'>
   
   <div className="profile-account-settingbox">
        <div className="profile" onClick={handleProfileSettings}>
            <AiOutlineUser /> Profile settings
        </div>
        <div className="profile" >
            <AiOutlineUser /> Account settings
        </div>
    </div>
    
    <div className='AccountsettingPage-box'>
        <div>Notification</div>
        <div className='Notification'>
           <div className='toggle'><p>Push notification</p><FaToggleOn className='toggle-icon' /></div>
           <div className='toggle'><p className='email-notification'>Email notification</p><FaToggleOn className='toggle-icon' /></div>
        </div>
        <div className='services'>
            <div className='center'><p>Security center</p><FaAngleRight /></div>
            <div className='center'><p>Customer service center</p><FaAngleRight /></div>
            <div className='center'><p>Privacy and policy</p><FaAngleRight /></div>
            <div className='center'><p>Help and support</p><FaAngleRight /></div>
            <div className='center'><p>About us</p><FaAngleRight /></div>
            <div className='center'><p>Contact us</p><FaAngleRight /></div>
        </div>
        <div className='others'>
            <div><p><FaRegStar />&nbsp;Rate us</p></div>
            <div><p><LuLogOut />&nbsp;Log out</p></div>
            <div className='delete'><p><RiDeleteBin6Line />Delete account</p></div>
        </div>
    </div>
   </div>

  )
}

export default AccountSettingPage