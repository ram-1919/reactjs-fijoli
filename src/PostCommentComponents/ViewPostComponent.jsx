

import React from 'react'

import img2 from "./../asset/img6.jpg";
import "./ViewPostComponent.css";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Backdrop, Button, CircularProgress, Divider, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import getselectedprofile from '../actions/getselectedprofile';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import HideImageIcon from '@mui/icons-material/HideImage';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import deletePostItemAction from '../actions/deletePostItemAction';
import { useState } from 'react';
import { useEffect } from 'react';
import getPostItemsAction from '../actions/getPostItemsAction';
import resetStatus from '../actions/resetStatus';
import editpostItemAction from '../actions/editpostItemAction';
import PostCommentContainer from '../PostreviewComponents/PostCommentContainer';
import { memo } from 'react';
import PostLikeDislikeController from './PostControllers/PostLikeDislikeController';
import postlikesDislikesAction from './PostActions/PostLikesDislikesAction';
import getpostlikesDislikesCount from './PostActions/getpostlikesDislikesCount';
import clearpostlikedislikeState from './PostActions/clearpostlikedislikeState';
import PostFollowController from './PostControllers/PostFollowController';
import PostFollowAction from './PostActions/PostFollowAction';
import PostMenuController from './PostControllers/PostMenuController';
import posthideAction from './PostActions/posthideAction';
import PostDialogComponent from './CustomDialogComponent/PostDialogComponent';
import { SafetyDivider } from '@mui/icons-material';

const iconStyle = {
    fontSize: '25px', // Adjust the size as needed
    color  : "black"
};

const selectediconStyle = {
    fontSize : "25px",
    color    : "red"
}

const followiconStyle = {
    color: "black"
}

const followSelectediconStyle = {
    color: "red"
}

