

import React, { memo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import getReviewerReviews from '../actions/getReviewerReviews';
import ReviewCommentsContainer from './ReviewCommentsContainer';

//main component to show reviewer review comments
const ReviewerReviewComponent =({reviewer_user_id}) =>{

  //get list of review comments of the reviewer
  const dispatch      = useDispatch();
  const [reviewcomments, setreviewcomments] = useState([]);
  const lstofreviewComments = useSelector((state)=> state.storeComponent.lstofreviewComments);

  //set default menu options for the reviewer comment
  const menuoptions = {
    "submitter" : ["reply"],
    "reviewer"  : ["edit", "delete"]
  };  

  //default use Effect which fetches reviewer review comments
  useEffect(()=>{
    dispatch(getReviewerReviews(reviewer_user_id));
  },[]);

  //add the review post user type to the post item 
  useEffect(()=>{
    
      //parsing the reviewer review comments to perform reply/edit/delete operations
      if(lstofreviewComments){
        //loop which parses the reviewer review comment
        for (let reviewIndx = 0; reviewIndx < lstofreviewComments.length; reviewIndx ++) {
          lstofreviewComments[reviewIndx]["user_review_type"]  = "reviewer";
        }

        //holds parsed reviewer review comments 
        setreviewcomments([...lstofreviewComments]);
      }
  
  },[lstofreviewComments]);
  

  return (
    <div>
        {
          ((undefined !== reviewcomments) && (0 < reviewcomments.length)) &&
          reviewcomments.map((item,index)=>{
            return <ReviewCommentsContainer postitem = {item} menuoptions={menuoptions} key={index}/>
          })
        }
    </div>
  )
}

export default memo(ReviewerReviewComponent)