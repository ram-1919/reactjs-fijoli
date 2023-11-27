

import "./ProfileComponentSixth.css";
import {Box, checkboxClasses, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import uploadicon from "./../asset/uploadIcon.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentSixth = (props) =>{

    const [visibility, setvisibility]       = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedLang, setselectedLang]   = useState([]);
    const [uploadfiles, setuploadfiles]     = useState({
        "certificate": [undefined, undefined, undefined]
    });
    const [location,    setlocation]        = useState("");
    const [description, setdescription]     = useState("");

    const lstofsupportedCurrency            = useSelector((state)=> state.storeComponent.configData.currency);

    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
    }

    const handlelocationChanged = (evt) =>{
        setlocation(evt.target.value);
    }
    const handleChange = (lstoflanguages) => {
        // const {
        //   target: { value },
        // } = event;
        // setselectedLang(
        //   // On autofill we get a stringified value.
        //   typeof value === 'string' ? value.split(',') : value,
        // );
        setselectedLang(lstoflanguages);
    };    

    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex)
    }

    const handleCompleteClick = (evt) =>{
        
        const user_info = {
            "user_description"  : description,
            "languages_known"   : selectedLang.join(","),
            "location_address"  : location
        }

        props.handleCompleteClick(user_info, uploadfiles);
    }

    const handleOnSelect = (event) =>{
        setvisibility(!event.target.checked);
    }

    const handleuploadfile = (file, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    return(
            <div className="signupformFinal-container-pc6">
                <table className="table_container-pc6">
                    <tr>
                        <td>
                            <AboutMyselfComponent height={'90px'} handletxtChanged={handletxtChanged}/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Box
                                sx={{
                                    boxShadow: 4,
                                    width: '350px',
                                    height: '57px',
                                    p: 1,
                                    m: 1,
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    margin: '0 auto'
                                }}>
                                My Certification
                                <table className="table_container-certification_pc6">
                                    <tr>
                                        {
                                            certificatedata.map((item,index)=>{
                                                return(
                                                    <td>
                                                        <FileUploadComponent key={item.id} filetype={item.text} fileindex ={index}
                                                            uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                                    </td>                                                
                                                )
                                            })
                                        }
                                    </tr>
                                </table>
                            </Box>

                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table>
                                    <tr>
                                        <td>
                                            <input className="currently_training_pc6" type="label" value="Currently Not Training"/>
                                        </td>
                                        <td>
                                            <input type="checkbox" onChange={handleOnSelect}/>
                                        </td>
                                    </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table className={visibility?"table_container-pricing-pc6":"table_container_pricing_pc6_hidden"} >
                                <tr>
                                    <td className="checkbox_col_pc6"/>
                                    <td className="payment_heading_pc6_cell">
                                        <input type="label" value="Mode of Training" 
                                                className="payment_heading_pc6"/>
                                    </td>
                                    <td className="payment_heading_pc6_cell">
                                        <input type="label" value="Fees / Session" 
                                                className="payment_heading_pc6"/>
                                    </td>
                                    <td className="payment_heading_pc6_cell">
                                        <input type="label" value="Fees / Month"  
                                                className="payment_heading_pc6"/>
                                    </td>
                                </tr>

                                <tr className="checkbox_col_pc6">
                                    <td >
                                        <input type="checkbox" className="display_left_checkbox_pc6" />
                                    </td>
                                    <td className="payment_heading_pc6_cell">
                                    <input type="label" disabled value="At client's place" 
                                        className="table_pricing_first_col_pc6"/>
                                    </td>

                                    <td className="payment_heading_pc6_cell">
                                        <input name="myt1" type="text"
                                            placeholder="Numbers only"
                                            className="table_pricing_second_col_pc6"/>

                                        <select value={selectedIndex} onChange={handleCurrencyChange}
                                            className="currenct_select_pc6">
                                                {lstofsupportedCurrency.map((item, indx)=>{
                                                    return <option value={indx}>{item}</option>
                                                })}
                                        </select>
                                    </td>

                                    <td className="payment_heading_pc6_cell">
                                        <input name="myt2" type="text"
                                            placeholder="Numbers only"
                                            className="table_pricing_third_col_pc6"/>

                                        <select value={selectedIndex} onChange={handleCurrencyChange}
                                            className="currenct_select_pc6">
                                                {lstofsupportedCurrency.map((item, indx)=>{
                                                    return <option value={indx}>{item}</option>
                                                })}
                                        </select>
                                    </td>
                                </tr>

                                <tr className="checkbox_col_pc6">
                                    <td>
                                        <input type="checkbox" className="display_left_checkbox_pc6" />
                                    </td>
                                    <td className="payment_heading_pc6_cell">
                                    <input type="label" disabled value="At my clinic" 
                                        className="table_pricing_first_col_pc6"/>

                                    </td>

                                    <td className="payment_heading_pc6_cell">
                                        <input name="myt1" type="text"
                                            placeholder="Numbers only"
                                            className="table_pricing_second_col_pc6"/>

                                        <select value={selectedIndex} onChange={handleCurrencyChange}
                                            className="currenct_select_pc6">
                                                {lstofsupportedCurrency.map((item, indx)=>{
                                                    return <option value={indx}>{item}</option>
                                                })}
                                        </select>
                                    </td>

                                    <td className="payment_heading_pc6_cell">
                                        <input name="myt2" type="text"
                                            placeholder="Numbers only"
                                            className="table_pricing_third_col_pc6"/>

                                        <select value={selectedIndex} onChange={handleCurrencyChange}
                                            className="currenct_select_pc6">
                                                {lstofsupportedCurrency.map((item, indx)=>{
                                                    return <option value={indx}>{item}</option>
                                                })}
                                        </select>

                                    </td>
                                </tr>

                                <tr>
                                    <td>

                                    </td>
                                    <td colSpan={3}>
                                        <table>
                                            <tr>
                                                <td>
                                                    <Box
                                                        sx={{
                                                            boxShadow: 2,
                                                            height: '12px',
                                                            p: 1,
                                                            m: 1,
                                                            borderRadius: '15px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                    }}>
                                                            My clinic Address
                                                    </Box>
                                                </td>
                                                <td>
                                                    <Box
                                                        sx={{
                                                            height: '30px',
                                                            p: 1,
                                                            m: 1,
                                                            borderRadius: '15px',
                                                            textAlign: 'center',
                                                            margin: "0 auto",
                                                        }}>

                                                            <TextField type="text" 
                                                                        placeholder = "location"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        sx={{
                                                                            
                                                                            '& fieldset': { borderRadius: 10 },
                                                                            }}
                                                                        onChange = {handlelocationChanged}
                                                                        InputProps={{ sx: { height: 30 },
                                                                        startAdornment:<InputAdornment position="start">
                                                                        <IconButton>
                                                                            <LocationOnIcon/>
                                                                        </IconButton>
                                                                    </InputAdornment>}}/>
                                                    </Box>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <CustomLanguageSelection handleChange={handleChange}/>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <>
                    <button onClick={handleCompleteClick} 
                            className="button_oval_style_submit-p6">Complete Profile</button>
                </>

            </div>
    
    )

}

export default ProfileComponentSixth;