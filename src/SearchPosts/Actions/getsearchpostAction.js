

const getsearchpostAction = (post_id, user_id) => {
    return {
        type        : "get_search_post_item",
        "post_id"   : post_id,
        "user_id"   : user_id
    }
}

export default getsearchpostAction;