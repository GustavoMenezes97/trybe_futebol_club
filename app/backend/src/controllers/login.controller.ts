import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const token = await LoginService.login(req.body);

    return res.status(200).json({ token });
  }

  static async validateLogin(req: Request, res: Response) {
    const role = await LoginService.validateLogin(req.body.user);

    return res.status(200).json({ role });
  }
}
