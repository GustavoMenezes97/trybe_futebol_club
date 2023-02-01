import * as express from 'express';
import MatchController from '../controllers/match.controller';

const router = express.Router();

router.get('/', MatchController.getMatches);

export default router;
