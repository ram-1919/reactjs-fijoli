

const getselectedprofile = (isSameProfile, whatsapp_number, logged_in_user_id) =>{

    if(isSameProfile){
        return{
            "type" : "set_login_profile"
        }
    }else{
        return {
            "type" : "get_other_profile",
            "whatsapp_number" : whatsapp_number,
            "logged_in_user_id" : logged_in_user_id
        }
    }
    
}

export default getselectedprofile;