import * as jwt from 'jsonwebtoken';
import { env } from '~config/env.config';

export const signToken = (payload: any, expiresIn = '7d'): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return decoded;
};
