export interface User {
  id: number;
  email: string;
  password: string;
}
export interface RespUser {
  token: string;
  user: User
}
