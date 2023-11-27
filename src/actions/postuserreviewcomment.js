

const postuserreviewcomment = (comment, mode) =>{
    return {
        "type"      : "post_user_review_comment",
        "modetype"  : mode,
        "comment"   : comment
    }
}

export default postuserreviewcomment;