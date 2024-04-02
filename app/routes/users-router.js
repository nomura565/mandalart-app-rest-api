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

// ユーザ取得
router.post('/getUser', (req, res) => {
  usersController.getUser(req, res);
});

// ユーザ作成（一般）
router.post('/createUser', (req, res) => {
  usersController.createUser(req, res);
});

// チェックリスト取得
router.post('/getCheckList', (req, res) => {
  usersController.getCheckList(req, res);
});

// 達成率リスト取得
router.post('/getAcheivementList', (req, res) => {
  usersController.getAcheivementList(req, res);
});

module.exports = router;
