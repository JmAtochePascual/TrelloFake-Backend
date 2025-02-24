import bcrypt from 'bcrypt';

// Hash a password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Compare a password
export const comparePassword = async (password: string, savedPassword: string) => {
  return await bcrypt.compare(password, savedPassword);
}