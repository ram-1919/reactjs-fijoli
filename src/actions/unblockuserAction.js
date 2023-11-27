

const unblockuserAction = (unblockuserInfo) => {
    return {
        "type" : "set_unblock_user_info",
        unblockuserInfo
    }
}

export default unblockuserAction;