import User from '../Models/UserModel';

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate('links');
  res.send(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
};

export default UserController;
