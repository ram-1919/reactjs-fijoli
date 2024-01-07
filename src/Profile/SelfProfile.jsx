

import {  Backdrop, Button, IconButton, Paper, Slide, Snackbar, Tab, Tabs, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProfilePicComponent from '../customControls/ProfilePicComponent'
import fitnesstrainer      from "./../asset/trainer.jpg";
import "./SelfProfile.css";
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ShareIcon from '@mui/icons-material/Share';
import CakeIcon from '@mui/icons-material/Cake';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';

import { useDispatch, useSelector } from 'react-redux';
import ProfileTabComponent from './ProfileTabComponent';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import StringConstants from '../constants/StringConstants';

import blockuserAction from '../actions/blockuserAction';
import unblockuserAction from '../actions/unblockuserAction'; 
import { useNavigate } from 'react-router-dom';
import resetStatus from '../actions/resetStatus';
import PostFollowController from '../PostCommentComponents/PostControllers/PostFollowController';
import PostFollowAction from '../PostCommentComponents/PostActions/PostFollowAction';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import FollowConfirmationMsgr from './viewmodels/FollowConfirmationMsgr';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const SelfProfile =() =>{

    const dispatch                              = useDispatch();
    const navigate                              = useNavigate();
    const [profilepic, setprofilepic]           = useState(null);
    const [imgsrc, setimgsrc]                   = useState(null);
    const [trainertype, settrainertype]         = useState("");
    const [isloggedInUser, setisloggedInUser]   = useState(false);
    const [followSBarState,   setfollowSBarState]     = useState(FollowConfirmationMsgr.getDefaultConfirmationMsg());

    const [transition, setTransition] = React.useState(undefined);

    const [blockUserinfo, setblockUserinfo]       = useState({
        "confirminfo"       : {"isOpen": false, "Message": ""},
        "userinfo"          : {"logged_in_user_id" : "", "blocked_user_id": ""},
        "isblocked"         : false,
        "menuOptions"       : ["Cancel", "OK"]
    });

    const otherUserInfo           =  useSelector((state)=> state.storeComponent.otherProfileData);
    const loggedInUserinfo        =  useSelector((state)=> state.storeComponent.configData.profileData);
    const lstoftrainingtypes      =  useSelector((state)=> state.storeComponent.configData.user_category);
    const un_blockState           =  useSelector((state)=> state.storeComponent.blockState);

    const [sbstate, setsbState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal } = sbstate;
    //redirect if block/unblock to error page when it fails
    useEffect(()=>{
        if(un_blockState && (400 === un_blockState.status)){
              dispatch(resetStatus());
              navigate("/error");
        }else if(un_blockState && (200 === un_blockState.status)){
            dispatch(resetStatus());
        }
    },[un_blockState])

    //initialize default values which passes to child controls
    useEffect(()=>{
        //set default image
        setimgsrc(fitnesstrainer);

        //other userinfo holds either loggedinUser/other user
        if(otherUserInfo){
            let picinfo = process.env.REACT_APP_S3_URL + otherUserInfo["whatsapp_number"]+  "/profilepic/"+ otherUserInfo["whatsapp_number"]+ "_" + "profilepic_";
            setprofilepic(picinfo);
            //holds the state of loggerin user or not
            otherUserInfo["isLoggedInUser"]     = (otherUserInfo.user_id === loggedInUserinfo.user_id);

            //initialzes logger in user id, which is required in child controls
            otherUserInfo["logged_in_user_id"]  = loggedInUserinfo.user_id;

            //initializes to display controls based on loggedinuser/otheruser
            setisloggedInUser(otherUserInfo.user_id === loggedInUserinfo.user_id);
            settrainertype(lstoftrainingtypes[otherUserInfo.user_category-1]);
        }
    },[otherUserInfo])

    const handleProfilePicChange = (picInfo) =>{

    }

    //event handler which initializes confirmation info based on block/unblock user
    const handleBlockUserState = () =>{
        blockUserinfo.confirminfo.isOpen    = true;
        blockUserinfo.confirminfo.Message   = (otherUserInfo.isblocked)?StringConstants.UNBLOCK_USER_MSG:StringConstants.BLOCK_USER_MSG;
        setblockUserinfo({...blockUserinfo});
    }

    //handles blocking/unblocking user info confirmation dialog
    const handleBlockUserConfirmation = (state) =>{

        if(state){
            blockUserinfo.isblocked     = otherUserInfo.isblocked;
            blockUserinfo.userinfo.logged_in_user_id = loggedInUserinfo.user_id;
            blockUserinfo.userinfo.blocked_user_id   = otherUserInfo.user_id;
        }

        blockUserinfo.confirminfo.isOpen   = !blockUserinfo.confirminfo.isOpen;
        setblockUserinfo({...blockUserinfo});

        //invokes api to store block/unblock of users if it is not logged in user
        if(otherUserInfo.isblocked){
            dispatch(unblockuserAction(blockUserinfo.userinfo))
        }else{
            dispatch(blockuserAction(blockUserinfo.userinfo));
        }
    }

    //event handler gets invoke when follow button is pressed
    const handlefollowClick = () =>{
        dispatch(PostFollowAction(PostFollowController.getFollowState(otherUserInfo)));
    } 

    const handlefollowEvent = (followtype) =>{
        let totalCount = 0;
        switch (followtype) {
            case EnumNavigate.followers:
                totalCount = otherUserInfo.follower_count;
                break;
            case EnumNavigate.following:
                totalCount = otherUserInfo.following_count;
                break;
            default:
                totalCount = 0;
                break;
        }
        if(0 < totalCount){
            dispatch(navigateItem(followtype))
        }else{
            setTransition(()=>TransitionDown);
            setfollowSBarState(FollowConfirmationMsgr.getOpenConfirmationMsg(followtype));
        }
    }

    const handlefollowSnackbarClose = () =>{
        setfollowSBarState(FollowConfirmationMsgr.getDefaultConfirmationMsg());
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handlefollowSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    
  return (
        <div className="selfprofile_container">
            <div className="selfprofile_image_main_div">
                <img src={imgsrc}/>
            </div>
            <div className="selfprofile">
                <ProfilePicComponent profilepic={profilepic}
                         handleProfilePicChange={handleProfilePicChange}/> 
            </div>
            { (undefined !== otherUserInfo) &&
            <div>
                <div className='selfprofile_div_row_header_trainertype'>
                    <TextField type="text" 
                        value={otherUserInfo.user_name}
                        variant="outlined" 
                        sx={{
                                marginTop: 7,
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        }}
                        InputProps={{ sx: { height: 15, "& input": {   textAlign: "center"  }  } }}/>
                    {
                        (!isloggedInUser) &&
                        <WhatsAppIcon style={{width:"20px", marginTop:"45px", marginLeft: "-30px"}}/>
                    }
                </div>
                <div className='selfprofile_div_row_header_trainertype'>
                    <TextField type="text" 
                        variant="outlined" 
                        disabled
                        value={trainertype}
                        sx={{
                                marginTop: 1,
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        }}
                        InputProps={{ sx: { height: 15,  "& input": {   textAlign: "center"  } } }}/>
                    {
                        (isloggedInUser) &&
                        <ModeEditIcon style={{width:"20px", marginLeft: "-30px"}}/>
                    }
                </div>
                <div className='selfprofile_div_followers'>
                    <table>
                        <tr>
                            <td className='selfprofile_div_table_followers'>
                            <div >
                                <input type="text" value={otherUserInfo.follower_count} readOnly={true} key="followers"
                                    className='selfprofile_div_table_followers_count'/>
                                <br/>
                                <Button variant="contained" 
                                    className="selfprofile_div_table_followers_btn" onClick={()=> handlefollowEvent(EnumNavigate.followers)}>Followers</Button>
                            </div>
                            </td>
                            <td className='selfprofile_div_table_following'>
                                <div >
                                    <input type="text" value={otherUserInfo.following_count} readOnly={true} key="following"
                                         className='selfprofile_div_table_following_count'/>
                                    <br/>
                                    <Button variant="contained" 
                                        className='selfprofile_div_table_following_btn' onClick={()=> handlefollowEvent(EnumNavigate.following)}>Following</Button>
                                </div>
                            </td>
                            <td className='selfprofile_div_table_share'>
                                <ShareIcon 
                                    className='selfprofile_div_table_shareicon'/>
                            </td>
                            {
                                (!isloggedInUser) &&
                                <td>
                                    <div className='selfprofile_div_table_follow'>
                                            <IconButton onClick={handlefollowClick} width="auto">
                                                {
                                                    (otherUserInfo.isfollower)?
                                                    <Button variant="contained"
                                                        className='selfprofile_sel_div_table_follow_btn'>UnFollow</Button>:
                                                    <Button variant="contained" 
                                                        className='selfprofile_div_table_follow_btn'>Follow</Button>
                                                }
                                            </IconButton>
                                            
                                    </div>
                                </td>
                            }
                        </tr>
                    </table>
                </div>
                {
                    (isloggedInUser) &&
                    <>
                        <div className='selfprofile_div_dob_whatsapp'>
                            <table>
                                <tr >
                                    <td  className='selfprofile_div_table_row_dob_icon'>
                                        <CakeIcon className='selfprofile_div_table_dob_icon'/>
                                    </td>
                                    <td className='selfprofile_div_table_row_dob_input'>
                                        <input value={otherUserInfo.dob} type="text" readOnly={true}
                                          key="cake" className='selfprofile_div_table_dob_input' />
                                    </td>
                                    <td className='selfprofile_div_table_row_whatsapp_icon'>
                                        <WhatsAppIcon className='selfprofile_div_table_dob_icon'/>
                                    </td>
                                    <td className='selfprofile_div_table_row_whatsapp_input'>
                                        <input  value={otherUserInfo.whatsapp_number} type="text" 
                                            readOnly={true} key="whatsappnumber"
                                            className='selfprofile_div_table_whatsapp_input'/>
                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div className='selfprofile_div_location_email'>
                            <table>
                                    <tr>
                                        <td className='selfprofile_div_table_row_location_icon'>
                                            <LocationOnIcon className='selfprofile_div_table_dob_icon'/>
                                        </td>
                                        <td className='selfprofile_div_table_col_location_input'>
                                            <input value={otherUserInfo.location} type="text" 
                                            readOnly={true} key="whatsappnumber"
                                            className='selfprofile_div_table_location_input'/>
                                        </td>
                                        <td className='selfprofile_div_table_col_modeEdit_icon'>
                                            <ModeEditIcon className='selfprofile_div_table_dob_icon'/>
                                        </td>
                                        <td className='selfprofile_div_table_col_email_icon'>
                                            <EmailIcon className='selfprofile_div_table_dob_icon'/>
                                        </td>
                                        <td className='selfprofile_div_table_col_email_input'>
                                            <input value={otherUserInfo.user_email} type="text" 
                                                readOnly={true} key="email"
                                                 className="selfprofile_div_table_email_input"/>
                                        </td>
                                        <td></td>
                                    </tr>
                            </table>
                        </div>
                    </>
                }
                {
                    (!isloggedInUser) &&
                    <>
                        <div className='selfprofile_div_dob_whatsapp'>
                            <table>
                                <tr >
                                    <td  className='selfprofile_div_table_row_dob_icon'>
                                        <LocationOnIcon className='selfprofile_div_table_dob_icon'/>
                                    </td>
                                    <td className='selfprofile_div_table_row_location_input'>
                                        <span className='selfprofile_div_table_dob_input'>{otherUserInfo.location}</span>
                                    </td>
                                    <td>
                                        {
                                            (otherUserInfo.isblocked)?
                                            <Tooltip title="unblock">
                                            <IconButton onClick={handleBlockUserState}>
                                                <BlockIcon className='selfprofile_div_table_block_icon' sx = {{ color : "red" }}/>
                                            </IconButton>
                                            </Tooltip>:
                                            <Tooltip title="block">
                                            <IconButton onClick={handleBlockUserState}>
                                                <BlockIcon className='selfprofile_div_table_block_icon' />
                                            </IconButton>
                                            </Tooltip>
                                        }
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </>
                }
                <div>
                    <ProfileTabComponent  userinfo ={otherUserInfo} />
                </div>
            </div>
            }
            {
                (blockUserinfo.confirminfo.isOpen) &&
                <ConfirmationDialog isopenDialog    =   {blockUserinfo.confirminfo.isOpen}
                                    confirmMsg      =   {blockUserinfo.confirminfo.Message}
                                    handleConfirmationState = {handleBlockUserConfirmation}
                                    menuOptions     =   {blockUserinfo.menuOptions}/>
            }
            {
                <>
                <Snackbar
                    open={followSBarState.openfollowsb}
                    TransitionComponent={transition}
                    message={followSBarState.errMsg}
                    action={action}
                    autoHideDuration={6000}
                    anchorOrigin = {{vertical, horizontal}}
                    key={transition ? transition.name : ''}
                />
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={followSBarState.openfollowsb}>
                </Backdrop>
            </>
            }
    </div>
  )
}

export default SelfProfile