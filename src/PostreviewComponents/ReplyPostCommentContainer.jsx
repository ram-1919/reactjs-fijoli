

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getreplypostCommentsAction from '../actions/getreplypostCommentsAction';
import clearreplypostcommentAction from './Actions/clearreplypostcommentsActions';
import ViewReplyPostCommentComponent from './ViewReplyPostCommentComponent';

const ReplyPostCommentContainer=({post_id, id, logged_in_user_id})=> {

    const dispatch  = useDispatch();

    const lstofpostreplycomments= useSelector((state) =>{
      if((state.storeComponent.lstofPosts) &&
          (Object.keys(state.storeComponent.lstofPosts[post_id].comments).includes(id.toString()))){
            return state.storeComponent.lstofPosts[post_id.toString()].comments[id].subcomments;
      }
    });

    console.log("post_id " + post_id + " id " + id + " user_id " + logged_in_user_id );

    useEffect(()=>{

        if((undefined === lstofpostreplycomments) || 
           (0 === Object.keys(lstofpostreplycomments).length)){
            dispatch(getreplypostCommentsAction(id, post_id, logged_in_user_id));
        }

        return(()=>{
          dispatch(clearreplypostcommentAction(post_id, id));
        });
    },[]);

  return (
    <div style={{height: "auto", marginLeft: "25px"}}>
        {
            (lstofpostreplycomments)&&
            Object.keys(lstofpostreplycomments).map((replycommentid, index)=>{
               return <ViewReplyPostCommentComponent key={index} post_id={post_id} comment_id={id} replycomment_id={replycommentid}/>
            })
        }
    </div>
  )
}

export default ReplyPostCommentContainer