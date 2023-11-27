
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

import image1 from "./../asset/img1.jpg";
import image2 from "./../asset/img2.jpg";
import image3 from "./../asset/img3.jpg";
import image4 from "./../asset/img4.jpg";
import image5 from "./../asset/img5.jpg";
import scurve from "./../asset/sCurve.png";


export const LandingPage = () => {

    const navigate = useNavigate();

    const [slide, setslide] = useState(-1);
    
    const [lstofImages, setlstofImages] = useState([
            {
                "src": image1,
                "scurve": scurve,
                "alt": "image 1 for caurosel",
                "msg": ["CONNECT WITH FITNESS","PROFESSIONALS & ENTHUSIASTS","ACROSS THE GLOBE"]
            },
            {
                "src": image2,
                "scurve": scurve,
                "alt": "image 2 for caurosel",
                "msg": ["GET FITNESS TIPS"," "," "]
            },            
            {
                "src": image3,
                "scurve": scurve,
                "alt": "image 3 for caurosel",
                "msg": ["TRY NEW FIT RECIPES"," "," "]
            },
            {
                "src": image4,
                "scurve": scurve,
                "alt": "image 4 for caurosel",
                "msg": ["TRASFORM YOURSELF"," "," "]
            },            
            {
                "src": image5,
                "scurve": scurve,
                "alt": "image 5 for caurosel",
                "msg": ["BUY | SELL","FITNESS PRODUCTS AND","AVAIL SERVICES"]
            }
        ]);
 
    useEffect(()=>{
        setslide(0);
        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(
        //       (position) => {
        //         const latitude = position.coords.latitude;
        //         const longitude = position.coords.longitude;
        //         // this.setState({ latitude, longitude });
        //         console.log(latitude);
        //         console.log(longitude);
        //       },
        //       (error) => {
        //         console.error("Error getting geolocation:", error);
        //       }
        //     );
        //   }        
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            let slideVal = (slide === (lstofImages.length-1))?0:slide+1;
            setslide(slideVal);
        }, 3000);
        return ()=> clearInterval(interval);
    },[slide])
    

    const handleloginbtnClick = (evt) =>{
        navigate("/loginpage");
    }

    const handlesignUpbtnClick = (evt) =>{
        navigate("/signupform1");
    }

  return (
    <div className='login-main-lp'>
        {
		lstofImages.map((item, idx)=>{
            if(slide === idx){  
                return(
                    <div key={idx}  className="image-container-lp">
                        <div>
                        <img  src={item.src} 
                                alt="Circular Crop Image" className="image-lp" />
                        </div>
                        <div className='image_container_scurve'>
                            <img src={item.scurve}
                                alt="scurve" className='image-lp_scurve'/>
                        </div>

                        <div className='image_container_controls'>
                        
                            <div className='marTop20-lp'>
                                {
                                    item.msg.map((msg, msgidx) =>{
                                        return(
                                            <span className='image-message-lp'>{msg}</span>
                                        )
                                    })
                                }
                            </div>

                            <div className='login-button-lp'>
                                <button onClick={handleloginbtnClick} 
                                    className="button_oval_style_login-lp"> Login </button>
                                <div className="line-lp"></div>
                                <button onClick={handlesignUpbtnClick} 
                                    className="button_oval_style_login-lp">SignUp</button>
                            </div>

                            <span className='indicators-lp'>
                                {lstofImages.map((_,idx)=>{
                                    return <button key={idx} onClick={null} className={slide === idx? "indicator-lp" : "indicator-lp indicator-inactive-lp"}/>
                                })}
                            </span>
                        </div>
                  </div>
                )
            }
        } )}
        </div>
      )
    }
