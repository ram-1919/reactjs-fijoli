
import axios from "axios";

export class ApiService {

    constructor(){
        this.url = "http://localhost:3030/";

        //http service is initialized to create it as a singleton class
        if (ApiService.instance instanceof ApiService) {
             return ApiService.instance;
        }
        ApiService.instance = this;
    }

    getsysconfiguration () {
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
      
          var baseurl = this.url + "getsysconfiguration";
          let response = axios.get(baseurl, requestOptions);
          return response;
    }

    register(signupFormData){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "register";
        let response = axios.post(baseurl, JSON.stringify(signupFormData), requestOptions);
        return response;
    }

    getforgetpwdStatus(data){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "forgetpwd?whatsapp_number=" + data.whatsapp_number + "&user_email=" + data.user_email + "&dob=" + data.dob;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    getregisteredInfo(data){
        
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getregisteredInfo?whatsapp_number=" + data.whatsapp_number;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    setProfileData(profileData){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "setProfileData";
        let response = axios.post(baseurl, JSON.stringify(profileData), requestOptions);
        return response;
    }

    loginUser(loginData){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "login";
        let response = axios.post(baseurl, JSON.stringify(loginData), requestOptions);
        return response;
    }

    confirmRegistration(confirmregInfo){
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        var baseurl = this.url + "confirmregistrationfiles";
        let response = axios.post(baseurl, confirmregInfo.registrationData, requestOptions);
        return response;
    }

    addpost(confirmregInfo){
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        var baseurl = this.url + "addpost";
        let response = axios.post(baseurl, confirmregInfo.postformData, requestOptions);
        return response;
    }

    deactivateuser(userinfo){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "deactivateuser";
        let response = axios.post(baseurl, JSON.stringify(userinfo), requestOptions);
        return response;
    }

    setnewpassword(pwddata){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "setnewpassword";
        let response = axios.post(baseurl, JSON.stringify(pwddata), requestOptions);
        return response;
    }

    getcertificatesInfo(data){
        
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getcertificatesInfo?whatsapp_number=" + data.whatsapp_number;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    // getlstPostItems(data){
    //     const requestOptions = {
    //         headers: { "Content-Type": "application/json" },
    //     };

    //     var baseurl = this.url + "getlstPostItems?attribute_value=" + data.attribute_value;
    //     let response = axios.get(baseurl, requestOptions);
    //     return response;
    // }

    getotherProfile(data){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getotherProfile?whatsapp_number=" + data.whatsapp_number + "&logged_in_user_id="+data.logged_in_user_id;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    //get latest post comments
    getlstPosts(data){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getlstPosts?user_id="+ data.user_id;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    //get latest post comments
    getSubmitterReviews(data){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getSubmitterReviews?user_id=" + data.useridsinfo.user_id + "&reviewer_user_id="+ data.useridsinfo.reviewer_user_id;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    //get latest post comments
    getreviewerReviews(data){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };

        var baseurl = this.url + "getreviewerReviews?user_id=" + data.user_id;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }
 
    //post review comments 
    postuserreview(reviewComment){
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        var baseurl = this.url + "postuserreview";
        let response = axios.post(baseurl, reviewComment, requestOptions);
        return response;
    }

    //post review comments 
    updateuserreview(reviewComment){
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        var baseurl = this.url + "updateuserreview";
        let response = axios.post(baseurl, reviewComment, requestOptions);
        return response;
    }

    //post review comments 
    deleteuserreview(reviewComment){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "deleteuserreview";
        let response = axios.post(baseurl, reviewComment, requestOptions);
        return response;
    }

    //post review comments 
    blockuser(blockuserinfo){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "blockuser";
        let response = axios.post(baseurl, JSON.stringify(blockuserinfo), requestOptions);
        return response;
    }

    //post review comments 
    unblockuser(unblockuserinfo){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "unblockuser";
        let response = axios.post(baseurl, JSON.stringify(unblockuserinfo), requestOptions);
        return response;
    }

    //post review comments 
    getBlockUserlist(blockuserinfo){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "getBlockUserlist?logged_in_user_id=" +blockuserinfo.logged_in_user_id;
        let response = axios.get(baseurl, requestOptions);
        return response;
    }

    //update post comment 
    updatepost(postcomment){
        const requestOptions = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        var baseurl = this.url + "updatepostdata";
        let response = axios.post(baseurl, postcomment, requestOptions);
        return response;
    }

    //post review comments 
    deletepostitem(delPostComment){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "deletepostitem";
        let response = axios.post(baseurl, JSON.stringify(delPostComment), requestOptions);
        return response;
    }

    //post review comments 
    addpostcomment(postreview){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "addpostcomment";
        let response = axios.post(baseurl, JSON.stringify(postreview), requestOptions);
        return response;
    }

    addReplypostcomment(postreview){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "addReplypostcomment";
        let response = axios.post(baseurl, JSON.stringify(postreview), requestOptions);
        return response;
    }
 
        //post review comments 
        getPostComments(data){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getPostComments?post_id=" +data.post_id +"&user_id=" + data.user_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        
        //post review comments 
        getReplyPostComments(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getReplyPostComments?id=" + action.id + "&post_id=" + action.post_id+"&user_id="+action.user_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }

        getpostlikesdislikescount(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getpostlikeDislikeCount?post_id=" + action.post_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        
        getpostcommentslikeDislikeCount(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getpostcommentslikeDislikeCount?comment_id=" + action.comment_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        

        getfollowcount(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getfollowcount?user_id=" + action.whatsapp_number;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        
    //post modified post comments 
    editpostcomment(postcomment){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "editpostcomment";
        let response = axios.post(baseurl, JSON.stringify(postcomment), requestOptions);
        return response;
    }

    //post modified post comments 
    deletepostcomment(postcomment){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "deletepostcomment";
        let response = axios.post(baseurl, JSON.stringify(postcomment), requestOptions);
        return response;
    }
    
    //post modified post comments 
    postlikeDislikeState(likeOrDislikeState){
        const requestOptions = {
            headers: { "Content-Type": "application/json" },
        };
        var baseurl = this.url + "postlikeDislikeState";
        let response = axios.post(baseurl, JSON.stringify(likeOrDislikeState), requestOptions);
        return response;
    }

    
        //post modified post comments 
        postcommentlikedislikestate(commentlikeOrDislikeState){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "postCommentsLikesDislikes";
            let response = axios.post(baseurl, JSON.stringify(commentlikeOrDislikeState), requestOptions);
            return response;
        }

        
        //post modified post comments 
        postfollowstate(followState){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "postFollow";
            let response = axios.post(baseurl, JSON.stringify(followState), requestOptions);
            return response;
        }
        
        //post modified post comments 
        posthide(posthidedata){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "posthide";
            let response = axios.post(baseurl, JSON.stringify(posthidedata), requestOptions);
            return response;
        }
        
        //postreportcomment
        postreportcomment(postreportcomment){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "postreportcomment";
            let response = axios.post(baseurl, JSON.stringify(postreportcomment), requestOptions);
            return response;
        }

        //returns followers users list
        getfollowerslist(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getfollowerslist?user_id=" + action.user_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }

        
        //returns followers users list
        getfollowingslist(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getfollowingslist?follower_id=" + action.follower_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        
        //returns followers users list
        getsearchposts(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getsearchposts?searchkeyword=" + action.searchkeyword;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }
        
        //returns followers users list
        getsearchpostitem(action){
            const requestOptions = {
                headers: { "Content-Type": "application/json" },
            };
            var baseurl = this.url + "getsearchpostitem?post_id=" + action.post_id + "&user_id=" + action.user_id;
            let response = axios.get(baseurl, requestOptions);
            return response;
        }

}