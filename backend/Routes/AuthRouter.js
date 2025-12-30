import express from 'express';
import { Signup, Login } from '../Controller/AuthController.js';
import { signupValidation, loginValidation } from '../Middlewares/AuthValidation.js';

const router = express.Router(); 

router.post('/login', loginValidation, Login);
router.post('/signup', signupValidation, Signup);

export default router;
