

import React, { useRef, useState } from 'react'
import { Button } from "@mui/material";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileDownloadOffOutlinedIcon from '@mui/icons-material/FileDownloadOffOutlined';
import SelectedImageDescription from '../customControls/SelectedImageDescription';

const FileUploadComponent = (props) =>{
    //member variables
    const [isuploaded, setisuploaded]   = useState(true);
    const [id, setid] = useState("fileid" + props.keyItem);
    const [opendialog, setopendialog]   = useState(false);
    const [documentinfo, setdocumentinfo] = useState(null);

    // ///<summary>
    // // launches confirm dialog either to delete a file or not
    // ///</summary>
    // const handledeleteevent = (tmp) =>{
    //     setopendialog(false);
    //     setisuploaded(!isuploaded);
    //     props.removefile(props.fileindex, props.filetype);
    //     setfilename("");
    // }

    // const handleclosedialog = (evt) =>{
    //     setopendialog(false);
    // }

    ///<summary>
    // uploads the file and holds the file object
    ///</summary>
    const handleuploadbtnClick = () =>{
        // //based on condition either it uploads or removes file
        // if(isuploaded){
        //     //invokes the upload control to launch
        //     document.getElementById(id).click();
        // }else{
        //     //set the state of the upload
        //     setopendialog(true);
        // }
        setopendialog(true);
    }

    ///<summary>
    // holds the uploaded file object
    ///</summary>
    const handlefilechange = (evt) => {
        //passes the selected file to parent control
        props.uploadfile(evt.target.files[0], props.filetype, props.fileindex);
        //set the state of uploaded component
        setisuploaded(!isuploaded);
        //clear the file object 
        evt.target.value = null;
    }

    const emitdocumentInfo = (info) =>{
        let isemptydoc  = isemptyInfo(info);
        if(isemptydoc){
            setdocumentinfo(null);
            props.removefile(props.fileindex, props.filetype);
            setisuploaded(true);
        }else{
            setdocumentinfo(info);
            props.uploadfile(info, props.filetype, props.fileindex);
            setisuploaded(false);
        }
        setopendialog(!opendialog);
    }

    const isemptyInfo = (info) =>{
        return ((null === info) || ((null === info.image) && ("" === info.document_desc)));
    }

  return (
    <div>
        <Button variant="outlined" 
            startIcon={
                (isuploaded)? <UploadFileOutlinedIcon /> :  <FileDownloadOffOutlinedIcon sx={{color: "red"}} />
            } 
            onClick={(evt)=>handleuploadbtnClick(evt)}/>
        <input id={id} type="file"
            style={{display: "none"}} onChange={handlefilechange}/>
        {
            opendialog && 
            <SelectedImageDescription opendialog={opendialog}
                documentinfo = {documentinfo}
                dlgTitle={props.dlgTitle} emitdocumentInfo={emitdocumentInfo} />
        }
    </div>
  )
}

export default FileUploadComponent