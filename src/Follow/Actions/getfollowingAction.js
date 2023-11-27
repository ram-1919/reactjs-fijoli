

const getfollwingAction = (follower_id) =>{
    return {
        type : "get_followings_list",
        follower_id
    }
}

export default getfollwingAction;