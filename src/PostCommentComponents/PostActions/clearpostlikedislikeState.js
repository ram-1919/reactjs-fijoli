

const clearpostlikedislikeState = (post_id) =>{
    return{
        type : "clear_post_like_dislike_state",
        post_id
    }
}

export default clearpostlikedislikeState;