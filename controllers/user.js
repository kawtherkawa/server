const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

/** name ,date_birth ,adress ,diplom,date_of_entry ,releaseDate ,email ,password,position,phone  */
/**const {
      name,
      date_birth,
      adress,
      diplom,
      date_of_entry,
      releaseDate,
      email,
      password,
      position,
      phone,
    } = req.body; */
//Registration
exports.register = async (req, res) => {
  try {
    const {
      name,
      date_birth,
      adress,
      diplom,
      date_of_entry,
      releaseDate,
      email,
      password,
      position,
      phone,
    } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).send({ msg: "email alraedy used" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      date_birth,
      adress,
      diplom,
      date_of_entry,
      releaseDate,
      email,
      password: hashedPassword,
      position,
      phone,
    });

    //save
    await newUser.save();
    // gerer un token jeton selon id et celui va gere  un secret key de chaque user

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SCRT_KEY,
      {
        expiresIn: "72",
      }
    );

    res
      .status(200)
      .send({ success: [{ msg: "welcome" }], user: newUser, token });
  } catch (error) {
    res.status(400).send({ msg: "try again", error: error });
  }
};

//Login
exports.login = async (req, res) => {
  
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    //check email existance
    if (!foundUser) {
      return res.status(400).send({ msg: "can not find this user" });
    }

    const checkedPassword = await bcrypt.compare(password, foundUser.password);

    if (!checkedPassword) {
      return res.status(400).send({ msg: "please check your password" });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SCRT_KEY,
      {
        expiresIn: "72",
      }
    );

    res.status(200).send({ success: [{ msg: "welcome back" }],token });
 
};

//update

exports.updateInfoUser = async (req, res) => {
  try {
    const { _id } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $set: { ...req.body } }
    );

    const token = jwt.sign(
      {
        id: updatedUser._id,
      },
      process.env.SCRT_KEY,
      { expiresIn: "168h" }
    );

    await updatedUser.save();

    res.status(200).send({ success: [{ msg: "user updated" }], user: updatedUser, token });
  } catch (error) {
    res.status(400).send({ msg: "can not update this user" });
  }
};

///Get All User
exports.getUsers = async (req, res) => {
  try {
    const listusers = await User.find();
    res.status(200).send({ msg: "Users list", listusers });
  } catch (error) {
    res.status(400).send({ msg: "cannot get all Users", error });
  }
};

//GetOne User
exports.getOneUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const userToGet = await User.findById(_id);
    res.status(200).send({ msg: "get user ", userToGet });
  } catch (error) {
    res.status(400).send({ msg: "fail to get user ", error });
  }
};
