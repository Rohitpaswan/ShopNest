

const errorResponse = (res , {statusCode =500 , message = "Internal server Error"}) => {
    return res.status(statusCode).json({
        success: false,
        message: message

    })
}

const successResponse = (res , {statusCode =200 , message = "Success" } , payload = {}) => {
    console.log(payload);
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload : payload

    })
}
module.exports = {errorResponse , successResponse }; 