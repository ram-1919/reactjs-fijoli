

import React, { useState, useEffect, memo } from 'react';

import "./SubmitterReviewComponent.css";
import RatingComponent from './RatingComponent';
import { useDispatch, useSelector } from 'react-redux';
import getSubmitterReviews from '../actions/getSubmitterReviews';
import ReviewCommentsContainer from './ReviewCommentsContainer';
import userreviewType from '../actions/userreviewType';

//main component to hold submitter review comments
const SubmitterReviewComponent = ({reviewer_user_id}) =>{

  //set default objects
  const dispatch      = useDispatch();

  //holds review comments of the submitter 
  const [reviewcomments, setreviewcomments] = useState([]);
  const [isreviewPosted, setisreviewPosted] = useState(false);
  //get data of posted comment user info and review comments
  const loggedInUser        = useSelector((state)=> state.storeComponent.configData.profileData);
  const lstofreviewComments = useSelector((state) => state.storeComponent.lstofreviewComments);

  //initialize the deafult options for the submitter review comments
  const menuoptions = {
      "submitter" : ["edit", "delete"],
      "reviewer"  : []
  };

  //hook fetches submitter review comments 
  useEffect(()=>{
    if((reviewer_user_id) && (loggedInUser)){
      dispatch(getSubmitterReviews({
        "reviewer_user_id": reviewer_user_id, 
        "user_id": loggedInUser.user_id}));
    }
  },[reviewer_user_id, loggedInUser]);

    
  //add the review post user type to the post item 
  useEffect(()=>{

    //review comments which are fetched from the server 
    if(lstofreviewComments){
      
      //loop initializes submitter data for the fetched review comments
      for (let reviewIndx = 0; reviewIndx < lstofreviewComments.length; reviewIndx ++) {
        lstofreviewComments[reviewIndx]["user_review_type"]  = "submitter";
        lstofreviewComments[reviewIndx]["logged_in_user_id"] = loggedInUser.user_id; 
      }

      // setisreviewPosted(0 < (lstofreviewComments.filter(item => 
      //         ((item.user_id === loggedInUser.user_id) &&
      //          (item.reviewer_user_id === reviewer_user_id)))).length);

      setisreviewPosted(0 < (lstofreviewComments.filter(item => item.user_id === loggedInUser.user_id).length));

      //store in use state member variable
      setreviewcomments([...lstofreviewComments]);
    }
 
  },[lstofreviewComments]);

  const handleRatingClick = (rate) =>{
        //structure to create new review comment
        //desc_type is initialized with reviewer/reply desc
        //by default it will be reviewer desc 
        let reviewcomment = {
          "user_id"           : "",
          "reviewer_user_id"  : "", 
          "review_desc"       : "", 
          "user_rating"       : rate, 
          "reply_desc"        : "",
          "mode"              : "new",
          "desc_type"         : "review_desc",
          "rating_visible"    : false
      }

      //dispatches to parent control to post
      dispatch(userreviewType(reviewcomment));
  }

  return (
    <div className='submitterReview_container_pcs'>
        <div className='submitterReview_rate_label_div'>
          Rate  
        </div>

        <div className='submitterReview_rate_div'>
            <RatingComponent rating="0" isenable={isreviewPosted} handleRatingClick={handleRatingClick}/>
        </div>
        {
          ((undefined !== reviewcomments) && (0 < reviewcomments.length)) &&
            reviewcomments.map((item,index)=>{
              return <ReviewCommentsContainer postitem = {item} menuoptions={menuoptions} key={index}/>
            })
        }
    </div>
  )
}

export default memo(SubmitterReviewComponent)