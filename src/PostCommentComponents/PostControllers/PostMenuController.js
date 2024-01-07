import EnumNavigate from "../../singletonControllers/NavigateController";
import EnumPostMenuOptions from "./PostMenuOptions";


class PostMenuController {
 
    //reply_id, post_id, post_user_id, comment_user_id, comment_desc
    static getDeleteConfirmation(postitem) {
        return  {
            "showConfirmationDlg" : true,
            "confirmationMessage" : "Are you sure to delete the post?",
            "menuOptions"         : ["No", "Yes"],
            "postmenutype"        : EnumPostMenuOptions.Delete
        };
    }

    static getHideConfirmation(confirmationMsg = "Are you sure you want to hide the post?"){
        return{
            "showConfirmationDlg" : true,
            "confirmationMessage" : confirmationMsg,
            "menuOptions"         : ["No", "Yes"],
            "postmenutype"       : EnumPostMenuOptions.Hide
        }
    }

    static getDefaultConfirmation(){
        return{
            "showConfirmationDlg" : false
        }
    }

    static getPostConfirmation(){
        return{
            "showConfirmationDlg" : true,
            "postmenutype"        : EnumPostMenuOptions.Report
        }
    }

    static getHideMenuData(postitem) {
        return {
            "user_id" : postitem.logged_in_user_id,
            "post_id" : postitem.id,
            "is_active" : 1,
            "post_category" : postitem.post_category
        }
    }

    static getPostReportComment(postitem){
        return{
            "reporter_user_id" : postitem.logged_in_user_id,
            "post_id" : postitem.id,
            "reason"    : ""
        }
    }
}

export default PostMenuController;