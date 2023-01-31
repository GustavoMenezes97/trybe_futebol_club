import * as express from 'express';
import TeamController from '../controllers/team.controller';

const router = express.Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);

export default router;
