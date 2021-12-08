import data from '../data/data.json';
const { tweets } = data;

export default function getController(req, res, next) {
  // constroller
  const username = req.query.username;
  const data = username ? tweets.filter((t) => t.username == username) : tweets;
  // display
  res.status(200).json(data);
}
