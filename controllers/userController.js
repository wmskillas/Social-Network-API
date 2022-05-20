const User = require("../models/User");

const userController = {
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((addUser) => res.json(addUser))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id }).then((user) => {
      if (!user) {
        res.status(500).json({ message: "No user with that ID" });
      }
    });
  },

  updateUser(req, res) {
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { users: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(500).json({ message: "No user with that ID" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(500).json({ message: "No user with that ID" });
        }
      })
      .catch((err) => res.json(err));
  },
  
  deleteFriend(req, res) {
    User.findOneAndDelete({ _id: req.params.friendId }).then((user) => {
      if (!user) {
        res.status(500).json({ message: "No user with that ID" });
      }
    });
  },
};

module.exports = userController;
