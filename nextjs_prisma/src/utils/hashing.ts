import * as bcrypt from "bcrypt";
const salt = 10;
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password: string, passwordHash: string) => {
  return bcrypt.compareSync(password, passwordHash);
};
