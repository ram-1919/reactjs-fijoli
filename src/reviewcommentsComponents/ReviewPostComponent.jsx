
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';

import ConfirmationDialog from '../childComponents/ConfirmationDialog';

import { grey } from '@mui/material/colors';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileDownloadOffOutlinedIcon from '@mui/icons-material/FileDownloadOffOutlined';
import { useDispatch } from 'react-redux';
import postdummyreviewcomments from '../actions/postdummyreviewcommentsState';
import postuserreviewcomment from '../actions/postuserreviewcomment';
import ProfilepicSelectionComponent from '../profilepiccontrols/ProfilepicSelectionComponent';
import PostReviewController from '../viewModels/PostReviewController';
import RatingComponent from './RatingComponent';
import { Label } from '@material-ui/icons';


const ReviewPostComponent = ({reviewcomment}) =>{

    const dispatch                              = useDispatch();
    const [desc, setdesc]                       = useState("");
    const [isuploaded, setisuploaded]           = useState(false);
    const [openPicSelDlg, setopenPicSelDlg]     = useState(false);
    const [uploadfiles, setuploadfiles]         = useState({"review": [undefined]});

    const [confirmDlgInfo, setconfirmDlgInfo]   = useState({
        "showConfirmationDlg" : false,
        "confirmationHeading" : "Confirmation",
        "confirmationMessage" : "Are you sure to post review comment?",
        "menuOptions"         : ["No", "Yes"]
    }); 

    // Adjust the size as needed
    const iconStyle                 = { fontSize: '45px',  color   : grey };

    //created this hook to fix an issue -displaying description to support onchange event
    //hook sets review comment of the description
    useEffect(()=>{
        if(reviewcomment){
            setdesc(reviewcomment[reviewcomment["desc_type"]]);
        }
    },[reviewcomment]);


    //event which initialize description 
    //based on desc_type either to "reviewer_desc" / "reply_desc"
    const handletxtChanged = (evt)=> {
        setdesc(evt.target.value);
        reviewcomment[reviewcomment["desc_type"]] = evt.target.value;
    }

    //event which initialize confirmation dialog state
    const handlConfirmationDlg = () => {
       confirmDlgInfo["showConfirmationDlg"] = true;
       setconfirmDlgInfo({...confirmDlgInfo});
    }

    //event which posts the review comment based 
    //on the confirmation status 
    const handlePostReviewConfirmation = (postState) =>{
        //close confirmation dialog
        confirmDlgInfo["showConfirmationDlg"] = false;
        setconfirmDlgInfo({...confirmDlgInfo});
        
        //if Yes post the state and close confirmation dialog
        //else close confirmation dialog without posting
        if(postState){
            let reviewpostCtrl = new PostReviewController();
            const reviewData    = reviewpostCtrl.getpostItem(reviewcomment, uploadfiles);
            dispatch(postuserreviewcomment(reviewData, reviewcomment.mode));
        }else{
            dispatch(postdummyreviewcomments());
        }
    }

    //handles upload confirmation pic 
    const handleUploadfile = () => {
        setopenPicSelDlg(true)
    }

    //event handles profile pic change 
    const handleProfilePicChange = (picinfo) => {

        //handle profile pic change source code
        if(null === picinfo){
            setisuploaded(false);
            delete uploadfiles["review"][0];
        }else{
            setisuploaded(true);
            uploadfiles["review"][0] = picinfo;
            setuploadfiles(uploadfiles);
        }

        setopenPicSelDlg(false);
    }

    const handleRatingClick = (rate) =>{
       reviewcomment["user_rating"] = rate;
    }



  return (
        <div style={{width:"auto",
            height:"auto",
            border:"1px solid #000", color:"red",
            borderRadius:"10px",position:"relative" }}>
            {
                reviewcomment["rating_visible"] &&
                <div>
                    Rate :
                    <RatingComponent handleRatingClick={handleRatingClick}
                        rating={reviewcomment.user_rating} isenable={false} />
                </div>
            }
            <div style={{width:"auto",
                height:"125px",
                border:"1px solid #000", color:"red",
                borderRadius:"10px" }}>

                    <TextField 
                        value = {desc}
                        style={{textAlign: 'left'}}
                        placeholder="              share your receipe in not more than 500 characters" 
                        fullWidth
                        multiline
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                        onChange = {handletxtChanged}
                        InputProps={{ sx: { height: 120 }}}       
                        rows={4}                                
                        variant="outlined"/>
            </div>
            <div className='play_icons_post_component'>
                <IconButton onClick={handleUploadfile} >
                    {
                      (!isuploaded)? <UploadFileOutlinedIcon style={iconStyle} /> :  <FileDownloadOffOutlinedIcon style={iconStyle} sx={{color: "red"}} /> 
                    }
                </IconButton>
                <Button className='post_message_post_component' onClick={(evt) => handlConfirmationDlg(evt)}>Post</Button>
            </div>
            {
                (confirmDlgInfo.showConfirmationDlg) &&
                <ConfirmationDialog isopenDialog    =   {confirmDlgInfo.showConfirmationDlg}
                                    confirmMsg      =   {confirmDlgInfo.confirmationMessage}
                                    handleConfirmationState = {handlePostReviewConfirmation}
                                    menuOptions     = {confirmDlgInfo.menuOptions}/>

            }
            {
                (openPicSelDlg) &&
                <ProfilepicSelectionComponent 
                            opendialog = {openPicSelDlg} 
                            profilepicInfo = {uploadfiles["review"][0]} 
                            handleProfilePicChange = {handleProfilePicChange} 
                            showcropIcons={false}
                            removePicState={isuploaded}/>
            }
        </div>
  )
}

export default ReviewPostComponent