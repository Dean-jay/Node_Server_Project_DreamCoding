let users = [
  {
    id: '2',
    username: 'jay',
    password: 'abcd1234',
    name: 'Jay',
    email: 'jay@gmail.com',
  },
];
// 아 password를 bcrypt 으로 변환 해주어야 한다.

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
