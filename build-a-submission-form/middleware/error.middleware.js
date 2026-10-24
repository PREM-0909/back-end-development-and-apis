export const notFoundHandler = (req, res, next) => {
    const err = new Error(req.originalUrl);
    err.status = 404
    next(err)
};

export const finalErrorHandler  = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
    error: true,
    status: statusCode,
    message: statusCode === 500 ? 'Internal Server Error (Check Server Logs)' : err.message
});
}
