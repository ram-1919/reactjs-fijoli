import { IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import getPostItemsAction from '../actions/getPostItemsAction';
import "./FijoliItems.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

///<summary>
// home page category post items component
///</summary>
const FijoliItems = (props) =>{

    const dispatch            = useDispatch();
    const [postitems, setpostitems] = useState([]);
    const [indexRange, setindexRange]   = useState({min:0, max:5});
    

    useEffect(()=>{
        setpostitems(props.data.slice(indexRange.min, indexRange.max));
    },[indexRange]);
    
    const handleDisplayPost = (selectedItem) =>{
        if(selectedItem){
            // dispatch(getPostItemsAction(userinfo.user_id));
            dispatch(getPostItemsAction({[selectedItem.id] : selectedItem}))
            //navigate to page which displays post comment info
            // dispatch(navigateItem(EnumNavigate.postContainer));
        }
    }

    const handleNext = () =>{
        let min = indexRange.max;
        setindexRange({min:5, max:5});
    }

  return (
    <div className='fijoli_main-container'>
        <div style={{marginLeft: "30px"}}>
            <img src={"/categoryImages/" + props.categoryName + ".svg"} alt={props.data.key}/>
            <span style={{marginLeft: "10px", color: 'grey', fontWeight: 'bold'}}>{props.categoryName}</span>
        </div>
        <br/> 
        <div style={{marginLeft: "35px"}}>
            {
                (0 === postitems.length)?
                <Skeleton variant="circular" textAlign="center"
                        animation="wave" width={90} height={90} style={{cursor: "pointer", border: "1px solid black" }} />
                :postitems.map((postitem, idx)=>{
                    let imgsrc = process.env.REACT_APP_S3_URL + postitem.post_pic_1_path;
                    return (
                        <IconButton onClick={()=>handleDisplayPost(postitem)}>
                            <img src={imgsrc} className="post_icon fijoli_skeleton" 
                                    alt="uploadfiles..."/>
                        </IconButton>
                    )
                })
            }
            <IconButton onClick={handleNext}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </div>
    </div>
  )
}

export default FijoliItems;