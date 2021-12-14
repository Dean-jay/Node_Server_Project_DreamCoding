import jwt from 'jsonwebtoken';
import * as useRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  //TODO : postman header how to make value?
  jwt.verify(
    token,
    'ENW9gNIhR7U@*Mo@bu^z4^iKA6qi9DNT',
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await useRepository.findById(decoded.id);

      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // req.customData
      req.token = token;
      next();
    }
  );
};
