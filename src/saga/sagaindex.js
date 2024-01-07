

import { put, all, call, takeLatest, takeEvery } from "redux-saga/effects";
import { ApiService } from "../apiService/ApiService";
import fijoliItems from "../models/fijoliItems";
import EnumPostCommentType from "../singletonControllers/PostReviewTypes";

const serv = new ApiService();

const postsignupfromData = (signupformdata) => {
    const response = serv
      .register(signupformdata)
      .then((result) => result);
  
      return Promise.resolve(response);
};

const postAPI = (postData, postType) => {
    let response = "";
    switch(postType){

        case "set-profileData":
            response = serv.setProfileData(postData).then((result)=> result);
            break;
        case "confirmRegistration":
            response = serv.confirmRegistration(postData).then((result)=>result);
            break;
        case "setInitialRegistrantInfo":
            response = serv.register(postData).then((result)=>result);
            break;
        case "add_post":
            response = serv.addpost(postData).then((result)=>result);
            break;
        case "set_deactivate_account":
            response = serv.deactivateuser(postData).then((result)=>result);
            break;
        case "set_new_password":
            response = serv.setnewpassword(postData).then((result)=>result);
            break;
        case "new_user_review_comment":
            response = serv.postuserreview(postData).then((result)=>result);
            break;
        case "update_user_review_comment":
            response = serv.updateuserreview(postData).then((result)=>result);
            break;
        case "delete_user_review_comment":
            response = serv.deleteuserreview(postData).then((result)=>result);
            break;
        case "set_block_user_info":
            response = serv.blockuser(postData.blockuserinfo).then((result)=>result);
            break;
        case "set_unblock_user_info":
            response = serv.unblockuser(postData.unblockuserInfo).then((result)=>result);
            break;
        case "delete_post":
            response = serv.deletepostitem(postData).then((result)=>result);
            break;
        case "update_post":
            response = serv.updatepost(postData).then((result)=>result);
            break;
        case EnumPostCommentType.newPost:
            response = serv.addpostcomment(postData).then((result)=>result);
            break;
        case EnumPostCommentType.replyMainPost:
        case EnumPostCommentType.replyReplyPost:
            response = serv.addReplypostcomment(postData).then((result)=>result);
            break;
        case EnumPostCommentType.editMainPost:
        case EnumPostCommentType.editReplyPost:
            response = serv.editpostcomment(postData).then((result)=>result);
            break;
        case EnumPostCommentType.deleteMainPost:
        case EnumPostCommentType.deleteReplyPost:
            response = serv.deletepostcomment(postData).then((result)=>result);
            break;

        case "post_like_dislike":
            response = serv.postlikeDislikeState(postData).then((result)=>result);
            break;

        case "post_comment_like_dislike_state":
        case "reply_post_comment_like_dislike_state":
            response = serv.postcommentlikedislikestate(postData).then((result)=>result);
            break;

        
        case "post_follow_state":
            response = serv.postfollowstate(postData).then((result)=>result);
            break;
            
        case "post_hide":
            response = serv.posthide(postData).then((result)=>result);
            break;
    
        case "post_report_comment":
            response = serv.postreportcomment(postData).then((result)=>result);
            break;

        default:
            break;
    }
    return Promise.resolve(response);
}


const getData= (queryType, data) =>{

    let response = "";

    switch(queryType){
        // case "get-sysconfiguration":
        //     response = serv.getsysconfiguration().then((result)=> result);
        //     break;
        case "forgetpassword":
            response = serv.getforgetpwdStatus(data).then((result)=> result);
            break;

        case "get_registeredInfo":
            response = serv.getregisteredInfo(data).then((result)=> result);
            break;

        case "login":
            response = serv.loginUser(data).then((result)=> result);
            break;

        case "get-fijoli-items":
            response = fijoliItems;
            break;

        case "get_certificates":
            response = serv.getcertificatesInfo(data).then((result)=> result);
            break;

        case "get_post":
            response = serv.getlstPosts(data).then((result)=> result);
            break;

        case "get_selected_post_category":
            response = serv.getlstPostcategory(data).then((result)=> result);
            break;

        case "get_other_profile":
            response = serv.getotherProfile(data).then((result)=> result);
            break;
        
        // case "get_post_comments":
        //     response = serv.getPostComments(data).then((result)=>result);
        //     break;

        case "get_submitter_reviews":
            response = serv.getSubmitterReviews(data).then((result)=>result);
            break;

        case "get_reviewer_reviews":
            response = serv.getreviewerReviews(data).then((result)=>result);
            break;

        case "get_block_user_info":
            response = serv.getBlockUserlist(data).then((result)=>result);
            break;

        case "get_post_comment":
            response = serv.getPostComments(data).then((result)=>result);
            break;  
        
        case "get_reply_post_comments" :
            response = serv.getReplyPostComments(data).then((result)=>result);
            break;
        
        case "get_post_likes_dislikes_count":
            response = serv.getpostlikesdislikescount(data).then((result)=>result);
            break;
        case "get_post_comment_like_Dislike_Count":
            response = serv.getpostcommentslikeDislikeCount(data).then((result)=>result);
            break;

        case "get_follow_count":
            response = serv.getfollowcount(data).then((result)=>result);
            break;

        case "get_followers_list":
            response = serv.getfollowerslist(data).then((result)=>result);
            break;
        
        case "get_followings_list":
            response = serv.getfollowingslist(data).then((result)=>result);
            break;

        case "get_search_posts":
            response = serv.getsearchposts(data).then((result)=>result);
            break;      
        
        case "get_search_post_item":
            response = serv.getsearchpostitem(data).then((result)=>result);
            break;
        default:
            break;
    }

    return Promise.resolve(response);
}

