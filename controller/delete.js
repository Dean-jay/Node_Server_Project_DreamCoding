import data from '../data/data.json';
let { tweets } = data;

export default function deleteController(req, res, next) {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
}
