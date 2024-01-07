

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./ProfileReviewComponent.css"
import { useDispatch, useSelector } from 'react-redux'

import RatingComponent from '../reviewcommentsComponents/RatingComponent'
import ReviewPostComponent from '../reviewcommentsComponents/ReviewPostComponent'
import ReviewerReviewComponent from '../reviewcommentsComponents/ReviewerReviewComponent'
import SubmitterReviewComponent from '../reviewcommentsComponents/SubmitterReviewComponent'

//component which displays the reviews of the user
//userinfo holds the other profile data
const ProfileReviewComponent = ({userinfo, handleselectTabIndex}) =>{

  //set default values 
  const dispatch      = useDispatch();
  const navigate      = useNavigate();

  //set review comments and commentctrl display state to default
  const [reviewComment, setreviewComment]               = useState({});
  const [isDisplayCommentCtrl, setisDisplayCommentCtrl] = useState(false);

  //holds the review comment type and review post state 
  const reviewtype      = useSelector((state)=> state.storeComponent.reviewtype);
  const reviewpoststate = useSelector((state)=> state.storeComponent.reviewpoststate);

  //redirect to review page once review post is updated successfully
  useEffect(()=>{

      //review post state based on add/edit/delete
      if(reviewpoststate){
        //if review posted successfully it resets the data
        switch(reviewpoststate.status)
        {
            case 200:
                //reset status/review comment/comment ctrl state
                dispatch({"type": "reset_status"});
                
                //logic which re-renders the child controls
                //to load the review comments
                handleselectTabIndex(3);
                setTimeout(() => {
                  handleselectTabIndex(2);
                }, 1000);
            
                break;
            
            case 400:
                //reset comment ctrl state
                setisDisplayCommentCtrl(false);
                navigate("/error");
                break;
        }
      }

  },[reviewpoststate]);

  //initializes the review comment add/edit/delete
  useEffect(()=>{

      //review type is not undefined which is initialized for add/edit/delete
      if(reviewtype){

        switch(reviewtype.mode){
          //if review type to add
          case "new":
            reviewtype["user_id"]           = userinfo["logged_in_user_id"];
            reviewtype["reviewer_user_id"]  = userinfo["user_id"];
            setreviewComment({...reviewtype});
            setisDisplayCommentCtrl(true);
            break;

          //if submitter/reviewer review to edit
          case "edit":
            setreviewComment({...reviewtype});
            setisDisplayCommentCtrl(true);
            break;
        }
      }

  },[reviewtype]);

  return (
    <div className='profile_review_component'>
              <span className='profile_review_component_rating_heading'>Average Rating</span>
              <RatingComponent rating="3.5" isenable={true} />
        <div>
          {
            (isDisplayCommentCtrl) &&
            <ReviewPostComponent reviewcomment={reviewComment} />
          }
          {
            (!isDisplayCommentCtrl) &&
              <div>
                {
                  ((undefined !== userinfo) && (!userinfo.isLoggedInUser)) &&
                  <SubmitterReviewComponent reviewer_user_id={userinfo["user_id"]}/>
                }
                {
                  ((undefined !== userinfo) && (userinfo.isLoggedInUser)) &&
                  <ReviewerReviewComponent reviewer_user_id={userinfo["user_id"]}/>
                }
              </div>
          }
        </div>
    </div>
  )
}

export default ProfileReviewComponent