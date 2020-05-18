const User = require("../models/user");
const { check, validationResult } = require("express-validator");

exports.createUser = (req, res) => { 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User already exists"
      });
    }
    res.json({
      username: user.username,
      email: user.email,
      id: user._id
    });
  });
};
 
exports.getAllUsers = (req, res) => {
  User.find( {}, "_id email username", (err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    res.send(users);
  })
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, "_id email username").exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      res.send(user);
    });
  };

  exports.updateUserById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, todo) { 
      if (err) {
        return res.status(400).json({
          error: "Error in Updating the user"
        })
      }
      if (!todo) {
        return res.status(400).json({
          error: "No user was found in DB"
        })
      }
        res.send({
          result: "Updated Successfully"
        });
    });
};

exports.deleteUserById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
    User.findByIdAndRemove(req.params.id, function(err, todo) {
      if (err) {
        return res.status(400).json({
          error: "Error in Deleting the user"
        })
      }
      if (!todo) {
        return res.status(400).json({
          error: "No user was found in DB"
        })
      }
        res.send({
          result: "Deleted Successfully"
        });
    })
};



