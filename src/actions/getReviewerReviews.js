

const getReviewerReviews = (user_id) => {
    return{
        "type" : "get_reviewer_reviews",
        user_id
    }
}

export default getReviewerReviews;