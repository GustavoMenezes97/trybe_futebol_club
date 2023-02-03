import * as express from 'express';
import LearderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get('/home', LearderboardController.getHomeLeaderboard);

export default router;
