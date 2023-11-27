

import { List, ListItem, ListItemButton } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getselectedprofile from '../../actions/getselectedprofile';
import navigateItem from '../../actions/navigateItemAction';
import EnumNavigate from '../../singletonControllers/NavigateController';
import clearfollowingAction from '../Actions/clearfollowingAction';
import getfollwingAction from '../Actions/getfollowingAction';
import FollowUserInfo from '../FollowerComponents/FollowUserInfo';

const FollowingContainer = () =>{

    const dispatch      = useDispatch();

    const otherUserInfo =  useSelector((state)=> state.storeComponent.otherProfileData);
    const followinginfo =  useSelector((state)=> state.storeComponent.followinginfo);
    const loggedIn_userInfo = useSelector((state)=> state.storeComponent.configData.profileData);

    useEffect(()=>{
        if(otherUserInfo){
            dispatch(getfollwingAction(otherUserInfo.user_id));
        }
        return(()=>{
            dispatch(clearfollowingAction());
        });
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
            (undefined === followinginfo)&&
            <FollowUserInfo whatsapp_number = {""} userinfo = {null}/>
        }
        {
            (followinginfo) &&
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-label="contacts">
                {
                    followinginfo.map((follower, index)=>{
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

export default FollowingContainer