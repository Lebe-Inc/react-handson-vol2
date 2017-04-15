import React from "react"

import CanvasView from "./canvas/CanvasView.jsx"
import Controller from "./editor/Controller.jsx"

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationChrvronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import FlatButton from 'material-ui/FlatButton'

import {white,indigoA200} from 'material-ui/styles/colors'

import AppActions from "../../actions/AppActions"

import PropTypes from 'prop-types';

class EditView extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>
       <AppBar
        title="Filter"
        iconElementLeft={<IconButton><NavigationChrvronLeft/></IconButton>}
        onLeftIconButtonTouchTap={this._onBackButtonClick}
        onRightIconButtonTouchTap={this._onSave}
        iconElementRight={<FlatButton label="Save" />}
        style={{"backgroundColor": indigoA200}}
      />
        <div className="editView">
          <CanvasView
            image={this.props.image}
            currentEdit={this.props.currentEdit}
            canvasState={this.props.canvasState}
            dataUrl={this.props.dataUrl}
            isEditing={this.props.ctrlViewType == "slider"}
          />
          <Controller
            currentEdit={this.props.currentEdit}
            canvasState={this.props.canvasState}
            sliderValues={this.props.sliderValues}
            ctrlViewType={this.props.ctrlViewType}
          />
        </div>
      </div>
    )
  }

  _onBackButtonClick = e => {
    e.preventDefault()
    if(confirm("操作を中断しトップページへ戻りますか？")) AppActions.restart()
  }

  _onSave = e => {
    e.preventDefault()
    var canvas = document.getElementById("canvas")
    AppActions.doSave(canvas.toDataURL('image/png'))
  }

}

EditView.propTypes = {
  image: PropTypes.object,
  currentEdit: PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.number
  }),
  canvasState: PropTypes.shape({
    brightness: PropTypes.number.isRequired,
    contrast: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired,
    saturation: PropTypes.number.isRequired
  }),
  dataUrl: PropTypes.string.isRequired,
  ctrlViewType: PropTypes.string.isRequired,
  sliderValues: PropTypes.shape({
    type: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  })
}

export default EditView
