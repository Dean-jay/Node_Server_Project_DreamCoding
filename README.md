# Node.js Project

## 1. SetUP & Router file

> 2021/12/08

## 2. MVC Code Refactoring

> 2021/12/08

---

| HomeWork
\*\* 풀이

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

\*\* 문제점

- data 사용시 해당 문제점 발견
  ExperimentalWarning: Importing JSON modules is an experimental feature.
  (Use `node --trace-warnings ...` to show where the warning was created)
- POST 와 DElETE는 수정이 필요하기 때문에 _let_ 을 쓰게 됨

---

| Solution
