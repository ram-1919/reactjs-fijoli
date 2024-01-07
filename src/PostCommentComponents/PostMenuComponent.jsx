

import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import HideImageIcon from '@mui/icons-material/HideImage';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import EnumPostMenuOptions from './PostControllers/PostMenuOptions';

// const iconStyle = {
//     fontSize: '25px', // Adjust the size as needed
//     color  : "black"
// };

// const selectediconStyle = {
//     fontSize : "25px",
//     color    : "red"
// }

// const followiconStyle = {
//     color: "black"
// }

// const followSelectediconStyle = {
//     color: "red"
// }

const PostMenuComponent = ({menuOptions, isfollower, handleClick}) =>{
    const ITEM_HEIGHT = 48;       
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handlemenuIconClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (seletedmenuItem) => {
        if(typeof seletedmenuItem === "string"){
            handleClick(seletedmenuItem);
        }
        setAnchorEl(null);
    };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handlemenuIconClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
        {menuOptions.map((option) => {
            switch (option) {
                case EnumPostMenuOptions.Report:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={()=> handleClose(EnumPostMenuOptions.Report)}>
                            <ReportIcon/>&nbsp; {option}
                    </MenuItem>
                break;

                case EnumPostMenuOptions.Hide:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={()=> handleClose(EnumPostMenuOptions.Hide)}>
                            <HideImageIcon/>&nbsp; {option}
                    </MenuItem>
                break;

                case EnumPostMenuOptions.Follow:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={()=> handleClose(EnumPostMenuOptions.Follow)}>
                                {
                                    (isfollower)?<Button variant="outlined" style={{height: "25px",backgroundColor: "#fff", fontSize: "11px", margin: "0 auto", border: "1px solid 0ABCFF", color: "#000"}}>UnFollow</Button>:
                                    <Button variant="contained" style={{height: "25px",backgroundColor: "#0ABCFF", fontSize: "11px", margin: "0 auto"}}>Follow</Button>
                                }
                            </MenuItem>
                break;

                case EnumPostMenuOptions.Edit:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={()=> handleClose(EnumPostMenuOptions.Edit)}>
                            <EditIcon/>&nbsp; {option}
                    </MenuItem>
                break;

                case EnumPostMenuOptions.Delete:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={()=> handleClose(EnumPostMenuOptions.Delete)}>
                            <DeleteIcon/>&nbsp; {option}
                    </MenuItem>
                break;
            }
        })}
      </Menu>
    </div>
  )
}

export default PostMenuComponent