

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useRef, useState } from 'react'

import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';
import AvatarEditor from "react-avatar-editor";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import "./ProfilepicCropComponent.css";

const ProfilepicCropComponent = ({openCropDlg,
    handlecropState, profilepicFile}) =>{

    //set default values to the member variables
    const cropRef                       = useRef(null);
    const [slideValue, setslideValue]   = useState(10);
      
    //sets cropped image
    const handleSave = async () => {

        if (cropRef) {
            //convert the cropped image into file object
            const result      = await fetch(cropRef.current.getImage().toDataURL());
            const blob        = await result.blob();

            //initialize file object using cropped blob object
            let fileObject    = new File([blob], "profilepic.jpg");
            handlecropState(fileObject);
        }
    };
    
    //zoom in selected image
    const handleZoomInClick = () => {
        setslideValue((prevValue) => prevValue + 1);
    }

    //zoom out selected image
    const handleZoomOutClick = () => {
        setslideValue((prevValue) => prevValue - 1);
    } 

    //sets default profile pic changes
    const handleOkClick = (evt) =>{
        handlecropState(profilepicFile);
    }

  return (
    <div>
        <Dialog open = {openCropDlg} PaperProps={{ style: { minHeight: '50%' }}}>
            <DialogTitle textAlign="center"> Crop profile pic</DialogTitle>
                <DialogContent>
                    <table className='crop_table'>
                        <tr className='crop_row'>
                            <td>
                            <AvatarEditor
                                ref = {cropRef}
                                image={profilepicFile}
                                style={{ width: "100%", height: "100%" }}
                                border={50}
                                borderRadius={150}
                                color={[0, 0, 0, 0.72]}
                                scale={slideValue / 10}
                                rotate={0}
                                />                           
                            </td>
                        </tr>                      
                        <tr>
                            <td className='crop_pic_icons_row'>
                                <>
                                    <ZoomInIcon onClick={handleZoomInClick}/>&nbsp;&nbsp;&nbsp;
                                    <ZoomOutIcon onClick={handleZoomOutClick}/>
                                </>
                            </td>
                        </tr>
                </table>
                <div className='crop_div_confirmation_buttons'  >
                    <Button variant='outlined' 
                        className='pic_crop_cofirmation_btns'
                        startIcon={<CancelIcon style={{fontSize: "20px"}}/>} onClick={handleOkClick}>Cancel</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant='outlined' 
                        className='pic_crop_cofirmation_btns'
                        startIcon={<HowToRegIcon style={{fontSize: "20px"}}/>} onClick={handleSave}>OK</Button>

                </div>
                </DialogContent>
        </Dialog>
    </div>
  )
}

export default ProfilepicCropComponent