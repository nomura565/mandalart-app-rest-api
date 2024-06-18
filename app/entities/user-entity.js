/**
 * User Entity
 */
class UserEntity {
  /**
   * コンストラクタ
   * 
   * @param user_id ユーザID
   * @param user_name ユーザ名
   * @param role_id ロールID
   * @param department_id 部署ID
   * @param department_name 部署名
   */
  constructor(user_id, user_name, role_id, department_id, department_name) {
    this.key = user_id;
    this.user_id = user_id;
    this.user_name = user_name;
    this.role_id = role_id;
    this.department_id = department_id;
    this.department_name = department_name;
  }
}

module.exports = UserEntity;
