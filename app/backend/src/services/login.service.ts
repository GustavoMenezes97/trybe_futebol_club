import * as bcrypt from 'bcryptjs';
import CustomError from '../Helpers/customError';
import ILogin from '../interfaces/loginInterface';
import User from '../database/models/User';
import createToken from '../Helpers/tokenGenerator';

export default class LoginService {
  static async login(payload: ILogin): Promise<string> {
    const { email, password } = payload;

    const user = await User.findOne({ where: { email } });

    if (user !== null && bcrypt.compareSync(password, user.password)) {
      const token = createToken(payload);
      return token;
    }

    throw new CustomError(401, 'Incorrect email or password');
  }

  static async validateLogin(payload: ILogin): Promise<string> {
    const { email } = payload;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    return user.role;
  }
}
