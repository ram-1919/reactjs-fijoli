

const EnumPostCommentType = Object.freeze({
    none                    : "none",
    newPost                 : "new_post_comment",
    editMainPost            : "edit_main_post_comment",
    deleteMainPost          : "delete_main_post_comment",
    replyMainPost           : "reply_main_post_comment",
    editReplyPost           : "edit_reply_post_comment",
    deleteReplyPost         : "delete_reply_post_comment",
    replyReplyPost          : "reply_reply_post_comment",
    newPostcommentSuccess     : "new_post_comment_success",
    postcommenteditSuccess    : "post_comment_edit_success",
    postcommentdeleteSuccess  : "post_comment_delete_success",
    subCURDPostSuccess        : "sub_CURD_post_comment_success",
    editreplypostcommentSuccess      : "reply_post_comment_edit_success",
    deletereplypostcommentSuccess   : "delete_reply_post_comment_success",
    newReplyPostcommentSuccess: "new_reply_main_post_comment_success"
})

export default EnumPostCommentType;