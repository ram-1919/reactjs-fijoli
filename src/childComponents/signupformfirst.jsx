import "./Signupformfirst.css";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import registerInfoAction     from "../actions/registerInfo"
import {Box, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const SignUpFormFirst = () =>{

    //navigate and dispatch objects
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    //create state variables to store the entered values
    const [regInfo, setregInfo]   = useState({
        "user_name"         : "", 
        "user_email"        : "", 
        "whatsapp_number"   : "", 
        "gender"            : "",
        "is_active"         : 0
    })

    //fetch the response of initial register info
    const registrationState          = useSelector((state)=>state.storeComponent.registrationState);

    //if initial response is registered successfully
    //redirect to signupsuccess else to error page
    useEffect(()=>{

        if(registrationState){
            if(registrationState.status === 200){
                navigate("/signupsuccess");
            }else if(registrationState.status === 400){
                navigate("/error");
            }
        }

    },[registrationState]);

    ///<summary>
    // handle change to update signup form data
    ///</summary>
    const handleChange = (evt, formDataType) => {
        //store the registered data into state variable
        setregInfo({...regInfo, [formDataType]: evt.target.value});
    }

    ///<summary>
    // saves the registered data in server
    ///</summary>
    const handleClickEvent = (evt) => {
        //invoke api to register the new registrant data
        dispatch(registerInfoAction(regInfo));
    }

    ///<summary>
    // handle gender update 
    ///</summary>
    const handlegenderChange = (gendertype) =>{
        setregInfo({...regInfo, ["gender"]: gendertype});
    }

    ///<summary>
    // handle agree terms n condition state
    ///</summary>
    const handleagreeChange = (evt) =>{
        let is_active   = (evt.target.cheked)?1:0;
        setregInfo({...regInfo, ["is_active"]: is_active});
    }

    return(
        <div className="signupformfirst-container">
            <div className="image-main-firstform"/>
                <div className="signupformfirst-container-box"> 
                    {/* name text box */}
                    <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px' }}>
                        <TextField placeholder="Name" 
                            fullWidth
                            variant="outlined" 
                            onChange={(evt)=> handleChange(evt, "user_name")}
                            sx=
                            {{ 
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 } 
                            }}
                            InputProps=
                            {{ 
                                sx: { height: 40 }, 
                                startAdornment:
                                    <InputAdornment position="start">
                                        <IconButton> <PersonIcon/></IconButton>
                                    </InputAdornment>
                            }}/>
                    </Box>                      

                    {/* emailid text box */}
                    <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px'}}>
                        <TextField placeholder="EmailID" 
                            fullWidth
                            variant="outlined" 
                            onChange={(evt)=> handleChange(evt, "user_email")}
                            sx=
                            {{ 
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 } 
                            }}
                            InputProps=
                            {{ 
                                sx: {height: 40}, 
                                startAdornment:
                                    <InputAdornment position="start">
                                        <IconButton> <EmailIcon/></IconButton>
                                    </InputAdornment>
                            }}/>
                    </Box>
                {/* whatsapp number text box */}
                <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px'}}>
                    <TextField placeholder="Whatsapp Number" 
                        fullWidth
                        variant="outlined" 
                        onChange={(evt)=> handleChange(evt, "whatsapp_number")}
                        sx=
                        {{
                            marginTop: "-6px",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            '& fieldset': { borderRadius: 33 }
                        }}
                        InputProps=
                        {{ 
                            sx: {height: 40}, 
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton> <WhatsAppIcon/></IconButton>
                                </InputAdornment>
                        }}/>
                </Box>
                <>
                    <table className="signupform1_gender_table">
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" onChange={()=> handlegenderChange("Male")} />Mr
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input type="checkbox" onChange={()=> handlegenderChange("Female")} />Ms
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input type="checkbox" onChange={()=> handlegenderChange("Other")} />Other
                                </label>
                            </td>
                        </tr>
                    </table>
                </>
                <>
                    <table className="signform1_agree_table">
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" onChange={handleagreeChange} />I agree with Terms and Conditions
                                </label>
                            </td>
                        </tr>
                    </table>
                </>

                <div className="margin-field-Item">
                    <button onClick={handleClickEvent}
                            className="button_oval_style_signupfirst">submit</button>
                </div>
                {/* <div className="margin-field-Item">
                    <button onClick={handleclick}
                            className="button_oval_style_signupfirst">open</button>
                </div> */}
            </div>
        </div>
    )
}

export default SignUpFormFirst