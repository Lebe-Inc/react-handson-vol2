import React from "react"

import {indigoA200} from 'material-ui/styles/colors'
import AppBar from "material-ui/AppBar"
import RaisedButton from 'material-ui/RaisedButton'

import AppActions from "../../actions/AppActions"

import PropTypes from 'prop-types';

class ShareView extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <AppBar
          title="Filter"
          iconClassNameLeft="muidocs-icon-navigation-expand-more"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{"backgroundColor": indigoA200}}
        />
        <div className="img">
          <img src={this.props.shareImage}/>
        </div>
        <RaisedButton label="SHARE" primary={true} className="share-button" onClick={this._share}/>
        <RaisedButton label="もう一度" secondary={true} className="share-button" onClick={this._reload}/>
      </div>
    )
  }

  _share = () => {
    var
      text = "2時間で学ぶReactハンズオンのLavel2をつくりきったよ！",
      url = "https://sha.connpass.com/event/53105/",
      hashtags = "reactTwoHourHandson"

    window.open("https://twitter.com/intent/tweet?text="+text+"&url="+url+"&hashtags="+hashtags,"window","width=1000, height=400, menubar=no, toolbar=no, scrollbars=yes")
  }

  _reload = () => AppActions.restart()

}

ShareView.propTypes = {
  shareImage: PropTypes.string.isRequired
}

export default ShareView