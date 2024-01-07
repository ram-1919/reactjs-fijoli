import EnumNavigate from "../singletonControllers/NavigateController";


const getPostItemsAction = (item) => {
    return{
      type: "get_post_success",
      "data" : item,
      "navigateItemTo" : EnumNavigate.postContainer
    }
  }

export default getPostItemsAction;