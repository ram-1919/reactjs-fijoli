

import React from 'react'
import "./ViewPostComponent.css";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Avatar, Backdrop, Button, CircularProgress, Divider, IconButton, Skeleton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import getselectedprofile from '../actions/getselectedprofile';

import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import deletePostItemAction from '../actions/deletePostItemAction';
import { useState } from 'react';
import { useEffect } from 'react';
import editpostItemAction from '../actions/editpostItemAction';
import PostCommentContainer from '../PostreviewComponents/PostCommentContainer';
import PostLikeDislikeController from './PostControllers/PostLikeDislikeController';
import postlikesDislikesAction from './PostActions/PostLikesDislikesAction';
import PostFollowController from './PostControllers/PostFollowController';
import PostFollowAction from './PostActions/PostFollowAction';
import PostMenuController from './PostControllers/PostMenuController';
import posthideAction from './PostActions/posthideAction';
import PostDialogComponent from './CustomDialogComponent/PostDialogComponent';
import PostMenuComponent from './PostMenuComponent';
import DummyViewPostComponent from './DummyViewPostComponent';
import dislikeHeart from './../../src/asset/heart.svg';
import rdislikeHeart from './../../src/asset/rDislikeheart.svg';
import share from './../../src/asset/share-alt.svg';
import lheart from './../../src/asset/lheart.svg';
import rheart from './../../src/asset/rheart.svg';
import comment from './../../src/asset/awesome-comment.svg';
import EnumPostMenuOptions from './PostControllers/PostMenuOptions';

const iconStyle = {
    fontSize: '25px', // Adjust the size as needed
    color  : "black"
};

