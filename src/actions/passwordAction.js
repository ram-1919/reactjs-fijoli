

const passwordAction = (pwdData) =>{
    return{
        "type" : "set_new_password",
        pwdData
    }
}

export default passwordAction;