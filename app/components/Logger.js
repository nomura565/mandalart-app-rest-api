const Log4js = require("log4js");
// 設定ファイルの読み込み
Log4js.configure("./././log-config.json");

const MODEL_ERROR_CLASS = "ModelError";

class Logger {
  /**
   * コンストラクタ
   */
  constructor() {
  }

  logStart(target) {
    const logger = Log4js.getLogger();
    logger.info(target + " start");
  }

  loginfo(target, message) {
    const logger = Log4js.getLogger();
    logger.info(target + " " + message);
  }

  logEnd(target) {
    const logger = Log4js.getLogger();
    logger.info(target + " end");
  }

  logError(target, error) {
    const logger = Log4js.getLogger();
    if (error.constructor.name == MODEL_ERROR_CLASS) {
      logger.error(target + " errorCode:" + error.errorCode);
      logger.error(target + " errorMessage:" + error.errorMessage);
    } else {
      logger.error(target + " error:" + error.message);
    }
  }
}

module.exports = Logger;