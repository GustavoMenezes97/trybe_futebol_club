import ILogin from '../interfaces/loginInterface';
import User from '../database/models/User';
import createToken from '../Helpers/tokenGenerator';

export default class LoginService {
  static async login(payload: ILogin): Promise<string> {
    const { email } = payload;

    const loginExiste = await User.findOne({ where: { email } });

    if (loginExiste !== null) {
      const token = createToken(payload);
      return token;
    }

    return 'loginNaoExiste';
  }
}
