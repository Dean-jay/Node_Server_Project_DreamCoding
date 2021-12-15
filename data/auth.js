let users = [
  {
    id: '1639541001783',
    username: 'bob',
    name: 'Bob',
    email: 'bob@gmail.com',
    password: '$2b$12$UFmtaFZXZqOeXPL7ZHkstOIkCftSgB8yVzhB1No0J9gk2TAoZu2.S',
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
