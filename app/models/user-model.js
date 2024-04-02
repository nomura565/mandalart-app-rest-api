const Model = require('./model');
const UserEntity = require('../entities/user-entity');
const CheckListEntity = require('../entities/checklist-entity');

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
    WHERE
     role_id = 1
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

  /**
 * チェックリスト取得
 * 
 * @return Entity の配列を Resolve する
 */
  getCheckList() {
    const sql = `
        SELECT
          um.user_id
          ,um.user_name
          ,m.max_yyyymm
          , CASE WHEN m2.achievement_gauge_value IS NULL THEN "" 
	          ELSE CAST(ROUND(m2.achievement_gauge_value * 100, 2) AS STRING) || "%" END AS achievement_gauge_value
        FROM user_master um
        LEFT JOIN 
        (
          SELECT
            user_id
            ,MAX(yyyymm) as max_yyyymm
            FROM mandalart
            GROUP BY user_id
        ) m
        ON um.user_id = m.user_id
        LEFT JOIN mandalart m2
        ON m.user_id = m2.user_id
        AND m.max_yyyymm = m2.yyyymm
        
        WHERE um.role_id = 1
      `;
    const params = {
    };

    return this.model.findAll(sql, params)
      .then((rows) => {
        const checkLists = [];

        for (const row of rows) {
          checkLists.push(new CheckListEntity(row.user_id, row.user_name, row.max_yyyymm, row.achievement_gauge_value));
        }
        return checkLists;
      });
  }

  /**
 * 達成率リスト取得
 * 
 * @param user_id ユーザID
 * @param yyyy 年
 * 
 * @return Entity の配列を Resolve する
 */
  getAcheivementList(user_id, yyyy) {
    const sql = `
        SELECT
          user_id
          ,yyyymm
          ,CASE WHEN achievement_gauge_value IS NULL THEN "" 
          ELSE CAST(ROUND(achievement_gauge_value * 100, 2) AS STRING) END AS achievement_gauge_value
        FROM mandalart
        WHERE user_id = $user_id
        AND yyyymm LIKE $yyyy
      `;
    const params = {
      $user_id: user_id,
      $yyyy: yyyy + "%"
    };

    return this.model.findSelect(sql, params)
      .then((rows) => {
        const acheivementLists = [];

        
        Array(12).fill(0).map((val, i) => {
          const yy = (i+1).toString().padStart( 2, '0');
          let addData = null;
          for (const row of rows) {
            const dataYy = row.yyyymm.split('/')[1];
            if(yy === dataYy){
              addData = row.achievement_gauge_value;
            }
          }
          acheivementLists.push(addData);
        })
        
        return acheivementLists;
      });
  }
}



module.exports = UserModel;
