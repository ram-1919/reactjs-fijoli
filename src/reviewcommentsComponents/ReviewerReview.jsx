

import { IconButton } from '@mui/material'
import React from 'react'
import img2 from "./../asset/img3.jpg";

import "./ReviewerReview.css";
import userreviewType from '../actions/userreviewType';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import postuserreviewcomment from '../actions/postuserreviewcomment';
import PostReviewController from '../viewModels/PostReviewController';

//component holds reviewer review comment
const ReviewerReview = ({reviewComment, menuoption}) =>{

  //create default objects
  const dispatch    = useDispatch();

  //event initialize the operation type of reviewer review
  const handleClick  = (eventtype) =>{
      //sets operation type
      reviewComment["mode"]   = eventtype;
      reviewComment["rating_visible"] = false;
      
      //if operation type is delete 
      //then clear reviewer review description
      if("delete" === eventtype){
        //change mode type to edit to clear reply_desc only
        reviewComment["mode"]       = "edit";
        reviewComment["reply_desc"] = "";

        const uploadfiles     = {"review":[undefined]};
        const reviewpostctrl  = new PostReviewController();
        const reviewData      = reviewpostctrl.getpostItem(reviewComment, uploadfiles);

        //run delete api to update in the server
        dispatch(postuserreviewcomment(reviewData, reviewComment.mode));
      }else {
        //send the review comment to parent control
        //for posting it to server
        dispatch(userreviewType(reviewComment));
      }
  }

  return (
    <div className='reviewer_reviewcomment_container'> 
          <table className='reviewer_reviewcomment_table_container'>
            <tr className='reviewer_reviewcomment_header_height'>
                <td className='reviewer_reviewcomment_dummy_col'>
                 </td>
                <td >
                    <img src={img2} className='reviewer_reviewcomment_image_pic'/>
                </td>
                <td colSpan={3} >
                    <div className='reviewer_reviewcomment_username_div'>
                        <span >
                            {reviewComment.reviewer_user_id} 
                        </span>
                    </div>
                </td>
                <td className='reviewer_reviewcomment_icon_col'>
                  {
                      (reviewComment.ismenuvisible) &&
                        menuoption.map((item, index)=>{
                            if(item === "edit"){
                                return <IconButton key={index} onClick={()=>handleClick("edit")}><EditIcon/></IconButton>
                            }else if(item === "delete"){
                                return <IconButton key={index} onClick={()=>handleClick("delete")}><DeleteIcon/></IconButton>
                            }
                        })
                    }
                </td>
            </tr>
            <tr >
              <td ></td>
              <td className='reviewer_reviewcomment_dummy_col'></td>
              <td colSpan={4} >
                <div className="reviewer_reviewcommnt_description_span">
                  <span>
                    {reviewComment.reply_desc}
                  </span>
                </div>
              </td>
            </tr>
          </table>
    </div>
  )
}

export default ReviewerReview