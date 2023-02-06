import express from 'express';
import { deleteUser, followUSer, getUser, UnfollowUSer, updateUser } from '../Controllers/UserController.js';
const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put("/:id/follow", followUSer)
router.put("/:id/unfollow", UnfollowUSer)
export default router