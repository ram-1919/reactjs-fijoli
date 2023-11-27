

import { List, ListItem, ListItemButton } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getselectedprofile from '../../actions/getselectedprofile';
import navigateItem from '../../actions/navigateItemAction';
import EnumNavigate from '../../singletonControllers/NavigateController';
import clearfollowersAction from '../Actions/clearfollowersAction';
import getfollowersAction from '../Actions/getfollowersAction';
import FollowUserInfo from './FollowUserInfo';

const FollowersContainer = () =>{

    const dispatch      = useDispatch();

    const otherUserInfo =  useSelector((state)=> state.storeComponent.otherProfileData);
    const followersinfo =  useSelector((state)=> state.storeComponent.followersinfo);
    const loggedIn_userInfo = useSelector((state)=> state.storeComponent.configData.profileData);

    useEffect(()=>{
        if(otherUserInfo){
            dispatch(getfollowersAction(otherUserInfo.user_id));
        }
        return(()=>{
            dispatch(clearfollowersAction());
        })
    },[otherUserInfo]);

    const handleclickEvent = (follower) =>{
        if(loggedIn_userInfo.user_id === follower.user_id){
            dispatch(getselectedprofile(true, 0));
        }else{
            dispatch(getselectedprofile(false, follower.whatsapp_number, loggedIn_userInfo.user_id));
        }
        dispatch(navigateItem(EnumNavigate.profileState));
    }

  return (
    <div>
        {
            (undefined === followersinfo)&&
            <FollowUserInfo whatsapp_number = {""} userinfo = {null}/>
        }
        {
            (followersinfo) &&
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-label="contacts">
                {
                    followersinfo.map((follower, index)=>{
                        return <ListItem>
                                    <ListItemButton divider onClick={()=>handleclickEvent(follower)}>
                                        <FollowUserInfo key={index} whatsapp_number = {follower.whatsapp_number} user_name = {follower.user_name}/>
                                    </ListItemButton>
                               </ListItem>
                    })
                }
            </List>
        }
    </div>
  )
}

export default FollowersContainer;