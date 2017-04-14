import React from "react"

import SliderView from "./edit/SliderView.jsx"
import EditListView from "./edit/EditListView.jsx"

import AppActions from "../../../actions/AppActions"

export default class Controller extends React.Component{

  constructor(props) {
    super(props)
  }

  render(){
    var
      renderView = null,
      menuText = {},
      menuState = {
        defaultMenu: {
          first: "Filter",
          sec: "Edit",
        },
        sliderViewMenu: {
          first: "キャンセル",
          sec: "完了"
        }
      }

    if(this.props.ctrlViewType == "select"){
      renderView = <EditListView/>
      menuText = menuState.defaultMenu
    }else{
      renderView = <SliderView canvasState={this.props.canvasState} sliderValues={this.props.sliderValues} />
      menuText = menuState.sliderViewMenu
    }

    return(
      <div className="controller">
        {renderView}
        <ul className="menu">
          <li onClick={this._onCancel}>{menuText.first}</li>
          <li onClick={this._onSave} className="active">{menuText.sec}</li>
        </ul>
      </div>
    )
  }

  _changeCtrlView = () => AppActions.changeCtrlView("select",null,0,0)
  _onCancel = () => this._changeCtrlView()

  _onSave = () => {
    AppActions.saveEffect(this.props.currentEdit.type,this.props.currentEdit.value)
    this._changeCtrlView()
  }

}