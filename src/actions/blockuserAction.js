

const blockuserAction = (blockuserinfo) => {

    return {
        "type": "set_block_user_info",
        blockuserinfo
    }
}

export default blockuserAction;