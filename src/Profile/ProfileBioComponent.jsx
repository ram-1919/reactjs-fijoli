

import { useSelect } from '@mui/base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ProfileCertificationComponent from './ProfileCertificationComponent';
import { useEffect } from 'react';
import certificateAction from '../actions/certificationAction';

//components which displays about BIO info of an user
const ProfileBioComponent = ({userinfo}) =>{

    const dispatch             = useDispatch();

    //holds the lst of certificates which are uploaded of an user
    const lstofCertificates    = useSelector((state)=> state.storeComponent.lstCertificates);

    //useeffect which fetches list of certifications of given user
    useEffect(()=>{
        dispatch(certificateAction({"whatsapp_number": userinfo.whatsapp_number}));
    },[])

    return (
    <div style={{marginTop: "10px"}}>
        <div>
            <span style={{fontSize: "20px", marginLeft: "15px"}}>About My Self</span>
            <ModeEditIcon style={{marginTop: "6px", marginLeft: "10px"}} />
        </div>
        <div>
            <p style={{marginLeft: "18px", marginRight: "10px"}}>{userinfo.user_description}</p>
        </div>

        <div>
            <span style={{fontSize: "20px", marginLeft: "15px"}}>Languages I Speak</span>
            <ModeEditIcon style={{marginTop: "6px", marginLeft: "10px"}} />
        </div>

        <div>
            <p style={{marginLeft: "18px", marginRight: "10px"}}>{userinfo.languages_known}</p>
        </div>
        <div>
            <span style={{fontSize: "20px", marginLeft: "15px"}}>My Certifications</span>
            <ModeEditIcon style={{marginTop: "6px", marginLeft: "10px"}} />
        </div>
        <div>
            {
                ((undefined !== lstofCertificates) && (0 < lstofCertificates.length)) &&
                lstofCertificates.map((item, index)=>{
                    // console.log(item);
                   return <ProfileCertificationComponent key={index} item={item}/>
                })
            }
        </div>
    </div>
  )
}

export default ProfileBioComponent