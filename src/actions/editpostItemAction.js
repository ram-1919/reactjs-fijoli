import PostAsyncController from "../viewModels/PostAsyncController";

const postAsyncCtrl = new PostAsyncController();

const editpostItemAction = (postcomment) => {
    return{
        type : "edit_post_item",
        postcomment : postcomment,
        postinfo    : postAsyncCtrl.getDefaultPostComment()
    }
}

export default editpostItemAction;