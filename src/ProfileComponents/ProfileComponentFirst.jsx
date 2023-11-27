import "./ProfileComponentFirst.css";
import * as React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFirst = (props) =>{

    //set default member variables
    //set visibility to display payment gateway controls 
    const [visibility, setvisibility]       = useState(true) ;
    //holds the languages known data
    const [selectedLang, setselectedLang]   = useState("");
    //holds files selected to upload
    const [uploadfiles, setuploadfiles]     = useState({"certificate": [undefined, undefined, undefined]});
    //holds the selected currency data
    const [selectedIndex, setSelectedIndex] = useState(0);
    //holds the description 
    const [description,  setdescripton]     = useState("")

    //holds list of supported currency types
    const lstofsupportedCurrency            = useSelector((state)=> state.storeComponent.configData.currency);

    //default data to generate no. of certificate controls
    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    //handle complete click event handler
    const handleCompleteClick = (evt) =>{
        //emit the user info to parent control 
        const pcinfo = {
            "languages_known": (0 === selectedLang.length)?"":selectedLang.join(","), 
            "user_description": description
        };
        //emit userinfo and selected images to parent control
        props.handleCompleteClick(pcinfo, uploadfiles);
    }

    ///<summary>
    // set description 
    const handletxtChanged = (evt) =>{
        //set description
        setdescripton(evt.target.value);
    }

    //sets visibility of payment gateway controls
    const handleOnSelect = (event) =>{
        setvisibility(!event.target.checked);
    }

    //sets selected languages 
    const handleChange = (selectedlanguages) => {
        setselectedLang(selectedlanguages);
    };    

    //sets selected currency 
    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex)
    }

    //holds the selected file based on category
    const handleuploadfile = (fileinfo, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = fileinfo;
        setuploadfiles(uploadfiles);
    }

    //deletes the file based on category
    //fileindex - index value in array location
    //filetype  - category type
    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    return(
        <div className="signupformFinal-container-pcf">
            <table className="table_container-pcf">
                {/*  */}
                <tr>
                    <td>
                        <AboutMyselfComponent  height={'90px'} 
                            document_desc={description} 
                            handletxtChanged={handletxtChanged} />
                    </td>
                </tr> 

                <tr>
                    <td>
                        <Box sx={{ boxShadow: 4, textAlign: 'center',
                                width: '350px', height: '60px',
                                p: 1, m: 1, borderRadius: '15px',
                                margin: '0 auto'
                            }}>
                            My Certification
                            <table className="table_container-certification_pcf">
                                <tr>
                                    {
                                        certificatedata.map((item,index)=>{
                                            return(
                                                <td>
                                                    <FileUploadComponent key={item.id} filetype={item.text} 
                                                        fileindex ={index} dlgTitle = "Upload Certificate and Description"
                                                        uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id}/>
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
                                    <input  className="currently_training_pcf" 
                                            type="label" value="Currently Not Training"/>
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
                        <table className={visibility?"table_container_pricing_pcf":"table_container_pricing_pcf_hidden"} >
                            <tr>
                                <td className="checkbox_col_pcf"/>
                                <td className="payment_heading_pcf_cell">
                                    <input className="payment_heading_pcf" type="label" value="Mode of Training"/>
                                </td>
                                <td className="payment_heading_pcf_cell">
                                    <input className="payment_heading_pcf" type="label" value="Fees / Session" />
                                </td>
                                <td className="payment_heading_pcf_cell">
                                    <input className="payment_heading_pcf" type="label" value="Fees / Month" />
                                </td>
                            </tr>
                            <tr >
                                <td className="checkbox_col_pcf">
                                    <input  type="checkbox" 
                                            className="display_left_checkbox_pcf" />
                                </td>
                                <td>
                                    <input  type="label" disabled value="Online" 
                                            className="table_pricing_first_col_pcf"/>
                                </td>
                                <td className="payment_heading_pcf_cell">
                                    <input name="myt1" type="text" 
                                        placeholder="Numbers only"
                                        className="table_pricing_second_col_pcf"/>

                                    <select className="currenct_select_pcf"
                                        value={selectedIndex} onChange={handleCurrencyChange}>
                                            {lstofsupportedCurrency.map((item, indx)=>{
                                                return <option value={indx}>{item}</option>
                                            })}
                                    </select>
                                </td>

                                <td className="payment_heading_pcf_cell">
                                    <input name="myt2" type="text" 
                                            placeholder="Numbers only"
                                            className="table_pricing_third_col_pcf"/>

                                    <select value={selectedIndex} onChange={handleCurrencyChange}
                                            className='currenct_select_pcf'>
                                        {lstofsupportedCurrency.map((item, indx)=>{
                                            return <option value={indx}>{item}</option>
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr className="checkbox_col_pcf">
                                <td>
                                    <input type="checkbox" className="display_left_checkbox_pcf" />
                                </td>
                                <td className="payment_heading_pcf_cell">
                                <input type="label" disabled value="Training at client place" 
                                    className="table_pricing_first_col_pcf"/>
                                </td>

                                <td className="payment_heading_pcf_cell">
                                    <input name="myt1" type="text"
                                        placeholder="Numbers only"
                                        className="table_pricing_second_col_pcf"/>

                                    <select  value={selectedIndex} onChange={handleCurrencyChange}
                                        className='currenct_select_pcf'>
                                            {lstofsupportedCurrency.map((item, indx)=>{
                                                return <option value={indx}>{item}</option>
                                            })}
                                    </select>
                                </td>

                                <td className="payment_heading_pcf_cell">
                                    <input name="myt2" type="text"
                                        placeholder="Numbers only"
                                        className="table_pricing_third_col_pcf"/>

                                    <select  value={selectedIndex} onChange={handleCurrencyChange}
                                        className='currenct_select_pcf'>
                                            {lstofsupportedCurrency.map((item, indx)=>{
                                                return <option value={indx}>{item}</option>
                                            })}
                                    </select>

                                </td>
                            </tr>
                    
                            <tr>
                                <td/>
                                <td colSpan={2} >
                                    <CustomLanguageSelection handleChange={handleChange}/>
                                </td>
                                <td/>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <>
                <button onClick={handleCompleteClick} 
                        className="button_oval_style_submit-pf">Complete Profile</button>
            </>
        </div>
    );
}

export default ProfileComponentFirst;