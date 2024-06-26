function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res
      .status(401)
      .json({ status: false, message: "The user is not authorized" });
  }

  if (err.name === "ValidationError") {
    // validation error
    return res.status(401).json({ status: false, message: err });
  }

  // default to 500 server error
  return res
    .status(500)
    .json({
      status: false,
      message: "Something went wrong",
      error: err.name,
      body: err,
    });
}

module.exports = errorHandler;
