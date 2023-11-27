

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import forgetpwdAction from '../actions/forgetpwdAction';
import "./ForgotPasswordComponent.css";

import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import passwordAction from '../actions/passwordAction';

const ForgotPasswordComponent = () => {

    const dispatch      = useDispatch();
    const navigate      = useNavigate();
    const [forgetpwdData, setforgetpwdData] = useState(
        {
            "whatsapp_number"   : "", 
            "user_email"        : "",
            "dob"               : ""
        });

    const forgetpwdState = useSelector((state)=> state.storeComponent.forgetpwdState);

    useEffect(()=>{
        if((undefined != forgetpwdState) && (200 === forgetpwdState.status)){
            dispatch({"type": "reset_status"});
            navigate("/createpassword?whatsapp_number=" + forgetpwdData.whatsapp_number);
        }else if((undefined != forgetpwdState) && (400 === forgetpwdState.status)){
            dispatch({"type": "reset_status"});
            navigate("/error");      
        }
    },[forgetpwdState])

    const handleChange = (evt, datatype) =>{
        setforgetpwdData({...forgetpwdData, [datatype]:evt.target.value});
    }

    const handleSubmitClick = () =>{
        dispatch(forgetpwdAction(forgetpwdData));
    }

  return (
    <div className="forgetpassword_main_container">
        <div className='forgetpassword_image_container'/>
        <table className='forgetpwd_table_container'>
            <tr >
                <td >
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: "300px"
                    }}>
                
                        <TextField placeholder="EmailID" 
                            fullWidth
                            value={forgetpwdData.user_email}
                            sx={{
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 }
                            }}
                            InputProps={{  sx: {height: 40}, 
                                startAdornment:<InputAdornment position="start">
                                    <IconButton>
                                        <EmailIcon/>
                                    </IconButton>
                                </InputAdornment>
                                }}
                            variant="outlined" onChange={(evt)=> handleChange(evt, "user_email")}/>
                </Box>
                </td>
            </tr>
            <tr>
                <td>
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: '300px'
                    }}>

                    <TextField placeholder="Whatsapp Number"
                        value={forgetpwdData.whatsapp_number} 
                        fullWidth
                        sx={{
                            marginTop: "-6px",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            '& fieldset': { borderRadius: 33 }
                        }}
                        InputProps={{ sx: {height: 40}, 
                            startAdornment:<InputAdornment position="start">
                                <IconButton>
                                    <WhatsAppIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                        variant="outlined" onChange={(evt)=> handleChange(evt, "whatsapp_number")}/>
                </Box>

                </td>
            </tr>
            <tr>
                <td>
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: '300px'
                    }}>

                <TextField type="date" 
                    value={forgetpwdData.dob}
                    fullWidth
                    placeholder="Date Of Birth" 
                    variant="outlined" onChange={(evt)=> handleChange(evt, "dob")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <CalendarMonthIcon/>
                            </IconButton>
                        </InputAdornment>,
                    }}/>
                </Box>
                </td>
            </tr>
        </table>
        <div>
            <button onClick={handleSubmitClick} 
                    className="button_oval_style_submit_forgetpwd">Submit</button>
        </div>
    </div>
  )
}

export default ForgotPasswordComponent