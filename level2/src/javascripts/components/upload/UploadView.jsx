import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import {white,pinkA400,indigoA200} from 'material-ui/styles/colors'
import AppBar from "material-ui/AppBar"

import AppActions from "../../actions/AppActions"

export default class UploadView extends React.Component {

  render(){
    return(
      <div>
        <AppBar
          title="Filter"
          iconClassNameLeft="muidocs-icon-navigation-expand-more"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{"backgroundColor": indigoA200}}
        />
        <RaisedButton
          containerElement='label'
          label="Select Image"
          backgroundColor={pinkA400}
          labelColor={white}
          className="uploadButton"
        >
          <input type="file" onChange={this._onUploaded}/>
        </RaisedButton>
      </div>
    )
  }

  _onUploaded = e => {
    var fileData = e.target.files[0]

    if(!fileData.type.match("image.*")){
      alert("画像を選択してください。")
      return
    }

    var reader = new FileReader()
    reader.readAsDataURL(fileData)
    reader.onload = () => {
      AppActions.uploaded(reader.result)
    }
  }

}