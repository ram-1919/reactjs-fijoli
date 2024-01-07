

const getlstofselectedpostcategory = (user_id, post_category, logged_in_user_id ) =>{
        return{
            type : "get_selected_post_category",
            "user_id" : user_id,
            "post_category" : post_category,
            "logged_in_user_id" : logged_in_user_id
        }
}

export default getlstofselectedpostcategory