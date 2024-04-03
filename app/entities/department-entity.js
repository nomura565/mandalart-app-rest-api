/**
 * Department Entity
 */
class DepartmentEntity {
  /**
   * コンストラクタ
   * 
   * @param department_id 部署ID
   * @param department_name 部署名
   */
  constructor(department_id, department_name) {
    this.key = department_id;
    this.department_id = department_id;
    this.department_name = department_name;
  }
}

module.exports = DepartmentEntity;
