import React from "react"

import Slider from 'material-ui/Slider'

import AppActions from "../../../../actions/AppActions"

export default class SliderView extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    var
      defaultValue = null,
      self = this

    Object.keys(this.props.canvasState).map( type =>{
      if(self.props.sliderValues.type == type){
        defaultValue = self.props.canvasState[type]
      }
    })
    return(
      <div className="slider">
        <Slider
          onChange={this._onChangeValue}
          min={this.props.sliderValues.min}
          max={this.props.sliderValues.max}
          defaultValue={defaultValue}
          step={1}
        />
      </div>
    )
  }

  _onChangeValue = (e,value) => {
    AppActions.updateCanvas(this.props.sliderValues.type,value)
  }

}