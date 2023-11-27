

import React from 'react'
import Dialog from '@mui/material/Dialog';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

///<summary>
//component which is used to delete the uploaded file
//based on the confirmation
///</summary>
const ConfirmationDialog = ({isopenDialog, confirmMsg, handleConfirmationState, menuOptions}) => {

    //event handler confirmation state
    const handleconfirmation = (state) =>{
        handleConfirmationState(state);
    }

  return (
    <div>
        <Dialog open={isopenDialog}>
            <DialogTitle>Confirmation :</DialogTitle>
            <DialogContent>
                <table style={{minWidth: "420px", maxWidth: "auto"}} >
                    <tr style={{width: "auto"}}>
                        <td >
                            <input value={confirmMsg} readOnly = {true}
                                 type="label" style={{border:"none", textAlign:"center",  marginLeft:"3px", width: "100%"}}/>
                        </td>
                    </tr>
                </table>
            </DialogContent>
            <DialogActions>
                {
                    menuOptions.map((item, index)=> { 
                        if(("Cancel" === item) || ("No" === item)){
                            return  <Button startIcon={<CloseOutlinedIcon autoFocus />}
                                onClick={(e) => handleconfirmation(false)} >{item}</Button>
                        }else if(("OK" === item) || ("Yes"=== item) ){
                            return <Button startIcon={<CheckIcon />}
                                onClick={(e) => handleconfirmation(true)} >{item}</Button>
                        }

                    })
                }
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ConfirmationDialog