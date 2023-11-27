

const getpostcommentlikedislikescountAction = (comment_id) =>{
    return{
        type : "get_post_comment_like_Dislike_Count",
        comment_id
    }
}

export default getpostcommentlikedislikescountAction