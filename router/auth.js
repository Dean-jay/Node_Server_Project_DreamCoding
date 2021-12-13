import express from 'express';
import 'express-async-errors';
import jwt from 'jsonwebtoken';

let user = {
  username: 'ellie',
  password: '1234',
  name: 'Ellie',
  email: 'ellie@gmail.com',
};
let token = '';
// Q! JWT: sign load에 들어가야될 정보는 무엇 무엇이 있을까?
function makeToken(username, password, name, email, url) {
  token = jwt.sign(
    {
      username: username,
      name: name,
      email: email,
      url: url,
    },
    password
  );
  return token;
}

const router = express.Router();
// secretKey를 따로 쓰는게 맞을까? 아니면 password?

// POST /auth/signup
router.post('/signup', (req, res, next) => {
  const { username, password, name, email, url } = req.body;
  const token = makeToken(username, password, name, email, url);
  if (token) {
    res.status(201).json({ token, username });
    // Q! 왜 username 출력이 안될까?
  } else {
    res.status(404).json({ message: `User name:${name} not found` });
  }
  // Token Check
  // jwt.verify(token, password, (error, decoded) => {
  //   console.log(error, decoded);
  // });
});
// POST /auth/login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  // Q! request로 들어온 정보가 맞는지 어떻게 확인해 줄까?
  // Q! 많고 많은 사용자 중에서 딱 한명의 개인을 찾는 일은 어떻게 할까? A! filter!
  // Q! Token 은 서버에서 들고 있는게 맞는가?
  const token = makeToken(username, password);
  if (user.username === username && user.password === password) {
    res.status(201).json({ token, username });
  } else {
    res.status(401).json({ message: 'fali' });
  }
});
// GET /auth/me
router.get('/me', (req, res, next) => {
  // front 에서 jwt_token 을 글로벌로 받아서 처리
  // 이번에는 postman에서
  res.status(200).json({ token });
});
export default router;
