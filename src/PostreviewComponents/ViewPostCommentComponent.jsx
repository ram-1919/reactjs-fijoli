

import { Button, Divider, IconButton, Typography } from '@mui/material';
import React, { memo } from 'react'
import "./ViewPostCommentComponent.css";

import img2 from "./../asset/img6.jpg";
import { useState } from 'react';
import PostCommentsController from '../Controllers/PostCommentsController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyPostCommentContainer from './ReplyPostCommentContainer';
import PostCommentComponent from './PostCommentComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EnumPostCommentType from '../singletonControllers/PostReviewTypes';
import postCommentAction from '../actions/postCommentAction';
import EnumPostCommentLikeDisliketype from './models/EnumPostCommentLikeDisliketype';
import postcommentlikedislikeAction from './Actions/postcommentlikedislikeAction';
import MoreVertIcon from '@mui/icons-material/MoreVert'

const iconStyle = {
    fontSize: '25px', // Adjust the size as needed
    color  : "black"
};

const selectediconStyle = {
    fontSize : "25px",
    color    : "red"
}


const ViewPostCommentComponent= ({post_id, comment_id}) =>{

    const dispatch      = useDispatch();
    // const navigate      = useNavigate();
    console.log("post comment component ==>" + comment_id);
    const [userpicinfo, setuserpicinfo]   = useState();
    const postcomment = useSelector((state)=>{
        return state.storeComponent.lstofPosts[post_id.toString()].comments[comment_id];
    });
    const [posttype, setposttype]     = useState(EnumPostCommentType.none);
    
    useEffect(()=>{
        setposttype(EnumPostCommentType.none);
        let picpath = process.env.REACT_APP_S3_URL + postcomment["whatsapp_number"] + "/profilepic/" + postcomment["whatsapp_number"] + "_profilepic_";
        setuserpicinfo(picpath);
    },[postcomment]);

    //reply comment objects 
    const [updatedpostcomment,   setupdatedpostcomment] = useState("");
    const [isrepliesOpen, setisrepliesOpen]             = useState(false);
    const [replyid, setreplyid]                         = useState("");

    useEffect(()=>{
        setreplyid("details" + postcomment.root_reply_id);
    },[]);

        
    //handle comment sub operations / state operations
    const handleCommentState = (eventType) =>{
        switch(eventType){
            case EnumPostCommentType.replyMainPost:
                handlereplyComponent(false);
                setupdatedpostcomment(PostCommentsController.getReplyPostComment(postcomment));
                setposttype(EnumPostCommentType.replyMainPost);
            break;

            case EnumPostCommentLikeDisliketype.like:
                let postcommentlikeState = PostCommentsController.getpostMainCommentlikeORdislikeState(postcomment, 1);
                console.log(postcommentlikeState);
                dispatch(postcommentlikedislikeAction(postcommentlikeState));
            break;

            case EnumPostCommentLikeDisliketype.dislike:
                let postcommentdislikeState = PostCommentsController.getpostMainCommentlikeORdislikeState(postcomment, 0);
                console.log(postcommentdislikeState);
                dispatch(postcommentlikedislikeAction(postcommentdislikeState));
            break;
        }
    }

    //event which sets the operation type as edit/delete
    //perform the selected operation
    const handlesubCURDOperation = (eventType) =>{

        //executes event 
        switch(eventType){
            case EnumPostCommentType.editMainPost:
                setposttype(EnumPostCommentType.editMainPost);
                setupdatedpostcomment(PostCommentsController.getEditPostComment(postcomment));
                break;

            case EnumPostCommentType.deleteMainPost:
                dispatch(postCommentAction(PostCommentsController.getDeleteMainPostComment(postcomment), EnumPostCommentType.deleteMainPost));
                break;
        }
    }

    //
    const handlereplyComponent = (state) => {
        let detailsctrl = document.getElementById(replyid);
        try {
            detailsctrl.open = state;
            setisrepliesOpen(state);
        } catch (error) {
            //do nothing
        }
    }

  return (
    <div>
        {
            ((postcomment) && ((EnumPostCommentType.none === posttype) || 
             (EnumPostCommentType.replyMainPost === posttype)))&&
            <div className="viewpostcomment_container">
                <div className="viewpostcomment_header">
                    <img src={userpicinfo} className="viewpostcomment_image_pic viewpostcc_skeleton" />
                    <span className='viewpostcomment_username'>{postcomment.user_name}</span><br/>
                </div>

                <div className='viewpostdisplayPost_review_desc_div'>
                    <div className="viewpostcomment_desc">
                        <span >{postcomment.comment_desc}</span>
                    </div>
                    { 
                        (postcomment.logged_in_user_id === postcomment.comment_user_id) &&
                        <div style={{flexDirection: "row", display: "flex"}}>
                            <IconButton style={{justifyItems: "left"}} onClick={()=> handlesubCURDOperation(EnumPostCommentType.editMainPost)}>
                                <EditIcon />
                            </IconButton>
                            
                            <IconButton style={{justifyItems: "left"}} onClick={()=> handlesubCURDOperation(EnumPostCommentType.deleteMainPost)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    }
                </div>
                <div className="viewpostcomment_body">
                    <div className="viewpostcomment_icons">
                        <div>
                        <IconButton onClick={() => handleCommentState(EnumPostCommentLikeDisliketype.like)}>
                            {
                              ((1 === postcomment.is_active) && (1 === postcomment.reaction))?
                              <img src={"/categoryImages/rheart.svg"} className="viewpostcc_image_pic" /> :
                              <img src={"/categoryImages/lheart.svg"} className="viewpostcc_image_pic" />

                                // <ThumbUpOutlinedIcon style = {selectediconStyle} />:
                                // <ThumbUpOutlinedIcon style = {iconStyle}/>
                            }
                        </IconButton>
                        <br/>
                        <span className='viewpostcomment_thumbup_count'>{postcomment.likes_count}</span>
                        </div>
                        <div>
                        <IconButton onClick={() => handleCommentState(EnumPostCommentLikeDisliketype.dislike)}>
                            {
                              ((1 === postcomment.is_active) && (0 === postcomment.reaction))?
                              <img src={"/categoryImages/rDislikeheart.svg"} className="viewpostcc_image_pic" /> :
                              <img src={"/categoryImages/heart.svg"} className="viewpostcc_image_pic" />

                            //   <ThumbDownOffAltOutlinedIcon style = {selectediconStyle} />:
                            //     <ThumbDownOffAltOutlinedIcon style = {iconStyle}/>
                            }
                        </IconButton>
                        <br/>
                        <span className='viewpostcomment_thumbup_count'>{postcomment.dislikes_count}</span>
                        </div>
                        <IconButton onClick={() => handleCommentState(EnumPostCommentType.replyMainPost)}>
                            <ReplyIcon style={{marginTop:"-25px"}}/>
                        </IconButton>
                        {/* <IconButton>
                            <MoreVertIcon/>
                        </IconButton> */}
                    </div>
                    <>
                        {
                            (EnumPostCommentType.replyMainPost === posttype) &&
                            <PostCommentComponent postcomment={updatedpostcomment} posttype = {posttype}/>
                        }
                    </>
                </div>
                
                
            {
                ( 0 < postcomment.count_reply_comments ) &&
                <div >
                    <details id={replyid}>
                        <summary>{postcomment.count_reply_comments} 
                                 <Button onClick={()=>handlereplyComponent(!isrepliesOpen)} variant="text">Replies</Button>
                        </summary>

                        { 
                           (isrepliesOpen) &&
                           <ReplyPostCommentContainer post_id = {postcomment.post_id} id = {postcomment.root_reply_id} logged_in_user_id={postcomment.logged_in_user_id}/>
                        }
                    </details>
                </div>
            }

            <Divider variant="fullwidth" />
            </div>
        }
        {
            (EnumPostCommentType.editMainPost === posttype)&&
            <>
                <summary>Edit Post Comment</summary>
                <PostCommentComponent postcomment={updatedpostcomment} posttype={posttype}/>
                <Divider variant="fullwidth" />
            </>
        }
    </div>
  )
}

export default ViewPostCommentComponent;