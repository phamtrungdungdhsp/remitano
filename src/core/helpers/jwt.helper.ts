import * as jwt from 'jsonwebtoken';
import { env } from '~config/env.config';

export const signToken = (payload: any, expiresIn = '7d'): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (
  token: string,
): { isValid: boolean; data?: any } => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return { isValid: true, data: decoded };
  } catch (e) {
    return { isValid: false };
  }
};
