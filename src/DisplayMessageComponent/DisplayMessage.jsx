


import { Backdrop, IconButton, Slide, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}
  
const DisplayMessage = ({displayState, handleclose}) =>{

    const [transition, setTransition]       = useState(undefined);
    const [sbstate, setsbState] = useState({
        vertical: 'top',
        horizontal: 'center',
      });
    const { vertical, horizontal } = sbstate;
    
    useEffect(()=>{
        if(displayState){
            setTransition(()=>TransitionDown);
        }
    },[displayState]);

  return (
    <div>
        { 
        (0 < Object.keys(displayState).length) &&
        <>
            <Snackbar
                    open={displayState.open}
                    TransitionComponent={transition}
                    message={displayState.msg}
                    action={
                      <React.Fragment>
                        <IconButton
                          size="small"
                          aria-label="close"
                          color="inherit"
                          onClick={handleclose}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </React.Fragment>
                    }
                    autoHideDuration={6000}
                    anchorOrigin = {{vertical, horizontal}}
                    key={transition ? transition.name : ''}
                />
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={displayState.open}>
                </Backdrop>
            </>
        }
    </div>
  )
}

export default DisplayMessage