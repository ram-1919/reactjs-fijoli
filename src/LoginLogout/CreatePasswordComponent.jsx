

import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import passwordAction from '../actions/passwordAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./CreatePasswordComponent.css";
import DisplayMessage from '../customControls/DisplayMessage';

const CreatePasswordComponent = () =>{

    const navigate                            = useNavigate();
    const dispatch                            = useDispatch();
    const [params]                            = useSearchParams();
    const [createEyeValue, setCreateEyeValue] = useState(false);
    const [confirmEyeValue, setConfirmEyeValue] = useState(false);
    const [showerrMessage,  setshowerrMessage]  = useState(false);
    const [errmessage,      seterrMessage]      = useState(false);

    const [passwordInfo, setpasswordInfo] = useState({
                    "createpwd":"",     
                    "confirmpwd":"",
                    "whatsapp_number":""
    });

    const createpwdState    = useSelector((state)=> state.storeComponent.createpwdState);

    useEffect(()=>{

        if((undefined != createpwdState) && (200 === createpwdState.status)){
            dispatch({"type":"reset_status"});
            setTimeout(() => {
                navigate("/loginpage")
            }, 3000);
            navigate("/signupsuccess");
        }else if((undefined != createpwdState) && (400 === createpwdState.status)){
            dispatch({"type":"reset_status"});
            navigate("/error");
        }

    },[createpwdState]);

    const handleChangeName = (evt, pwdtype) => {
        setpasswordInfo({...passwordInfo, [pwdtype]:evt.target.value});
    }

    const handlePasswordVisibility = () => {
        setCreateEyeValue(!createEyeValue);
    }

    const handleConfirmPasswordVisibility = () =>{
        setConfirmEyeValue(!confirmEyeValue);
    }

    const handleSubmitClick = (evt) => {
        if(passwordInfo["createpwd"] !== passwordInfo["confirmpwd"]){
            seterrMessage("Given passwords are not matching...");
            setshowerrMessage(true);
        }else{
            passwordInfo["whatsapp_number"] = params.get("whatsapp_number");
            dispatch(passwordAction(passwordInfo));
        }
    }

    const handleclosedialog = () =>{
        seterrMessage("");
        setshowerrMessage(false);
    }

  return (
    <div className='createpassword_main_container'>
        <div className='createpassword_image_container'/>
        <table className='createpwd_table_container'>
            <tr>
                <td>

                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                    }}>

                <TextField type={createEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Create a Password" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "createpwd")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LockIcon/>
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={handlePasswordVisibility}>
                                {
                                    (createEyeValue)?<VisibilityIcon/>:<VisibilityOffIcon/>
                                }
                            </IconButton>
                        </InputAdornment>
                    }}/>
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
                    }}>


                <TextField type={confirmEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Confirm Password" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "confirmpwd")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LockIcon/>
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={handleConfirmPasswordVisibility}>
                                {
                                    (confirmEyeValue)?<VisibilityIcon/>:<VisibilityOffIcon/>
                                }
                            </IconButton>
                        </InputAdornment>
                    }}/>
                    </Box>
                </td>
            </tr>
        </table>
        <div>
            <button onClick={handleSubmitClick} 
                    className="button_oval_style_submit_createpwd">Submit</button>
        </div>
        {
            showerrMessage &&
            <DisplayMessage isopenDialog={showerrMessage} 
                Heading = "Error:"
                msgStatus ={errmessage} handleclosedialog = {handleclosedialog} />
        }
    </div>
  )
}

export default CreatePasswordComponent