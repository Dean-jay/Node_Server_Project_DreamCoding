import data from '../data/data.json';
const { tweets } = data;
export default function getIdController(req, res, next) {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ messege: `Tweet id(${id}) not found` });
  }
}
