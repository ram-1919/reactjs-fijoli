

const clearReplyPostCommentStatusAction = (postcomment) =>{
    return{
        type : "clear_reply_post_comment_status",
        postcomment
    }
}

export default clearReplyPostCommentStatusAction;
