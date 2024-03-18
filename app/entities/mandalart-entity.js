/**
 * Mandalart Entity
 */
class MandalartrEntity {
  /**
   * コンストラクタ
   * 
   * @param user_id ユーザID
   * @param yyyymm 年月
   */
  constructor(user_id, yyyymm) {
    this.key = user_id + "_" + yyyymm;
    this.yyyymm = yyyymm;
  }
}

module.exports = MandalartrEntity;
