

const clearpostcommentsAction = (post_id) =>{
    return {
        type : "clear_post_comment_status",
        "post_id" : post_id
    }
}

export default clearpostcommentsAction;