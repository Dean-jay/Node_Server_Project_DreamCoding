import * as userRepository from '../data/auth.js';
// 순수하게 데이터를 가지고 있고 읽고 쓰기만 가능
let tweets = [
  {
    id: '1',
    text: '화이팅!',
    createdAt: '1639541440715',
    userId: '1639541001783',
  },
  {
    id: '2',
    text: '예스!',
    createdAt: '1639541440716',
    userId: '1639541001783',
  },
];

export async function getAll() {
  console.log('yes i am working1');
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      console.log('yes i am working');
      return { ...tweet, username, name, url };
    })
  );
}
// Q. 이렇게 정보를 여기저기서 가져와 봉합해서 내보내는 것은 괜찮은 걸까? 분산형 정보이다 보니 이점이 있겠지만 검색 속도 면에서 괜찮은 건지 궁금하다.
// [!] 비동기로 받아올 때는 await 를 사용해주자.

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

// 모든 항목을 보여주는 것이 아니라 해당 트윗 하나만 찾는 함수.
export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    userId: userId,
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
