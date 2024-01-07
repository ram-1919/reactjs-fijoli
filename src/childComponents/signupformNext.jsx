import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import getregisteredInfo from "../actions/getProfileData";
import storeregistrantInfo from "../actions/updateSignupFormData";
import {Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import "./SignupformNext.css";

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const SignUpFormNext = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const lstofforms    =   ["form1", "form2"];

    const [createEyeValue, setCreateEyeValue] = useState(false);
    const [confirmEyeValue, setConfirmEyeValue] = useState(false);

    const [lstoftrainers, setlstoftrainers] = useState([]) ;
    const [registrantInfo, setregistrantInfo] = useState({"createpwd":"",   "confirmpwd":"",
        "location":"", "dob":"", "user_category":"","user_name":"","whatsapp_user_name":""});

    const regConfigInfo = useSelector((state)=>state.storeComponent.configData);

    useEffect(()=>{
        if(lstoftrainers.length === 0){
            console.log("dispatch useEffect");
            dispatch(getregisteredInfo(params.get("whatsapp_number")));
        }
    },[lstoftrainers]);

    useEffect(()=>{

        //return if object is not initialized
        if(0 === Object.keys(regConfigInfo).length){
            return;
        }

        //redirect error page if the user is not valid
        if(regConfigInfo.status === 400){
            navigate("/error");
            return;
        }

        //set user name and wusername to the existing level
        setregistrantInfo({...registrantInfo,"user_name": regConfigInfo.profileData.user_name, "whatsapp_user_name": regConfigInfo.profileData.whatsapp_user_name});
        setlstoftrainers(regConfigInfo.user_category);

    },[regConfigInfo]);

    const handleChangeName = (evt, type) =>{
        setregistrantInfo({...registrantInfo, [type]: evt.target.value});
    }

    const handlePasswordVisibility = () => {
        setCreateEyeValue(!createEyeValue);
    }

    const handleConfirmPasswordVisibility = () => {
        setConfirmEyeValue(!confirmEyeValue);
    }

    const handleNextEvent = (evt) =>{
        if(registrantInfo.createpwd != registrantInfo.confirmpwd){
            navigate("/error");
            return;
        }

        dispatch(storeregistrantInfo("store_registrantInfo", registrantInfo));
        dispatch({type:"reset_status"});
        navigate("/signupform3");
    }

    const handleSelect = (evt) =>{
        setregistrantInfo({...registrantInfo, "user_category": evt.target.value });
    }

    return(
        <div className="signupformNext-container">
            <div className="image-main-Next"/>
            <div className="image-crop-next">
                <h3 className="text-align">Welcome ({registrantInfo.user_name})</h3>
                <p className="text-align-para">Its a pleasure to have you onboard. Please fill in all</p>
                <p className="text-align-para">the fields to complete your profile</p>

                <div className="text-align-items">
                <TextField placeholder="your username in whatsapp number" 
                    fullWidth
                    sx={{
                        '& fieldset': { borderRadius: 33 },
                        // "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                    }}
                    InputProps={{ sx: { height: 30 } }}
                    value={registrantInfo.whatsapp_user_name}
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "whatsappnumber")}/>
                </div>

                <div className="text-align-items">
                <TextField type={createEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Create a Password" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "createpwd")}
                    sx={{
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
                </div>

                <div className="text-align-items">
                    
                    <TextField type={confirmEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Confirm Password" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "confirmpwd")}
                    sx={{
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
                </div>

                <div className="text-align-items">
                <TextField type="text" 
                    fullWidth
                    placeholder="location" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "location")}
                    sx={{
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LocationOnIcon/>
                            </IconButton>
                        </InputAdornment>,
                    }}/>

                </div>

                <div className="text-align-items">
                <TextField type="date" 
                    fullWidth
                    placeholder="Date Of Birth" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "dob")}
                    sx={{
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
                </div>

                <div className="text-align-items">
                    <Select displayEmpty value={registrantInfo.user_category} 
                        onChange={handleSelect} 
                        style={{height: "30px", borderRadius: "15px", width: "100%", alignItems: "center", justifyContent: "center"}}>
                        <MenuItem value="" disabled>Who am I</MenuItem>
                        {
                            lstoftrainers.map((item, idx)=>{
                                return <MenuItem value={idx+1}>{item}</MenuItem>
                            })
                        }
                    </Select>
                </div>

                <div className="text-align-items">
                    <button  onClick={handleNextEvent} className="button_oval_style_submit-signform2">Next</button>
                </div>

                <div className="text-align-items">
                {lstofforms.map((_,idx)=>{
                            return <button key={idx} onClick={null} className={0 === idx? "indicator" : "indicator indicator-inactive"}/>
                })}                            
                </div>
            </div>
        </div> 
    );
}

export default SignUpFormNext;