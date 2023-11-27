

import { List, ListItem, ListItemButton } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getselectedprofile from '../../actions/getselectedprofile';
import navigateItem from '../../actions/navigateItemAction';
import EnumNavigate from '../../singletonControllers/NavigateController';
import clearsearchPostsAction from '../Actions/clearsearchPostsAction';
import getsearchpostAction from '../Actions/getsearchpostAction';
import SearchpostComponent from './SearchpostComponent';

const SearchpostContainer = ({user_id}) =>{

    const dispatch  = useDispatch();
    const searchlst = useSelector((state)=> state.storeComponent.searchlst);

    useEffect(()=>{
        return(()=>{
            dispatch(clearsearchPostsAction());
        })
    })

    const handleclickEvent = (si) =>{

        switch (si["section"]) {
            case "post":
                dispatch(getsearchpostAction(si.post_id, si.user_id));
                dispatch(navigateItem(EnumNavigate.postContainer));
                break;
            case "user":
                if(user_id === si.user_id){
                    dispatch(getselectedprofile(true, 0));
                }else{
                    dispatch(getselectedprofile(false, si.whatsapp_number, user_id));
                }
                dispatch(navigateItem(EnumNavigate.profileState));
        
                break;
            default:
                break;
        }
    }
    
  return (
    <div>
        {
            (undefined === searchlst)&&
            <SearchpostComponent sp={null}/>
        }
        {
            (searchlst) &&
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-label="contacts">
                {
                    searchlst.map((searchitem, index)=>{
                        return <ListItem>
                                    <ListItemButton divider onClick={()=>handleclickEvent(searchitem)}>
                                        <SearchpostComponent key={index} sp = {searchitem}/>
                                    </ListItemButton>
                               </ListItem>
                    })
                }
            </List>
        }
    </div>
  )
}

export default SearchpostContainer