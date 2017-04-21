import React from "react"

import AppActions from "../../../actions/AppActions"

import PropTypes from 'prop-types';

class CanvasView extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    var canvas = this.refs.canvas

    Caman.allowRevert = false

    this._initCanvas(canvas)
  }

  componentDidUpdate(){

    var canvas = this.refs.canvas
    var self = this

    this._clearCanvas(this.props.image,canvas)

    Caman("#canvas",function(){
      var caman = this

      this.replaceCanvas(canvas)

      if(self.props.isEditing && self.props.currentEdit.type){
        this[self.props.currentEdit.type](self.props.currentEdit.value)
      }

      Object.keys(self.props.canvasState).map( type =>{
        if(type != self.props.currentEdit.type && caman[type]){
          caman[type](self.props.canvasState[type])
        }
      })
      this.render()
    })
  }

  render(){
    return(
      <canvas id="canvas" ref="canvas"></canvas>
    )
  }

  _initCanvas = (canvas) => {
    var image = this.props.image

    if(!image || image.width < 1){
      image = new Image
      image.src = this.props.dataUrl
      image.onload = ()=> {
        AppActions.setImage(image)
        this._clearCanvas(image,canvas)
      }
    }
  }

  _clearCanvas = (image,canvas) => {

    if(image){
      var
        ctx = canvas.getContext("2d"),
        dstWidth = image.width,
        dstHeight = image.height

      if(image.width > 640){
        dstWidth = 640
        dstHeight = Math.round(dstWidth / image.width * image.height)
      }
      canvas.width = dstWidth
      canvas.height = dstHeight
      ctx.drawImage(image,0,0,image.width,image.height,0,0,dstWidth,dstHeight)
    }

  }

}

CanvasView.propTypes = {
  image: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
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
  dataUrl: PropTypes.string.isRequired
} 

export default CanvasView
