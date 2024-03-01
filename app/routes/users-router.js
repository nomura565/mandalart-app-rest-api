const express = require('express');

// ルータをモジュールとして作成する
const router = express.Router();

// コントローラを用意する
const UsersController = require('../controllers/users-controller');
const usersController = new UsersController();

// ログイン
router.post('/login', (req, res) => {
  usersController.login(req, res);
});

// ユーザ一覧取得
router.post('/getUserList', (req, res) => {
  usersController.getUserList(req, res);
});

module.exports = router;
