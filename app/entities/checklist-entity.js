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
   * @param department_name 部署名
   * @param achievement_gauge_value 達成率
   */
  constructor(user_id, user_name, max_yyyymm, update_date, department_id, department_name, achievement_gauge_value) {
    this.key = user_id;
    this.user_id = user_id;
    this.user_name = user_name;
    this.max_yyyymm = max_yyyymm;
    this.update_date = update_date;
    this.department_id = department_id;
    this.department_name = department_name;
    this.achievement_gauge_value = achievement_gauge_value;
  }
}

module.exports = CheckListEntity;
