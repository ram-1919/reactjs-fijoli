import ReviewComment from "../models/ReviewComment";

//class which generates review comments
// based on submitter/reviewer type
class ReviewCommentsController{

    //constructor which holds the entry of review
    //comment fetched from the api
    constructor(reviewItem){
        this.review = reviewItem;
    }

    //returns list of review comments
    getlstofReviews(){

        //initialize default object to hold review comments
        const lstofReviews = [];

        //condition is not required - need to test
        if("" === this.review)
        {
            return lstofReviews;
        }

        //if the review comment type is submitter 
        //initialize desc for submitter and reply as "reviewer_desc"/"reply_desc"
        //else for reviewer both submitter/reply desc should be "reply_desc"
        if("submitter" === this.review["user_review_type"]){
            return this.getlstofSubmitterReviews(lstofReviews);
        }else{
            return this.getlstofReviewerReviews(lstofReviews);
        }
    }

    //generates submitter and reply reviews from 
    //the given server entry to multiple like submitter/reply comments
    getlstofSubmitterReviews(lstofReviews){

        //holds submitter review comments
        lstofReviews.push(new ReviewComment(this.review, "review_desc"));
        //sets the state to display edit/delete icons based on the logged in user 
        lstofReviews[0]["ismenuvisible"] = (this.review.user_id === this.review.logged_in_user_id);

        //generates reply description review comment if condition satisfies
        //sets visibility state of reply review comment state to false always
        if("" !== this.review.reply_desc){
            lstofReviews.push(new ReviewComment(this.review, "reply_desc"));
            lstofReviews[1]["ismenuvisible"] = false;
        }

        //returns list of reviews
        return lstofReviews;
    }

    // generates list of review comments of submitter/reply description
    // and returns reviewer review comments
    getlstofReviewerReviews(lstofReviews){

        //holds submitter review comment
        lstofReviews.push(new ReviewComment(this.review, "reply_desc"));
        //sets the visibility state of reply icon 
        lstofReviews[0]["ismenuvisible"] = true;

        //if reply_desc exists generate a review comment
        //and set submitter review comment icon visibility state to false
        if("" !== this.review.reply_desc){
            lstofReviews.push(new ReviewComment(this.review, "reply_desc"));
            lstofReviews[0]["ismenuvisible"] = false
            lstofReviews[1]["ismenuvisible"] = true;
        }

        return lstofReviews;
    }
}

export default ReviewCommentsController;