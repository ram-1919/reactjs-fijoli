

import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FilterTwoToneIcon from '@mui/icons-material/FilterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ManIcon from '@mui/icons-material/Man';
import EnumPostCategory from '../enums/EnumPostCategory';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import EnumNavigate from '../../singletonControllers/NavigateController';
import navigateItem from '../../actions/navigateItemAction';

const iconStyle                 = { fontSize: '30px', color: "black" };
const rediconStyle              = { fontSize: '30px', color: "red" };

const PostCategoryMenuComponent = ({menuOptions, handleClick}) =>{

    const dispatch                  = useDispatch();     
    const [anchorEl, setAnchorEl]   = useState(null);
    const open                      = Boolean(anchorEl);
    
    const handlemenuIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e, seletedmenuItem) => {
        if((typeof seletedmenuItem === "string") &&
            (seletedmenuItem !== "backdropClick")){
            handleClick(e, seletedmenuItem);
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
        <AddCircleIcon style={(null === anchorEl)?iconStyle:rediconStyle} />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl}
                                  keepMounted open={open} onClose={handleClose}
                                  PaperProps={{ style: { maxHeight: 40 * 4.5,width: "35ch" }}}
      >
        {menuOptions.map((option) => {
            switch (option) {
                case EnumPostCategory.FitRecipesPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}>
                                    <img src="/categoryImages/fitrecipes_category.svg" style={{width: "25px", height:"25px"}}/>
                                </span>
                            </div>
                    </MenuItem>
                break;

                case EnumPostCategory.FitStoryboardsPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}>
                                    <img src="/categoryImages/storyborad_category.svg" style={{width: "25px", height:"25px"}}/>
                                </span>
                            </div>
                    </MenuItem>
                break;

                case EnumPostCategory.FitnessProductsPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}>
                                    <img src="/categoryImages/fitnessProduct_category.svg" style={{width: "25px", height:"25px"}}/>
                                </span>
                            </div>
                    </MenuItem>
                break;

                case EnumPostCategory.FitnessServicesPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}>
                                    <img src="/categoryImages/fitnessServicePost_category.svg" style={{width: "25px", height:"25px"}}/>
                                </span>
                            </div>
                    </MenuItem>
                break;

                case EnumPostCategory.TransformationStoriesPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}>
                                    <img src="/categoryImages/TransformationServices_category.svg" style={{width: "25px", height:"25px"}}/>
                                </span>
                            </div>
                    </MenuItem>
                break;

                case EnumPostCategory.FitRecipesPost:
                    return <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e)=> handleClose(e, option)}>
                            <div style={{
                                display: "flex", flexDirection: "row", 
                                height: "20px", width: "100%", fontSize: "18px"
                                }}>
                                <span style={{alignItems: "left", width:"90%"}}>{option}</span>
                                <span style={{alignItems: "left",width: "10%"}}><CoffeeIcon/></span>
                            </div>
                    </MenuItem>
                break;

            }
        })}
      </Menu>

    </div>
  )
}

export default PostCategoryMenuComponent