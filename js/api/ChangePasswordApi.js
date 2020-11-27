import { BaseApi } from './BaseApi.js';

/**
 * パスワード変更制御
 */
export class ChangePasswordApi extends BaseApi {

  /**
   * コンストラクタ
   * @param {String} accessToken - アクセストークン
   * @param {String} newPassword - 新規パスワード
   */
  constructor(accessToken, newPassword) {
    super();
    this.accessToken = accessToken;
    this.newPassword = newPassword;
  }

  /**
   * "change_user_password"API用のパラメータを作成する。
   */
  createChangePasswordParameters() {
    // パラメータ作成
    let parameters = "request[action]=change_user_password";
    parameters += "&request[access_token]=" + this.accessToken;
    parameters += '&request[arguments][new_password]=' + this.newPassword;

    //console.log(parameters);

    return parameters;
  }

  /**
   * "change_user_passwordした処理正否を返す
   */
  async startChangePassword() {
    //console.log("パスワード変更処理開始");

    var result = false;
    var url = window.gMapFanUrl;

    // パラメータ作成
    let request = this.createChangePasswordParameters();
    await this.doPost(url, request);
    let httpStatus = this.getHttpStatusCode();
    if (httpStatus === 200) {
      let apiStatus = this.getWebApiStatusCode();
      if (apiStatus === 200) {
        console.log("change_user_password OK");

        result = true;
      }
      else {
        console.error("change_user_password NG (api error:" + apiStatus + ")");
      }
    }
    else {
      console.error("change_user_password NG (http error:" + httpStatus + ")");
    }
    //console.log("パスワード変更処理終了");
    return result;
  }
}
