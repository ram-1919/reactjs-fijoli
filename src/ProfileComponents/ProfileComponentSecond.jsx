
import {Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ProfileComponentSecond.css";
import { useState } from "react";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";


const ProfileComponentSecond = (props) =>{
    
    //member variables
    const [name,        setname]            = useState("");
    const [location,    setlocation]        = useState("");
    const [description, setdescription]     = useState("");

    const [uploadfiles, setuploadfiles]     = useState({
        "certificate"    : [undefined, undefined, undefined], 
        "fitness_studio" : [undefined, undefined, undefined]
    });

    //file upload types components default data
    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    //file upload types components default data
    const fitnessstudiodata =[
        { id: 3, text: 'fitness_studio' },
        { id: 4, text: 'fitness_studio' },
        { id: 5, text: 'fitness_studio' },
    ]

    ///<summary>
    // api which uploads files and user info 
    ///</summary.
    const handleCompleteClick = (evt) =>{

        const userInfo = {
            "studio_name"       : name,
            "user_description"  : description,
            "location_address"  : location
        }

        props.handleCompleteClick(userInfo, uploadfiles);
    }

   
    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
    }

    ///<summary>
    // set description 
    ///</summary>
    const handlenametxtChanged = (evt) =>{
        setname(evt.target.value);
    }

    const handleuploadfile = (file, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    const handlelocationchanged = (evt) =>{
        setlocation(evt.target.value);
    }

    return(
        <div className="signupformFinal-container-pcs">
            <table className="table_container-pcs">
                <tr>
                    <td>
                        <AboutMyselfComponent height={'90px'} handletxtChanged={handletxtChanged} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <Box
                            sx={{ boxShadow: 4, height: '50px',
                                p: 1, m: 1, borderRadius: '15px',
                                width: '350px', textAlign: 'center',
                                margin: "0 auto"
                            }}>
                            My Gym / Fitness Studio Name
                            <TextField type="text" 
                                fullWidth
                                style={{textAlign: 'center'}}
                                placeholder="                      type here"
                                variant="outlined"
                                sx={{
                                    // '& fieldset': { borderRadius: 1 },
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                                    }}
                                onChange = {handlenametxtChanged}
                                InputProps={{ sx: { height: 30 }}}/>
                        </Box>
                    </td>
                </tr>

                <tr>
                    <td>
                        <Box
                            sx={{ boxShadow: 4, width: '350px', height: '57px',
                                p: 1, m: 1, borderRadius: '15px',
                                textAlign: 'center', margin: '0 auto'
                            }}>
                            My Certification
                            <table className="table_container-certification_pcs">
                                <tr>
                                    {
                                        certificatedata.map((item,index)=>{
                                            return(
                                                <td>
                                                    <FileUploadComponent key={item.id} filetype={item.text} fileindex ={index}
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
                        <Box
                            sx={{ boxShadow: 4, width: '350px',
                                height: '57px', p: 1, m: 1, margin: '0 auto',
                                borderRadius: '15px', textAlign: 'center',
                            }}>
                            My Gym / Fitness studio
                            <table className="table_container-certification_pcs">
                                <tr>
                                    {
                                        fitnessstudiodata.map((item,index)=>{
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
                        <Box sx={{ boxShadow: 4, height: '30px',
                                p: 1, m: 1, borderRadius: '15px',
                                width: '350px', textAlign: 'center', margin: "0 auto"
                            }}>
                            My Gym / Fitness Studio Address
                        </Box>
                    </td>
                </tr>

                <tr>
                    <td>
                        <Box
                            sx={{height: '30px', p: 1, m: 1,
                                borderRadius: '15px', margin: "0 auto",
                                width: '300px', textAlign: 'center',
                            }}>

                            <TextField type="text" 
                                fullWidth
                                placeholder = "location"
                                variant="outlined"
                                sx={{
                                    '& fieldset': { borderRadius: 10 },
                                    }}
                                onChange = {handlelocationchanged}
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
            <>
                <button onClick={handleCompleteClick} 
                        className="button_oval_style_submit_pcs">Complete Profile</button>
            </>
        </div>
    );
}

export default ProfileComponentSecond;
