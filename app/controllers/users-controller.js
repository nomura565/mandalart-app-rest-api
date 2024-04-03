const Controller = require('./controller');
const UserModel = require('../models/user-model');
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

  /**
  * ユーザ取得
  * 
  * @param req リクエスト
  * @param res レスポンス
  */
  getUser(req, res) {
    const logTarget = "getUser";
    this.logger.logStart(logTarget);
    this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
    const user_id = req.body.user_id;

    this.userModel.getUser(user_id)
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
   * ユーザ作成（一般）
   * 
   * @param req リクエスト
   * @param res レスポンス
   */
  createUser(req, res) {
    const logTarget = "createUser";
    this.logger.logStart(logTarget);
    this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
    this.logger.loginfo(logTarget, "req.body.user_name:" + req.body.user_name);
    this.logger.loginfo(logTarget, "req.body.department_id:" + req.body.department_id);

    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const password = req.body.password;
    const department_id = req.body.department_id;

    this.userModel.model.BeginTransaction();
    this.userModel.createUser(user_id, user_name, department_id, password)
      .then((result) => {
        this.logger.logEnd(logTarget);
        this.userModel.model.Commit();
        return this.controller.createSuccess(res)(result);
      })
      .catch((error) => {
        this.logger.logError(logTarget, error);
        this.userModel.model.Rollback();
        return this.controller.editError(res)(error);
      });
  }

  /**
  * チェックリスト取得
  * 
  * @param req リクエスト
  * @param res レスポンス
  */
  getCheckList(req, res) {
    const logTarget = "getCheckList";
    this.logger.logStart(logTarget);

    this.userModel.getCheckList()
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
  * 達成率リスト取得
  * 
  * @param req リクエスト
  * @param res レスポンス
  */
  getAcheivementList(req, res) {
    const logTarget = "getAcheivementList";
    this.logger.logStart(logTarget);
    this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
    this.logger.loginfo(logTarget, "req.body.yyyy:" + req.body.yyyy);

    const user_id = req.body.user_id;
    const yyyy = req.body.yyyy;

    this.userModel.getAcheivementList(user_id, yyyy)
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
  * 部署一覧取得
  * 
  * @param req リクエスト
  * @param res レスポンス
  */
  getDepartmentList(req, res) {
    const logTarget = "getDepartmentList";
    this.logger.logStart(logTarget);

    this.userModel.getDepartmentList()
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
