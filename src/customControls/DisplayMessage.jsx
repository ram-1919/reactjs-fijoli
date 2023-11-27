

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const DisplayMessage = (props) =>{

    const handleclosedialog = () =>{
        props.handleclosedialog();
    }

  return (
    <div>
        <Dialog open={props.isopenDialog}>
            <DialogTitle>{props.Heading}</DialogTitle>
            <DialogContent>
                <table style={{width: "350px"}} >
                    <tr>
                        <td>
                            <input value={props.msgStatus} type="label" style={{border:"none", width: "100%"}} />
                        </td>
                    </tr>
                </table>
            </DialogContent>
            <DialogActions>
                <CloseOutlinedIcon autoFocus onClick={handleclosedialog}/>
            </DialogActions>
        </Dialog>
    </div>
  )
}


export default DisplayMessage
