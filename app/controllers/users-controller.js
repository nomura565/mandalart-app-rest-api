const Controller = require('./controller');
const UserModel  = require('../models/user-model');
const UserEntity = require('../entities/user-entity');

const Logger = require('../components/Logger');

/**
 * Users Controller
 */
class UsersController {
  /**
   * コンストラクタ
   */
  constructor() {
    this.controller = new Controller();
    this.userModel = new UserModel();
    this.logger = new Logger();
  }

  /**
   * ログイン
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
    login(req, res) {
      const logTarget = "login";
      this.logger.logStart(logTarget);
      this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
      const user_id = req.body.user_id;
      const password = req.body.password;

      this.userModel.login(user_id, password)
        .then((result) => {
          this.logger.logEnd(logTarget);
          return this.controller.findSuccess(res)(result);
        })
        .catch((error) => {
          this.logger.logError(logTarget, error);
          return this.controller.findError(res)(error);
        });
    }

    /**
   * ユーザ一覧取得
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
    getUserList(req, res) {
      const logTarget = "getUserList";
      this.logger.logStart(logTarget);

      this.userModel.getUserList()
        .then((result) => {
          this.logger.logEnd(logTarget);
          return this.controller.findSuccess(res)(result);
        })
        .catch((error) => {
          this.logger.logError(logTarget, error);
          return this.controller.findError(res)(error);
        });
    }
}

module.exports = UsersController;
