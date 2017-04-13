import React from "react"

export default class CanvasView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      canvas: null
    }
  }

  componentDidMount(){
    var canvas = this.refs.canvas

    Caman.allowRevert = false

    this.setState({　canvas: canvas　})
    this._resetCanvas(canvas)
  }

  componentDidUpdate(){
    var canvas = this.state.canvas
    var self = this

    this._resetCanvas(canvas)

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

  _resetCanvas = (canvas) => {
    if(canvas.getContext){
      var ctx = canvas.getContext("2d")
      var image = new Image();
      image.src = this.props.dataUrl
      var dstWidth = image.width,
          dstHeight = image.height
        
      if(image.width >= 640){
        dstWidth = 640
        dstHeight = Math.round(dstWidth / image.width * image.height)
      }
      canvas.width = dstWidth
      canvas.height = dstHeight
      ctx.drawImage(image,0,0,image.width,image.height,0,0,dstWidth,dstHeight)
    }
  }

}