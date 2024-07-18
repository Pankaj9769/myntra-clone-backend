const bcrypt = require("bcryptjs");
const { userModel } = require("../model/userModel");

const register = async (req, res) => {
  const userInfo = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(userInfo.password, salt);

  const user = {
    name: userInfo.name,
    email: userInfo.email,
    password: hashedPassword,
  };

  const doesExist = await userModel.findOne({ email: userInfo.email });
  if (doesExist) {
    return res
      .status(400)
      .json({ response: "Email already registered, Please Login!" });
  }

  try {
    const response = await userModel.create(user);
    res.status(201).json({ response: "Registered Successfully" });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const login = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await userModel.findOne({ email: userInfo.email });
    if (!user) {
      return res.status(400).json({ response: "Invalid Credential/s" });
    }

    let correctPass = user.validatePassword(userInfo.password);

    if (!correctPass) {
      return res.status(400).json({ response: "Invalid Credential/s" });
    }

    const token = await user.generateToken();
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: `Internal Server Error:${error}` });
  }
};

const user = async (req, res) => {
  try {
    const user = req.user;
    console.log("USER->", user);
    const findUser = await userModel.findOne({ email: user.email });
    console.log(findUser);

    res.status(200).json({ findUser });
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
};

const addToWishlist = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const findUser = await userModel.findOne({ email: user.email });
  findUser.wishlist.push(id);
  console.log(findUser);
  const response = await userModel.findOneAndUpdate(
    { email: user.email },
    { wishlist: findUser.wishlist },
    { new: true }
  );

  res.json({ response });
};

const removeFromWishlist = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const findUser = await userModel.findOne({ email: user.email });
  findUser.wishlist = findUser.wishlist.filter((product) => product != id);
  console.log(findUser);
  const response = await userModel.findOneAndUpdate(
    { email: user.email },
    { wishlist: findUser.wishlist },
    { new: true }
  );

  res.json({ response });
};

const addInBag = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  console.log("reached");
  const findUser = await userModel.findOne({ email: user.email });
  findUser.bag.push(id);
  try {
    const response = await userModel.findOneAndUpdate(
      { email: user.email },
      { bag: findUser.bag },
      { new: true }
    );
    console.log("THE UPDATED BAG->", response.bag);
    res.json({ response });
  } catch (error) {
    res.json({ response: error });
  }
};

const removeFromBag = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const findUser = await userModel.findOne({ email: user.email });
  findUser.bag = findUser.bag.filter((product) => product != id);
  console.log(findUser);
  const response = await userModel.findOneAndUpdate(
    { email: user.email },
    { bag: findUser.bag },
    { new: true }
  );

  res.json({ response });
};

const addAddress = async (req, res) => {
  const user = req.user;
  const address = req.body;

  try {
    const findUser = await userModel.findOne({ email: user.email });
    findUser.address.push(address);
    const response = await userModel.findOneAndUpdate(
      { email: user.email },
      {
        address: findUser.address,
      },
      {
        new: true,
      }
    );

    res.json({ response });
  } catch (error) {
    res.json({ error });
  }
};

const removeAddress = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  try {
    const findUser = await userModel.findOne({ email: user.email });

    findUser.address = findUser.address.filter((address, index) => {
      return Number(index) !== Number(id);
    });
    console.log("After->" + findUser.address.length);
    const response = await userModel.findOneAndUpdate(
      { email: user.email },
      {
        address: findUser.address,
      },
      {
        new: true,
      }
    );

    res.json({ response });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  register,
  login,
  user,
  addToWishlist,
  removeFromWishlist,
  addInBag,
  removeFromBag,
  addAddress,
  removeAddress,
};
