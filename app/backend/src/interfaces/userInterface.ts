import ILogin from './loginInterface';

export default interface IUser extends ILogin {
  id: number;
  username: string;
  role: string;
}
