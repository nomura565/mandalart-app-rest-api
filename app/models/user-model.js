const Model = require('./model');
const UserEntity = require('../entities/user-entity');

/**
 * User Model
 */
class UserModel {
  /**
   * コンストラクタ
   */
  constructor() {
    this.model = new Model();
  }

  /**
   * ログイン
   * 
   * @param user_id ユーザID
   * @param password パスワード（暗号化済）
   * @return 取得できたら Resolve する
   */
  login(user_id, password) {
    const sql = `
    SELECT
      *
    FROM
      user_master
    WHERE
      user_id = $user_id
      AND password = $password
    `;
    const params = {
      $user_id: user_id,
      $password: password,
    };

    return this.model.findOne(sql, params)
      .then((row) => {
        return new UserEntity(row.user_id, row.user_name, row.role_id);
      });
  }

  /**
   * ユーザ一覧取得
   * 
   * @return Entity の配列を Resolve する
   */
  getUserList() {
    const sql = `
    SELECT
      *
    FROM
      user_master
    `;
    const params = {
    };

    return this.model.findAll(sql, params)
      .then((rows) => {
        const users = [];

        for (const row of rows) {
          users.push(new UserEntity(row.user_id, row.user_name, row.role_id));
        }
        return users;
      });
  }
}



module.exports = UserModel;
