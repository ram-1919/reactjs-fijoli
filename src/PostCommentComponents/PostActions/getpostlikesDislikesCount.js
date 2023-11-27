

const getpostlikesDislikesCount = (post_id) =>{
    return{
        type : "get_post_likes_dislikes_count",
        post_id
    }
}

export default getpostlikesDislikesCount;

