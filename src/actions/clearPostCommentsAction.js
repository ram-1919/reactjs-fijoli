

const clearPostCommentsAction = (postId) => {
    return{
        type        : "clear_post_comments",
        "postId"    : postId
    }
}

export default clearPostCommentsAction;