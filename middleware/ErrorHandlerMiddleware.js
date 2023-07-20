//Error handling middleware
exports.ErrorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success : false,
        message: err.message,
        // file: err.stack.split('\n')[1].trim().split(' ')[1],
        // line: Number(err.stack.split('\n')[1].trim().split(':')[1]),
        stack : err.stack
    })
  }