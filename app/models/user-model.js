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

  /**
 * ユーザ取得
 * 
 * @param user_id ユーザID
 * @return 取得できたら Resolve する
 */
  getUser(user_id) {
    const sql = `
      SELECT
        *
      FROM
        user_master
      WHERE
        user_id = $user_id
      `;
    const params = {
      $user_id: user_id
    };

    return this.model.findOne(sql, params)
      .then((row) => {
        return new UserEntity(row.user_id, row.user_name, row.role_id);
      });
  }

  /**
* ユーザ作成（一般）
* 
* @param user_id ユーザID
* @param user_name ユーザ名
* @param password パスワード
* @return 取得できたら Resolve する
*/
createUser(user_id, user_name, password) {
    const sql = `
          INSERT INTO user_master (
            user_id,
            user_name,
            password,
            role_id
          ) VALUES (
            $user_id,
            $user_name,
            $password,
            1
          )
          `;
    const params = {
      $user_id: user_id,
      $user_name: user_name,
      $password: password
    };

    return this.model.run(sql, params)
      .then((id) => {
        // 登録したデータを返却する
        //return this.findById(seat_info.seat_id, seat_info.seat_date);
      });
  }
}



module.exports = UserModel;
