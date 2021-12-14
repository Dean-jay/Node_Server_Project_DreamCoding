import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];
// Q. validate를 두번해줄까? 꼭 뒤에서 호출해 주어야 할까?
// middleware 특성상 맞긴 한 것 같은데

// body를 input value를 통해 얻음
router.post('/signup', validateSignup, authController.signup);
// body를 input value를 통해 얻음
router.post('/login', validateCredential, authController.login);
// 이미 body를 가지고 있다고 생각
router.get('/me', isAuth, authController.me);
export default router;
