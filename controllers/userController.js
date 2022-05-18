const {ObjectId} = require('mongoose').Types;
const User = require('../models/User');

module.exports = {

    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },

      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      createUser(req, res) {
        User.create(req.body)
          .then((addUser) => res.json(addUser))
          .catch((err) => res.status(500).json(err));
      },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Application.deleteMany({ _id: { $in: user.applications } })
          )
          .then(() => res.json({ message: 'User and associated apps deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

      updateUser(req, res) {
        console.log('You are updating user information');
        console.log(req.body);
        Student.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { users: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },      
    };