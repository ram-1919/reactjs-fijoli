import EnumNavigate from "../../singletonControllers/NavigateController";


class FollowConfirmationMsgr{

    static getDefaultConfirmationMsg(){
        return{
            "openfollowsb" : false,
            "errMsg"       : ""
        }
    }

    static getOpenConfirmationMsg(followtye){
        return {
            "openfollowsb" : true,
            "errMsg"        : (EnumNavigate.followers === followtye)? "No Followers":"No Following",
            "vertical"      : "top",
            "horizontal"    : "center"
        }
    }
}

export default FollowConfirmationMsgr;