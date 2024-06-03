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
      res.status(500).send({ error: 'An error occurred while fetching the links.' });
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
  },

  redirectLink: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).send({ error: 'Link not found.' });
      }

      // Update the link's click information
      const click = {
        insertedAt: new Date(),
        ipAddress: req.ip
      };
      link.clicks.push(click);
      await link.save();

      // Redirect to the original URL
      res.redirect(link.originalUrl);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while redirecting the link.' });
    }
  }
  ,

    getLinkClicks : async (req, res) => {
    const { id } = req.params;
    try {
      const link = await Link.findById(id).populate('clicks');
      if (!link) return res.status(404).json({ message: 'Link not found' });
  
      const clicksByTarget = link.clicks.reduce((acc, click) => {
        const target = click.targetParamValue || 'unknown';
        if (!acc[target]) acc[target] = [];
        acc[target].push(click);
        return acc;
      }, {});
  
      res.status(200).json(clicksByTarget);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
};

export default LinkController;
