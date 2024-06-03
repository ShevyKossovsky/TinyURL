import express from 'express';
import LinkController from '../Controllers/LinkController.js';

const LinkRouter = express.Router();

LinkRouter.get('/', LinkController.getAllLinks);
LinkRouter.post('/', LinkController.createLink);
LinkRouter.get('/:id', LinkController.getLink);
LinkRouter.put('/:id', LinkController.updateLink);
LinkRouter.delete('/:id', LinkController.deleteLink);
LinkRouter.get('/r/:id', LinkController.redirectLink);
LinkRouter.get('/:id/clicks', LinkController.getLinkClicks);

export default LinkRouter;






