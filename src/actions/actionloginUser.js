

const actionloginUser = (loginData) => {
    return {
      type: "invoke_loginData",
      loginData
    };
};
  
export default actionloginUser;