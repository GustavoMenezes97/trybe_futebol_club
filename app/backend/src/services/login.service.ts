import * as bcrypt from 'bcryptjs';
import CustomError from '../Helpers/customError';
import ILogin from '../interfaces/loginInterface';
import User from '../database/models/User';
import createToken from '../Helpers/tokenGenerator';

export default class LoginService {
  static async login(payload: ILogin): Promise<string> {
    const { email, password } = payload;

    const loginExists = await User.findOne({ where: { email } });

    if (loginExists !== null && bcrypt.compareSync(password, loginExists.password)) {
      const token = createToken(payload);
      return token;
    }

    throw new CustomError(401, 'Incorrect email or password');
  }
}