function* setInitialRegistrantInfo(action){
    try {
        
        const resp = yield call(postAPI, action.data, "setInitialRegistrantInfo");
        const response = JSON.parse(JSON.stringify(resp.data));
        yield put({
            type: "setInitialRegistrantInfo_success",
            data: response
        })
    } catch (error) {
    }
}

function* actionInitialRegistrantInfo(){
    yield takeLatest("set_initialregistrantinfo", setInitialRegistrantInfo);
}

function* getregisteredUserInfo(action){

    const resp      = yield call(getData, "get_registeredInfo", action.data);
    const result    = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_registeredInfo_success",
        result
    })   
}

function* actiongetregisteredUserInfo(){
    yield takeLatest("get_registeredInfo", getregisteredUserInfo);
}

function* setProfileData(action){
    const resp = yield call(postAPI, action.profileStoreData, "set-profileData");
    const response = JSON.parse(JSON.stringify(resp.data));
    yield put({
        type:"set_signupfinalData_success",
        data: response
    })
}

function* actionsetProfileData(){
    yield takeLatest("set-profileData", setProfileData)
}

function* invokeLogin(action){
    const resp      = yield call(getData, "login", action.loginData);
    const result    = JSON.parse(JSON.stringify(resp.data));

    if(200 !== resp.data.status){
        yield put({
            type: "error_occurred",
            data: "error occurred while loging in... please retry again..."
        })   
    }else{
        yield put({
            type: "invoke_login_success",
            result
        })   
    }

}

function* actionLoginData(){
    yield takeLatest("invoke_loginData", invokeLogin)
}

function* getfijoliItems(action){
    const resp = yield call(getData, "get-fijoli-items");
    // const response = JSON.parse(JSON.stringify(resp.data));
    // const response  =   resp;

    yield put({
        type: "getFijoliItems_success",
        data: resp
    })   
}

function* actionGetFijoliItems(){
    yield takeLatest("getFijoliItems", getfijoliItems)
}

function* confirmRegistration(action){
    const resp = yield call(postAPI, action, "confirmRegistration");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "confirmRegistration_success",
        result: response
    })   
}

function* actionuploadItems(){
    yield takeLatest("set_confirmregistrationinfo", confirmRegistration)
}

function* addpost(action){
    const resp = yield call(postAPI, action, "add_post");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "add_post_success",
        data: response
    })   
}

function* actionaddpost(){
    yield takeLatest("add_post", addpost)
}

function* setdeactivateaccount(action){
    const resp = yield call(postAPI, action.userinfo, "set_deactivate_account");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "set_deactivate_account_success",
        data: response
    })   
}

function* actiondeactivateitems(){
    yield takeLatest("set_deactivate_account", setdeactivateaccount)
}

function* getforgetpwdStatus(action){

    const resp      = yield call(getData, "forgetpassword", action.forgetpwdData);
    const result    = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "forgetpassword_success",
        result
    })   
}

function* actionforgetpassword(){
    yield takeLatest("forgetpassword", getforgetpwdStatus);
}

function* setpassword(action){
    const resp = yield call(postAPI, action, "set_new_password");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "set_new_password_success",
        data: response
    })   
}

function* actionsetpassword(){
    yield takeLatest("set_new_password", setpassword)
}

