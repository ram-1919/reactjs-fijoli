
class PostAsyncController {

    getpostItem = (postinfo, lstoffiles) => {
        const uploadfilesInfo = this.getmergefileInfo(lstoffiles, undefined);
        return this.createformData(postinfo, uploadfilesInfo,"postInfo");
    }

    createformData = (postinfo, uploadfilesInfo, postCategory)=>{
        
        const registrationData = new FormData();
        //add all images
        for (let index = 0; index < uploadfilesInfo.allfiles.length; index++) {
            registrationData.append('images', uploadfilesInfo.allfiles[index]);
        }

        //add userinfo/postinfo category
        postinfo["uploadfolderInfo"] = uploadfilesInfo.mergefilesInfo;
        registrationData.append(postCategory, JSON.stringify(postinfo));
        return registrationData;
    }

    //merge all files 
    getmergefileInfo = (imageData, profilepicInfo)=> {
        let allfiles = [];
        let mergefilesInfo = {};

        let lstofFoldersnames = Object.keys(imageData);
        for (let fldrIndex = 0; fldrIndex < lstofFoldersnames.length; fldrIndex++) {
            let lstoffiles = imageData[lstofFoldersnames[fldrIndex]].filter(item => undefined !== item);
            allfiles = [...allfiles, ...lstoffiles];
            mergefilesInfo[lstofFoldersnames[fldrIndex]] = lstoffiles.length;
        }

        if(profilepicInfo){
            allfiles.push(profilepicInfo)
            mergefilesInfo["profilepic"] = 1;
        }

        return {allfiles, mergefilesInfo};
    }


    getConfirmationObject(){
        return {
            "showConfirmationDlg" : false,
            "confirmationHeading" : "Confirmation :",
            "confirmationMessage" : "Are you sure you want to post data?"
        };
    }


    getProfilePicSelectionState() {
        return {
           "profilepic1loaded" : false,
           "profilepic2loaded" : false,
           "profilevideoloaded": false,
           "name"              : -1
        };
    }

    getProfilePicInfo() {
        return{
            name        : -1,
            opendialog : false, 
            profilepicInfo : null, 
            showcropIcons  : false, 
            removePicState : false
        };
    }

    getDefaultPostComment() {
        return {
            "user_id"           : "",
            "post_category"     : "", 
            "post_desc"         : "",
            "currency_category" : "", 
            "currency"          : 0,
            "whatsapp_number"   : ""
        }
    }

}

export default PostAsyncController;