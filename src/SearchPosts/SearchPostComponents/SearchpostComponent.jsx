

import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const SearchpostComponent = ({sp}) =>{

    const [picinfo, setpicinfo] = useState("");
    
    useEffect(()=>{
        setTimeout(() => {
            let disppicinfo = "/images/img" + (Math.floor(Math.random() * 4) + 1) +".jpg";
            if(sp){
                setpicinfo(disppicinfo);
            }
        }, 2000);
    },[sp]);


  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Box sx={{ margin: 1 }}>
            {("" === picinfo) ? (
                <Skeleton variant="circular" animation="wave" >
                    <Avatar alt='f' src={null}/>
                </Skeleton>
            ) : (
                <Avatar src={picinfo} />
            )}
            </Box>

            <Box sx={{ width: '100%', marginTop: "-10px" }}>
            {("" === picinfo) ? (
                <Skeleton width="70%"  style={{height:"30px",  marginTop: "0px"}} animation="wave">
                <Typography>.....................................</Typography>
                </Skeleton>
            ) : (
                <Typography>{sp.user_name}</Typography>
            )}
            </Box>            
            <br/>
        </Box>
        <Box sx={{ width: '100%', marginLeft: "60px", marginTop: "-10px" }}>
            {("" === picinfo) ? (
                <Skeleton width="70%"  style={{height:"30px",  marginTop: "0px"}} animation="wave">
                <Typography>.....................................</Typography>
                </Skeleton>
            ) : (
                <Typography>{sp.description}</Typography>
            )}
            </Box>            


    </div>
  )
}

export default SearchpostComponent