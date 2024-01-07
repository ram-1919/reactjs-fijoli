import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionloginUser from "../actions/actionloginUser";
// import loginImage from "./../asset/image1.jpg";
// import "./../styles/OvalButton.css";
import { Link } from "react-router-dom";
import "./LoginComponent.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LockIcon from '@mui/icons-material/Lock';


import {IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import DisplayMessage from "../DisplayMessageComponent/DisplayMessage";
import clearErrorMessageAction from "../actions/clearErrorMessageAction";

//component which is used to login 
const LoginComponent = () => {

    //usestate, dispatch, navigate and selector variables
    const navigate                  =   useNavigate();
    const dispatch                  =   useDispatch();
    const [eyeValue, seteyeValue]   =   useState(false);
    const [loginData, setloginData] =   useState({"whatsapp_number":"9845098452", "encrypted_password":"m"});
    const [displaymsg, setdisplaymsg]       = useState({});

    const loginState                =   useSelector((state)=> state.storeComponent.loginState);

    const errormsgstate     = useSelector(state => state.storeComponent.errormsg);
    useEffect(()=>{
        if(errormsgstate){
          setdisplaymsg({"open": true, "msg": errormsgstate.errormsg});
        }
      },[errormsgstate]);
    
    ///<summary>
    // api handles password visibility state
    ///</summary>
    const handlePasswordVisibility = () =>{
        seteyeValue(!eyeValue);
    }
 

    useEffect(()=>{
        //reset and navigate once response 
        if((loginState) && (200 === loginState.status)){
            dispatch({type:"reset_status"})
            navigate("/homepage");
        }
    },[loginState]);

    ///<summary>
    /// api set login info  
    ///</summary>
    const handlechange = (evt, datatype) =>{
        setloginData({...loginData, [datatype]:evt.target.value});
    }

    ///<summary>
    /// api handles login click
    ///</summary>
    const handleLoginClickEvent = () =>{
        dispatch(actionloginUser(loginData));
    }

    const handlecloseDisplayMsg = () =>{
        setdisplaymsg({"open": false, "msg": ""});
        dispatch(clearErrorMessageAction());
    }

    return(
        <Stack direction="column">
          <div className="login-container">
            <div className="image-main"/>
                <div className="login-container-box"> 

                    {/* whatsapp number text field */}
                    <TextField 
                        fullWidth
                        value={loginData.whatsapp_number}
                        placeholder="whatsapp Number"
                        sx={{ '& fieldset': { borderRadius: 33 }}}
                        InputProps={{ sx: { height: 40 },
                            startAdornment:<InputAdornment position="start">
                                <IconButton>
                                    <WhatsAppIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                        variant="outlined" 
                        onChange={(evt)=> handlechange(evt, "whatsapp_number")}/>
            
                    {/* password control */}
                    <div className="credential-Item"> 
                        <TextField type={eyeValue? "text":"password"} 
                            fullWidth
                            value={loginData.encrypted_password}
                            placeholder="Password" 
                            variant="outlined" 
                            onChange={(evt)=> handlechange(evt, "encrypted_password")}
                            sx={{'& fieldset': { borderRadius: 33 }}}
                            InputProps={{
                                sx: { height: 40 },
                                startAdornment:<InputAdornment position="start">
                                    <IconButton>
                                        <LockIcon/>
                                    </IconButton>
                                </InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={handlePasswordVisibility}>
                                        {
                                            (eyeValue)?<VisibilityIcon/>:<VisibilityOffIcon/>
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }}/>
                    </div>
            <div>
                <button onClick={handleLoginClickEvent} 
                        className="button_oval_style_login">Login</button>
            </div>
            
            <span className="link_login">
                <Link to="/forgetpassword">Forget Password</Link>
            </span>
        </div>
        {
          <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
        }
        </div>
        </Stack>
    )
}



export default LoginComponent;