const ViewPostComponent = ({postkey}) => {

    const postitem  = useSelector((state)=> state.storeComponent.lstofPosts[postkey]);
    console.log(" ViewPostCommentComponent " + postitem.id);
    const dispatch      =  useDispatch();
    
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [menuOptions, setmenuOptions] = useState(["report","hide","follow"]);
    const [confirmDlgInfo, setconfirmDlgInfo]   = useState(PostMenuController.getDefaultConfirmation());
    const [confirmreportInfo, setconfirmreportInfo] = useState(PostMenuController.getDefaultConfirmation());

    const [ispostReview, setispostReview] = useState(false);

    //initialize menu items to be displayed 
    //if post belongs to logged in user - displays edit/delete options
    useEffect(()=> {
        if(postitem.isLoggedInUser){
            setmenuOptions(["edit", "delete", "hide"]);
        }        
    },[postitem]);


    //redirects to self profile when user img is clicked
    const handleOtherProfile = () =>{
        if(postitem.isLoggedInUser){
            dispatch(getselectedprofile(true, 0));
        }else{
            dispatch(getselectedprofile(false, postitem.whatsapp_number, postitem.logged_in_user_id));
        }
        dispatch(navigateItem(EnumNavigate.profileState));
    }

    //event which executes when the menu icons are clicked
    const handleClick = (eventtype) =>{
        switch(eventtype){
            case "edit":
                dispatch(editpostItemAction(postitem));
                dispatch(navigateItem(EnumNavigate.postState));
                break;
            case "delete":
                setconfirmDlgInfo({...PostMenuController.getDeleteConfirmation()});
                break;
            case "report":
                setconfirmreportInfo({...PostMenuController.getPostConfirmation()});
                break;
            case "hide":
                setconfirmDlgInfo({...PostMenuController.getHideConfirmation()});
                break;
            case "follow":
                setTimeout(() => {
                    postitem.isfollower = !postitem.isfollower;
                    setShowbackdrop(false);
                }, 2000);
                setShowbackdrop(true);
                dispatch(PostFollowAction(PostFollowController.getFollowState(postitem)));
                break;
            default:
                setconfirmDlgInfo({...PostMenuController.getDefaultConfirmation()});
                break;
        }
    }

    const handlePostConfirmation = (confirmstate) =>{
        if(confirmstate){
            switch(confirmreportInfo.postmenutype){
                case "report":
                    setconfirmreportInfo({...PostMenuController.getDefaultConfirmation()});
                    setconfirmDlgInfo({...PostMenuController.getHideConfirmation("we have reported this post - would you also like to hide this post?")});
                break;
            }
        }else{
            setconfirmreportInfo({...PostMenuController.getDefaultConfirmation()});
        }
    }

    //deletes post based on the confirmed state
    const handleConfirmationState = (confirmState) =>{
        if(confirmState){

            switch(confirmDlgInfo.postmenutype){
                case "delete":
                        //call delete post item 
                        dispatch(deletePostItemAction({"id": postitem.id}));
                    break;
                case "hide":
                        dispatch(posthideAction(PostMenuController.getHideMenuData(postitem)));
                    break;
                
            }

        }
        handleClick("");
    }

    const handlepostreview = () =>{
        setispostReview(!ispostReview);
    }

    const handlelikeState = (state) =>{
        console.log("like state ==> " + postitem.id);
        const postState = PostLikeDislikeController.getpostlike(postitem.id, postitem.logged_in_user_id, state);
        dispatch(postlikesDislikesAction(postState));
    }

  return (
    <div className='postcomment_container'>
        <table className='postcomment_table_container'>
            <tr className='postcomment_header_height'>
                <td className='postcomment_header_1stcol'>
                    <img src={img2} 
                        className="postcomment_image_pic" 
                        onClick={handleOtherProfile}/>
                </td>
                <td colSpan={4} className='postcomment_header_2ndcol'>
                    <div>
                        <Button style={{marginLeft: "-12px"}} variant='text' onClick={handleOtherProfile}>{postitem.user_name}</Button>
                        {/* <span className='postcomment_name'>{postitem.user_name}</span> */}
                        <br/>
                        <span className='postcomment_subname'>Quachise Hollandise</span>
                    </div>
                </td>
                <td className='postcomment_header_3rdcol'>
                    {
                        menuOptions.map((item, index)=>{
                            if("edit" === item){
                                return <Tooltip title="edit">
                                            <IconButton key={1} onClick={()=>handleClick("edit")}><EditIcon style={{iconStyle}}/></IconButton>
                                        </Tooltip>
                            }else if("delete" === item){
                                return <Tooltip title="delete">
                                            <IconButton key={2} onClick={()=>handleClick("delete")}><DeleteIcon/></IconButton>
                                        </Tooltip>
                            }else if("report" === item){
                                return <Tooltip title="report">
                                            <IconButton key={3} onClick={()=>handleClick("report")}><ReportIcon/></IconButton>
                                        </Tooltip>
                            }else if("hide" === item){
                                return <Tooltip title="hide">
                                         <IconButton  key={4} onClick={()=>handleClick("hide")}><HideImageIcon /></IconButton>
                                        </Tooltip>
                            }else if("follow" === item){
                                return <Tooltip title="follow">
                                             <IconButton key={5} onClick={()=>handleClick("follow")}>
                                                {
                                                    (postitem.isfollower)?
                                                        <FollowTheSignsIcon style={followSelectediconStyle} />:
                                                        <FollowTheSignsIcon style={followiconStyle}/>
                                                }
                                            </IconButton>
                                       </Tooltip>
                            }
                        })
                    }
                </td>
            </tr>
            <tr className='postcomment_header_height'>
                <td colSpan={6}>
                    <img src={img2} className="postcomment_postimage"/>
                </td>
            </tr>
            <tr className='postcomment_header_height'>
                <td style={{border: "0px solid red", width: "50px", paddingLeft:"20px"}}>
                    <div>
                        <IconButton key="upkey" onClick={(evt)=>handlelikeState(1)}>
                            {
                                ((1 === postitem.is_active) && (1 === postitem.reaction))?
                                    <ThumbUpOutlinedIcon style = {selectediconStyle}/> :
                                    <ThumbUpOutlinedIcon style = {iconStyle}/>
                            }
                        </IconButton>
                        <br/>
                        <span className='postcomment_thumbup_count'>{postitem.likes_count}</span>
                    </div>
                </td>
                <td style={{border: "0px solid red", width: "50px"}}>
                    <div>
                        <IconButton key="downkey" onClick={(evt)=>handlelikeState(0)}>
                            {
                                ((1 === postitem.is_active) && (0 === postitem.reaction))?
                                    <ThumbDownOffAltOutlinedIcon style = {selectediconStyle}/> :
                                    <ThumbDownOffAltOutlinedIcon style = {iconStyle}/>
                            }
                        </IconButton>
                        <br/>
                        <span className='postcomment_thumbup_count'>{postitem.dislikes_count}</span>
                    </div>
                </td>
                <td  style={{border: "0px solid red", width: "50px"}}>
                <div style={{marginTop:"-20px"}}>
                        <IconButton key="modekey" onClick={(evt)=>handlepostreview()}>
                            <ModeCommentIcon  style={iconStyle} />
                        </IconButton>
                        <br/>
                        {/* <span  className='postcomment_thumbup_count'>23</span> */}
                    </div>
                </td>
                <td  style={{border: "0px solid red", width: "50px"}}>
                    <div style={{marginTop:"-20px"}}>
                        <ShortcutIcon  style={iconStyle}/>
                    </div>
                </td>
                <td>
                    <div>
                        {/* <span style={{border: "none", fontSize: "15px"}}>Views</span>
                        <br/>
                        <span style={{border: "none"}}>58</span> */}
                    </div>
                </td>
                <td  style={{textAlign:"right", paddingRight:"20px"}}>
                <div style={{marginTop:"-15px"}}>
                    <WhatsAppIcon key="whatsappkey" style={iconStyle}/>
                </div>
                </td>
            </tr>
            <tr>
                <td colSpan={6}>
                    <div className='postcomment_description'>
                        {postitem.post_desc}
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={6} className='postcomment_price'>
                    <span>
                        {"Price-"}{"999"}
                    </span>
                </td>
            </tr>
        </table>

        {
            (confirmDlgInfo.showConfirmationDlg) &&
            <ConfirmationDialog isopenDialog={confirmDlgInfo.showConfirmationDlg}
                                confirmMsg  ={confirmDlgInfo.confirmationMessage}
                                handleConfirmationState = {handleConfirmationState}
                                menuOptions = {confirmDlgInfo.menuOptions}/>
        }
        {
            (ispostReview)&&
            <PostCommentContainer key={postitem.id} post_id = {postitem.id} logged_in_user_id={postitem.logged_in_user_id}/>
        }
        {
            (confirmreportInfo.showConfirmationDlg)&&
            <PostDialogComponent isopenDialog={confirmreportInfo.showConfirmationDlg}
                                handlePostConfirmation = {handlePostConfirmation}
                                postitem = {postitem} />
        }
        <Divider  />
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={((showbackdrop) || (confirmDlgInfo.showConfirmationDlg) || (confirmreportInfo.showConfirmationDlg))}>
            <CircularProgress color="inherit" />
        </Backdrop>

    </div>
  )
}

export default ViewPostComponent