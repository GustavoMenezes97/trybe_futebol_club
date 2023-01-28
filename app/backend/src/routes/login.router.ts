import * as express from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/login.controller';

const router = express.Router();

router.post('/', loginValidation, LoginController.login);

export default router;
