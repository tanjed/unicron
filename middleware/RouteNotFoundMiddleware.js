//Route not found middleware
exports.RouteNotFoundMiddleware = (req, res, next) => {
    return res.status(404).json({
        success : false,
        message : 'Route not found'
    })
}