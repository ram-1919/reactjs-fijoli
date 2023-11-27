import React from 'react'

import errorimage from './../asset/error.png';
import "./CustomError.css";

export const ErrorComponent = () =>{
  return (
    <div className='error_header_container'>
        <span className='label_header_h1'>
            <label>Fijoli...</label>
        </span>
        <br/><br/><br/>
        <span className='label_header_h2'>
          <label>Oops... Something went wrong</label>
        </span>
        <br/>
        <span style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <img src={errorimage} width="450" height="350"/>
        </span>
    </div>
  )
}