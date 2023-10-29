const createResponse = (message, success = true) => {
    return {
        message,
        success
    };
}

export default createResponse;