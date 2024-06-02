import express from 'express';

import LinkController from '../Controllers/LinkController';


const router = express.Router();

router.post('/links', LinkController.createLink);
router.get('/links', LinkController.getAllLinks);
router.get('/links/:id', LinkController.getLink);
router.patch('/links/:id', LinkController.updateLink);
router.delete('/links/:id', LinkController.deleteLink);

module.exports = router;

export default LinkRouter;


