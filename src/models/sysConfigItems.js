
///<summary>
// class object which returns configuration items and user info 
// to store 
///</summary>
class SysConfigData{

    //parameterized constructor which takes response data as input
    constructor(resultData){
        this.result = resultData
    }

    //returns supported trainer types
    getlstofuserCategory(){
        let user_category = this.result.sysconfigData.filter((item,index)=>{
            if("user_category" === item.category_name){
                return item.values;
            }
        });

        return [...user_category[0].values];
    }
    
    //returns supported languages
    getlstofLanguages() {

        let languages = this.result.sysconfigData.filter((item,index)=>{
            if("Language" === item.category_name){
                return item.values;
            }
        });
        
        return [...languages[0].values];
    }

    //returns supported currencies
    getlstofCurrency(){
        let currency_result = this.result.sysconfigData.filter((item,index)=>{
            if("Currency" === item.category_name){
                return item.values;
            }
        });

        return [...currency_result[0].values];
    }

    //returns supported currencies
    getlstofPosts(){
        let post_result = this.result.sysconfigData.filter((item,index)=>{
            if("Post" === item.category_name){
                return item.values;
            }
        });
        
        return [...post_result[0].values];
    }

    //returns registrant info
    getRegisteredUserInfo() {
        return this.result.profileData;
    }

    //return list of users
    getlstofUsers(){
        return this.result.lstofusers;
    }

    getlstofPostItems() {
        return this.result.lstofpostsinfo;
    }
}

export default SysConfigData;