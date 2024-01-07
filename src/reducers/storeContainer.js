
import { act } from "react-dom/test-utils";
import PostCommentsController from "../Controllers/PostCommentsController";
import initialState from "../models/initialState";
import SysConfigData from "../models/sysConfigItems";
import EnumNavigate from "../singletonControllers/NavigateController";
import EnumPostCommentType from "../singletonControllers/PostReviewTypes";
import StoreItemController from "./StoreItemController";

export const storeComponent = (state = initialState, action) => {

    switch(action.type){

        case "navigateTo":
            state = {...state, navigateItemType: action.navigateItemTo};
            return state;

        case "update_post_success":
            {
                let configData = state.configData;
                let categoryName = action.data.lstofPosts.post_category.replace("Post","").trim();
                let elementindex = -1;
                for (let index = 0; index < configData.postItems[categoryName].length; index++) {
                    const element = configData.postItems[categoryName][index];
                    if(element.id === action.data.lstofPosts.id){
                        elementindex = index;
                        break;
                    }
                }
                let lstofposts = {};
                if(-1 < elementindex){
                    configData.postItems[categoryName][elementindex].post_desc = action.data.lstofPosts.post_desc;
                    lstofposts = {[action.data.lstofPosts.id]:configData.postItems[categoryName][elementindex]}
                }
                // else{
                //     state.postcomment.post_desc = state.postinfo.post_desc;
                //     lstofposts = {[state.postcomment.id]: state.postcomment};
                // }
                delete state["postcomment"];
                delete state["postinfo"];
                state = {...state,  navigateItemType: EnumNavigate.postContainer, configData: {...configData}, lstofPosts: lstofposts};
            }
            
            return state; 
        case "get_registeredInfo_success":  
        case "confirmRegistration_success":
        case "invoke_login_success":

            if(action.result.status != 200){
                state = {...state, loginState: {"status": 400}}
            }else{
                const configData = new SysConfigData(action.result);
                state = {...state, configData: {
                    "user_category" : [...configData.getlstofuserCategory()],
                    "languages"     : [...configData.getlstofLanguages()],
                    "currency"      : [...configData.getlstofCurrency()],
                    "Post"          : [...configData.getlstofPosts()],
                    "lstofusers"    : configData.getlstofUsers(),
                    "postItems"         : configData.getlstofPostItems(),
                    "profileData"   : configData.getRegisteredUserInfo()}
                }
                state = {...state, loginState: {"status": 200}}
            }
            return state;
    
        case "post_hide_success":
            {
                let lstofPosts = {...state.lstofPosts};
                delete lstofPosts[action.data.post_id];
    
                let categoryName = action.data.post_category.replace("Post", "").trim();
                const configData = state.configData;
                let elementindex = -1;
                for (let index = 0; index < configData.postItems[categoryName].length; index++) {
                    const element = configData.postItems[categoryName][index];
                    if(element.id === action.data.post_id){
                        elementindex = index;
                        break;
                    }
                }
                // delete configData.postItems[categoryName][elementindex];
                if(-1 < elementindex){
                    configData.postItems[categoryName].splice(elementindex, 1)
                }
                state = {...state, configData: {...configData}, lstofPosts: {...lstofPosts}};
            }
            
            return state;
        
        case "setInitialRegistrantInfo_success":
        case "set_signupfinalData_success":
            state = {...state, registrationState: action.data };
            return state;
        // case "confirmRegistration_success":
        //     state = {...state, confirmRegState: {"status":action.data.status} };
        //     return state;
        case "set_deactivate_account_success":
            state = {...state, deactivateStatus: {"status":action.data.status} };
            return state;
            
        case "add_post_success":
         //add post 
         {
            let configData = state.configData;
            let category_name = StoreItemController.getPostCategoryType(action.data.new_post[0].post_category);
            configData.postItems[category_name][0] = action.data.new_post[0];
            // configData.postItems
            state = {...state, configData: {...configData}, navigateItemType: EnumNavigate.homepageState };
         }
         return state;

        case "clear_Previous_Post_State":
            delete state["postcomment"];
            delete state["postinfo"];
            return state;
            
        case "forgetpassword_success":
            state = {...state, forgetpwdState: {"status":action.result.status} };
            return state;
        case "set_new_password_success" :
            state = {...state, createpwdState: {"status":action.data.status} };
            return state;
        

        case "store_registrantInfo":

            let tmpConfigData               = state.configData;
            let userInfo                    = tmpConfigData.profileData;
            userInfo.encrypted_password     = action.data.createpwd;
            userInfo.location               = action.data.location;
            userInfo.dob                    = action.data.dob;
            userInfo.user_category          = action.data.user_category;

            state = {...state, configData: tmpConfigData};
            return state;


        case "get_post_items_success":
         return state;
        case "getFijoliItems_success":

            state = {...state, items: action.data};
            return state;
        
        case "get_certificates_success":

            state = {...state, lstCertificates: [...action.data.result]}
            return state;

        case "set_login_profile" :
            state = {...state, otherProfileData: state.configData.profileData}
            return state;

        case "get_other_profile_success" :
            state = {...state, otherProfileData: {...action.data}}
            return state;

        //holds the category post items
        case "get_post_success":
            const userCategories = state.configData.user_category;
            Object.keys(action.data).map((item)=>{
                action.data[item]["user_category"] = userCategories[action.data[item].user_category-1];
            });
            state = {...state, lstofPosts: action.data, navigateItemType: action.navigateItemTo};
            return state;
            
        case "get_selected_post_category_success":
            {
                let configData = state.configData;
                let lstofposts = [];    
                Object.keys(action.data.postItems).map(item =>{
                    lstofposts = [...lstofposts, action.data.postItems[item]];
                });
                let category_name = StoreItemController.getPostCategoryType(action.data.post_category);

                configData.postItems[category_name] = StoreItemController.removeDuplicates(configData.postItems[category_name], lstofposts);
                state = {...state, lstofPosts: action.data.postItems, configData: {...configData}, navigateItemType: EnumNavigate.postContainer};
            }
            return state;

        //holds user profile review comments
        case "get_submitter_reviews_success":
        case "get_reviewer_reviews_success" :
            state = {...state, lstofreviewComments: action.data.result};
            return state;

        case "get_block_user_info_success" :
            state = {...state, lstofblockusers: action.data.result};
            return state;

        case "set_user_review_type":
            state = {...state, reviewtype: action.review};
            return state;

        case "post_user_review_comment_success":
            delete state["reviewtype"];
            state = {...state, reviewpoststate: action.data};
            return state;

        case "set_dummy_review_comment_state":
            delete state["reviewtype"];
            state = {...state, reviewpoststate: {"status": 200}};
            return state;
        
        case "set_block_user_info_success" :
        case "set_unblock_user_info_success" :
            let otherProfileData = state.otherProfileData;
            otherProfileData["isblocked"] = action.data.state;
            state = {...state, otherProfileData: {...otherProfileData}};
            if((!action.data.state) && (Object.keys(state).includes("lstofblockusers"))){
                state.lstofblockusers = state.lstofblockusers.filter(item => item.user_id != action.data.blocked_user_id);
            }
            return state;

        case "reset_status":
            //delete state entries after performing operations
            delete state["postinfoStatus"];
            delete state["deactivateStatus"];
            delete state["loginState"];
            delete state["forgetpwdState"];
            delete state["createpwdState"];
            delete state["postItemState"];
            delete state["confirmRegState"];
            delete state["reviewpoststate"];
            delete state["blockState"];
            delete state["postcomment"];
            delete state["lstofPosts"];
            delete state["lstofblockusers"];
            delete state["lstofreviewComments"];
            delete state["postinfo"];
            delete state["postcommentState"];
            delete state["postlikedislikeState"];
            delete state["registrationState"];
            return state;

        //post in configData
        case "delete_post_success":
        {
            let lstofPosts = state.lstofPosts;
            delete lstofPosts[action.data.del_post_id]
            {
                let categoryName = action.data.post_category.replace("Post", "").trim();
                const configData = state.configData;
                let elementindex = -1;
                for (let index = 0; index < configData.postItems[categoryName].length; index++) {
                    const element = configData.postItems[categoryName][index];
                    if(element.id === action.data.del_post_id){
                        elementindex = index;
                        break;
                    }
                }
                // delete configData.postItems[categoryName][elementindex];
                if(-1 < elementindex){
                    configData.postItems[categoryName].splice(elementindex, 1)
                }
                state = {...state, configData: {...configData}, lstofPosts: {...lstofPosts}};
            }
            
            if(0 === Object.keys(lstofPosts).length){
                delete state["lstofPosts"];
                state = {...state, errormsg: {errormsg: "No posts available"}}
            }else{
                state = {...state,  lstofPosts: lstofPosts};
            }
        }
        return state;   
            
        case "post_like_dislike_success":
            {
                //update in configData
                let categoryName = StoreItemController.getPostCategoryType(action.data.post_category);
                let postIndex = StoreItemController.getElementIndex(action.data.post_id, state.configData.postItems[categoryName]);
                state.configData.postItems[categoryName][postIndex] = PostCommentsController.getLikeDislikeCommentState(state.configData.postItems[categoryName][postIndex],  action.data);
                let lstofposts = (state.lstofPosts)?state.lstofPosts:{};
                lstofposts[action.data.post_id] = {...state.configData.postItems[categoryName][postIndex]};
                state = {...state, lstofPosts: lstofposts};
            }
            return state;

        case "reply_post_comment_like_dislike_state_success":
            {
                let lstofPosts = state.lstofPosts;
                let postcomments = lstofPosts[action.data.post_id]["comments"];

                let postcomment = {...postcomments[action.data.main_comment_id].subcomments[action.data.comment_id]};
                postcomment = PostCommentsController.getLikeDislikeCommentState(postcomment, action.data);
                postcomments[action.data.main_comment_id].subcomments[action.data.comment_id] = postcomment; 

                lstofPosts[action.data.post_id]["comments"] = postcomments;
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;   
        
        case "post_comment_like_dislike_state_success":
            {
                let lstofPosts = state.lstofPosts;
                let postcomments = lstofPosts[action.data.post_id]["comments"];

                let postcomment = {...postcomments[action.data.comment_id]};
                postcomment = PostCommentsController.getLikeDislikeCommentState(postcomment, action.data);
                postcomments[action.data.comment_id]    = postcomment; 

                lstofPosts[action.data.post_id]["comments"] = postcomments;
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;   

        case "clear_post_like_dislike_state":
            delete state["postlikedislikeState"];
            return state;

        case "clear_post_comment_like_dislike_state":
            delete state["postcommentlikedislikeState"];
            return state;

        case "edit_post_item" :
            state = {...state, postcomment: action.postcomment, postinfo: action.postinfo};
            return state;

        case "set_post_category_type":
            state = {...state,  postinfo: {...action.selectedPostCategory}};
            return state;  
            
        case EnumPostCommentType.newPostcommentSuccess:
            {
                // let lstofPosts = {...state.lstofPosts};
                let lstofPosts = state.lstofPosts;
                if(0 === Object.keys(lstofPosts[action.post_id]["comments"]).length){
                    lstofPosts[action.post_id]["comments"] = {...lstofPosts[action.post_id]["comments"], ...action.data.comments};
                }else{
                    Object.keys(action.data.comments).map((commentId)=>{
                        // let newcomment = {};
                        // Object.keys(action.data.comments[commentId]).map(key=>{
                        //     newcomment[key] = action.data.comments[commentId][key];
                        // });
                        lstofPosts[action.post_id]["comments"] = {...lstofPosts[action.post_id]["comments"], ...{[commentId]:action.data.comments[commentId]}};
                    });
                }

                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        //edit post comment
        case EnumPostCommentType.postcommenteditSuccess:
            {
                let lstofPosts = state.lstofPosts;
                let editcomment     = {};
                Object.keys(lstofPosts[action.post_id]["comments"][action.data.id]).map(key=>{
                    editcomment[key] = lstofPosts[action.post_id]["comments"][action.data.id][key];
                });
                editcomment["comment_desc"] = action.data.comment_desc;
                lstofPosts[action.post_id]["comments"][action.data.id] = {...editcomment};
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;
        
        //create new reply post comment 
        case EnumPostCommentType.newReplyPostcommentSuccess:
            {
                let lstofPosts = state.lstofPosts;

                let postcomment = lstofPosts[action.post_id]["comments"][action.data.comment_id];
                if(!Object.keys(postcomment).includes("subcomments")){
                    postcomment["subcomments"] = {};
                }
                postcomment.count_reply_comments = postcomment.count_reply_comments + 1;
                if(0 === Object.keys(postcomment["subcomments"]).length){
                    postcomment["subcomments"] = {...postcomment["subcomments"], ...action.data.comments};
                }else{
                    Object.keys(action.data.comments).map((commentId)=>{
                        let newcomment = {};
                        Object.keys(action.data.comments[commentId]).map(key=>{
                            newcomment[key] = action.data.comments[commentId][key];
                        });
                        postcomment["subcomments"] = {...postcomment["subcomments"], ...{[commentId]:action.data.comments[commentId]}};
                    });
                }

                lstofPosts[action.post_id]["comments"][action.data.comment_id] = {...postcomment};
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        //delete post comment
        case EnumPostCommentType.postcommentdeleteSuccess:
            {
                let lstofPosts      = state.lstofPosts;
                let postcommentslst = {...lstofPosts[action.post_id]["comments"]};
                postcommentslst[action.data.id].subcomments = {};
                delete postcommentslst[action.data.id];
                // lstofPosts[action.post_id]["comments"] = {...postcommentslst};
                lstofPosts[action.post_id]["comments"] = postcommentslst;
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        case EnumPostCommentType.deletereplypostcommentSuccess:
            {
                let lstofPosts      = state.lstofPosts;
                let postcommentslst = {...lstofPosts[action.post_id]["comments"]};
                delete postcommentslst[action.data.main_comment_id].subcomments[action.data.id];
                postcommentslst[action.data.main_comment_id].count_reply_comments = Object.keys(postcommentslst[action.data.main_comment_id].subcomments).length ;
                lstofPosts[action.post_id]["comments"] = postcommentslst;
                state = {...state, lstofPosts: lstofPosts};

            }
            return state;

        case EnumPostCommentType.editreplypostcommentSuccess:
            {
                // { id: 565, comment_desc: "AA-a edited", post_id: 94,
                //     main_comment_id: 554, logged_in_user_id: 1 }
                let lstofPosts = state.lstofPosts;
                let editcomment     = {};
                Object.keys(lstofPosts[action.post_id].comments[action.data.main_comment_id].subcomments[action.data.id]).map(key=>{
                    editcomment[key] = lstofPosts[action.post_id].comments[action.data.main_comment_id].subcomments[action.data.id][key]
                });
                editcomment["comment_desc"] = action.data.comment_desc;
                lstofPosts[action.post_id].comments[action.data.main_comment_id].subcomments[action.data.id] = {...editcomment};
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        //add lst of post comments
        case "get_post_comment_success":
            {
                delete state["postcommentState"];
                let category_name = StoreItemController.getPostCategoryType(action.data.post_category);
                let postIndex     = StoreItemController.getElementIndex(action.data.post_id, state.configData.postItems[category_name])

                let configData    = state.configData;
                configData.postItems[category_name][postIndex]["comments"] = action.data.comments;

                let lstofPosts = (state.lstofPosts)?state.lstofPosts:{};
                lstofPosts = {...lstofPosts, ...{[action.data.post_id]: configData.postItems[category_name][postIndex]}};
                
                state = {...state, lstofPosts: {...lstofPosts}, configData: {...configData}};
            }

            return state;

        case "get_reply_post_comments_success":
            {
                let lstofPosts = state.lstofPosts;

                let postcomment = lstofPosts[action.post_id]["comments"][action.data.comment_id];
                postcomment["subcomments"] = {};
                if(0 === Object.keys(postcomment["subcomments"]).length){
                    postcomment["subcomments"] = {...postcomment["subcomments"], ...action.data.comments};
                }

                lstofPosts[action.post_id]["comments"][action.data.comment_id] = {...postcomment};
                state = {...state, lstofPosts: lstofPosts};
            }

            return state;
        
        case "clear_post_comment_status":
            {
                let lstofPosts = state.lstofPosts;
                if(lstofPosts && Object.keys(lstofPosts).includes(action.post_id)){
                    lstofPosts[action.post_id].comments = undefined
                }
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        case "update_reply_post_comment_count":
            {
                let lstofpostcomments = {...state.lstofpostcomments};
                let commentsCount = lstofpostcomments[action.postcomment.post_id][action.postcomment.index].count_reply_comments;
                lstofpostcomments[action.postcomment.post_id][action.postcomment.index].count_reply_comments = commentsCount + 1;
                state = {...state, lstofpostcomments: {...state.lstofpostcomments, ...lstofpostcomments}};
            }
            return state;

        case "clear_reply_post_comment_status":
            delete state["subpostCURDState"];

            let lstofpostreplycomments = {...state.lstofpostreplycomments};
                
            let comments = lstofpostreplycomments[action.postcomment.parent_id].filter((item, indx)=> 
               (item.id != action.postcomment.id)
            );
            if(0 < comments.length){
                lstofpostreplycomments[action.postcomment.parent_id] = [...comments];
            }else{
                delete lstofpostreplycomments[action.postcomment.parent_id];
            }
            state = {...state, lstofpostreplycomments: {...lstofpostreplycomments}};

            let lstofpostcomments = {...state.lstofpostcomments};
            lstofpostcomments[action.postcomment.post_id][action.postcomment.parent_index].count_reply_comments = comments.length;
            state = {...state, lstofpostcomments: {...state.lstofpostcomments, ...lstofpostcomments}};
            return state;

        case "clear":
            state = {...initialState};
            return state;
        
        case "clear_new_post_comment_status":
            delete state["postreviewsState"];
            return state;

        case "clear_posts":
            delete state["lstofPosts"];
            return state;
        
        case "clear_post_comments":
            delete state.lstofpostcomments[action.postId];
            return state;
        
        case "clear_reply_post_comments":
            {
                let lstofPosts = state.lstofPosts;
                if((lstofPosts) &&(Object.keys(lstofPosts[action.post_id]).includes("comments")) &&
                   (Object.keys(lstofPosts[action.post_id].comments).includes(action.main_comment_id))){
                    lstofPosts[action.post_id].comments[action.main_comment_id].subcomments = undefined;
                }
                state = {...state, lstofPosts: lstofPosts};
            }
            return state;

        case "get_post_likes_dislikes_count_success":
            let postldcount = {...state.postlikesDislikes};
            delete postldcount[action.data.post_id];
            postldcount[action.data.post_id] = action.data;
            delete state["postlikesDislikes"];
            state = {...state, postlikesDislikes : {...postldcount}}
            return state;

        case "get_post_comment_like_Dislike_Count_success":
            let postcldcount = {...state.postcommentslikesDislikes};
            delete postcldcount[action.data.comment_id];
            postcldcount[action.data.comment_id] = action.data;
            delete state["postcommentslikesDislikes"];
            state = {...state, postcommentslikesDislikes : {...postcldcount}}
            return state;

        case "post_follow_state_success":
            {
                if(200 === action.data.status){
                    let configData = state.configData;
                    configData.profileData["follower_count"] = action.data.logged_in_user_followData.follower_count;
                    configData.profileData["following_count"] = action.data.logged_in_user_followData.following_count;

                    state = {...state, configData: {...configData}};

                    let otherProfileData = state.otherProfileData;
                    if(otherProfileData){
                        otherProfileData["isfollower"]      = action.data.isfollower;
                        otherProfileData["follower_count"]  = action.data.other_user_follow.follower_count;
                        otherProfileData["following_count"] = action.data.other_user_follow.following_count;
                        state = {...state, otherProfileData: {...otherProfileData}};
                    }
                }
            }
            return state;
        
        case "get_follow_count_success":
            let configData = state.configData;
            configData.profileData["follower_count"] = action.data.follower_count;
            configData.profileData["following_count"] = action.data.following_count;

            state = {...state, configData: {...configData}};
            state = {...state, otherProfileData: configData.profileData}
            return state;

        case "post_report_comment_success":
            state = {...state, postreportcmtState: action.data}
            return state;
        
        case "clear_post_report_comment":
            delete state["postreportcmtState"];
            return state;

        case "get_followers_list_success":
            state = {...state, followersinfo: action.data.result};
            return state;

        case "clear_followers_info":
            delete state["followersinfo"];
            return state;
            
        case "get_followings_list_success":
            state = {...state, followinginfo: action.data.result};
            return state;
        
        case "clear_following_info":
            delete state["followinginfo"];
            return state;

        case "get_search_posts_success":
            state = {...state, searchpostState: action.data.status, searchlst: action.data.result};
            return state;

        case "error_occurred":
            state = {...state, errormsg: {"errormsg" : action.data}};
            return state;

        case "edit_post_error_occurred":
            state = {...state, errormsg: {"errormsg" : action.data}, navigateItemType: EnumNavigate.homepageState};
            return state;
            
        case "clear_search_posts":
            delete state["searchpostState"];
            delete state["searchlst"];
            return state;
            
        case "clear_error_message":
            delete state["errormsg"];
            return state;
        
        case "get_search_post_item_success":
            delete action.data["status"];
            state = {...state, lstofPosts: action.data};
            return state;

        case "clear_block_users":
            delete state["lstofblockusers"];
            return state;
            
        default:
            return state;
    }
}
export default storeComponent;