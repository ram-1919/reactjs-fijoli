

import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getPostItemsAction from '../actions/getPostItemsAction';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';

import img_0 from "./../asset/beef_receipe.jpeg";
import img_1 from "./../asset/chicken_receipe.jpeg";
import img_2 from "./../asset/fitness_storyboard_1.jpg";
import img_3 from "./../asset/food_receipe.jpeg";
import img_4 from "./../asset/noodles_receipe.jpeg";
import getlstofselectedpostcategory from './actions/getlstofselectedpostcategory';

//component which displays list of post categories of a user
const ProfilepostCatetoryComponent = ({handlePostItemClick}) =>{

    const dispatch              = useDispatch();
    const [userid, setuserid]   = useState("");

    const loggedInUser  = useSelector((state)=> state.storeComponent.configData.profileData);
    const otherUser     = useSelector((state)=> state.storeComponent.otherProfileData);
    
    useEffect(()=>{
        if(loggedInUser){
            setuserid(loggedInUser.user_id);
        }
    },[loggedInUser]);
    
    //get lst of categories which exists
    const lstofCategories = useSelector(
        (state)=> state.storeComponent.configData.Post);

    //temp variable to display images
    const lstofImages = [img_0, img_1, img_2, img_3, img_4];

    //fetches list of post items for the selected category
    const handlePostClickEvent = (selectedIndex) =>{

        dispatch(getlstofselectedpostcategory(otherUser.user_id, lstofCategories[selectedIndex], loggedInUser.user_id));
        // dispatch(getPostItemsAction(userid));
        //dispatch(navigateItem(EnumNavigate.postContainer));
    }

  return (
    <Stack direction="row" spacing={4} marginLeft= "10px" marginTop="15px" height="220px">
        {
            ((undefined !== lstofCategories) && (0 < lstofCategories.length)) &&
            lstofCategories.map((item, index)=>{
                return <div key={index} id="postitem">
                            <Avatar  alt='index' key={index}
                                sx={{ width: 76, height: 76, alignItems: "center", cursor: "pointer" }}
                                src={lstofImages[index]}
                                onClick = {(e) => handlePostClickEvent(index)} />
                                <br/>
                            <span key={item} style={{fontSize: "10px"}}>{item.replace("Post", "")}</span>
                        </div>
            })
        }
    </Stack>
  )
}

export default ProfilepostCatetoryComponent;