import React from "react"

import AppActions from "../../../../actions/AppActions"

export default class EditItem extends React.Component{

  render(){
    return(
      <li className="grid-item" onClick={this._onSelect}>
        <p className="grid-item--title">{this.props.displayEditName}</p>
        <div className="img">
          <img src={"images/"+ this.props.type +".png"}/>
        </div>
      </li>
    )
  }

  _onSelect = e => {
    e.preventDefault()
    AppActions.changeCtrlView("slider",this.props.type,this.props.min,this.props.max)
  }

}