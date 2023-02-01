import * as express from 'express';
import MatchController from '../controllers/match.controller';
import auth from '../middlewares/tokenAuthorization';

const router = express.Router();

router.get('/', MatchController.getMatches);
router.post('/', auth, MatchController.createMatch);

export default router;
