

const getblockuser = (loggedInUserInfo) =>{
    return{
        type  : "get_block_user_info",
        loggedInUserInfo
    }
}

export default getblockuser;