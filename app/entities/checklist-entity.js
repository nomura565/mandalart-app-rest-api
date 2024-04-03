/**
 * CheckList Entity
 */
class CheckListEntity {
  /**
   * コンストラクタ
   * 
   * @param user_id ユーザID
   * @param user_name ユーザ名
   * @param max_yyyymm 最終登録月
   * @param department_id 部署ID
   * @param achievement_gauge_value 達成率
   */
  constructor(user_id, user_name, max_yyyymm, department_id, achievement_gauge_value) {
    this.key = user_id;
    this.user_id = user_id;
    this.user_name = user_name;
    this.max_yyyymm = max_yyyymm;
    this.department_id = department_id;
    this.achievement_gauge_value = achievement_gauge_value;
  }
}

module.exports = CheckListEntity;