function* getCertificates(action){

    const resp = yield call(getData, "get_certificates", action.userinfo);
    const response = JSON.parse(JSON.stringify(resp.data));
    //initializing result if result doesnt exists
    if(!Object.keys(response).includes("result")){
        response["result"] = [];
    }

    yield put({
        type: "get_certificates_success",
        data: response
    })   
}

function* actiongetcertificates(){
    yield takeLatest("get_certificates", getCertificates)
}

function* getOtherProfile(action){

    const resp = yield call(getData, "get_other_profile", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_other_profile_success",
        data: response
    })   
}

function* actiongetOtherProfile(){
    yield takeLatest("get_other_profile", getOtherProfile)
}

function* getposts(action){

    const resp = yield call(getData, "get_post", action);
    const response = JSON.parse(JSON.stringify(resp.data));
   //resp.data.status
   if(0 === Object.keys(response).length){
        yield put({
            type: "error_occurred",
            data: "No posts exists"
        })
   }else if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "Error occurred while getting posts"
        })   
   }else{
       yield put({
           type: "get_post_success",
           data: response
       })   
   }
}

function* actiongetposts(){
    yield takeLatest("get_post", getposts)
}

function* getselectedpostcategory(action){

    const resp = yield call(getData, "get_selected_post_category", action);
    const response = JSON.parse(JSON.stringify(resp.data));
   //resp.data.status
   if(0 === Object.keys(response).length){
        yield put({
            type: "error_occurred",
            data: "No posts exists"
        })
   }else if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "Error occurred while getting posts"
        })   
   }else{
       yield put({
           type: "get_selected_post_category_success",
           data: response
       })   
   }
}

function* actiongetselectedpostcategory(){
    yield takeLatest("get_selected_post_category", getselectedpostcategory)
}

function* getsubmitterReviews(action){

    const resp = yield call(getData, "get_submitter_reviews", action);
    const response = JSON.parse(JSON.stringify(resp.data))
    // const response = reviewcmtctrl.getlstofReviews();

    yield put({
        type: "get_submitter_reviews_success",
        data: response
    })   
}

function* actiongetsumitterReviews(){
    yield takeLatest("get_submitter_reviews", getsubmitterReviews)
}

function* postuserreviewcomment(action){
    
    let actiontype = "";
    switch(action.modetype){
        case "new":
            actiontype = "new_user_review_comment";
            break
        case "edit":
            actiontype = "update_user_review_comment";
            break;
        case "delete":
            actiontype = "delete_user_review_comment";
            break;
        default:
            break;
    }

    const resp = yield call(postAPI, action.comment, actiontype);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "post_user_review_comment_success",
        data: response
    })   
}

function* actionpostreview(){
    yield takeLatest("post_user_review_comment", postuserreviewcomment)
}


function* getreviewerReviews(action){

    const resp = yield call(getData, "get_reviewer_reviews", action);
    const response = JSON.parse(JSON.stringify(resp.data))

    yield put({
        type: "get_reviewer_reviews_success",
        data: response
    })   
}

function* actiongetreviewerReviews(){
    yield takeLatest("get_reviewer_reviews", getreviewerReviews)
}

function* postblockuserinfo(action){

    const resp = yield call(postAPI, action, "set_block_user_info");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "set_block_user_info_success",
        data: response
    })   
}

function* actionblockuserinfo(){
    yield takeLatest("set_block_user_info", postblockuserinfo)
}

function* postunblockuserinfo(action){

    const resp = yield call(postAPI, action, "set_unblock_user_info");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "set_unblock_user_info_success",
        data: response
    })   
}

function* actionunblockuserinfo(){
    yield takeLatest("set_unblock_user_info", postunblockuserinfo)
}

function* getblockuserinfo(action){

    const resp = yield call(getData, "get_block_user_info", action.loggedInUserInfo);
    const response = JSON.parse(JSON.stringify(resp.data))

    yield put({
        type: "get_block_user_info_success",
        data: response
    })   
}

function* actiongetblockuserinfo(){
    yield takeLatest("get_block_user_info", getblockuserinfo)
}

function* deletepost(action){

    const resp = yield call(postAPI, action.postinfo, "delete_post");
    const response = JSON.parse(JSON.stringify(resp.data));

    if(200 !== response.status){
        yield put({
            type: "edit_post_error_occurred",
            data: "error occurred while performing like/dislike"
        })
    }else {
        yield put({
            type: "delete_post_success",
            data: response
        }) 
    } 
}

function* actiondeletepost(){
    yield takeLatest("delete_post", deletepost)
}

