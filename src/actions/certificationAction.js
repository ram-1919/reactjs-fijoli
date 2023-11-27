


const certificateAction =(userinfo)=>{
    return{
        "type" : "get_certificates",
        userinfo
    }
}

export default certificateAction;