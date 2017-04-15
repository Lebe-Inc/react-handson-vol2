import keyMirror from "keymirror"

var AppConstants = keyMirror({
  ON_UPLOADED: null, // アップロード
  CHANGE_CTRL_VIEW: null, // コントローラの入れ替え
  UPDATE_CANVAS: null, // canvasのアップデート
  UPDATE_CURRENT_EDIT: null, // 現在編集しているエフェクトのアップデート
  SAVE_CURRENT_EFFECT: null, // 編集していたものを保存
  RESET_EFFECT: null, // 全てのエフェクトを解除
  DO_SAVE: null, // エフェクトのついたものを画像として保存
  SET_IMAGE: null, // imageをセットする
  RESTART: null // SPAをリスタートする
})

export default AppConstants