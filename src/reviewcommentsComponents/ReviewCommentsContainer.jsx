

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ReviewCommentsController from '../Controllers/ReviewCommentsController';

import "./ReviewCommentsContainer.css"
import ReviewerReview from './ReviewerReview';
import SubmitterReview from './SubmitterReview';

//component which holds the submitter and reviewer review comments
const ReviewCommentsContainer = ({postitem, menuoptions}) =>{

  //holds the parsed review comments which is used to display/post reviews
  const [reviewcomments, setreviewcomments] = useState([]);

  //hook which parses the single entry review comment to
  //multiple entries of the reviw comments to show submitter/reviewer reviews
  useEffect(()=>{

    //review comment controller parses the single entry to 
    //submitter and reviewer review comments
    const reviewCtrl  = new ReviewCommentsController(postitem);

    //holds parsed review comments
    setreviewcomments([...reviewCtrl.getlstofReviews()]) ;
  },[postitem]);

  return (
    <div className='rvwcmt_container_main_div'>
      {
        (0 <reviewcomments.length) && 
        reviewcomments.map((reviewComment, index)=>{
          if(0 === index){
            return <SubmitterReview key={reviewComment.user_id.toString() + index.toString()} reviewComment = {reviewComment} menuoption={menuoptions["submitter"]}/>
          }else if(1 === index){
            return <ReviewerReview key = {reviewComment.reviewer_user_id.toString() + index.toString()} reviewComment = {reviewComment} menuoption = {menuoptions["reviewer"]} />
          }
        })
      }
    </div>
  )
}

export default ReviewCommentsContainer