import dotenv from 'dotenv';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

dotenv.config();
const secret: Secret = 'suaSenhaSecreta';

const validateToken = (token: string): JwtPayload | boolean => {
  try {
    const response = jwt.verify(token, secret);
    return response as JwtPayload;
  } catch (err) {
    return false;
  }
};

export default validateToken;