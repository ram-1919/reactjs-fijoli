

class ReviewComment {

    constructor(reviewItem, desc_type){
        this.user_id            = reviewItem["user_id"];
        this.reviewer_user_id   = reviewItem["reviewer_user_id"];
        this.review_desc        = reviewItem["review_desc"];
        this.user_rating        = reviewItem["user_rating"];
        this.reply_desc         = reviewItem["reply_desc"];
        this.mode               = "";
        this.desc_type          = desc_type;
    }
}

export default ReviewComment;