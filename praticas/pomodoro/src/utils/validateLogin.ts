import { MOCK_AUTH } from '../constants/auth';

export function validateLogin(username: string, password: string) {
  return username === MOCK_AUTH.username && password === MOCK_AUTH.password;
}