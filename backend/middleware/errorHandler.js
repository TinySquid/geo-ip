const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    // override status code on 200
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  } else {
    // Show everything as a 404 in production
    // If this was a real app in production we'd have logging in place
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

module.exports = errorHandler;
