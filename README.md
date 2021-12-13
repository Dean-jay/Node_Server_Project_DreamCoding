# Node.js Project

## 1. SetUP & Router file

> 2021/12/08

## 2. MVC Code Refactoring

> 2021/12/08

---

| HomeWork

> > 풀이

- controller : get & getId & post & put & delete
- module 을 이용한 code를 분할!
- data : use json file

```json
//package.json
{
	{"start": "nodemon --experimental-json-modules app.js"}
}
```

[node json file 이용하기.](https://nkaushik.com/javascript/json-module-import-error-es6/)

> > 문제점

- data 사용시 해당 문제점 발견
  ExperimentalWarning: Importing JSON modules is an experimental feature.
  (Use `node --trace-warnings ...` to show where the warning was created)
- POST 와 DElETE는 수정이 필요하기 때문에 _let_ 을 쓰게 됨

---

| Solution

- 읽고 쓰는 순서대로 data/tweet.js 파일 안에 함수로 만들어 준다.
- export default 를 쓰지 않고 하나의 파일안에 여러 함수를 넣어준다.

---

## 3. async function

[async function mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

| async function 선언은 AsyncFunction객체를 반환하는 하나의 비동기 함수를 정의합니다. 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 Promise를 사용하여 결과를 반환합니다.

## 4. Validation

[express-validator](https://express-validator.github.io/docs/sanitization.html)

```shell
npm i express-validator
```

주로 POST 를 통해 저장 하기 전에 데이터가 유효한지 검사.

### Sanitization

특수 조건 등을 없애는 작업을 수행.

### Normalization

데이터를 일관성 있게 저장.

### Contract Testing : Client-Server

### Proto-base

## 5. Authentication

### bcrypt

### JWT

1. [x]user 한명일 때 서버구현
2. [x]user가 여러명 일때
3. [ ]MVC : view, controller, model 구현
