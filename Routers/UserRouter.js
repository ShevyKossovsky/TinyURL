import  express  from 'express';


import UserController from '../Controllers/UserController'
const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;

export default UserRouter;
