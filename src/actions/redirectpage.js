
//not required to can be delete if warning doesnt occur
const redirectTo = (redirecttype, redirectpage) => {
    return {
        "type": redirecttype,
        redirectpage
    }
}

export default redirectTo;