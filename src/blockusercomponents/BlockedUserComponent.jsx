

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';
import getblockuser from '../actions/actiongetblockuser';
import img from "./../asset/img1.jpg";
import { IconButton } from '@mui/material';
import resetStatus from '../actions/resetStatus';

import "./UserComponent.css";
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import unblockuserAction from '../actions/unblockuserAction';

const BlockedUserComponent = (blockItem) =>{

    const dispatch          = useDispatch();
    const navigate          = useNavigate();

    const [confirmDlgInfo, setconfirmDlgInfo]   = useState({
        "showConfirmationDlg" : false,
        "confirmationMessage" : "Are you sure to unblock user?",
        "menuOptions"         : ["No", "Yes"]
    });

    const blockState    = useSelector((state)=> state.storeComponent.blockState);

    useEffect(()=>{
        if((blockState) && (200 === blockState.status)){
            dispatch(resetStatus());
            let loggedInUserInfo = {"logged_in_user_id": blockItem.item.logged_in_user_id}; 
            dispatch(getblockuser(loggedInUserInfo));
        }else if((blockState) && (200 === blockState.status)){
            dispatch(resetStatus());
            navigate("/error");
        }
    },[blockState]);

    const handleClick = () => {
        confirmDlgInfo.showConfirmationDlg = true;
        setconfirmDlgInfo({...confirmDlgInfo});
    }

    const handleConfirmationState = (confirmState) => {

        if(confirmState){
            let userinfo    = {
                "logged_in_user_id" : blockItem.item.logged_in_user_id, 
                "blocked_user_id": blockItem.item.user_id
            };

            dispatch(unblockuserAction(userinfo));
        }
        
        confirmDlgInfo.showConfirmationDlg = false;
        setconfirmDlgInfo({...confirmDlgInfo});

    }

  return (
    <div className='usercomponent_reviewcomment_container'>
        <table className='usercomponent_reviewcomment_table_container'>
            <tr className='usercomponent_reviewcomment_header_height'>
                <td className='usercomponent_reviewcomment_image_col'>
                    <img src={img} className='usercomponent_reviewcomment_image_pic'/>
                </td>
                <td  >
                    <div style={{marginTop: "-20px", fontSize: "30px"}}>
                        {blockItem.item.user_name}
                    </div>
                </td>
                <td className='usercomponent_reviewcomment_icon_col'>
                    <div>
                        <IconButton onClick={()=>handleClick("delete")}><BlockIcon sx={{color: "red"}}/></IconButton>
                    </div>
                </td>
            </tr>
        </table>
        {
            (confirmDlgInfo.showConfirmationDlg)&&
            <ConfirmationDialog isopenDialog={confirmDlgInfo.showConfirmationDlg}
                            confirmMsg={confirmDlgInfo.confirmationMessage}
                            handleConfirmationState={handleConfirmationState}
                            menuOptions = {confirmDlgInfo.menuOptions}></ConfirmationDialog>
        }
    </div>
  )
}

export default BlockedUserComponent