

const getPostItemsAction = (user_id) => {
    return{
      type: "get_post",
      user_id
    }
  }

export default getPostItemsAction;