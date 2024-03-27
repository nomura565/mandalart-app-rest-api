# Mandalart App　REST-API

## 使い方

```sh
$ npm install
$ npm start

サーバ起動 : http://localhost:9050/
```

| 機能 | メソッド | URL |
|---|---|---|
| マンダラート保存                | POST      | `http://localhost:9050/api/mandalart/saveMandalart`  |
| マンダラート取得                | POST      | `http://localhost:9050/api/mandalart/getMandalart`  |
| ログイン                       | POST      | `http://localhost:9050/api/user/login`  |
| ユーザ一覧取得                 | POST      | `http://localhost:9050/api/user/getUserList`  |
| ユーザ取得                     | POST      | `http://localhost:9050/api/user/getUser`  |
| ユーザ作成（一般）              | POST      | `http://localhost:9050/api/user/createUser`  |

## DB構造

sqlmark2.a5er参照

テスト用一般ユーザ
user id:test_user
password:password

テスト用一般ユーザ
user id:test_user_admin
password:password