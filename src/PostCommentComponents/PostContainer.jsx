

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import clearpostsAction from '../actions/clearpostsAction';
import ViewPostComponent from './ViewPostComponent';

const PostContainer = () =>{

  console.log("Post container launched");
  const dispatch          = useDispatch();
  const lstofPosts        = useSelector((state)=> state.storeComponent.lstofPosts);

  //use Effect which clears the post data
  //and post/post-reply comments 
  useEffect(()=>{
    console.log(" useeffect of post container launched");
    return(()=>{
      dispatch(clearpostsAction());
    });
  },[]);

  return (
    <div>
      {
        ((undefined !== lstofPosts) && (0 < Object.keys(lstofPosts).length)) &&
        Object.keys(lstofPosts).map((postkey, idx)=>{
          return <ViewPostComponent key={idx} postkey = {postkey}/>
        })
      }
    </div>
  )
}

export default PostContainer