import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import UploadView from "./upload/UploadView.jsx"
import EditView from "./edit/EditView.jsx"
import ShareView from "./share/ShareView.jsx"

import AppStore from "../store/AppStore"

import AppBar from 'material-ui/AppBar'

var getAll = () => {
  return AppStore.getAll()
}

export default class App extends React.Component {

  constructor(){
    super()
    this.state = getAll()
  }

  componentDidMount = () => {
    if(!(window.File && window.FileReader && window.FileList && window.Blob)){
      alert("お使いのブラウザではこのアプリケーションは使えません。")
    }
    AppStore.addChangeListener(this._onChange)
  }
 
  componentWillUnmount = () => {
    AppStore.removeChangeListener(this._onChange)
  }

  render(){
    var renderView = null

    if(this.state.isSaved){
      // 編集が完了し、シェアする画面まできているか
      renderView = <ShareView shareImage={this.state.dataUrl} />
    }else{
      if(this.state.isUploaded){
        // 画像がアップロードされているか
        renderView = (
          <EditView
            currentEdit={this.state.currentEdit}
            sliderValues={this.state.sliderValues}
            canvasState={this.state.canvasState}
            ctrlViewType={this.state.controllViewType}
            dataUrl={this.state.dataUrl} />
        )
      }else{
        renderView = <UploadView/>
      }
    }

    return(
      <MuiThemeProvider>
        {renderView}
      </MuiThemeProvider>
    )

  }

  _onChange = () => {
    this.setState(getAll())
  }

}