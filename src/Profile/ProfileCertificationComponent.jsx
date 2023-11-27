

import React from 'react'

import "./ProfileCertificationComponent.css";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileCertificationComponent =({item}) =>{

    const [doc_desc, setdoc_desc] = useState("");

    useEffect(()=>{
        setdoc_desc(item.document_desc);
    },[item])

  return (
    <div>
        <table style={{width: "100%"}}>
            <tr>
                <td style={{width: "12%", height:"auto"}}>
                    <label className='select_certification_pdf_container' >
                        <PictureAsPdfIcon sx={{fontSize: "100px"}} />
                    </label>
                </td>
                <td style={{width: "70%", height:"auto"}}>
                    <p style={{margin: "6px"}}>
                        {doc_desc}
                    </p>
                </td>
            </tr>
        </table>
    </div>
  )
}

export default ProfileCertificationComponent