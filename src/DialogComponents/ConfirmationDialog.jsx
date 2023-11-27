

import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
const ConfirmationDialog = (props) =>{

    const handleclosedialog = (confirmationState) =>{
        props.handleclosedialog(confirmationState);
    }

  return (
    <div>
        <Dialog open={props.confirmationState.showConfirmationDlg}>
            <DialogTitle>{props.confirmationState.confirmationHeading}</DialogTitle>
            <DialogContent>
                <table style={{width: "350px"}} >
                    <tr>
                        <td>
                            <input value={props.confirmationState.confirmationMessage} type="label" style={{border:"none", width: "100%"}} />
                        </td>
                    </tr>
                </table>
            </DialogContent>
            <DialogActions>
                <Button startIcon = {<DoneOutlinedIcon  />}   
                        onClick={(evt) => handleclosedialog(true)} style={{width: "5px"}}/>
                <Button startIcon = {<CloseOutlinedIcon />} 
                        onClick={(evt) => handleclosedialog(false)}/>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmationDialog