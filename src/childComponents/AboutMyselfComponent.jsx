
import React from 'react'
import {Box, TextField} from "@mui/material";

///<summary>
//component which is used to update description of 
//user in profile registration
///</summary>
const AboutMyselfComponent =({height, document_desc, handletxtChanged}) => {

    
    const handletxtdescChanged = (evt) =>{
        handletxtChanged(evt);
    }

  return (
    <div>
        <Box fullWidth  sx={{ boxShadow: 4,
                height: {height}, p: 1, m: 1, borderRadius: '15px'
            }} >
            <TextField type="text" fullWidth variant="outlined"
                name = "document_desc"
                value = {document_desc}
                multiline
                placeholder="About Myself Not more than 500 characters" 
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                    }}
                onChange = {handletxtdescChanged} rows={4}
                InputProps={{ sx: { height: 100 }}}/>
        </Box>
    </div>
  )
}

export default AboutMyselfComponent