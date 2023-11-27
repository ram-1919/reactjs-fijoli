

const searchpostAction = (searchkeyword) => {

    return {
        type : "get_search_posts",
        searchkeyword
    }
}

export default searchpostAction;