const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function verifyEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = {
  signUp: async function(req, res) {
    try {
      const { email, password } = req.body;
      if (email.length < 1 || password.length < 1)
        return res.status(401).json({ error: "empty fields" });
      const v_email = await verifyEmail(email);
      if (v_email)
        return res.status(401).json({ error: "the email already exists" });

      const new_user = new User({ email, password });
      const user = await new_user.save();

      const token = jwt.sign({ _id: new_user._id }, "secretkey");
      res.status(200).json({ token, user });
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  signIn: async function(req, res) {
    try {
      const { email, password } = req.body;
      if (email.length < 1 && password.length < 1)
        return res.status(401).json({ error: "empty fields" });
      const user = await verifyEmail(email);
      if (!user)
        return res.status(401).json({ error: "the email doesn´t exists" });
      if (user.password !== password)
        return res.status(401).json({ error: "wrong Password" });

      const token = jwt.sign({ _id: user._id }, "secretkey");
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  users: async function(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  userOne: async function(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user != null) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ error: "Was not found user with that id" });
      }
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  editUser: async function(req, res) {
    try {
      const { id } = req.params;
      const userBody = {
        email: req.body.email,
        password: req.body.password
      };
      const user = await User.findByIdAndUpdate(
        id,
        { $set: userBody },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  deleteUser: async function(req, res) {
    try {
      const id = req.params.id;
      await User.findByIdAndRemove(id);
      res.status(200).json({ error: "deleted successfull" });
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  },

  tokenId: async function(req, res) {
    try {
      const { token } = req.params;
      const { _id } = jwt.verify(token, "secretkey");
      res.status(200).json({ id_user: _id });
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  }
};
