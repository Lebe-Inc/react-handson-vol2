import AppDispatcher from "../dispatcher/AppDispatcher"
import { EventEmitter } from "events"
import AppConstants from "../constants/AppConstants"
import assign from "object-assign"

const CHANGE_EVENT = "change"

// default values
const DEFAULT_CURRENT_EDIT_TYPE = null
const DEFAULT_CANVAS_EFFECT_VALUE = 0
const DEFAULT_SLIDER_MIN_MAX = 0
const DEFAULT_CONTROLLER_TYPE = "select"

// application data store
var _data = {
  isUploaded: false, // 画像がアップロードされているか
  isSaved: false, // 編集を終えたか
  dataUrl: null, // 画像のエンコード済みURL
  controllViewType: DEFAULT_CONTROLLER_TYPE, // 今のコントローラの状態
  sliderValues: {
    type: null, // slider type
    min: DEFAULT_SLIDER_MIN_MAX, // slider min value
    max: DEFAULT_SLIDER_MIN_MAX // slider max value
  },
  canvasState: {
    brightness: DEFAULT_CANVAS_EFFECT_VALUE, //明るさ
    contrast: DEFAULT_CANVAS_EFFECT_VALUE, // コントラスト
    hue: DEFAULT_CANVAS_EFFECT_VALUE, // 色合い
    saturation: DEFAULT_CANVAS_EFFECT_VALUE // 彩度
  },
  currentEdit: {
    type: DEFAULT_CURRENT_EDIT_TYPE,
    value: DEFAULT_CANVAS_EFFECT_VALUE
  }
}

/**
 *  onUploaded
 *  画像がアップロードされたら画像のデータをstoreへ通知する
 *
 *  @param { string } dataUrl
 */
var onUploaded = dataUrl => {
  _data.isUploaded = true
  _data.dataUrl = dataUrl
}

/**
 *  editCancel
 *  canvasの編集をキャンセル
 */
var editCancal = () => {
  _data.isUploaded = false
  _data.dataUrl = null
  resetEffect()
}

/**
 *  changeCtrlView
 *  コントローラーに展開するViewを変更する
 *
 *  @param { string } renderType スライダーかエフェクト選択か
 *  @param { string } sliderType 明るさ、彩度などどのスライダーか
 *  @param { number } min スライダーの最小値
 *  @param { number } max スライダーの最大値
 */
var changeCtrlView = (renderType,sliderType,min,max) => {
  _data.controllViewType = renderType
  _data.sliderValues.type = sliderType
  _data.currentEdit.type = sliderType
  _data.currentEdit.value = _data.canvasState[sliderType]
  if(sliderType == DEFAULT_CONTROLLER_TYPE){
    _data.currentEdit.type = DEFAULT_CURRENT_EDIT_TYPE
    _data.currentEdit.value = DEFAULT_CANVAS_EFFECT_VALUE
  }
  _data.sliderValues.min = min
  _data.sliderValues.max = max
}

/**
 *  updateCanvas
 *  canvasを再描画する
 *
 *  @param { string } type
 *  @param { number } level
 */
var updateCanvas = (type,level) => {
  _data.currentEdit.type = type
  _data.currentEdit.value = level
}

/**
 *  saveEffect
 *  現在編集中のエフェクトを保存する
 *
 *  @param { string } type
 *  @param { number } level
 */
var saveEffect = (type,level) => {
  _data.canvasState[type] = level
}

/**
 *  resetEffect
 *  エフェクトを破棄する
 */
var resetEffect = () => {
  Object.keys(_data.canvasState).map( type => {
    _data.canvasState[type] = DEFAULT_CANVAS_EFFECT_VALUE
  })
  _data.currentEdit.type = DEFAULT_CURRENT_EDIT_TYPE
  _data.currentEdit.value = DEFAULT_CANVAS_EFFECT_VALUE
}

/**
 *  doSave
 *  エフェクトをかけた状態の画像を保存する
 *
 *  @param { string } data
 */
var doSave = data => {
  _data.isSaved = true
  _data.dataUrl = data
}

var AppStore = assign({},EventEmitter.prototype,{

  // stateを全て返す
  getAll(){
    return _data
  },

  // 変更を通知する
  emitChange(){
    this.emit(CHANGE_EVENT)
  },

  // イベントリスナーの登録
  addChangeListener(callback){
    this.on(CHANGE_EVENT,callback)
  },

  // イベントリスナーの解除
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT,addChangeListener)
  }

})

AppDispatcher.register( action => {
  switch(action.actionType){

    case AppConstants.ON_UPLOADED:
      onUploaded(action.dataUrl)
      break

    case AppConstants.EDIT_CANCEL:
      editCancal()
      break

    case AppConstants.CHANGE_CTRL_VIEW:
      changeCtrlView(action.renderType,action.sliderType,action.min,action.max)
      break

    case AppConstants.UPDATE_CANVAS:
      updateCanvas(action.type,action.level)
      break

    case AppConstants.SAVE_CURRENT_EFFECT:
      saveEffect(action.type,action.level)
      break

    case AppConstants.RESET_EFFECT:
      resetEffect()
      break

    case AppConstants.DO_SAVE:
      doSave(action.data)
      break

    default:
      throw new Error("switch miss.")

  }
  AppStore.emitChange();
})

export default AppStore