

const getfollowersAction = (user_id) =>{

    return{
        type : "get_followers_list",
        user_id
    }
}

export default getfollowersAction;