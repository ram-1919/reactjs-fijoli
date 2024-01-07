import { SwipeTwoTone } from "@mui/icons-material";


class PostCommentsController{

    //reply_id, post_id, post_user_id, comment_user_id, comment_desc
    static getNewPostComment(post_id,post_category, logged_in_user_id){
        return  {
            "reply_id"          : null,
            "post_id"           : post_id,
            "post_user_id"      : 0,
            "comment_user_id"   : logged_in_user_id,
            "comment_desc"      : "",
            "post_category"     : post_category
        };
    }

    static getReplyPostComment(postitem){
        return  {
            "id"                : postitem.root_reply_id,
            "reply_id"          : postitem.root_reply_id,
            "post_id"           : postitem.post_id,
            "post_user_id"      : 0,
            "comment_user_id"   : postitem.logged_in_user_id,
            "comment_desc"      : postitem.comment_desc,
            "main_post_id"      : postitem.root_reply_id,
            "post_category"     : postitem.post_category
        };
    }

    static getRepliesReplyPostComment(postitem){
        return  {
            "id"                : postitem.id,
            "reply_id"          : postitem.id,
            "post_id"           : postitem.post_id,
            "post_user_id"      : 0,
            "comment_user_id"   : postitem.logged_in_user_id,
            "comment_desc"      : "",
            "main_post_id"      : postitem.main_post_id
        };
    }

    static getEditPostComment(postitem){
        return  {
            "id"                : postitem.root_reply_id,
            "comment_desc"      : postitem.comment_desc,
            "post_id"           : postitem.post_id,
            "logged_in_user_id" : postitem.logged_in_user_id
        };
    }

    static getEditRelyPostComment(postitem){
        return  {
            "id"                : postitem.id,
            "comment_desc"      : postitem.comment_desc,
            "post_id"           : postitem.post_id,
            "main_comment_id"   : postitem.main_post_id,
            "logged_in_user_id" : postitem.logged_in_user_id
        };
    }

    static getDeleteMainPostComment(postitem){
        return  {
            "id"        : postitem.root_reply_id,
            "post_id"   : postitem.post_id,
        };
    }

    static getDeleteReplyPostComment(postitem){
        return  {
            "id"        : postitem.id,
            "post_id"   : postitem.post_id,
            "main_comment_id" : postitem.main_post_id,
        };
    }

    static getpostMainCommentlikeORdislikeState(postitem, reaction){
        return {
            "post_id"   : postitem.post_id,
            "comment_id": postitem.root_reply_id,
            "user_id"   : postitem.logged_in_user_id,
            "reaction"  : reaction
        }
    }

    static getpostReplyCommentlikeORdislikeState(postitem, reaction){
        return {
            "post_id"   : postitem.post_id,
            "comment_id": postitem.id,
            "user_id"   : postitem.logged_in_user_id,
            "reaction"  : reaction,
            "main_comment_id" : postitem.main_post_id
        }
    }

    static getLikeDislikeCommentState(comment, likeState){
        
        let likecase = comment["is_active"].toString() + comment["reaction"].toString() + likeState["reaction"].toString();
        comment["is_active"] = parseInt(likeState["is_active"]);
        comment["reaction"]  = parseInt(likeState["reaction"]);

        switch(likecase){
            case "000":
            case "010":    
                comment["dislikes_count"] = parseInt(comment["dislikes_count"]) + 1;
                break;
            case "001":
            case "011":
                comment["likes_count"]    = parseInt(comment["likes_count"]) + 1;
                break;

            case "100":
                comment["dislikes_count"] = parseInt(comment["dislikes_count"]) -1 ;
                break;
            case "101":
                comment["likes_count"]    = parseInt(comment["likes_count"]) + 1;
                comment["dislikes_count"] = parseInt(comment["dislikes_count"]) - 1 ;
                break;
            case "110":
                comment["likes_count"]    = parseInt(comment["likes_count"]) - 1;
                comment["dislikes_count"] = parseInt(comment["dislikes_count"]) + 1 ;
                break;
            case "111":
                comment["likes_count"]    = parseInt(comment["likes_count"]) - 1;
                break;
        }

        return comment;
    }

}

export default PostCommentsController;
