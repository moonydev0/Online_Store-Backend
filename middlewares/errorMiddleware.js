const ApiError = require("../error/apiError");

module.exports = function (error,req,res,next) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message})
    }
    else {
        return res.status(500).json({message: "Непредвиденная ошибка!"})
    }
}