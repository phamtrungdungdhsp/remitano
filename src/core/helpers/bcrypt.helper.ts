import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<any> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
