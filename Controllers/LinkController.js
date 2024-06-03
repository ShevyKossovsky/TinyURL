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

  getClicksBySource: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).send({ error: 'Link not found.' });
      }

      // מצא את הקליקים לפי המקורות השונים
      const clicksBySource = {};
      link.clicks.forEach(click => {
        if (!clicksBySource[click.targetParamValue]) {
          clicksBySource[click.targetParamValue] = 1;
        } else {
          clicksBySource[click.targetParamValue]++;
        }
      });

      res.send(clicksBySource);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching clicks by source.' });
    }
  }
};

export default LinkController;
