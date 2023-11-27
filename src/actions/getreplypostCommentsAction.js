

const getreplypostCommentsAction = (id, post_id, logged_in_user_id) => {

    return{
        type : "get_reply_post_comments",
        "id" : id,       
        "post_id" : post_id,
        "user_id" : logged_in_user_id
    }

}

export default getreplypostCommentsAction;