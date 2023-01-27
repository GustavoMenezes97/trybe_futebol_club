import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/loginInterface';

const SECRET = process.env.JWT_SECRET;
const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const createToken = (user: ILogin): string => {
  const { email } = user;

  const token = jwt.sign({ email }, SECRET as string, JWT_CONFIG as object);

  return token;
};

export default createToken;
