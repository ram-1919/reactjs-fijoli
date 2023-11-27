

class PostReviewController {

    getpostItem = (postinfo, lstoffiles) => {
        const uploadfilesInfo = this.getmergefileInfo(lstoffiles);
        return this.createformData(postinfo, uploadfilesInfo, "postreview");
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
    getmergefileInfo = (imageData)=> {
        let allfiles = [];
        let mergefilesInfo = {};

        let lstofFoldersnames = Object.keys(imageData);
        for (let fldrIndex = 0; fldrIndex < lstofFoldersnames.length; fldrIndex++) {
            let lstoffiles = imageData[lstofFoldersnames[fldrIndex]].filter(item => undefined !== item);
            allfiles = [...allfiles, ...lstoffiles];
            mergefilesInfo[lstofFoldersnames[fldrIndex]] = lstoffiles.length;
        }

        return {allfiles, mergefilesInfo};
    }

}

export default PostReviewController;