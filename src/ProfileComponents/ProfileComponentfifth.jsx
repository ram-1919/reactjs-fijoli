

import "./ProfileComponentfifth.css";
import {Box, checkboxClasses, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import uploadicon from "./../asset/uploadIcon.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { VerticalAlignTop } from "@material-ui/icons";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFifth = (props) =>{
 
    const [visibility,  	setvisibility]      = useState(true);
    const [selectedIndex,   setSelectedIndex]   = useState(0);
    const [selectedLang,    setselectedLang]    = useState([]);
    const [description,     setdescription]     = useState("");
    const [location,        setlocation]        = useState("");
    const [uploadfiles,     setuploadfiles]     = useState(
        {
            "certificate": [undefined, undefined, undefined]
        });

    const lstofsupportedCurrency            = useSelector((state)=> state.storeComponent.configData.currency);
    
    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    const handleuploadfile = (file, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    const handlelocationChanged = (event) => {
        setlocation(event.target.value);
    }

    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex)
    }

    const handleChange = (lstoflanguages) => {
        setselectedLang(lstoflanguages)
    };    

    const handleCompleteClick = (evt) =>{

        const userInfo = {
            "languages_known"   : selectedLang.join(","), 
            "user_description"  : description,
            "location_address"  : location
        };

        props.handleCompleteClick(userInfo, uploadfiles);
    }


    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
    }

    const handleOnSelect = (event) =>{
        setvisibility(!event.target.checked);
    }

    return(
            <div className="signupformFinal_container_pc5">
                <table className="table_container_pc5">
                    <tr>
                        <td>
                            <AboutMyselfComponent height={'90px'} handletxtChanged={handletxtChanged} />
                            {/* <Box
                                fullWidth
                                sx={{ boxShadow: 4, height: '90px',
                                    p: 1, m: 1, borderRadius: '15px',
                                }}>
                                <TextField type="text" 
                                    style={{textAlign: 'left'}}
                                    fullWidth   
                                    placeholder="                        About Myself Not more than 500 characters" 
                                    variant="outlined" multiline
                                    sx={{
                                        // '& fieldset': { borderRadius: 1 },
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                                        }}
                                    onChange = {handletxtChanged}
                                    InputProps={{ sx: { height: 110 }}}       
                                    rows={4}/>
                            </Box> */}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Box
                                sx={{
                                    boxShadow: 2, width: '350px',
                                    height: '57px', p: 1, m: 1,
                                    borderRadius: '15px', textAlign: 'center', margin: '0 auto'
                                }}>
                                My Certification
                                <table className="table_container-certification_pc5">
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
                                        <input className="currently_training_pc5" type="label" value="Currently Not Training"/>
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
                            <table className={visibility?"table_container_pricing_pc5":"table_container_pricing_pc5_hidden"} >
                                <tr>
                                    <td className="checkbox_col_pc5"/>
                                    <td style={{textAlign:"center"}}>
                                        <input type="label" value="Mode of Training" className="payment_heading_pc5"/>
                                    </td>
                                    <td style={{textAlign:"center"}}>
                                        <input type="label" value="Fees / Session"  className="payment_heading_pc5"/>
                                    </td>
                                    <td style={{textAlign:"center"}}>
                                        <input type="label" value="Fees / Month"  className="payment_heading_pc5"/>
                                    </td>
                                </tr>

                                    <tr >
                                        <td className="checkbox_col_pc5">
                                            <input type="checkbox" className="display_left_checkbox_pc5" />
                                        </td>
                                        <td>
                                            <input type="label" disabled value="Online" 
                                                className="table_pricing_first_col_pc5"/>
                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt1" type="text" 
                                                placeholder="Numbers only"
                                                className="table_pricing_second_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                className="currenct_select_pc5">
                                                    {lstofsupportedCurrency.map((item, indx)=>{
                                                        return <option value={indx}>{item}</option>
                                                    })}
                                            </select>
                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt2" type="text" 
                                                    placeholder="Numbers only"
                                                    className="table_pricing_third_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                    className="currenct_select_pc5">
                                                {lstofsupportedCurrency.map((item, indx)=>{
                                                    return <option value={indx}>{item}</option>
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className="checkbox_col_pc5">
                                        <td>
                                            <input type="checkbox" className="display_left_checkbox_pc5" />
                                        </td>
                                        <td className="payment_heading_pc5_cell">
                                            <input type="label" disabled value="At client's place" 
                                                    className="table_pricing_first_col_pc5"/>
                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt1" type="text"
                                                    placeholder="Numbers only"
                                                    className="table_pricing_second_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                    className="currenct_select_pc5">
                                                    {lstofsupportedCurrency.map((item, indx)=>{
                                                        return <option value={indx}>{item}</option>
                                                    })}
                                            </select>
                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt2" type="text"
                                                    placeholder="Numbers only"
                                                    className="table_pricing_third_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                    className="currenct_select_pc5">
                                                    {lstofsupportedCurrency.map((item, indx)=>{
                                                        return <option value={indx}>{item}</option>
                                                    })}
                                            </select>

                                        </td>
                                    </tr>

                                    <tr className="checkbox_col_pc5">
                                        <td>
                                            <input type="checkbox" className="display_left_checkbox_pc5" />
                                        </td>
                                        <td className="payment_heading_pc5_cell">
                                            <input type="label" disabled value="At my clinic" 
                                                className="table_pricing_first_col_pc5"/>

                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt1" type="text"
                                                    placeholder="Numbers only"
                                                    className="table_pricing_second_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                className="currenct_select_pc5">
                                                    {lstofsupportedCurrency.map((item, indx)=>{
                                                        return <option value={indx}>{item}</option>
                                                    })}
                                            </select>
                                        </td>

                                        <td className="payment_heading_pc5_cell">
                                            <input name="myt2" type="text"
                                                    placeholder="Numbers only"
                                                    className="table_pricing_third_col_pc5"/>

                                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                                className="currenct_select_pc5">
                                                    {lstofsupportedCurrency.map((item, indx)=>{
                                                        return <option value={indx}>{item}</option>
                                                    })}
                                            </select>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td/>
                                        <td colSpan={3}>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <Box
                                                            fullWidth
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
                                                                width: '320px'
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
                                        <td></td>
                                        <td colSpan={2}>
                                            <CustomLanguageSelection handleChange={handleChange}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
                        {/* } */}

                        </td>
                    </tr>

                </table>

                <>
                    <button onClick={handleCompleteClick} 
                            className="button_oval_style_submit_pc5">Complete Profile</button>
                </>

            </div>
    )

}

export default ProfileComponentFifth;