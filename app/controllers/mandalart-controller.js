const Controller = require('./controller');
const MandalartModel = require('../models/mandalart-model');
const MandalartEntity = require('../entities/mandalart-entity');

const Logger = require('../components/Logger');

/**
 * Mandalart Controller
 */
class MandalartController {
  /**
   * コンストラクタ
   */
  constructor() {
    this.controller = new Controller();
    this.mandalartModel = new MandalartModel();
    this.logger = new Logger();
  }

  /**
* 1件取得(ユーザIDと年月)
* 
* @param req リクエスト
* @param res レスポンス
*/
getMandalart(req, res) {
    const logTarget = "getMandalart";
    this.logger.logStart(logTarget);
    this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
    this.logger.loginfo(logTarget, "req.body.yyyymm:" + req.body.yyyymm);

    const user_id = req.body.user_id;
    const yyyymm = req.body.yyyymm;
    
    this.mandalartModel.getMandalart(user_id, yyyymm)
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
 * 保存
 * 
 * @param req リクエスト
 * @param res レスポンス
 */
  saveMandalart(req, res) {
    const logTarget = "saveMandalart";
    this.logger.logStart(logTarget);
    this.logger.loginfo(logTarget, "req.body.user_id:" + req.body.user_id);
    this.logger.loginfo(logTarget, "req.body.yyyymm:" + req.body.yyyymm);

    const request = req.body;

    this.mandalartModel.model.BeginTransaction();
    this.mandalartModel.saveMandalart(request)
      .then((result) => {
        this.logger.logEnd(logTarget);
        this.mandalartModel.model.Commit();
        return this.controller.createSuccess(res)(result);
      })
      .catch((error) => {
        this.logger.logError(logTarget, error);
        this.mandalartModel.model.Rollback();
        return this.controller.editError(res)(error);
      });
  }
}

module.exports = MandalartController;
