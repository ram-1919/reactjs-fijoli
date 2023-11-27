

const getSubmitterReviews = (useridsinfo) => {
    return {
        "type" : "get_submitter_reviews",
        useridsinfo
    }
}

export default getSubmitterReviews;