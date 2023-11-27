

import React, { useEffect, useState } from 'react';
import "./HomePageHeaderComponent.css";

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, TextField,IconButton, InputAdornment } from '@mui/material';

//need to delete once the actual image is downloaded
import img2 from "./../asset/img2.jpg";
import { useDispatch, useSelector } from 'react-redux';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import getselectedprofile from '../actions/getselectedprofile';
import setpostcategoryType from '../actions/setpostcategoryType';
import PostAsyncController from '../viewModels/PostAsyncController';
import searchpostAction from '../SearchPosts/Actions/searchpostAction';

const ITEM_HEIGHT = 48;

//home page header component
const HomePageHeaderComponent = ({userinfo}) => {
  
    const [anchorEl, setAnchorEl]                       = useState(null);
    const [keyitems, setkeyitems]                       = useState([]);
    const [searchkey, setsearchkey]                     = useState("");
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);

    const dispatch        = useDispatch();
    const lstofPosts      = useSelector(state => state.storeComponent.configData.Post);
    const searchpostState = useSelector(state => state.storeComponent.searchpostState);

    const postItemCtrl    = new PostAsyncController();
    const open = Boolean(anchorEl);

    useEffect(()=>{
      if(searchpostState){
        setsearchkey("");
        dispatch(navigateItem(EnumNavigate.searchposts));
      }
    },[searchpostState]);

  useEffect(()=>{
    //temp fijoli items 
    if(lstofPosts){
        let reciepeKeyItems  = [];
        lstofPosts.map((itm, indx)=>{
          reciepeKeyItems.push(itm);
        });
        setkeyitems(reciepeKeyItems);
    }

  },[lstofPosts]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setContextMenuVisible(!isContextMenuVisible);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //emits the selected post item type from context menu
  const handlepostMenuItemClick = (event, value) => {
    let postinfo = postItemCtrl.getDefaultPostComment();
    postinfo["post_category"] = value;
    Object.keys(userinfo).map((item, index)=>{
      postinfo[item] = userinfo[item];
    });
    
    dispatch(setpostcategoryType(postinfo));
    dispatch(navigateItem(EnumNavigate.postState));
    handleClose();
  };

  const handleHdrPagevisibleState = (navigateTo) =>{
    dispatch(navigateItem(navigateTo));
  }

  
  const handleProfile = (navigateTo) => {

    dispatch(getselectedprofile(true, 0));
    dispatch(navigateItem(navigateTo));

  }     

  const handleSearchClick = (navigateTo) =>{
    // setsearchkey("");
    // dispatch(navigateItem(navigateTo));
    dispatch(searchpostAction(searchkey));
  }

  const handlesearchkeyChange = (evt) =>{
    setsearchkey(evt.target.value);
  }
  
  return (
    <div className='homepage_header_container'>
            <div className='main_div_homepage_header'>
              <table className='title_table_homepage_header'>
                <tr>
                  <td  className='col_first_homepage_header'>
                      <label style={{color:"red", width:"50px", fontSize: "30px"}}>fijoli</label>
                  </td>
                  <td  className='col_second_homepage_header'>
                      <TextField
                        value={searchkey}
                        placeholder="search content" 
                        sx={{
                          '& fieldset': { borderRadius: 33 }
                        }}
                        fullWidth
                        onChange={handlesearchkeyChange}
                        InputProps={{ sx: { height: 30 },
                          endAdornment:<InputAdornment position='end'>
                            <IconButton onClick={()=>handleSearchClick(EnumNavigate.searchposts)}>
                              <SearchIcon/>
                            </IconButton>
                          </InputAdornment > }}
                        variant="outlined"/>
                  </td>
                  <td className='col_third_homepage_header'>
                    <img src={img2} alt="img2" onClick={(evt) => handleProfile(EnumNavigate.profileState)}
                          style={{width: "30px", height: "30px", cursor: "pointer", borderRadius: "15px"}}/>
                  </td >
                  <td  className='col_fourth_homepage_header'>
                      <Button startIcon = {<MenuIcon />} width = "35px" 
                              onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.menuState)}></Button>
                  </td>
                </tr>
              </table>
            </div>

            <div>
                <table className='title_table_homepage_header'>
                  <tr>
                    <td style={{textAlign: 'center' }}>
                      <Button startIcon = {<HomeIcon />}
                        onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.homepageState)}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<PublicIcon />}
                          onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.postContainer)}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<VisibilityIcon />}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<NotificationsActiveIcon />}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<AddCircleIcon />} onClick={(evt)=> handleClick(evt)}></Button>
                        { isContextMenuVisible &&
                              <Menu id="long-menu" anchorEl={anchorEl}
                                  keepMounted open={open} onClose={handleClose}
                                  PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5,width: "25ch" }}}>
                                  { (null !== keyitems) && keyitems.map((option) => (
                                    <MenuItem key={option}
                                      onClick={(e) => handlepostMenuItemClick(e, option)}>
                                      {option}
                                    </MenuItem>
                                  ))}
                              </Menu>
                        }
                    </td>
                  </tr>
                </table>
            </div>
            <div className='home_line_homepage_header'></div>
    </div>
  )
}

export default HomePageHeaderComponent