

import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import postreportcommentAction from '../PostActions/postreportcommentAction';
import PostMenuController from '../PostControllers/PostMenuController';
import clearpostreportcommentAction from '../PostActions/clearpostreportcommentAction';
import "./PostDialogComponent.css";

const iconStyle                 = { fontSize: '20px' };

const PostDialogComponent = ({isopenDialog, handlePostConfirmation, postitem}) =>{

    const dispatch      = useDispatch();
    const [reportDesc, setreportDesc] = useState("");

    const postreportcmtState = useSelector((state)=> state.storeComponent.postreportcmtState);

    useEffect(()=>{
        if((postreportcmtState) && (200 === postreportcmtState.status)){
            dispatch(clearpostreportcommentAction());
            handlePostConfirmation(true);
        }else if((postreportcmtState) && (400 === postreportcmtState.status)){
            dispatch(clearpostreportcommentAction());
            handlePostConfirmation(false);
        }
    },[postreportcmtState])

    const handlConfirmationDlg = (handleState) =>{

        if(handleState){
            let reportcmt = PostMenuController.getPostReportComment(postitem);
            reportcmt["reason"] = reportDesc;
            dispatch(postreportcommentAction(reportcmt));
        }else{
            handlePostConfirmation(false);
        }
    }

    const handletxtChanged = (evt) =>{
        setreportDesc(evt.target.value)
    }

  return (
    <div>
        <Dialog open={isopenDialog}>
            <DialogTitle>
                <div style={{display: "flex", alignItems: "right", justifyContent: "right"}}>
                    <IconButton onClick={()=>handlConfirmationDlg(false)}>
                        <CloseIcon style={iconStyle}/>
                    </IconButton>
                    <br/>
                </div>
                <center> Why do you want to report this post? </center>
                
            </DialogTitle>
            <DialogContent>
                <div className='postdialog_main_container'>
                    <div style={{width:"450px",
                            height:"auto",  
                            border:"1px solid #000", color:"red",
                            borderRadius:"10px",position:"relative",textAlign:"right" }}>

                        <div  style={{width:"auto",
                            height:"125px",
                            border:"1px solid #000", color:"red",
                            borderRadius:"10px" }}>

                            <TextField 
                                style={{textAlign: 'left'}}
                                placeholder="              report post " 
                                fullWidth
                                multiline
                                value = {reportDesc}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                                }}
                                onChange = {handletxtChanged}
                                InputProps={{ sx: { height: 120 }}}       
                                rows={4}                                
                                variant="outlined"/>
                        </div>
                        <div className='play_icons_postdialog'>
                            <Button className='post_message_postdialog' onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default PostDialogComponent



