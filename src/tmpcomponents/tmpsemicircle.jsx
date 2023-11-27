

import React from 'react'

import "./../tmpstyles/image.css";
import imag1 from "./../asset/image1.jpg";

const TmpSemiCircle = () =>{
  return (
    <div className="image-container">
      <div className='image'>
        <img src={imag1} alt="Circular Crop Image" className="image" />
      </div>
      <div className="image-crop" > 

      </div>
    </div>)

  
}

export default TmpSemiCircle
