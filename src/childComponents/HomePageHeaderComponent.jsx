

import React, { useEffect, useState } from 'react';
import "./HomePageHeaderComponent.css";

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, TextField,IconButton, InputAdornment, Avatar, Skeleton } from '@mui/material';

//need to delete once the actual image is downloaded
import img2 from "./../asset/img2.jpg";
import { useDispatch, useSelector } from 'react-redux';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import getselectedprofile from '../actions/getselectedprofile';
import setpostcategoryType from '../actions/setpostcategoryType';
import PostAsyncController from '../viewModels/PostAsyncController';
import searchpostAction from '../SearchPosts/Actions/searchpostAction';
import PostCategoryMenuComponent from './PostCategoryMenuComponent/PostCategoryMenuComponent';


const ITEM_HEIGHT = 48;
const iconStyle                 = { fontSize: '30px', color: "black" };
const rediconStyle                 = { fontSize: '30px', color: "red" };

//home page header component
const HomePageHeaderComponent = ({userinfo}) => {
  
    const [anchorEl, setAnchorEl]                       = useState(null);
    const [keyitems, setkeyitems]                       = useState([]);
    const [searchkey, setsearchkey]                     = useState("");
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);
    const [userpic, setuserpic]                         = useState("");

    const dispatch        = useDispatch();
    const lstofPosts      = useSelector(state => state.storeComponent.configData.Post);
    const searchpostState = useSelector(state => state.storeComponent.searchpostState);
    const navigateItemtype  = useSelector((state) => state.storeComponent.navigateItemType);
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

        let picinfo = process.env.REACT_APP_S3_URL + userinfo["whatsapp_number"]+  "/profilepic/"+ userinfo["whatsapp_number"]+ "_profilepic_";
        setuserpic(picinfo);
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
  
  // const [userpicloaded, setuserpicloaded] = useState(true);

  const handleuserpicloaded = (evt) => {
    // setuserpicloaded(false);
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
                    <img src={userpic} alt="img2" onLoad={handleuserpicloaded}
                          onClick={(evt) => handleProfile(EnumNavigate.profileState)}
                          className="userpic skeleton"/>
                  </td >
                  <td  className='col_fourth_homepage_header'>
                      <Button startIcon = {<MenuIcon style={(EnumNavigate.menuState === navigateItemtype)?rediconStyle:iconStyle} />} width = "35px" 
                              onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.menuState)}></Button>
                  </td>
                </tr>
              </table>
            </div>

            <div>
                <table className='title_table_homepage_header'>
                  <tr>
                    <td style={{textAlign: 'center' }}>
                      <Button startIcon = {<HomeIcon style={(EnumNavigate.homepageState === navigateItemtype)?rediconStyle: iconStyle} />}
                        onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.homepageState)}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<PublicIcon style={iconStyle}  />}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<VisibilityIcon style={iconStyle}  />}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Button startIcon = {<NotificationsActiveIcon style={iconStyle}  />}></Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <PostCategoryMenuComponent menuOptions={keyitems} handleClick={handlepostMenuItemClick}/>
                    </td>
                  </tr>
                </table>
            </div>
            <div className='home_line_homepage_header'></div>
    </div>
  )
}

export default HomePageHeaderComponent