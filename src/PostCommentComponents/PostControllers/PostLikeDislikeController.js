

class PostLikeDislikeController {
 
    //reply_id, post_id, post_user_id, comment_user_id, comment_desc
    static getpostlike(post_id, user_id, post_category, reaction) {
        return  {
            "user_id"       : user_id,
            "post_id"       : post_id,
            "reaction"      : reaction,
            "post_category" : post_category
        };
    }
}

export default PostLikeDislikeController;