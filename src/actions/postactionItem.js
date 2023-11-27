

const postactionItem = (postformData) => {
    return {
      type: "add_post",
      postformData
    };
};
  
export default postactionItem;