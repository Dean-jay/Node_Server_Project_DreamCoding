import express from 'express';
import 'express-async-errors';
import jwt from 'jsonwebtoken';

let users = [
  {
    username: 'ellie',
    password: '1234',
    name: 'Ellie',
    email: 'ellie@gmail.com',
  },
];
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
  const user = { username, password, name, email, url };
  const token = makeToken(username, password, name, email, url);
  if (token) {
    res.status(201).json({ token, username });
    users = [user, ...users];
  } else {
    res.status(404).json({ message: `User name:${name} not found` });
  }
});
// POST /auth/login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  // Q! request로 들어온 정보가 맞는지 어떻게 확인해 줄까?
  // Q! 많고 많은 사용자 중에서 딱 한명의 개인을 찾는 일은 어떻게 할까? A! filter!
  // Q! Token 은 서버에서 들고 있는게 맞는가?
  const token = makeToken(username, password);
  const user = users.filter(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.status(201).json({ token, username });
  } else {
    res.status(401).json({ message: 'fali' });
  }
});
// GET /auth/me
router.get('/me', (req, res, next) => {
  // token 을 글로벌로 받아서 처리
  // postman test에서  set global value를 해줌
  res.status(200).json({ token });
  // Q! token 처리를 어떻게 해야 깔끔할까?
});
export default router;
