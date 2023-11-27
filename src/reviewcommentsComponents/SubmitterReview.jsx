

import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RatingComponent from './RatingComponent'

import img2 from "./../asset/img3.jpg";
import "./SubmitterReview.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch } from 'react-redux';
import userreviewType from '../actions/userreviewType';
import deletereviewcomment from '../actions/deletereviewcomment';

//component to display submitter review comment
const SubmitterReview = ({reviewComment, menuoption}) =>{

    //set default objects
    const dispatch      = useDispatch();
    const [userid, setuserid]   = useState(0);

    //hook which is used to set userid
    useEffect(()=>{
        if(reviewComment){
            setuserid(reviewComment.user_id);
        }
    },[reviewComment]);

    //event which performs edit/delete operations 
    //of the review comment
    const handleClick = (eventtype)=>{

        //initialize the rating visible type
        reviewComment["rating_visible"] = (eventtype === "reply")?false:true;
        if("delete" === eventtype){
            dispatch(deletereviewcomment(reviewComment));
        }else {
            //pass review comment to parent control to post
            //ProfileReviewComponent which posts the review comment 
            reviewComment["mode"] = "edit";
            dispatch(userreviewType(reviewComment));
        }
    }

  return (
    <div className="comment_container">
    <div className="comment_header">
        <img src={img2} className="comment_image_pic" />
        <div className="comment_username">
            <span>{reviewComment.user_id}</span>
            <RatingComponent rating={reviewComment.user_rating} isenable={true} />
        </div>
        <div className="comment_icons">
            {reviewComment.ismenuvisible &&
                menuoption.map((item, index) => {
                    if (item === "edit") {
                        return (
                            <IconButton onClick={() => handleClick("edit")}>
                                <EditIcon />
                            </IconButton>
                        );
                    } else if (item === "delete") {
                        return (
                            <IconButton onClick={() => handleClick("delete")}>
                                <DeleteIcon />
                            </IconButton>
                        );
                    } else if (item === "reply") {
                        return (
                            <IconButton onClick={() => handleClick("reply")}>
                                <ReplyIcon />
                            </IconButton>
                        );
                    }
                })}
        </div>
    </div>
    <div className="comment_body">
        <span>{reviewComment.review_desc}</span>
    </div>
</div>
    // <div className='submitter_reviewcomment_container'> 
    //     <table className='submitter_reviewcomment_table_container'>
    //         <tr className='submitter_reviewcomment_header_height'>
    //             <td >
    //                 <img src={img2} className='submitter_reviewcomment_image_pic'/>
    //             </td>
    //             <td colSpan={(reviewComment.ismenuvisible)?4:3} className="submitter_reviewcomment_username_col">
    //                 <div >
    //                     <span>{reviewComment.user_id}</span>
    //                     <br/>
    //                     <RatingComponent rating={reviewComment.user_rating}  isenable={true}/>
    //                 </div>
    //             </td>
    //             <td className='submitter_reviewcomment_icon_col'>
    //                 {
    //                     (reviewComment.ismenuvisible) &&
    //                         menuoption.map((item, index)=>{
    //                             if(item === "edit"){
    //                                 return <IconButton onClick={()=>handleClick("edit")}><EditIcon/></IconButton>
    //                             }else if(item === "delete"){
    //                                 return <IconButton onClick={()=>handleClick("delete")}><DeleteIcon/></IconButton>
    //                             }else if(item === "reply"){
    //                                 return <IconButton onClick={()=>handleClick("reply")}><ReplyIcon/></IconButton>
    //                             }
    //                         }
    //                     )
    //                 }
    //             </td>
    //         </tr>
    //         <tr>
    //             <td></td>
    //             <td colSpan={5}>
    //             <span >
    //                 {reviewComment.review_desc}
    //             </span>
    //         </td>
    //         </tr>
    //     </table>
    // </div>
)
}

export default SubmitterReview