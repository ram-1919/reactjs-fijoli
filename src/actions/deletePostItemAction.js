

const deletePostItemAction = (postinfo) =>{
    return{
        type : "delete_post",
        postinfo
    }
}

export default deletePostItemAction;