

import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getpostCommentAction from '../actions/getpostCommentAction';
import PostCommentsController from '../Controllers/PostCommentsController';
import EnumPostReviewType from '../singletonControllers/PostReviewTypes';
import PostCommentComponent from './PostCommentComponent';
import ViewPostCommentComponent from './ViewPostCommentComponent';
import clearpostcommentsAction from './Actions/clearpostcommentsAction';

///<summary>
// post_id : post id 
// logged_in_user_id : user_id of logged in person
// main post comment container
///</summary>
const PostCommentContainer = ({post_id, logged_in_user_id, post_category}) =>{
 
  const dispatch    = useDispatch();
  //post new review comment memoized
  const memoizedpostnewComment  = useMemo(()=> {
    return PostCommentsController.getNewPostComment(post_id, post_category, logged_in_user_id);
  },[post_id]);

  const lstofpostcomments = useSelector((state)=>{
        if((state.storeComponent.lstofPosts) &&
            (Object.keys(state.storeComponent.lstofPosts).includes(post_id.toString()))){
              return state.storeComponent.lstofPosts[post_id.toString()].comments;
          }
  });

  useEffect(()=>{
    console.log("use Effect for postreview container");
    if(undefined === lstofpostcomments){
      dispatch(getpostCommentAction(post_id, post_category, logged_in_user_id));
    }
    return(()=>{
      dispatch(clearpostcommentsAction(post_id));
    })
  },[]);
  
  return (
    <div>
        {((lstofpostcomments) && (0 < Object.keys(lstofpostcomments).length)) &&
          Object.keys(lstofpostcomments).map((comment_id, index)=>{
            return <ViewPostCommentComponent key={index} post_id = {post_id} comment_id = {comment_id}/>
          })
        }
        <PostCommentComponent postcomment = {memoizedpostnewComment} posttype={EnumPostReviewType.newPost} />
    </div>
  )
}

export default PostCommentContainer