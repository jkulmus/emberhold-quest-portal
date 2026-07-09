const errorHandler = (err, req, res, next) => {
    console.error("Unhandled Error:");
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500);

    res.render("error", {
        title: "Something Went Wrong",
        message: "An unexpected error occurred. Please try again later"
    });
};

export default errorHandler;