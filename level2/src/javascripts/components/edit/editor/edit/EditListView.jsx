import React from "react"

import EditItem from "./EditItem.jsx"

export default class EditListView extends React.Component{

  render(){
    return(
      <ul className="grid-list">
        <EditItem
          displayEditName="明るさ"
          type="brightness"
          min={-100}
          max={100}
        />
        <EditItem
          displayEditName="コントラスト"
          type="contrast"
          min={-100}
          max={100}
        />
        <EditItem
          displayEditName="色合い"
          type="hue"
          min={0}
          max={100}
        />
        <EditItem
          displayEditName="彩度"
          type="saturation"
          min={-100}
          max={100}
        />
      </ul>
    )
  }

}