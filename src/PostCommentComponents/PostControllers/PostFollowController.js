

class PostFollowController {
 
    //reply_id, post_id, post_user_id, comment_user_id, comment_desc
    static getFollowState(postitem) {
        return  {
            "user_id"       : postitem.user_id,
            "follower_id"   : postitem.logged_in_user_id,
            "is_active"     : (postitem.isfollower)?0:1
        };
    }
}

export default PostFollowController;