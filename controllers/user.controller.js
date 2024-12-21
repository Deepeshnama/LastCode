import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import generateToken from "../util/generateToken.js";

const register = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
      res.status(400).json({
        msg: "Invalid Credentials",
      });
    }

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        userName,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        msg: "User Created",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        msg: "Invalid Credentials",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: "Please register first",
      });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        res.status(200).json({
          msg: "Logged in successfully",
          token: generateToken(user),
        });
      } else {
        res.status(400).json({
          msg: "Invalid Password",
        });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(name)

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ msg: "User not defined" });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const searchUserByNameorEmail = async (req, res) => {
  try {
    const { name, email } = req.query;

    const filterData = {};

    if (name) {
      filterData.name = name;
    }

    if (email) {
      filterData.email = email;
    }

    const user = await User.find(filterData);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { register, login, getAllUsers, searchUser , searchUserByNameorEmail };
