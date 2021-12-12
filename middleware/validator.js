import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
  // 내가 원하는 로직이 바뀌면 여기서 수정 가능.
};
