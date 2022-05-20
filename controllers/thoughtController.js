const Thought = require("../models/Thought");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((addThought) => res.json(addThought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(500).json({ message: "Thought not found" });
        }
      })
      .catch((err) => res.json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { thought: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(500).json({ message: "Thought not found" });
        }
      })
      .catch((err) => res.json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(500).json({ message: "Reaction data incomplete" });
        }
      })
      .catch((err) => res.json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(500).json({ message: "Reaction not found" });
        }
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
