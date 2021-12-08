import data from '../data/data.json';
let { tweets } = data;

export default function postController(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets]; // 괭장히 위험 한 코드
  res.status(201).json(tweet);
}
