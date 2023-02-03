import * as express from 'express';
import LearderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get('/', LearderboardController.getAllLeaderboard);
router.get('/home', LearderboardController.getHomeLeaderboard);
router.get('/away', LearderboardController.getAwayLeaderboard);

export default router;
