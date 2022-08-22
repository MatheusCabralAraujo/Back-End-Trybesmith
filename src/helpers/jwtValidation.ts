import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { OrderToken } from '../interfaces/order.interface';

dotenv.config();
const secret: Secret = 'suaSenhaSecreta';

const validateToken = (token: string): OrderToken | boolean => {
  try {
    const response = jwt.verify(token, secret);
    return response as OrderToken;
  } catch (err) {
    return false;
  }
};

export default validateToken;