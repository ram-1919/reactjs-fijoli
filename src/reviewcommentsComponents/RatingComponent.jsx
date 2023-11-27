

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating'

//holds the rating value
//component can be reused for multiple scenarios
//1: displaying rating 2: select rating 
const RatingComponent = (props) =>{

    //set default objects
    const dispatch              = useDispatch();
    const [rating, setrating]   = useState(0);

    //need to investigate how to set props to usestate variables
    //hook which sets rating value to control
    useEffect(()=>{
        if(props.rating){
            setrating(props.rating);
        }
    },[props]);

    //event invokes submitter review comment
    const handleRatingClick = (rate) => {
        props.handleRatingClick(rate);
    }

  return (
    <div className='ratingcomponent_main_div'>
        <Rating transition
                allowFraction
                readonly={props.isenable}
                size="25px"
                fillColor='red'
                initialValue    = {rating}
                onClick         = {handleRatingClick} />
    </div>
  )
}

export default RatingComponent