import userRepository from '../data/auth.js';
// 순수하게 데이터를 가지고 있고 읽고 쓰기만 가능
let tweets = [
  {
    id: '1',
    text: '화이팅!',
    createdAt: new Date.now().toString(),
    userId: '2123',
  },
  {
    id: '2',
    text: '예스!',
    createdAt: new Date.now().toString(),
    userId: '2142',
  },
];

export function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}
// Q. 이렇게 정보를 여기저기서 가져와 봉합해서 내보내는 것은 괜찮은 걸까? 분산형 정보이다 보니 이점이 있겠지만 검색 속도 면에서 괜찮은 건지 궁금하다.
// [!] 비동기로 받아올 때는 await 를 사용해주자.

export function getAllByUsername(username) {
  return getAll().filter((tweet) => tweet.username === username);
}

export function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet);
}

export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
