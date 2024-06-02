import Link from '../Models/LinkModel';
import User from '../Models/UserModel';

exports.createLink = async (req, res) => {
  const link = new Link(req.body);
  await link.save();

  const user = await User.findById(req.body.user);
  user.links.push(link);
  await user.save();

  res.status(201).send(link);
};

exports.getLink = async (req, res) => {
  const link = await Link.findById(req.params.id);
  res.send(link);
};

exports.updateLink = async (req, res) => {
  const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(link);
};

exports.deleteLink = async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.send({ message: 'Link deleted' });
};



export default LinkController;