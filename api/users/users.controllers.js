const User = require('../../models/User');

exports.fetchUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    next(error);
  }
};

exports.usersCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.usersDelete = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.usersUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
    }
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.usersGet = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