const whatsappiconStyle = {
    fontSize: '35px', // Adjust the size as needed
    color  : "green"
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
    // console.log(" ViewPostCommentComponent " + postitem.id);
    const dispatch      =  useDispatch();
    
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [menuOptions, setmenuOptions] = useState(["Report","Hide","follow"]);
    const [confirmDlgInfo, setconfirmDlgInfo]   = useState(PostMenuController.getDefaultConfirmation());
    const [confirmreportInfo, setconfirmreportInfo] = useState(PostMenuController.getDefaultConfirmation());

    const [ispostReview, setispostReview] = useState(false);

    const [picinfo, setpicinfo]           = useState();
    const [userpicinfo, setuserpicinfo]   = useState();

    //initialize menu items to be displayed 
    //if post belongs to logged in user - displays edit/delete options
    useEffect(()=> {

        if(postitem.isLoggedInUser){
            setmenuOptions([
                EnumPostMenuOptions.Edit, 
                EnumPostMenuOptions.Delete, 
                EnumPostMenuOptions.Hide
            ]);
        }        

        setTimeout(() => {
            if(!postitem["post_pic_1_path"].includes("undefined")){
                let urlpath = process.env.REACT_APP_S3_URL + postitem["post_pic_1_path"];
                setpicinfo(urlpath); 

                let picpath = process.env.REACT_APP_S3_URL + postitem["whatsapp_number"] + "/profilepic/" + postitem["whatsapp_number"] + "_profilepic_";
                setuserpicinfo(picpath);
            }
        }, 1000);

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
            case EnumPostMenuOptions.Edit:
                dispatch(editpostItemAction(postitem));
                dispatch(navigateItem(EnumNavigate.postState));
                break;
            case EnumPostMenuOptions.Delete:
                setconfirmDlgInfo({...PostMenuController.getDeleteConfirmation()});
                break;
            case EnumPostMenuOptions.Report:
                setconfirmreportInfo({...PostMenuController.getPostConfirmation()});
                break;
            case EnumPostMenuOptions.Hide:
                setconfirmDlgInfo({...PostMenuController.getHideConfirmation()});
                break;
            case EnumPostMenuOptions.Follow:
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
                case EnumPostMenuOptions.Report:
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
                case EnumPostMenuOptions.Delete:
                        //call delete post item 
                        dispatch(deletePostItemAction({"id": postitem.id, "post_category": postitem.post_category}));
                    break;
                case EnumPostMenuOptions.Hide:
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
        const postState = PostLikeDislikeController.getpostlike(postitem.id, postitem.logged_in_user_id, postitem.post_category, state);
        dispatch(postlikesDislikesAction(postState));
    }


  return ( 
    

    
    <div className='postcomment_container'>
        {
            ("" === picinfo)?
            <DummyViewPostComponent/>:
            <>
                {   (postitem) &&
                    <div className='postcomment_container'>
                        <table className='postcomment_table_container'>
                            <tr className='postcomment_header_height'>
                                <td className='postcomment_header_1stcol'>
                                    <IconButton onClick={handleOtherProfile}>
                                        <img src={userpicinfo} className="postcomment_image_pic skeleton"/>
                                    </IconButton>
                                </td>
                                <td colSpan={4} className='postcomment_header_2ndcol'>
                                    <div>
                                        <Button variant='text' onClick={handleOtherProfile}>{postitem.user_name}</Button>
                                        <br/>
                                        <span className='postcomment_subname' >{postitem.user_category}</span>
                                    </div>
                                </td>
                                <td className='postcomment_header_3rdcol'>
                                    <PostMenuComponent menuOptions={menuOptions} isfollower={postitem.isfollower} handleClick={handleClick}/>
                                </td>
                            </tr>
                            <tr className='postcomment_header_height'>
                                <td colSpan={6}>
                                    <img src={picinfo} className="postcomment_postimage skeleton"/>
                                </td>
                            </tr>
                            <tr className='postcomment_header_height'>
                                <td style={{border: "0px solid red", width: "40px", paddingLeft:"20px"}}>
                                    <div>
                                        <IconButton key="upkey" onClick={(evt)=>handlelikeState(1)}>
                                            {
                                                ((1 === postitem.is_active) && (1 === postitem.reaction))?
                                                <img src={rheart} className="view_image_pic" /> :
                                                <img src={lheart} className="view_image_pic" />
                                            }
                                        </IconButton>
                                        <br/>
                                        <span className='postcomment_thumbup_count'>{postitem.likes_count}</span>
                                    </div>
                                </td>
                                <td style={{border: "0px solid red", width: "40px"}}>
                                    <div>
                                        <IconButton key="downkey" onClick={(evt)=>handlelikeState(0)}>
                                            {
                                                ((1 === postitem.is_active) && (0 === postitem.reaction))?
                                                <img src={rdislikeHeart} className="view_image_pic" /> :
                                                <img src={dislikeHeart} className="view_image_pic" />
                                                    // <ThumbDownOffAltOutlinedIcon style = {selectediconStyle}/> :
                                                    // <ThumbDownOffAltOutlinedIcon style = {iconStyle}/>
                                            }
                                        </IconButton>
                                        <br/>
                                        <span className='postcomment_thumbup_count'>{postitem.dislikes_count}</span>
                                    </div>
                                </td>
                                <td  style={{border: "0px solid red", width: "40px"}}>
                                <div style={{marginTop:"-20px"}}>
                                        <IconButton key="modekey" onClick={(evt)=>handlepostreview()}>
                                        <img src={comment} className="view_image_pic" />
                                        </IconButton>
                                        <br/>
                                        {/* <span  className='postcomment_thumbup_count'>23</span> */}
                                    </div>
                                </td>
                                <td  style={{border: "0px solid red", width: "40px"}}>
                                    <div style={{marginTop:"-15px"}}>
                                    <img src={share} className="view_image_pic" />
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
                                    <WhatsAppIcon key="whatsappkey" style={whatsappiconStyle}/>
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
                            <PostCommentContainer key={postitem.id} post_id = {postitem.id} logged_in_user_id={postitem.logged_in_user_id} post_category={postitem.post_category}/>
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
                }
            </>
        }
    </div>

  )
}

export default ViewPostComponent