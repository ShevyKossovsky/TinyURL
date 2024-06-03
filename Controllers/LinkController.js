import Link from '../Models/Link.js';
import User from '../Models/User.js';
const LinkController = {
  createLink: async (req, res) => {
    try {
      const link = new Link(req.body);
      await link.save();

      const user = await User.findById(req.body.user);
      user.links.push(link);
      await user.save();

      res.status(201).send(link);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while creating the link.' });
    }
  },

  getLink: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      res.send(link);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the link.' });
    }
  },
  getAllLinks: async (req, res) => {
    try {
      const links = await Link.find();
      res.send(links);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the link.' });
    }
  },

  updateLink: async (req, res) => {
    try {
      const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(link);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the link.' });
    }
  },

  deleteLink: async (req, res) => {
    try {
      await Link.findByIdAndDelete(req.params.id);
      res.send({ message: 'Link deleted' });
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while deleting the link.' });
    }
  }
};

export default LinkController;
