const clearreplypostcommentAction = (post_id, main_comment_id) => {
    return{
        type : "clear_reply_post_comments",
        "post_id" : post_id,
        "main_comment_id" : main_comment_id
    }
}

export default clearreplypostcommentAction;