

import { Button, IconButton } from '@mui/material';
import React, { memo } from 'react'
import "./ViewReplyPostCommentComponent.css";

import img2 from "./../asset/img6.jpg";
import { useState } from 'react';
import PostCommentsController from '../Controllers/PostCommentsController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import resetStatus from '../actions/resetStatus';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PostCommentComponent from './PostCommentComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EnumPostCommentType from '../singletonControllers/PostReviewTypes';
import postCommentAction from '../actions/postCommentAction';
import clearReplyPostCommentStatusAction from '../actions/clearReplyPostCommentStatusAction';
import getreplypostCommentsAction from '../actions/getreplypostCommentsAction';
import postcommentlikedislikeAction from './Actions/postcommentlikedislikeAction';
import EnumPostCommentLikeDisliketype from './models/EnumPostCommentLikeDisliketype';
import clearpostcommentlikedislikeAction from './Actions/clearpostcommentlikedislikeAction';
import getpostcommentlikedislikescountAction from './Actions/getpostcommentlikedislikescountAction';
import replypostcommentlikedislikeAction from './Actions/replypostcommentlikedislikeAction';

const iconStyle = {
    fontSize: '25px', // Adjust the size as needed
    color  : "black"
};

const selectediconStyle = {
    fontSize : "25px",
    color    : "red"
}

const ViewReplyPostCommentComponent =({post_id, comment_id, replycomment_id}) =>{

    // console.log("postcomment " + postcomment.post_id);
    const dispatch      = useDispatch();
    const [userpicinfo, setuserpicinfo]   = useState();
    const postcomment = useSelector((state) =>{
        return state.storeComponent.lstofPosts[post_id].comments[comment_id].subcomments[replycomment_id];
    });

    
    //reply comment objects 
    const [posttype, setposttype]                       = useState(EnumPostCommentType.none);
    useEffect(()=>{
        setposttype(EnumPostCommentType.none);
        let picpath = process.env.REACT_APP_S3_URL + postcomment["whatsapp_number"] + "/profilepic/" + postcomment["whatsapp_number"] + "_profilepic_";
        setuserpicinfo(picpath);
    },[postcomment]);

    const [updatedpostcomment,   setupdatedpostcomment]     = useState("");

    //handle comment sub operations / state operations
    const handleCommentState = (eventType) =>{
        switch(eventType){

            case EnumPostCommentType.replyReplyPost:
                setupdatedpostcomment(PostCommentsController.getRepliesReplyPostComment(postcomment));
                setposttype(EnumPostCommentType.replyReplyPost);
            break;

            case EnumPostCommentLikeDisliketype.like:
                let postcommentlikeState = PostCommentsController.getpostReplyCommentlikeORdislikeState(postcomment, 1);
                console.log(postcommentlikeState);
                dispatch(replypostcommentlikedislikeAction(postcommentlikeState));

            break;

            case EnumPostCommentLikeDisliketype.dislike:
                let postcommentdislikeState = PostCommentsController.getpostReplyCommentlikeORdislikeState(postcomment, 0);
                console.log(postcommentdislikeState);
                dispatch(replypostcommentlikedislikeAction(postcommentdislikeState));

            break;
        }
    }

    //event which sets the operation type as edit/delete
    //perform the selected operation
    const handlesubCURDOperation = (eventType) =>{

        //executes event 
        switch(eventType){
            case EnumPostCommentType.editReplyPost:
                setposttype(EnumPostCommentType.editReplyPost);
                setupdatedpostcomment(PostCommentsController.getEditRelyPostComment(postcomment));
                break;

            case EnumPostCommentType.deleteReplyPost:
                // setposttype(EnumPostCommentType.deleteReplyPost);
                dispatch(postCommentAction(PostCommentsController.getDeleteReplyPostComment(postcomment), EnumPostCommentType.deleteReplyPost));
                break;
        }
    }


  return (
    <div>
        {
            ((EnumPostCommentType.none === posttype) || 
             (EnumPostCommentType.replyReplyPost === posttype))&&
            <div className="viewpostreplycomment_container">
                <div className="viewpostreplycomment_header">
                    <img src={userpicinfo} className="viewpostreplycomment_image_pic viewreplypostcc_skeleton" />
                    <span className='viewpostreplycomment_username'>{postcomment.user_name}</span><br/>
                </div>

                <div className='viewpostreplydisplayPost_review_desc_div'>
                    <div className="viewpostreplycomment_desc">
                        <span >{postcomment.comment_desc}</span>
                    </div>
                    { 
                        (postcomment.logged_in_user_id === postcomment.comment_user_id) &&
                        <div style={{flexDirection: "row", display: "flex"}}>
                            <IconButton style={{justifyItems: "left"}} onClick={()=> handlesubCURDOperation(EnumPostCommentType.editReplyPost)}>
                                <EditIcon />
                            </IconButton>
                            
                            <IconButton style={{justifyItems: "left"}} onClick={()=> handlesubCURDOperation(EnumPostCommentType.deleteReplyPost)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    }
                </div>
                <div className="viewpostreplycomment_body">
                    <div className="viewpostreplycomment_icons">
                        <div>
                            <IconButton onClick={() => handleCommentState(EnumPostCommentLikeDisliketype.like)}>
                                {
                                    ((1 === postcomment["is_active"]) && (1 === postcomment["reaction"]))?
                                    <img src={"/categoryImages/rheart.svg"} className="viewreplypostcc_image_pic" /> :
                                    <img src={"/categoryImages/lheart.svg"} className="viewreplypostcc_image_pic" />
                                        //       <ThumbUpOutlinedIcon style={selectediconStyle} />:
                                        // <ThumbUpOutlinedIcon style={iconStyle} />
                                }
                            </IconButton>
                            <br/>
                            <span className='viewpostreplycomment_thumbup_count'>{postcomment.likes_count}</span>
                        </div>
                        <div>
                            <IconButton onClick={() => handleCommentState(EnumPostCommentLikeDisliketype.dislike)}>
                                {
                                    ((1 === postcomment["is_active"]) && (0 === postcomment["reaction"]))?
                                        <img src={"/categoryImages/rDislikeheart.svg"} className="viewreplypostcc_image_pic" /> :
                                        <img src={"/categoryImages/heart.svg"} className="viewreplypostcc_image_pic" />
      
                                        // <ThumbDownOffAltOutlinedIcon style={selectediconStyle} />:
                                        // <ThumbDownOffAltOutlinedIcon style={iconStyle} />
                                }
                            </IconButton>
                            <br/>
                            <span className='viewpostreplycomment_thumbup_count'>{postcomment.dislikes_count}</span>
                        </div>
                        <IconButton onClick={() => handleCommentState(EnumPostCommentType.replyReplyPost)}>
                            <ReplyIcon style={{marginTop:"-25px"}}/>
                        </IconButton>
                    </div>
                    <>
                        {
                            (EnumPostCommentType.replyReplyPost === posttype) &&
                            <PostCommentComponent postcomment={updatedpostcomment} posttype = {posttype}/>
                        }
                    </>
                </div>
            </div>
        }
        {
            (EnumPostCommentType.editReplyPost === posttype)&&
            <>
                <summary>Edit Post Comment</summary>
                <PostCommentComponent postcomment={updatedpostcomment} posttype={posttype}/>
            </>
        }
    </div>
  )
}

export default ViewReplyPostCommentComponent