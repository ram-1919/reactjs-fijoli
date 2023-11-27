

const updatereplypostcommentCount = (postcomment) =>{
    return{
        type : "update_reply_post_comment_count",
        postcomment
    }
}

export default updatereplypostcommentCount;