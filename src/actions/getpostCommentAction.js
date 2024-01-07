

const getpostCommentAction = (postid, post_category, logged_in_user_id) =>{
    return{
        type    : "get_post_comment",
        "post_id" : postid,
        "user_id" : logged_in_user_id,
        "post_category" : post_category
    }
}

export default getpostCommentAction;