const Model = require('./model');
const MandalartEntity = require('../entities/mandalart-entity');

/**
 * Mandalart Model
 */
class MandalartModel {
  /**
   * コンストラクタ
   */
  constructor() {
    this.model = new Model();
  }

    /**
   * 1件取得(ユーザIDと年月 年月を省略すると一番年月が若いもの)
   * 
   * @return Entity の配列を Resolve する
   */
    getMandalart(user_id, yyyymm) {
      let sql = `
      SELECT
        *
      FROM
        mandalart
      WHERE
        user_id = $user_id`;

      let params = {
        $user_id: user_id
      };

      if(yyyymm){
        sql = sql + ` AND yyyymm = $yyyymm `;
        params[`$yyyymm`] = yyyymm;
      } else {
        sql = sql + ` ORDER BY yyyymm DESC LIMIT 1 `;
      }
      
      return this.model.findOne(sql, params)
        .then((row) => {
          let mandalart = new MandalartEntity(row.user_id, row.yyyymm);
          for (let i = 0; i < 81; i++) {
            mandalart[`target_${i}`] = row[`target_${i}`];
            mandalart[`achievement_level_${i}`] = row[`achievement_level_${i}`];
          }
          return mandalart;
        });
    }

  /**
   * 保存
   * 
   * @param request リクエスト
   * @return 登録できたら Resolve する
   */
  saveMandalart(request) {
    let sql = `
      INSERT INTO mandalart (
        user_id,
        yyyymm,
    `;

    for (let i = 0; i < 80; i++) {
      sql = sql + `target_${i},
        achievement_level_${i},`;
    }

    sql = sql + `target_80
      ,achievement_level_80
    `;

    sql = sql + `
      ) VALUES (
          $user_id,
          $yyyymm,
    `;

    for (let i = 0; i < 80; i++) {
      sql = sql + `$target_${i},
        $achievement_level_${i},
      `;
    }

    sql = sql + `$target_80
      ,$achievement_level_80 
    )`;

    sql = sql + `
     ON CONFLICT(user_id, yyyymm) 
     DO UPDATE 
       SET 
    `;

    for (let i = 0; i < 80; i++) {
      sql = sql + `target_${i} = $target_${i},
        achievement_level_${i} = $achievement_level_${i},
      `;
    }

    sql = sql + `target_80 = $target_80,
      achievement_level_80 = $achievement_level_80 `;

    let params = {
      $user_id: request.user_id,
      $yyyymm: request.yyyymm
    };

    for (let i = 0; i < 81; i++) {
      params[`$target_${i}`] = request[`target_${i}`];
      params[`$achievement_level_${i}`] = request[`achievement_level_${i}`];
    }

    return this.model.run(sql, params)
      .then((id) => {
        // 登録したデータを返却する
        //return this.findById(seat_info.seat_id, seat_info.seat_date);
      });
  }

}



module.exports = MandalartModel;
