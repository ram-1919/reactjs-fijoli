

const deletereviewcomment = (comment) =>{
    return{
        "type"      : "post_user_review_comment",
        "modetype"  : "delete",
        comment
    }
}

export default deletereviewcomment;