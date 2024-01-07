import "./ProfilePicComponent.css"
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import { useEffect } from "react";
import ProfilepicSelectionComponent from "../profilepiccontrols/ProfilepicSelectionComponent";

const ProfilePicComponent = (props) => {

  //set default values 
  const [opendlgstate,    setopendlgstate]        = useState(false);
  const [profilepicInfo, setprofilepicInfo]   = useState(null);
  const [previewImg,     setpreviewImg]       = useState("");
  const [removedlgstate, setremovedlgstate ]  = useState(false);

  useEffect(()=>{
    if(props.profilepic){
      setprofilepicInfo(props.profilepic)
      setpreviewImg(props.profilepic);
    }
  },[props]);

  //useEffect which updates pic to parent component
  useEffect(()=>{
    if(props.handleProfilePicChange){
      props.handleProfilePicChange(profilepicInfo);
    }
  },[profilepicInfo])

  //handle updating the profile pic status
  const handleProfilePicSelection = (picinfo) => {

    //set profile pic selection
    setSelectedPicInfo(picinfo);

    //close crop dialog state
    setopendlgstate(!opendlgstate);
  }

  //selected pic info
  const setSelectedPicInfo = (picinfo) => {
    //updates preview image 
    if((undefined !== picinfo) && (null !== picinfo)){
      setprofilepicInfo(picinfo);
      setpreviewImg(URL.createObjectURL(picinfo));
    }
    else{
      setprofilepicInfo(null);
      setpreviewImg(null);
    }
  }

  //removes the selected pic file
  const handleProfilePicRemove = (picState) => {

    //deletes the 
    if(true === picState){
      setSelectedPicInfo(null);
    }

    //close removed dialog state
    setremovedlgstate(!removedlgstate);
  }

  //handles launching the file to choose the profile image
  const handleCameraClick = () =>{
    setopendlgstate(!opendlgstate);
  }

  //handles to remove the profile pic if not required
  const handleRemoveProfilePic = (evt) => {
    setremovedlgstate(!removedlgstate);
  }

  return (
    <div className='profile_pic'>
      {
        (null === profilepicInfo)?
          <>
              <label className='pic_container' >
                    <PersonIcon sx={{fontSize: "50px"}} />
              </label>
              <CameraAltIcon className='camera_icon' onClick={handleCameraClick}/>
          </>
            :
          <>
              <img src={previewImg} className='profile_img skeleton'/>
              <PersonRemoveIcon className='profile_pic_remove' onClick={handleRemoveProfilePic}/>
          </>  
      }
      {
          (opendlgstate) &&
          <ProfilepicSelectionComponent opendialog={opendlgstate} 
                profilepicInfo={profilepicInfo} 
                handleProfilePicChange={handleProfilePicSelection}
                showcropIcons={true}
                removePicState={false}/>
      }
      {
        (removedlgstate) &&
        <ConfirmationDialog isopenDialog={removedlgstate} 
              confirmMsg="Are you sure, you want to delete?"
              handleConfirmationState = {handleProfilePicRemove}
              menuOptions={["Cancel", "OK"]}/>
      }
    </div>
  )
}

export default ProfilePicComponent
