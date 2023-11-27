

class postCommentParser {


    constructor (){
        //http service is initialized to create it as a singleton class
        if (postCommentParser.instance instanceof postCommentParser) {
            return postCommentParser.instance;
        }
        postCommentParser.instance = this;
    }

    parseComments(post_id, comments){
        let maincomments = {};
        maincomments[post_id] = this.getMainComments(comments);

        return maincomments;
    }

    getMainComments(lstofcomments){
        if(null === lstofcomments){
            return [];
        }

        let lstofmainComments = {};
        lstofcomments = [...lstofcomments];
        lstofcomments.map((item, index)=>{
            item["subcomments"] = [];
            lstofmainComments[item.root_reply_id] = item;
        });

        return lstofmainComments;
    }
}

export default postCommentParser;
