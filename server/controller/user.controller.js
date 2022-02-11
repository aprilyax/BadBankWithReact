

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


// ---------------------------------- Find user by ID ------------------------------
exports.getById = (req, res) => {
  console.log("called: getById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "User found!",
        data: { user: user },
      });
    }
  });
};

// ---------------------------------- Get user's balance by ID ------------------------------
exports.getUserBalanceById = (req, res) => {
  console.log("called: getUserBalanceById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        data: { balance: user.balance },
      });
    }
  });
};

// ---------------------------------- Get all the users ------------------------------
exports.getAll = (req, res) => {
  console.log("called: getAll");
  let usersList = [];
    User.find({}, function (err, user) {
        if (err) {
            next(err);
          } else {
        usersList.push({
            id: user._id,
            acct: user.acct,
            name: user.name,
            email: user.email,
          });
        res.json({
          status: "success",
          message: "Users list found!",
          data: { users: usersList },
        });
};

// ---------------------------------- Update's user balance by id ------------------------------
exports.updateUserBalanceById = (req, res) => {
  console.log("called: updateUserBalanceById");
  const newBalance = Number(req.body.balance);
  User.findByIdAndUpdate(req.params.id,{ balance: newBalance },function (err, user) {
      if (err) {
        return;
      } else {
        return newBalance;
      }
    });
  };


exports.getUserById = (userID) => {
  User.findById(userID, function (err, user) {
    if (err) {
      return;
    } else {
      return user;
    }
  });
};