

import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, Skeleton } from '@mui/material';
import React from 'react'
import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UploadIcon from '@mui/icons-material/Upload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "./SelectedImageDescription.css";
import AboutMyselfComponent from '../childComponents/AboutMyselfComponent';
import { useEffect } from 'react';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';


const SelectedImageDescription = ({opendialog, documentinfo, dlgTitle, emitdocumentInfo}) =>{

    const [certificationInfo,   setCertificationInfo] = useState({
            "image"         : null,
            "document_desc"   : ""
    });

    const [disableState, setdisableState]   = useState(false);
    const [filename,     setfilename]       = useState("");
    const [deleteforeverState, setdelforeverState] = useState(false);

    //hook which initializes the useState of certificate
    useEffect(()=> {
        if(null !== documentinfo){
            certificationInfo["document_desc"] = documentinfo.document_desc;
            //call api to set the image to useState
            setSelectedFile(documentinfo.image);
            setdisableState(!disableState);
        }
    },[documentinfo]);

    const handleCancelClick = () =>{
        emitdocumentInfo(documentinfo);
    }

    const handleOkClick = () => {
        emitdocumentInfo(certificationInfo);
    }

    const handleuploadfile = () => {
        document.getElementById("fileid").click();
    }

    const setSelectedFile = (selectedfile) =>{
        
        if(null == selectedfile){
            setfilename("");
            certificationInfo.image = null;
            certificationInfo.document_desc  = "";
        }else{
            certificationInfo.image  = selectedfile;
            setfilename(selectedfile.name);
        }

        setCertificationInfo({...certificationInfo});
    }

    const handlefileChange = (evt) => {
        setSelectedFile(evt.target.files[0]);
        evt.target.value = null;
        setdisableState(!disableState);
    }

    const handleRemoveCertificate = () => {
        setSelectedFile(null);
        setdisableState(!disableState);
    }

    const handletxtChanged = (evt) => {
        certificationInfo[evt.target.name] = evt.target.value;
        setCertificationInfo({...certificationInfo});
    }


    const handledeleteForever = (evt) =>{
        setdelforeverState(true);
    }

    const handleConfirmationState = (confirmationState) =>{
        if(confirmationState){
            documentinfo = null;
            handleCancelClick();
        }
        setdelforeverState(!deleteforeverState);
    }

  return (
    <div>
        <Dialog open={opendialog} PaperProps={{ style: {
                    minHeight: '32%', minWidth:"40%", borderRadius: "10px"
                }}}>
            <DialogTitle textAlign="center">{dlgTitle}</DialogTitle>
            <DialogContent>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{border: "1px solid black" , width:"28%", borderRadius: "10px"}}>
                        {
                            (null === certificationInfo.image)?
                            <Skeleton variant="circular" textAlign="center"
                                    animation="wave" width={100} height={100} />
                            :
                            <div className='select_description_pdf_container'>
                                <PictureAsPdfIcon sx={{fontSize: "50px"}} />
                            </div>
                        }
                        <br/>
                        <div  className='description_icons_div'>
                                    <IconButton disabled = {disableState}>
                                        <UploadIcon className='select_pic_icon_sff' onClick={handleuploadfile}  />
                                    </IconButton>
                                    <IconButton disabled = {!disableState}>
                                        <DeleteForeverIcon className='select_pic_icon_sff' 
                                                    onClick = {handledeleteForever}/>
                                    </IconButton>
                                </div>

                    </div>
                    <div style={{border: "1px solid black" , width:"72%", borderRadius: "10px"}}>
                        <AboutMyselfComponent height = "100px"
                                    document_desc = {certificationInfo.document_desc}
                                    handletxtChanged = {handletxtChanged}/>
                    </div>
                </div>
                
                <div className='select_description_okcancel_div'   >

                    <Button variant='outlined'
                            className='description_selection_cofirmation_btns'
                        startIcon={<CancelIcon style={{fontSize: "20px"}}/>} 
                        onClick={handleCancelClick}>Cancel</Button>&nbsp;&nbsp;&nbsp;

                    <Button variant='outlined'  disabled = {!disableState} 
                            className='description_selection_cofirmation_btns'
                            startIcon={<HowToRegIcon style={{fontSize: "20px"}}/>} 
                            onClick={handleOkClick}>OK</Button>

                </div>

            </DialogContent>
        </Dialog>
        {
            deleteforeverState && 
            <ConfirmationDialog isopenDialog={deleteforeverState} 
                confirmMsg="Are you sure, you want to delete forever?"
                handleConfirmationState={handleConfirmationState}
                menuOptions = {["Cancel","OK"]}
            />
        }
        <input type="file" style={{display: "none"}} 
                    onChange={(evt)=> handlefileChange(evt)} id="fileid"/>
    </div>
  )
}

export default SelectedImageDescription