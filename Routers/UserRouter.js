import express from 'express';

import UserController from '../Controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get('/', UserController.getAllUsers);
UserRouter.post('/', UserController.createUser);
UserRouter.get('/:id', UserController.getUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);

export default UserRouter;