//edits/post based on category
function* updatepost(action){

    const resp = yield call(postAPI, action.postcomment, "update_post");
    const response = JSON.parse(JSON.stringify(resp.data));

    if(200 !== response.status){
        yield put({
            type: "edit_post_error_occurred",
            data: "error occurred while performing like/dislike"
        })
    }else {
        yield put({
            type: "update_post_success",
            data: response
        })   
    }
}

function* actionupdatepost(){
    yield takeLatest("update_post", updatepost)
}

function* postcomment(action){

    const resp = yield call(postAPI, action.postcomment, action.mode);
    const response = JSON.parse(JSON.stringify(resp.data));
    
    let resulttype = EnumPostCommentType.none;
    switch(action.mode){
        case EnumPostCommentType.newPost:
            resulttype = EnumPostCommentType.newPostcommentSuccess;
            break;
        case EnumPostCommentType.replyMainPost:
        case EnumPostCommentType.replyReplyPost:
            resulttype = EnumPostCommentType.newReplyPostcommentSuccess;
            break;
        case EnumPostCommentType.editMainPost:
            resulttype = EnumPostCommentType.postcommenteditSuccess;
            break;
        case EnumPostCommentType.deleteMainPost:
            resulttype = EnumPostCommentType.postcommentdeleteSuccess;
            break;
        case EnumPostCommentType.editReplyPost:
            resulttype = EnumPostCommentType.editreplypostcommentSuccess;
            break;
        case EnumPostCommentType.deleteReplyPost:
            resulttype = EnumPostCommentType.deletereplypostcommentSuccess;
            break;
        default:
            break;
    }

    if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "failed to post " + resulttype
        });
    }else{
        yield put({
            type: resulttype,
            data: response,
            post_id : action.postcomment.post_id
        })   
    }
}

function* actionpostcomment(){
    yield takeLatest("post_comment", postcomment)
}

function* getpostcomments(action){

    const resp = yield call(getData, "get_post_comment", action);
    const lstofComments = JSON.parse(JSON.stringify(resp.data))

    if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "Failed to get post comments"
        }); 
    }else{
        yield put({
            type: "get_post_comment_success",
            data: lstofComments
        }); 
    }
}

function* actiongetpostcomments(){
    yield takeLatest("get_post_comment", getpostcomments)
}

function* getreplypostcomments(action){

    const resp = yield call(getData, "get_reply_post_comments", action);
    const response = JSON.parse(JSON.stringify(resp.data))

    if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "Failed to get post comments"
        }); 
    }else{   
        yield put({
            type: "get_reply_post_comments_success",
            data: response,
            post_id : action.post_id
        })   
    }
}

function* actiongetreplypost(){
    yield takeLatest("get_reply_post_comments", getreplypostcomments)
}

//edits/post based on category
function* postlikestate(action){

    const resp = yield call(postAPI, action.postState, "post_like_dislike");
    const response = JSON.parse(JSON.stringify(resp.data));

    if(200 !== response.status){
        yield put({
            type: "error_occurred",
            data: "error occurred while performing like/dislike"
        })
    }else{
        yield put({
            type: "post_like_dislike_success",
            data: response
        })   
    }
}

function* actionpostlikestate(){
    yield takeLatest("post_like_dislike", postlikestate)
}

//edits/post based on category
function* postcommentlikedislikestate(action){

    const resp = yield call(postAPI, action.postcommentldState, "post_comment_like_dislike_state");
    const response = resp.data;

    if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "failed to update like/dislike state"
        }) 
    }else{
        yield put({
            type: "post_comment_like_dislike_state_success",
            data: response
        })   
    }
}

function* actionpostcommentlikedislikestate(){
    yield takeLatest("post_comment_like_dislike_state", postcommentlikedislikestate)
}

//edits/post based on category
function* replypostcommentlikedislikestate(action){

    const resp = yield call(postAPI, action.postcommentldState, "reply_post_comment_like_dislike_state");
    const response = resp.data;

    if(200 !== resp.status){
        yield put({
            type: "error_occurred",
            data: "failed to update like/dislike state"
        }) 
    }else{
        yield put({
            type: "reply_post_comment_like_dislike_state_success",
            data: response
        })   
    }
}

function* actionreplypostcommentlikedislikestate(){
    yield takeLatest("reply_post_comment_like_dislike_state", replypostcommentlikedislikestate)
}

//edits/post based on category
function* getpostlikesdislikescount(action){

    const resp = yield call(getData, "get_post_likes_dislikes_count", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_post_likes_dislikes_count_success",
        data: response
    })   
}

function* actiongetpostlikesdislikescount(){
    yield takeEvery("get_post_likes_dislikes_count", getpostlikesdislikescount)
}

