const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, resp, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return resp.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return resp.json({ msg: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return resp.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, resp, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return resp.json({
        msg: "Incorrect username",
        status: false,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return resp.json({
        msg: "Incorrect password",
        status: false,
      });
    delete user.password;
    return resp.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
