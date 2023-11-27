
class PostRegisterController {

    getconfirmregisterData = (postinfo, imageData, profilepicInfo) => {
        const uploadfilesInfo = this.getmergefileInfo(imageData, profilepicInfo);
        return this.createformData(postinfo, uploadfilesInfo, "userInfo");
    }

    createformData = (postinfo, uploadfilesInfo, postCategory)=>{
        
        const registrationData = new FormData();
        //add all images
        for (let index = 0; index < uploadfilesInfo.allfiles.length; index++) {
            registrationData.append('images', uploadfilesInfo.allfiles[index]);
        }

        //add userinfo/postinfo category
        postinfo["is_active"]        = 1;
        postinfo["uploadfolderInfo"] = uploadfilesInfo.mergefilesInfo;
        postinfo["documentDesc"]     = uploadfilesInfo.documentDesc;
        registrationData.append(postCategory, JSON.stringify(postinfo));
        return registrationData;
    }

    //merge all files 
    getmergefileInfo = (imageData, profilepicInfo)=> {
        let allfiles = [];
        let mergefilesInfo = {};
        let documentDesc   = {};
        let lstofFoldersnames = Object.keys(imageData);
        for (let fldrIndex = 0; fldrIndex < lstofFoldersnames.length; fldrIndex++) {
            let lstoffiles = imageData[lstofFoldersnames[fldrIndex]].filter(item => undefined !== item);
        
            let tmpoffiles = [];
            documentDesc[lstofFoldersnames[fldrIndex]] = [];
            lstoffiles.map((item)=>{
                tmpoffiles.push(item.image);
                documentDesc[lstofFoldersnames[fldrIndex]].push(item.document_desc);
            })
            allfiles = [...allfiles, ...tmpoffiles];
            mergefilesInfo[lstofFoldersnames[fldrIndex]] = lstoffiles.length;
        }

        if(profilepicInfo){
            allfiles.push(profilepicInfo)
            mergefilesInfo["profilepic"] = 1;
            documentDesc["profilepic"]   = [];
            documentDesc["profilepic"].push("profile pic info");
        }

        return {allfiles, mergefilesInfo, documentDesc};
    }

}

export default PostRegisterController;