import * as express from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/login.controller';
import auth from '../middlewares/tokenAuthorization';

const router = express.Router();

router.post('/', loginValidation, LoginController.login);
router.get('/validate', auth, LoginController.validateLogin);

export default router;
