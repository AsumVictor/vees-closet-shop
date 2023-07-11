const errorHandler = require('../helpers/ErrorHandler')
module.exports = (({err, req, res, next})=>{
err.statusCode = err.statusCode || 500
err.message = err.message || "Internal server error"
if(err.name === 'CastError'){
    const message = `Resources not found with this id ...${err.path}`
    err = new errorHandler(message, 4000)
}
if(err.code == 11000){
const message = `Duplicate key  ${Object.keys(err.keyValue)} Entered`
    err = new errorHandler(message, 4000)
}
// Wrong jwt error
if(err.name === 'JsonWebTokenError'){
    const message = `URL is not valid please try again later`
    err = new errorHandler(message, 4000)
}

// JWT expired
if(err.name === 'TokenExpiredError'){
    const message = `URL has expired please try again later`
    err = new errorHandler(message, 4000)
}

res.status(err.statusCode).json({
    success: false,
    message: err.message
})

})