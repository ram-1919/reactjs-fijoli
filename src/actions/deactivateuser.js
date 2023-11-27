

const deactivateUser = (userinfo) => {
    return {
      type: "set_deactivate_account",
      userinfo
    };
};
  
export default deactivateUser;