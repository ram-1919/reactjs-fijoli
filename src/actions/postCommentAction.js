

const postCommentAction = (postcomment, mode) =>{
    return{
         type           : "post_comment",
         "postcomment"  : postcomment,
         "mode"         : mode
    }
}

export default postCommentAction;