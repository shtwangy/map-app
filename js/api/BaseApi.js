import { GenericDialog} from "../dialog/GenericDialog.js";
/**
 * HTTP通信＋JSON操作
 */
export class BaseApi {

  /**
   * コンストラクタ
   */
  constructor() {
    this.response = undefined;
    this.jsonObject = undefined;
  }

  /**
   * post処理
   * @param {String} url
   * @param {Object} postData
   */
  async doPost( url, postData ) {
    this.url = url;             // URL
    this.postData = postData;   // postデータ
    var result = false;         // 処理結果
    var count = 1;              // 残実行回数

    //console.log("post処理開始")

    // BaseApi内でリトライを実施する
    while ((result === false) && (count <= 3)) {
      //console.log(count + "回目");

      this.response = await fetch(url, {
        method: 'post',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: 'cors',
        body: postData
      })
      .catch((e) => {
        // サーバ接続ができない場合、ダイアログを表示する
        var gd = new GenericDialog("isurvey_generic_dialog", {});
        gd.setTitle("サーバに接続できません");
        gd.setMessage("電波の届く場所に移動してください", true);
        gd.setDecide("確認", function(){} , true);
        gd.openDialog();
       });

      if (this.response.ok) {
        //console.log("response.status:" + this.response.status);

        if (this.response.status === 200) {
          this.jsonObject = await this.response.json();

          //console.log("reply.status_code:" + this.jsonObject.reply.status_code);
          if (this.jsonObject.reply.status_code === 200) {
            console.log("fetch ok");
            result = true;
          }
          else {
            console.error("fetch error (api) : " + this.jsonObject.reply.status_code + "=" + this.jsonObject.reply.err_msg);
          }
        }
      }
      else {
        console.error("fetch error (http) : " + this.response.status);
      }
      count++;
    }
  }

  /**
   * get処理（仮追加）
   * @param {String} url - URL
   */
  async doGet( url ) {
    this.url = url;             // URL
    var result = false;         // 処理結果
    var count = 1;              // 残実行回数

    //console.log("get処理開始")

    // BaseApi内でリトライを実施する
    while ((result === false) && (count <= 3)) {
      //console.log(count + "回目");

      this.response = await fetch(url, {
        method: 'get',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
      })
      .catch((e) => {
        // サーバ接続ができない場合、ダイアログを表示する
        var gd = new GenericDialog("isurvey_generic_dialog", {});
        gd.setTitle("サーバに接続できません");
        gd.setMessage("電波の届く場所に移動してください", true);
        gd.setDecide("確認", function(){} , true);
        gd.openDialog();
      });

      if (this.response.ok) {
        //console.log("response.status:" + this.response.status);

        if (this.response.status == 200) {
          this.jsonObject = await this.response.json();

          //console.log("reply.status_code:" + this.jsonObject.reply.status_code);
          if (this.jsonObject.reply.status_code === 200) {
            console.log("fetch ok");
            result = true;
          }
          else {
            console.error("fetch error (api) : " + this.jsonObject.reply.status_code + "=" + this.jsonObject.reply.err_msg);
          }
        }
      }
      else {
        var t = await this.response.text();
        console.error("fetch error (http) : " + this.response.status);
      }
      count++;
    }
  }

  /**
   * HTTPステータスの取得
   */
  getHttpStatusCode () {
    return this.response.status;
  }

  /**
   * Web APIステータスの取得
   */
  getWebApiStatusCode () {
    return this.jsonObject.reply.status_code;
  }

  /**
   * Web APIエラーメッセージの取得
   */
  getWebApiErrMsg () {
    return this.jsonObject.reply.err_msg;
  }

  /**
   * replyオブジェクトの取得
   */
  getReplyObject() {
    return this.jsonObject.reply;
  }

  /**
   * dataオブジェクトの取得
   */
  getDataObject() {
    return this.jsonObject.reply.data;
  }

  /**
   * JSONオブジェクトの取得
   */
  getJsonObject() {
    return this.jsonObject;
  }

  /**
   * 結果レコード数の取得
   */
  getReturnCount() {
    return this.jsonObject.reply.data.return_count;
  }

  /**
   * 結果レコードセットの取得
   */
  getReturnRecords() {
    return this.jsonObject.reply.data.return_records;
  }
  getInsertRecords() {
    return this.jsonObject.reply.data.insert_records;
  }
  getUpdateRecords() {
    return this.jsonObject.reply.data.update_records;
  }

  /**
   * 指定キーの存在確認
   * @param {*} key
   */
  getKeyExists( key ) {
    var records = this.jsonObject.reply.data.return_records;
    return (key in records);
  }

  /**
   * 指定キーに該当する値を Boolean 型で返す
   * @param {Object} jsonObject - JSONオブジェクト
   * @param {String} key - キー
   */
  getReturnBoolean (jsonObject, key) {
    if (key in jsonObject) {
      return Boolean(jsonObject[key]);
    }
    return;
  }

  /**
   * 指定キーに該当する値を Number 型で返す
   * @param {Object} jsonObject - JSONオブジェクト
   * @param {String} key - キー
   */
  getReturnNumber (jsonObject, key) {
    if (key in jsonObject) {
      return Number(jsonObject[key]);
    }
    return;
  }

  /**
   * 指定キーに該当する値を String 型で返す
   * @param {Object} jsonObject - JSONオブジェクト
   * @param {String} key - キー
   */
  getReturnString (jsonObject, key) {
    if (key in jsonObject) {
      return String(jsonObject[key]);
    }
    return;
  }

  /**
   * 指定キーに該当する値を JSONObject 型で返す
   * @param {Object} jsonObject - JSONオブジェクト
   * @param {String} key - キー
   */
  getReturnJsonObject (jsonObject, key) {
    if (key in jsonObject) {
      var obj = jsonObject[key];
      if ((typeof obj) == "string") {
        try {
          obj = JSON.parse(obj);
        }
        catch (e) {
          console.error("JSON.parse error");
        }
      }
      return obj;
    }
    return;
  }

  /**
   * 指定キーに該当する値を JSONArray 型で返す
   * @param {Object} jsonObject - JSONオブジェクト
   * @param {String} key - キー
   */
  getReturnJsonArray (jsonObject, key) {
    if (key in jsonObject) {
      var obj = jsonObject[key];
      var arr = [];
      if (Array.isArray(obj)) {
        arr = obj;
      }
      else {
        arr.push(obj);
      }
      return arr;
    }
  }
}
