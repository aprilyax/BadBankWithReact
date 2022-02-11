const router = require("express").Router();
const User   = require("../Model/User");
const Joi    = require("@hapi/joi");
const bcrypt = require('bcrypt');
var jwt      = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const schema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

// ----- create a user route ----- 
router.post("/create", async (req, res) => {
  // validate the user

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (error) 
    return res.status(400).json({ error: error.details[0].message });

  const isEmailExist = await User.findOne({ email: req.body.email });

  // error when email already registered
  if (isEmailExist)
    return res.status(400).json({ error: "Email already exists" });

    // hash the password
  const salt = await bcrypt.genSalt(10); // generate a random complex string
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ----- login route -----
router.post("/login", async (req, res) => {
  // validate the user
  const { error } = schema.validate(req.body);
    // throw validation errors
    if (error) 
      return res.status(400).json({ error: error.details[0].message });
  
  const user = await User.findOne({ email:req.body.email });
    // throw error when email is wrong
    if (!user) 
      return res.status(400).json({ error: "Email is wrong" });
  
    // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Password is wrong" });

  // create token
  const token = jwt.sign(
    // payload data - can be shown in UI to indicate who has logged in
    {
      name: user.name, 
      id: user._id,
    },
    process.env.TOKEN_SECRET  
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token, message: "Login successful"
    },
  });
});

// ----- get all users route ----- 

router.post("/all", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.json({ error: null, data: allUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ----- get one user account information route ----- 

router.post("/information", async (req, res) => {
  try {
    const accountInformation = await User.findOne({ email:req.body.email });
    res.json({ error: null, data: accountInformation });
  } catch (error) {
    res.status(400).json({ error });
  }
});


module.exports = router;