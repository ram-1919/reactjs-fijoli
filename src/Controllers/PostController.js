
import { useDispatch } from "react-redux";
import BasePostController from "./BasePostController";

class PostController extends BasePostController{

    dispatch = useDispatch();

    constructor(postData){
        super(postData)
    }

    postAsyncData(){
        let postasyncData = this.getPostData();
        this.dispatch()
    }
}

export default PostController;