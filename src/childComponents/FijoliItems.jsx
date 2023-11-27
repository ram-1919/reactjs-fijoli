import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getPostItemsAction from '../actions/getPostItemsAction';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import "./FijoliItems.css";

///<summary>
// home page category post items component
///</summary>
const FijoliItems = (props) =>{

    const dispatch            = useDispatch();
    const navigate            = useNavigate();

    const userinfo  = useSelector((state)=> state.storeComponent.configData.profileData);

    const handleuploadbtnClick = (evt, selectedItem) =>{
        if(userinfo){

            dispatch(getPostItemsAction(userinfo.user_id));
            //navigate to page which displays post comment info
            dispatch(navigateItem(EnumNavigate.postContainer));
        }else{
            navigate("/");
        }
    }

  return (
    <div className='fijoli_main-container'>
        <div style={{marginLeft: "30px"}}>
            <img src='' alt=""/>
            <label>{props.data.key}</label>
        </div>
        <br/> 
        <div style={{marginLeft: "45px"}}>
            {
                props.data.items.map((item, idx)=>{
                    let imgsrc = "/images/img" + (Math.floor(Math.random() * 4) + 1) +".jpg";
                    return (
                        <span key={idx}>
                            <button id="idx" key={idx} style={{width: "70px", cursor: "pointer",
                                     height: "70px", borderRadius: "50px"}} 
                                     onClick={(evt)=>handleuploadbtnClick(evt, {"id": item.id, "index": idx})} >
                                <img src={imgsrc}  key={idx}
                                    style={{marginLeft:"-9px", marginTop:"-3px",  width: "70px", height: "70px", borderRadius: "50px"}} 
                                    alt="uploadfiles..."/>
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    )
                })
            }
     
        </div>
    </div>
  )
}

export default FijoliItems;