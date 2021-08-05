const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // use parent as placeholder for first parameter
    // acess username argument from second parameter
    thoughts: async (parent, { username }) => {
      // if username exists, set params to object with usename key
      // if no username, return empty object
      const params = username ? { username } : {};
      // pass object to find method, return by username if exists, or return all
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // look up thought by id
    thought: async (parent, { _id }) => {
      // destructure id and place it in findOne method
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
  }
};

module.exports = resolvers;