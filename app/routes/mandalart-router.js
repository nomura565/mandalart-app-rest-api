const express = require('express');

// ルータをモジュールとして作成する
const router = express.Router();

// コントローラを用意する
const MandalartController = require('../controllers/mandalart-controller');
const mandalartController = new MandalartController();

// 保存
router.post('/saveMandalart', (req, res) => {
  mandalartController.saveMandalart(req, res);
});

// 保存
router.post('/getMandalart', (req, res) => {
  mandalartController.getMandalart(req, res);
});

module.exports = router;
