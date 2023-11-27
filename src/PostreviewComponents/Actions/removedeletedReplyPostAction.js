

const removedeletedReplyPostComment = (postcomment) =>{
    return {
        type : "remove_deleted_reply_post_comment" ,
        postcomment
    }
}

export default removedeletedReplyPostComment;