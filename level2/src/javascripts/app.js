import "../stylesheets/style.scss"
import React from "react"
import { render } from "react-dom"

import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

import App from "./components/App.jsx"
 
render(
  <App/>,
  document.getElementById("react")
)