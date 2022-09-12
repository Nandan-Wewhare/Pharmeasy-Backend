exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).send({ status: false, message: "Unauthorized" });
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.name == "JsonWebTokenError" ? "Not logged in" : err,
    });
  }
};
