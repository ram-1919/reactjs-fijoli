

import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import resetStatus from '../actions/resetStatus';
import ProfileBioComponent from './ProfileBioComponent';
import ProfilepostCatetoryComponent from './ProfilepostCatetoryComponent';
import ProfileReviewComponent from './ProfileReviewComponent';
import "./ProfileTabComponent.css";

//component which displays about user (BIO, REVIEWS, MY POSTS)
const ProfileTabComponent = ({userinfo}) =>{

    //set to default tab index
    const dispatch                = useDispatch();
    const [tabindex, settabindex] = useState(3);

    //set selected tab index 
    const  handleselectTabIndex = (selectedTabIndex) =>{
      // if(tabindex !== selectedTabIndex){
        dispatch(resetStatus());
        settabindex(selectedTabIndex);
      // }
    }

    useEffect(()=>{
      if(userinfo){
        settabindex(3);
      }
    },[userinfo]);

  return (
    <div>
      <table style={{width: "100%"}}>
        <tr>
          <td style={{textAlign: "left",width: "33%" }}>
            {
              <Button variant="outlined" onClick={(e) => handleselectTabIndex(1)}
                className={(tabindex === 1)?"buttonSelect":"buttonNone"} >Bio</Button>
            }
          </td>
          <td style={{textAlign: "center",width: "33%" }}>
            {
              <Button variant="outlined" onClick={(e) => handleselectTabIndex(2)}
               className={(tabindex === 2)?"buttonSelect":"buttonNone"} >Reviews</Button>               
            }
          </td>
          <td style={{textAlign: "right",width: "34%" }}>
            {
              <Button variant="outlined"  onClick={(e) => handleselectTabIndex(3)}
                  className={(tabindex === 3)?"buttonSelect":"buttonNone"}
                  >My Posts</Button>
            }
          </td>
        </tr>
      </table>
      <div style={{height: "5px", background: "lightgray"}}/>
      {
        (1 === tabindex) &&
        <ProfileBioComponent userinfo={userinfo}/>
      }    
      {
        (2 === tabindex) &&
        <ProfileReviewComponent userinfo={userinfo} handleselectTabIndex={handleselectTabIndex}/>
      }
      {
        (3 === tabindex) &&
        <ProfilepostCatetoryComponent />
      }
    </div>
  )
}

export default ProfileTabComponent