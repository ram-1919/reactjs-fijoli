

const postlikesDislikesAction = (postState) =>{
    return {
        type : "post_like_dislike",
        postState
    }
}

export default postlikesDislikesAction;