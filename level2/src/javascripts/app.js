import "../stylesheets/style.scss"
import React from "react"
import { render } from "react-dom"

// クリックなどを取得できるように必要
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

// 大元のコンポーネント
import App from "./components/App.jsx"
 
render(
  <App/>,
  document.getElementById("react")
)