

import React, { useEffect, useState } from 'react'
import "./MenuComponent.css";

import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import { Menu, Button, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import deactivateUser from '../actions/deactivateuser';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import getselectedprofile from '../actions/getselectedprofile';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
  iconButton: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer"
  }
}));

//component used to display all the options supported by fijoli
const MenuComponent = (props) =>{

    //create objects with default values
    const classes                   = useStyles(); 
    const navigate                  = useNavigate();
    const dispatch                  = useDispatch();
    const [anchorEl, setAnchorEl]   = useState(null);
    const open                      = Boolean(anchorEl);
    const [isAccountMenuVisible, setAccountMenuVisible] = useState(false);
    
    //objects which holds profile data and deactivatestatus
    const userProfile               = useSelector((state) => state.storeComponent.configData.profileData);
    const deactivateStatus          = useSelector((state)=> state.storeComponent.deactivateStatus);

    //hook navigates to login page if user
    //choose deactivate status from the options
    //else redirects to error page
    useEffect(()=>{

        if((undefined != deactivateStatus) && (200 === deactivateStatus.status)){
            dispatch({"type":"clear"});
            navigate("/loginpage");
        }else if((undefined != deactivateStatus) && (200 !== deactivateStatus.status)){
            navigate("/error");
        }
    
    },[deactivateStatus]);

    //event handler to initialize popup menu and visibility state
    const handleAccountClick = (evt) => {
        setAnchorEl(evt.currentTarget);
        setAccountMenuVisible(!isAccountMenuVisible);
    }

    //event handler performs logout application
    const handleLogout = () => {
        dispatch({"type": "set_deactivate_account_success", "data":{"status":200}});
    }

    //resets the selected control which is used during popup
    const handleClose = () =>{
        setAnchorEl(null);
    }
    
    //navigate to logged in user profile or deactive logged in user
    const handleProfileState = (e, option) =>{
        if("viewProfile" === option){
            dispatch(getselectedprofile(true, 0));
            dispatch(navigateItem(EnumNavigate.profileState));
        }else if("deactivateAccount" === option){
            dispatch(deactivateUser({"user_id": userProfile.user_id}));
        }else if("BlockUsers" === option){
            dispatch(navigateItem(EnumNavigate.blockusers));
        }

        setAccountMenuVisible(false);
    }
    
  return (
    <div>
        <table className='menucomponent_container'>
            <tr>
                <td>
                    <span className='menu_header_span'>Menu</span>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <DiamondOutlinedIcon style={{marginTop: '10px'}} ></DiamondOutlinedIcon>
                            <span  className='div_text_menucomponent'> Premium </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <SettingsOutlinedIcon style={{marginTop: '10px'}} ></SettingsOutlinedIcon>
                            <span  className='div_text_menucomponent'> Settings </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <SecurityOutlinedIcon style={{marginTop: '10px'}} ></SecurityOutlinedIcon>
                            <span  className='div_text_menucomponent'> Security </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <HelpOutlineOutlinedIcon style={{marginTop: '10px'}} ></HelpOutlineOutlinedIcon>
                            <span className='div_text_menucomponent'> Help </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <ChatBubbleOutlineOutlinedIcon style={{marginTop: '10px'}} ></ChatBubbleOutlineOutlinedIcon>
                            <span  className='div_text_menucomponent'> Support </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }}>
                            <InfoIcon style={{marginTop: '10px'}} ></InfoIcon>
                            <span  className='div_text_menucomponent'> About Fijoli </span>
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <IconButton classes={{ label: classes.iconButton }} onClick={handleAccountClick}>
                            <PersonIcon style={{marginTop: '10px'}} ></PersonIcon>
                            <span className='div_text_menucomponent'> Account </span>
                            {isAccountMenuVisible &&
                                <Menu id="long-menu" anchorEl={anchorEl}
                                    keepMounted open={open} onClose={handleClose}
                                    PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: "25ch"
                                    }}}>
                                <MenuItem key="viewProfile"
                                    onClick={(e) => handleProfileState(e, "viewProfile")}>
                                    View-Profile
                                </MenuItem>
                                <br/>
                                <MenuItem key="BlockUsers"
                                    onClick={(e) => handleProfileState(e, "BlockUsers")}>
                                    BlockUsers
                                </MenuItem>
                                <br/>
                                <MenuItem key="deactiveAccount"
                                    onClick={(e) => handleProfileState(e, "deactivateAccount")}>
                                    Deactivate-Account
                                </MenuItem>
                            </Menu>
                        }
                    </IconButton>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <span style={{marginLeft: "18px", border: "none"}} >Privacy Policy</span>
                </td>
            </tr>
            <tr > 
                <td>
                    <span style={{marginLeft: "18px", border: "none"}} >Terms & conditions</span>
                </td>
            </tr>
            <tr className='menuItem_height_menucomponent'> 
                <td>
                    <Button style={{marginLeft: "15px"}} varient="outlined" onClick={handleLogout}>Logout</Button>
                </td>
            </tr>
        </table>
    </div>
  )
}

export default MenuComponent