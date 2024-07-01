// controllers/userController.js
const userDao = require('../dao/userDao');

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await userDao.createUser(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await userDao.getUser(userID);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = req.body;
    const updatedUser = await userDao.updateUser(userID, user);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const result = await userDao.deleteUser(userID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
