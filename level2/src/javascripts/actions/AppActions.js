import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"

var AppActions = {

  uploaded(dataUrl){
    AppDispatcher.dispatch({
      actionType: AppConstants.ON_UPLOADED,
      dataUrl: dataUrl
    })
  },

  editCancel(){
    AppDispatcher.dispatch({
      actionType: AppConstants.EDIT_CANCEL
    })
  },

  changeCtrlView(renderType,sliderType,min,max){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_CTRL_VIEW,
      renderType: renderType,
      sliderType: sliderType,
      min: min,
      max: max
    })
  },

  updateCanvas(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_CANVAS,
      type: type,
      level: level
    })
  },

  saveEffect(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.SAVE_CURRENT_EFFECT,
      type: type,
      level: level
    })
  },

  resetEffect(){
    AppDispatcher.dispatch({
      actionType: AppConstants.RESET_EFFECT
    })
  },

  doSave(data){
    AppDispatcher.dispatch({
      actionType: AppConstants.DO_SAVE,
      data: data
    })
  }

}

export default AppActions