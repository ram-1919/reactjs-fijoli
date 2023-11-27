

import "./ProfileComponentFourth.css";
import {Box, checkboxClasses, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFourth = (props) =>{

    const [description, setdescription]     = useState("");
    const [selectedLang, setselectedLang]   = useState([]);

    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
    }

    const handleCompleteClick = () => {

        const user_info = {
            "user_description"  : description,
            "languages_known"   : selectedLang.join(",")
        }

        props.handleCompleteClick(user_info, {});
    }

    const handleChange = (lstoflanguages) => {
        setselectedLang(lstoflanguages);
    };    

    return(
        <div className="signupformFinal-container-pcfourth"> 
            <table className="table_container-pcfourth">
                <tr>
                    <td>
                        <AboutMyselfComponent height={'270px'} handletxtChanged={handletxtChanged}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomLanguageSelection handleChange={handleChange} />
                    </td>
                </tr>
            </table>       
            <>
                <button onClick={handleCompleteClick} 
                        className="button_oval_style_submit-pcfourth">Complete Profile</button>
            </>
        </div>
    )

}

export default ProfileComponentFourth;