

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./HomePage.css";
import HomePageHeaderComponent from './HomePageHeaderComponent';
import MenuComponent from './MenuComponent';
import PostComponent from './PostComponent';
import FijoliItems from "./FijoliItems";
import SelfProfile from '../Profile/SelfProfile';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import PostContainer from '../PostCommentComponents/PostContainer';
import BlockUserContainer from '../blockusercomponents/BlockUserContainer';
import FollowersContainer from '../Follow/FollowerComponents/FollowersContainer';
import FollowingContainer from '../Follow/FollowingComponents/FollowingContainer';
import SearchpostContainer from '../SearchPosts/SearchPostComponents/SearchpostContainer';
import clearErrorMessageAction from '../actions/clearErrorMessageAction';
import DisplayMessage from '../DisplayMessageComponent/DisplayMessage';


const HomePage = () =>{

  const dispatch                          = useDispatch();
  const [displaymsg, setdisplaymsg]       = useState({});
  

  const lstofItems        = useSelector(state => state.storeComponent.configData.postItems);
  const navigateItemtype  = useSelector((state) => state.storeComponent.navigateItemType);
  const loggedInUserInfo  = useSelector((state) => state.storeComponent.configData.profileData);
  
  const errormsgstate     = useSelector(state => state.storeComponent.errormsg);

  useEffect(()=>{
    if(errormsgstate){
      setdisplaymsg({"open": true, "msg": errormsgstate.errormsg});
    }
  },[errormsgstate]);

  useEffect(()=>{
    // dispatch({type: "getFijoliItems"});
    dispatch(navigateItem(EnumNavigate.homepageState));
  },[]);

  const createUserinfo = (loggedInUser) =>{
    if(loggedInUser){
      return{
        "user_id" : loggedInUser.user_id,
        "whatsapp_number" : loggedInUser.whatsapp_number
      }
    }
  }
  
  const userinfo = useMemo(() => createUserinfo(loggedInUserInfo), [loggedInUserInfo]);

  const handlecloseDisplayMsg = () =>{
    setdisplaymsg({"open": false, "msg": ""});
    dispatch(clearErrorMessageAction());
  }

  return (
      <div className='homepage-container'>
        <HomePageHeaderComponent userinfo = {userinfo}/>
        <>
        { (navigateItemtype === EnumNavigate.menuState) &&
          <MenuComponent />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.postState) &&
          <PostComponent />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.homepageState) && (undefined != lstofItems) && (Object.keys(lstofItems).length) &&
          Object.keys(lstofItems).map((item, index)=>{
            return (<FijoliItems key={index} categoryName={item} data={lstofItems[item]} ></FijoliItems>)
          })
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.profileState) &&
          <SelfProfile />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.postContainer) &&
          <PostContainer />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.blockusers) &&
          <BlockUserContainer logged_in_user_id = {loggedInUserInfo.user_id}/>
        }
        </>
        <>
          {
            (navigateItemtype === EnumNavigate.followers) &&
            <FollowersContainer />
          }
        </>
        <>
          {
            (navigateItemtype === EnumNavigate.following) &&
            <FollowingContainer />
          }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.searchposts) &&
          <SearchpostContainer user_id={loggedInUserInfo.user_id}/>
        }
        </>
        {
          <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
        }
      </div>
  )
}

export default HomePage;
