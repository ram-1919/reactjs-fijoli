

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getblockuser from '../actions/actiongetblockuser';
import "./BlockUserContainer.css";
import BlockedUserComponent from './BlockedUserComponent';
import clearblockusers from './Actions/clearblockusers';


const  BlockUserContainer = ({logged_in_user_id}) =>{

  const dispatch        = useDispatch();
  const lstofblockusers = useSelector((state)=> state.storeComponent.lstofblockusers);

  //clear block users from store when the UI unmount
  useEffect(()=>{
    return(()=>{
      dispatch(clearblockusers());
    })
  },[]);

  //fetches block users list
  useEffect(()=>{
      if(logged_in_user_id){
        dispatch(getblockuser({"logged_in_user_id": logged_in_user_id}));
      }
  },[logged_in_user_id]);


  return (
    <div>
      {
          ((undefined !== lstofblockusers) && (0 === lstofblockusers.length)) &&
          <span className='blockuser_container_no_list'> No Block users exists </span>
      }
      {
          ((undefined !== lstofblockusers) && (0 < lstofblockusers.length)) &&
          <>
            <span className='blockuser_container_heading'> Block users lists </span>
            <br/>
            {
              lstofblockusers.map((item, index)=>{
                return <BlockedUserComponent item = {item} key={index}/>
              })
            }
          </>
      }
    </div>
  )
}

export default BlockUserContainer