//edits/post based on category
function* getpostcommentlikeDislikeCount(action){

    const resp = yield call(getData, "get_post_comment_like_Dislike_Count", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_post_comment_like_Dislike_Count_success",
        data: response
    })   
}

function* actiongetpostcommentlikeDislikeCount(){
    yield takeEvery("get_post_comment_like_Dislike_Count", getpostcommentlikeDislikeCount)
}

//edits/post based on category
function* postfollow(action){

    const resp = yield call(postAPI, action.followState, "post_follow_state");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "post_follow_state_success",
        data: response
    })   
}

function* actionpostfollow(){
    yield takeLatest("post_follow_state", postfollow)
}

//edits/post based on category
function* getfollowCount(action){

    const resp = yield call(getData, "get_follow_count", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_follow_count_success",
        data: response
    })   
}

function* actiongefollowCount(){
    yield takeEvery("get_follow_count", getfollowCount)
}

//edits/post based on category
function* hidePost(action){

    const resp = yield call(postAPI, action.posthideData, "post_hide");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "post_hide_success",
        data: action.posthideData
    })   
}

function* actionhidePost(){
    yield takeLatest("post_hide", hidePost)
}

// post_report_comment
function* postreportcomment(action){

    const resp = yield call(postAPI, action.postreportcomment, "post_report_comment");
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "post_report_comment_success",
        data: response
    })   
}

function* actionpostreportcomment(){
    yield takeLatest("post_report_comment", postreportcomment)
}


//edits/post based on category
function* getfollowerslist(action){

    const resp = yield call(getData, "get_followers_list", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_followers_list_success",
        data: response
    })   
}

function* actiongetfollowerslist(){
    yield takeEvery("get_followers_list", getfollowerslist)
}


//edits/post based on category
function* getfollowinglist(action){

    const resp = yield call(getData, "get_followings_list", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    yield put({
        type: "get_followings_list_success",
        data: response
    })   
}

function* actiongetfollowinglist(){
    yield takeEvery("get_followings_list", getfollowinglist)
}


//edits/post based on category
function* getsearchpost(action){

    const resp = yield call(getData, "get_search_posts", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    if(400 === response.status){
        yield put({
            type: "error_occurred",
            data: "error occurred while searching"
        })
    }else if(200 === response.status && 0 === response.result.length){
        yield put({
            type: "error_occurred",
            data: "No search records exists!"
        })
    }else{
        yield put({
            type: "get_search_posts_success",
            data: response
        })   
    }
}

function* actiongetsearchpost(){
    yield takeEvery("get_search_posts", getsearchpost)
}

//edits/post based on category
function* getsearchpostitem(action){

    const resp = yield call(getData, "get_search_post_item", action);
    const response = JSON.parse(JSON.stringify(resp.data));

    if(200 !== response.status){
        yield put({
            type: "error_occurred",
            data: "Error occurred while fetching the search item"
        })   
    }else{
        yield put({
            type: "get_search_post_item_success",
            data: response
        })   
    }
}

function* actiongetsearchpostitem(){
    yield takeEvery("get_search_post_item", getsearchpostitem)
}

// complete the SAGA middleware to export all SAGAs generator functions so that
// redux store can use it
export default function* rootSaga() {
    yield all([
        actiondeactivateitems(),
        actionInitialRegistrantInfo(),
        actiongetregisteredUserInfo(),
        actionsetProfileData(),
        actionLoginData(),
        actionGetFijoliItems(),
        actionuploadItems(),
        actionaddpost(),
        actionforgetpassword(),
        actionsetpassword(),
        actiongetcertificates(),
        actiongetOtherProfile(),
        actiongetposts(),
        actiongetsumitterReviews(), 
        actiongetreviewerReviews(),
        actionpostreview(),
        actionblockuserinfo(),
        actionunblockuserinfo(),
        actiongetblockuserinfo(),
        actiondeletepost(),
        actionupdatepost(),
        actionpostcomment(),
        actiongetpostcomments(),
        actiongetreplypost(),
        actionpostlikestate(),
        actiongetpostlikesdislikescount(),
        actionpostcommentlikedislikestate(),
        actiongetpostcommentlikeDislikeCount(),
        actionpostfollow(),
        actiongefollowCount(),
        actionhidePost(),
        actionpostreportcomment(),
        actiongetfollowerslist(),
        actiongetfollowinglist(),
        actiongetsearchpost(),
        actiongetsearchpostitem(),
        actionreplypostcommentlikedislikestate(),
        actiongetselectedpostcategory()
    ]);
}
  
  