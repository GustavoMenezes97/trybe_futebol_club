import * as express from 'express';
import matchValidation from '../middlewares/matchValidation';
import MatchController from '../controllers/match.controller';
import auth from '../middlewares/tokenAuthorization';

const router = express.Router();

router.get('/', MatchController.getMatches);
router.post('/', auth, matchValidation, MatchController.createMatch);
router.patch('/:id/finish', auth, MatchController.updateMatch);

export default router;
