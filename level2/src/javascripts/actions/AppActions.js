import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"

var AppActions = {

  /**
   *  uploaded
   *  画像がアップロードされたら画像のデータをstoreへ通知する
   *
   *  @param { string } dataUrl
   */
  uploaded(dataUrl){
    AppDispatcher.dispatch({
      actionType: AppConstants.ON_UPLOADED,
      dataUrl: dataUrl
    })
  },

  /**
   *  editCancel
   *  canvasの編集をキャンセル
   */
  editCancel(){
    AppDispatcher.dispatch({
      actionType: AppConstants.EDIT_CANCEL
    })
  },

  /**
   *  changeCtrlView
   *  コントローラーに展開するViewを変更する
   *
   *  @param { string } renderType スライダーかエフェクト選択か
   *  @param { string } sliderType 明るさ、彩度などどのスライダーか
   *  @param { number } min スライダーの最小値
   *  @param { number } max スライダーの最大値
   */
  changeCtrlView(renderType,sliderType,min,max){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_CTRL_VIEW,
      renderType: renderType,
      sliderType: sliderType,
      min: min,
      max: max
    })
  },

  /**
   *  updateCanvas
   *  canvasを再描画する
   *
   *  @param { string } type
   *  @param { number } level
   */
  updateCanvas(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_CANVAS,
      type: type,
      level: level
    })
  },

  /**
   *  saveEffect
   *  現在編集中のエフェクトを保存する
   *
   *  @param { string } type
   *  @param { number } level
   */
  saveEffect(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.SAVE_CURRENT_EFFECT,
      type: type,
      level: level
    })
  },

  /**
   *  resetEffect
   *  エフェクトを破棄する
   */
  resetEffect(){
    AppDispatcher.dispatch({
      actionType: AppConstants.RESET_EFFECT
    })
  },

  /**
   *  doSave
   *  エフェクトをかけた状態の画像を保存する
   *
   *  @param { string } data
   */
  doSave(data){
    AppDispatcher.dispatch({
      actionType: AppConstants.DO_SAVE,
      data: data
    })
  },

  setImage(image){
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_IMAGE,
      image: image
    })
  },

  /**
   *  restart
   *  SPAをリスタートする
   */
  restart(){
    AppDispatcher.dispatch({
      actionType: AppConstants.RESTART
    })
  }

}

export default AppActions