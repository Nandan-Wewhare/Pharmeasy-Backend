const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const user = await User.findOne({
    phone: req.body.phone,
  });
  if (!user)
    return res
      .status(400)
      .send({ status: false, message: "No user with this phone exists!" });

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        user: user.id,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({ status: true, user: user, token: token });
  } else {
    res.status(400).send({ status: false, message: "Invalid credentials" });
  }
};

exports.register = async (req, res) => {
  let user = await User.findOne({ phone: req.body.phone });

  if (user)
    return res
      .status(400)
      .send({ status: false, message: "User already exists" });

  user = new User({
    phone: req.body.phone,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();
  if (!user)
    return res
      .status(400)
      .send({ status: false, message: "User creation failed" });

  res.status(201).send({ status: true, user: user });
};

exports.updateUser = async (req, res) => {
  let user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      zip: req.body.zip,
    },
    { new: true }
  );

  if (!user)
    return res
      .status(400)
      .send({ status: false, message: "User update failed" });

  res.status(200).send({ status: true, user: user });
};
