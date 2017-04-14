# 2時間で学ぶReactハンズオン Level2

[2時間で学ぶReactハンズオン vol2 connpass](https://iotlt.connpass.com/event/55251/)

**Level2ではInstagramのようなフィルターのSPAを作ります。**

```
このREADMEは、4/14に開催した「2時間で学ぶReactハンズオン vol2」の教材になります。
URL: https://iotlt.connpass.com/event/55251/
```

## 使うライブラリ

- [React](https://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)
- [CamanJS](http://camanjs.com/)

## 作る画面

作る画面は3つです。

### 画像を選択するスタート画面

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/upload.png)

### 画像の編集をする画面

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/edit_select.png)
![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/edit_slider.png)

### シェアする画面

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/share.png)

の3つです。

## 構成

今回の構成は

```
- dist/
  - index.html
  - lib/
    - Caman.min.js
  - image/
    - icon.png
- src/
  - app.js
  - actions/
    - AppActions.js
  - components/
    - App.jsx
      - upload/
        - UploadView.jsx
      - edit/
        - canvas/
          - CanvasView.jsx
        - editor/
          - edit/
            - EditListView.jsx
            - EditItem.jsx
            - SliderView.jsx
          - Controller.jsx
        - EditView.jsx
      - share/
        - ShareView.jsx
  - constants/
    - AppConstants.js
  - store/
    - AppStore.js
  - dispatcher/
    - AppDispatcher.js
```

Fluxでは`actions`,`store`,`components`,`dispatcher`の4つから構成されます。

### Action

**action**は、**dispatcher**へ命令を指図する役割をもっています。

### Dispatcher

**dispatcher**は、**action**から受けた指図を**store**へ引き継ぐ役割をします。

### Store

**store**は、**dispatcher**が引き継いだ**action**の指図を元に処理をします。

**store**はデータストアであるのでアプリケーションの全データの保管庫でもあります。**action**からの指図で自分のデータを書き換えて、書き換えたことを**componenets**に知らせることで、アプリケーションは常に最新のデータをレンダリングすることができます。

### Components

**components**は、クリックなどの動作をもとに**action**へ通知します。値が更新されたら**store**に最新状態を取得しに行き、常に最新の状態をレンダリングします。

---

今回はReactでのSPA開発が主な目標なので、先にFlux周りの実装を仕切ってしまってから順番にコンポーネントをつくっていきます。

こちらの方で環境（webpack.config.js,.babelrcなど）は作ってあるので、それを使って開発をしていきます。

まずは基礎となる`app.js`を作っていきます。

```app.js
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
```

cssを一緒にwebpackへ混ぜてしまうので、scssファイルをインポートします。
あとは`React`、`ReactDOM`の`render`、`injectTapEventPlugin`はクリックの動作を取るためのものです。

`App`というのは、このアプリケーションにおける一番親のコンポーネントになります。
全てのデータはこの`App`を通って、子コンポーネントへ渡されます。

次に、繋ぎをしてくれる**dispatcher**を作っていきます。

```AppDispatcher.js
import {Dispatcher} from "flux"
export default new Dispatcher()
```

これだけです。あとはこのインスタンスを使って、アプリケーションをつくって行きます。

次に、アプリケーション内のイベントを定義しておくための**constants**をつくります。

```AppConstants.js
import keyMirror from "keymirror"

var AppConstants = keyMirror({
  ON_UPLOADED: null, // アップロード
  EDIT_CANCEL: null, // 編集キャンセル
  CHANGE_CTRL_VIEW: null, // コントローラの入れ替え
  UPDATE_CANVAS: null, // canvasのアップデート
  UPDATE_CURRENT_EDIT: null, // 現在編集しているエフェクトのアップデート
  SAVE_CURRENT_EFFECT: null, // 編集していたものを保存
  RESET_EFFECT: null, // 全てのエフェクトを解除
  DO_SAVE: null // エフェクトのついたものを画像として保存
})

export default AppConstants
```

今回は、`keyMirror`というモジュールを使っていますがこれは`key`を`value`にコピーしているだけのモジュールです。

続いて、**action**をつくっていきます。

```AppActions.js
import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"

var AppActions = {

  uploaded(dataUrl){
    AppDispatcher.dispatch({
      actionType: AppConstants.ON_UPLOADED,
      dataUrl: dataUrl
    })
  },

  editCancel(){
    AppDispatcher.dispatch({
      actionType: AppConstants.EDIT_CANCEL
    })
  },

  changeCtrlView(renderType,sliderType,min,max){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_CTRL_VIEW,
      renderType: renderType,
      sliderType: sliderType,
      min: min,
      max: max
    })
  },

  updateCanvas(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_CANVAS,
      type: type,
      level: level
    })
  },

  saveEffect(type,level){
    AppDispatcher.dispatch({
      actionType: AppConstants.SAVE_CURRENT_EFFECT,
      type: type,
      level: level
    })
  },

  resetEffect(){
    AppDispatcher.dispatch({
      actionType: AppConstants.RESET_EFFECT
    })
  },

  doSave(data){
    AppDispatcher.dispatch({
      actionType: AppConstants.DO_SAVE,
      data: data
    })
  }

}

export default AppActions
```

**constants**で定義したものを元に、**action**では**dispatcher**と繋ぎを書いていきます。

`actionType`は**constants**で定義されたものを使います。

その他は、その処理で必要なものを一緒に渡していきます。

では、最後にコンポーネントを作っていきます。

まず大元である`App.jsx`を作っていきます。

```App.jsx
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class App exntends React.Component {

  render(){

    var renderView = <h1>Hello World</h1>

    reutrn(
      <MuiThemeProvider>
        {renderView}
      </MuiThemeProvider>
    )
  }

}
```

今回は、CSSライブラリとして[material-ui](http://material-ui.com/#/home)を使うので、`MuiThemeProvider`というコンポーネントで挟むことになります。

`renderView`という変数には`<h1>Hello World</h1>`という要素が代入されているので、展開後はHTMLで`Hello World`と表示されると思います。

ここまでかけたら、一度ビルドしてみましょう。

`package.json`のほうに、実行すべきスクリプトはかいているので`npm run dev`と`package.json`があるディレクトリで実行してください。

`Hello World`が表示されたら成功です。

## アップロード画面を作ろう

ではさっそく、アップロード画面をつくって行きます。

アップロード画面はヘッダーと、ファイルを選択する2つの要素で出来ています。

まずはインポートするものです。

```components/upload/UploadView.jsx
import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import {white,pinkA400,indigoA200} from 'material-ui/styles/colors'
import AppBar from "material-ui/AppBar"

import AppActions from "../../actions/AppActions"
```

まずはReact本体です。その他に、`material-ui`の`RaisedButton,AppBar`とMaterial Designの色である`white,pinkA400,indigoA200`の3つを取得してきています。

その他に、`AppAction`を呼んでいます。これはファイルをアップロードしたら`ON_UPLOADED`というイベントを送るためです。

次に展開するHTML自体を書いていきます。

```components/upload/UploadView.jsx
export default class UploadView extends React.Component{

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

}
```

さっきインポートした`AppBar`と`RaiseButton`を使っています。ファイルの読み込み用に`<input type="file"/>`が存在します。

よく`<input type="file"/>`をみると、`onChange`が定義されています。

ではこの`onChange`で呼ばれるメソッドを実装していきましょう。

```components/upload/UploadView.jsx
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
```

メソッドの最初に`_`がついているのは、プライベートメソッドによく`_`をつけるのと同じような習慣的なものです。なので絶対に`_`から始めないと動かないかと言われるとそんなことはありません。

`_onUploaded`メソッドでは、`event`からファイルのデータを取得し画像かどうかを確認してから、base64でエンコードされた画像本体を**action**の`uploaded`メソッドを使って**store**へ送っています。

ここまでで、コンポーネントとしての`UploadView`は完成したので`App.jsx`にインポートしてレンダリングしましょう。

`App.jsx`を書き換えます。

```components/App.jsx
import UploadView from "./upload/UploadView.jsx"
```

まずインポートを書き足します。

次に、`renderView`に`<h1>Hello World</h1>`がはいってたと思いますが、そこにこの`<UploadView/>`を代入します。

```components/App.jsx
renderView = <UploadView/>
```

ここまで書いたら一度ビルドしましょう。

これで、1つ目の画面は完成したと思います。

## 編集画面を作ろう

では、今回の一番の大御所である編集画面をつくって行きます。

まずこの画面は2つの大きなコンポーネント、`CanvasView`と`Controller`に分かれます。

`CanvasView`はその名の通り、canvasをレンダリングするViewです。

canvasをレンダリングするViewを1つだけにしておくことで、管理がしやすくなります。

もう一つは、`Controller`です。`Controller`は2種類に分かれます。

エフェクトを選択する画面と、スライダーで編集自体をする画面です。

まずは`CanvasView`を作っていきます。

### CanvasViewを作る

`components/edit/canvas/CanvasView.jsx`を編集していきます。

まずインポートを書いていきます。

```js
// CanvasView.jsx
import React from "react"
```

今回はReactだけをインポートします。

このコンポーネントはstateとして、canvasを持ちます。

なのでコンストラクタにcanvasを持たせていきたいと思います。

```js
// CanvasView.jsx
export default class CanvasView extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      canvas: null
    }
  }

}
```

次に一番最初にレンダリングをするために、Reactのライフサイクルである`componentDidMount`を使っていきます。

`componentDidMount`は、コンポーネントがレンダリングされる直後に呼ばれます。

```js
// CanvasView.jsx
componentDidMount(){
  var canvas = this.refs.canvas
  Caman.allowRevert = false

  this.setState({ canvas: canvas })
  this._resetCanvas(canvas)
}
```

`_resetCanvas`というメソッドがでてきました。

これはHTMLのcanvasを一度キレイにするものです。

では先に、`_resetCavnas`を実装していきたいと思います。

```js
// CanvasView.jsx
_resetCanvas = () => {

  var self = this

  if(!image || image.width < 1){
    image = new Image
    image.onload = () => {
      setTimeout(()=>{
        self._drawCanvas(image,canvas)
      }, 100)
    }
    image.src = this.props.dataUrl
    return
  }

  this._drawCanvas(image,canvas)

}
```

最初に`self`に`this`を代入してるのは、コールバックの中でReactの`this`を追えなくなるためです。

`_drawCanvas`は画像自体をcanvasに展開するためのメソッドです。

ifは、一番最初だけ処理をしたりレンダリングに失敗している場合に処理をするために書いています。

ifの中ですが、imageをロードしてその中で`_drawCanvas`を呼んでいますが`setTimeout`をつかって100ミリ秒のウエイトをかけています。

これはブラウザ間でcanavsを構成する順番がシングルスレッドかマルチスレッドかによって、タイミングが変わるので、故意に100ミリ秒のウエイトをかけています。

`image.src`はずっと変わらないので、最初にだけ代入していれば大丈夫です。

では、`_drawCanvas`を実装していきましょう。

```js
// CanvasView.jsx
_drawCanvas = (image,canvas) => {

  var
    ctx = canvas.getContext("2d")
    dstWidth = image.width
    dstHeight = image.height

  if(image.width > 640){
    dstWidth = 640
    dstHeight = Math.round(dstWidth / image.width * image.height)
  }
  canvas.width = dstWidth
  canvas.height = dstHeight
  ctx.drawImage(image,0,0,image.width,image.height,0,0,dstWidth,dstHeight)
}
```

ここはReactは関係なく普通にcanvasで画像をレンダリングする処理を書いていきます。

最初にコンテキスト（ctx）をつくって、画像の幅と高さを一度別の変数に代入します。

今回はcanvasでエフェクトをかけていくので、画像があまりに大きいとエフェクトがかかるまで処理が膨大になり重くなってしまいます。なので、幅は640pxより大きいものは640pxに揃えてしまいます。

今回はハンズオンなので、横幅しかみていないので高さがすごい大きな画像を使えばこの`if`を回避することができますが、ただ処理が重くなるだけなので、素直にハンズオンをしましょう。

これで縦横の比を維持したまま、小さいサイズの画像をつくることができました。

この幅と高さを`canvas`自体に教えてあげて、`ctx`をつかって画像をレンダリングします。

では、`canvasView`のレンダリングするcanvas要素を書き足したいと思います。

```js
// CanvasView.jsx
render(){
  return(
    <canvas id="canvas" ref="canvas"></canvas>
  )
}
```

これがcanvas本体になります。

### Controllerを作ろう

コントローラー部分をつくって行きます。

`controller`は*スライダー*と*セレクト*の画面を切り替える必要があります。

まずは、*スライダー*を作っていきます。

まずインポートしていきます。

```js
// SliderView.jsx
import React from "react"
import Slider from "material-ui/Slider"
import AppActions from "../../../../actions/AppActions"
```

次に`View`を作っていきます。

```js
// SliderView.jsx
render(){
  return(
    <div>
      <Slider
        onChange={this._onChangeValue}
        onDragStop={this._onDragStop}
        min={this.props.sliderValues.min}
        max={this.props.sliderValues.max}
        defaultValue={defaultValue}
        step={1}
      />
    </div>
  )
}
```

`Slider`自体は`material-ui`の`Slider`コンポーネントを使いました。

このコンポーネントには、エフェクトによってことなるもの（値の幅がhueは0~100からだけど、明るさは-100~100など）があるので

- 最小値
- 最大値
- 初期値
- step値

を追加していかないといけません。

その他に、`onChange`と`onDragStop`があります。

`onChange`は、動かしている間のイベントと新しい値を取得できて、`onDragStop`は動かし終わったあとのイベントが取得出来ます。

`onChange`で値を取得し続け、`onDragStop`で動きが終わったときだけ処理をするようにすることで、毎回canvasをレンダリングし直さないのでスライドが滑らかになります。

それぞれのメソッドは`_onChangeValue`と`_onDragDrop`です。

まず`_onChangeValue`を実装します。

```js
// SliderView.jsx
_onChangeValue = (e,value) => {
  this.setState({ sliderValue: value })
}
```

これで、スライダーの値をstateを書き換えてコンポーネントで保持します。

次に`_onDragStop`を作ります

```js
// SliderView.jsx
_onDragStop = e => {
  AppActions.updateCanvas(this.props.sliderValues.type,this.state.sliderValue)
}
```

dragStopのときは、今のスライダーの値を**action**へ投げてやればあとはFluxによって勝手にフローしてくれます。

スライダーの実装としては、編集したら`defaultValue`が変わります。

なのでそこを作っていきます。

`render`メソッドの中で変数を定義していきたいと思います。

```js
// SliderView.jsx
render(){
  var
    defaultValue = null,
    self = this

  Object.keys(this.props.canvasState).map( type => {
    if(self.props.slideValues.type == type){
      defaultValue = self.props.canvasState[type]
    }
  })

  return(...)
}
```

`defaultValue`に入れるべきは、このsliderのtypeと`canvasState`の任意のものが一致した時なので、`Object.keys`でobjectのkeyだけをmapメソッドでループして使います。

これで`SliderView`が完成しました。

では、`SliderView`をつくったので、先にこれを管理している`Controller.jsx`をつくりたいと思います。

まずはインポートします。ファイルは`components/edit/editor/Controller.jsx`です。

```js
// Controller.jsx
import React from "react"
import SliderView from "./edit/SliderView.jsx"

import AppActions from "../../../actions/AppActions"
```

先程つくった`SliderView`をインポートしておきます。

ではレンダリング部分を作っていきます。

```js
// Controller.jsx
render(){
  return(
    <div className="controller">
      {renderView}
      <ul>
        <li onClick={this._onCancel}>{menuText.first}</li>
        <li onClick={this._onSave}>{menuText.sec}</li>
      </ul>
    </div>
  )
}
```

これでコンポーネント自体の作成はできましたが、`renderView`や`menuText`という変数が混ざっています。これらをつくりたいと思います。

```js
// Controller.jsx
render(){
  var
    renderView = null
    menuText = {},
    menuState = {
      defaultMenu: {
        first: "Filter",
        sec: "Edit"
      },
      sliderMenu: {
        first: "キャンセル",
        sec: "完了"
      }
    }

  renderView = <SliderView canvasState={this.props.canvasState} sliderValues={this.props.sliderValues}/>
  menuText = menuState.sliderMenu

  return(...)
}
```

ここまでで、`SliderView`だけをレンダリングする`Controller`コンポーネントを作成できました。

先に、`_onCancel`と`_onSave`をつくってしまいます。

```js
// Controller.jsx
_changeCtrlView = () => {
  AppActions.changeCtlrView("select",null,0,0)
}
_onCancel = () => this._changeCtrlView()
_onSave = () => {
  AppActions.saveEffect(this.props.currentEdit.type,this.props.currentEdit.value)
  this._changeCtrlView()
}
```

今回は、`Filter`と`Edit`の場合にイベントが無いので、メソッドの名前を`_onCancel`と`_onSave`にしています。

では、エフェクトを選択する画面を作っていきます。

まずエフェクト１つ１つをつくって行きたいと思います。

`components/edit/editor/edit/EditItem.jsx`を編集していきます。

```js
// EditItem.jsx
import React from "react"

import AppActions from "../../../../actions/AppActions"

export defualt class EditItem exntends React.Component{

  render(){
    return(
      <li className="grid-item" onClick={this._onSelect}>
        <p className="grid-item--title">{this.props.displayEditName}</p>
        <div className="img">
          <img src={"images/"+this.props.type+".png"} />
        </div>
      </li>
    )
  }

}
```

これで`<li>`をつかって、アイテム1つ1つができました。

選択されたときに発生する`_onSelect`メソッドを実装します。

```js
// EditItem.jsx
_onSelect = e => {
  e.preventDefault()
  AppActions.changeCtrl("slider",this.props.type,this.props.min,this.props.max)
}
```

クリックされたら、そのアイテムの`type`と`min`と`max`を`slider`と指定して送ります。

それでは、このコンポーネントをラップする`EditListView.jsx`をつくって行きます。

`componnents/edit/editor/edit/EditListView.jsx`を編集しましょう。

```js
// EditListView.jsx
import React from "react"
import EditItem from "./EditItem.jsx"
```

React本体と、さっきつくった`EditItem`コンポーネントをインポートします。

```js
// EditListView.jsx
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
```

ここまでで、エフェクトのアイテム自体とそれをリスト表示するコンポーネントが完成しました。

さきほどの`Controller.jsx`に追加して、切り替えれるようにしましょう。

まずインポートをしている部分に`EditListView`をインポートしないといけません。

```js
// Controller.jsx
import EditListView from "./edit/EditListView.jsx"
```

次にこの部分を少し書き換えて行きます。

```js
// Controller.jsx
render(){
  var
    renderView = null
    menuText = {},
    menuState = {
      defaultMenu: {
        first: "Filter",
        sec: "Edit"
      },
      sliderMenu: {
        first: "キャンセル",
        sec: "完了"
      }
    }

  renderView = <SliderView canvasState={this.props.canvasState} sliderValues={this.props.sliderValues}/>
  menuText = menuState.sliderMenu

  return(...)
}
```

`renderView`を書き換えていきます。

```js
// Controller.jsx
render(){
  var
    renderView = null
    menuText = {},
    menuState = {
      defaultMenu: {
        first: "Filter",
        sec: "Edit"
      },
      sliderMenu: {
        first: "キャンセル",
        sec: "完了"
      }
    }

  if(this.props.ctrlViewType == "select"){
    renderView = <EditListView/>
    menuText = menuState.defualtMenu
  }else{
    renderView = <SliderView canvasState={this.props.canvasState} sliderValues={this.props.sliderValues} />
    menuText = menuState.sliderViewMenu
  }

  return(...)
}
```

これで`ctrlViewType`が`select`か`slider`かによって、レンダリングされるものが書き換わります。

では、いままで作ってた`Controller`と`CanvasView`を連結するラッパーである`EditView.jsx`を作っていきます。

`components/edit/EditView.jsx`を編集していきましょう。

まずインポートしていきます。

```js
// EditView.jsx
import React from "react"

import CanvasView from "./canvas/CanvasView.jsx"
import Controller from "./editor/Controller.jsx"

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationChrvronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import FlatButton from 'material-ui/FlatButton'
import {white,indigoA200} from 'material-ui/styles/colors'

import AppActions from "../../actions/AppActions"
```

いままでつくった2つのコンポーネントと、`material-ui`のコンポーネント、**action**をインポートしています。

`View`部分を作っていきます。

```js
// EditView.jsx
render(){
  return(
    <div>
      <AppBar
        title="Filter"
        iconElementLeft={<IconButton><NavigationChrvronLeft/></IconButton>}
        onLeftIconButtonTouchTap={this._onBackButtonClick}
        onRightIconButtonTouchTap={this._onSave}
        iconElementRight={<FlatButton label="Save" />}
        style={{"backgroundColor": indigoA200}}
      />
      <div className="editView">
        <CanvasView
          currentEdit={this.props.currentEdit}
          canvasState={this.props.canvasState}
          dataUrl={this.props.dataUrl}
          isEditing={this.props.ctrlViewType == "slider"}
        />
        <Controller
          currentEdit={this.props.currentEdit}
          canvasState={this.props.canvasState}
          sliderValues={this.props.sliderValues}
          ctrlViewType={this.props.ctrlViewType}
        />
      </div>
    </div>
  )
}
```

これでコンポーネント自体は作成できました。

今回の`AppBar`には、`onLeftIconButtonTouchTap`と`onRightIconButtonTouchTap`というものが実装されています。

これは、文字の通り左右のボタンをクリックしたときの処理になります。

左は、戻る。右は、保存するイベントを発火させたいと思います。

まず`onLeftIconButtonTouchTap`に設定されている`_onBackButtonClick`を実装しましょう。

```js
// EditView.jsx
_onBackButtonClick = e => {
  e.preventDefault()
  if(confirm("操作を中断しトップページへ戻りますか？")) AppActions.editCancel()
}
```

このイベントではcanvasの内容を全て削除しないといけないので、**actions**の`editCancel`を実行します。

では、`onRightIconButtonTouchTap`のほうも実装していきます。

```js
// EditView.jsx
_onSave = e => {
  e.preventDefault()
  var canvas = document.getElementById("canvas")
  AppActions.doSave(canvas.toDataURL("image/png"))
}
```

saveの場合は、canvasの情報をもとに画像URLを作成して**actions**に渡します。

画像の作成は、canvas自体のメソッドに`toDataURL`というものがあるのでそれを使います。

引数はデータの種類を指定できるので、`image/png`としておきます。

それでは編集画面をつくりきったので`App.jsx`にマージしていきます。

まず必要なものを全てインポートしていきます。

```js
// App.jsx
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import UploadView from "./upload/UploadView.jsx"
import EditView from "./edit/EditView.jsx"

import AppStore from "../store/AppStore"
```

次に**store**からデータを取得する関数を実装します。

```js
// App.jsx
var getAll = () => {
  return AppStore.getAll()
}
```

これで、`getAll`を実行すれば**store**から全てのデータを取得できます。

ES5でReactを書いたときにはあった`getInitialState`メソッドがES6でかくとなくなるので、自前で実装します。コンストラクタ内に書きましょう。

```js
// App.jsx
constructor(){
  super()
  this.state = getAll()
}
```

`App`コンポーネントは毎回全てのstateを**store**から取得することに成功しました。

次にReactのライフサイクルである`componentDidMount`と`componentWillUnmount`に**store**のイベントリスナーを追加したいと思います。

```js
// App.jsx
componentDidMount = () => {
  if(!(window.File && window.FileReader && window.FileList && window.Blob)){
    alert("お使いのブラウザではこのアプリケーションは使えません。")
  }
  AppStore.addChangeListener(this._onChange)
}

componentWillUnmount = () => {
  AppStore.removeChangeListener(this._onChange)
}
```

イベントリスナーを設定した時は、このアプリケーションで必要なものがブラウザに実装されているか確認しています。

ここで`_onChange`メソッドを実装していきます。

この`_onChange`メソッドは`App`コンポーネント以下のどこかで**actions**が呼ばれて変更があった場合、毎回呼ばれるメソッドになります。

Fluxパターンでは、なにか変更があれば全てのstateを再度とりにいけばいいので実装は次のようになります。

```js
// App.jsx
_onChange = () => {
  this.setState(getAll())
}
```

これで新しくstateに変更された**store**から新しいデータを引き継ぎ、子コンポーネントに流していくようになります。

全てを書き換えているように思えますが、これは`virtual dom`のおかげで負担にならずにすんでいます。

では、つくった`UploadView`と`EditView`を切り替えるように作り直していきます。

```js
// App.jsx
render = <UploadView/>
```

となっている部分を書き換えます。

```js
// App.jsx
var render = null

if(this.state.isUploaded){
  renderView = (
    <EditView
      currentEdit={this.state.currentEdit}
      sliderValues={this.state.sliderValues}
      canvasState={this.state.canvasState}
      ctrlViewType={this.state.controllViewType}
      dataUrl={this.state.dataUrl}
    />
  )
}else{
  renderView = <UploadView/>
}
```

となります。

これで最初はアップロード画面がレンダリングされて、画像がアップロードされるとstateの`isUploaded`が`true`になるので、`EditView`へ切り替わります。

これで編集画面の実装が終わりました。

## シェア画面を作ろう

最後にシェア画面を作っていきます。

シェア画面は、`AppBar`と`img`要素とボタン二つなのでもう簡単ではないかと思います。

まずインポートします。

```js
// ShareView.jsx
import React from "react"

import {indigoA200} from 'material-ui/styles/colors'
import AppBar from "material-ui/AppBar"
import RaisedButton from 'material-ui/RaisedButton'
```

今までと、あまり変わらないと思います。

次にView部分を書いていきます。

```js
// ShareView.jsx
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
```

これがView部分です。

特に変わったところはないですが、`<img/>`の`src`に最終フィルターのかかったcanvasの画像をbase64でエンコードしたものが流れてくるのでそれをプレビューする部分ぐらいです。

`<RaiseButton/>`にイベントが設置してあるので、それを追加していきたいと思います。

```js
// ShareView.jsx
_share = () => {
  var
    text = "2時間で学ぶReactハンズオンのLavel2をつくりきったよ！",
    url = "https://sha.connpass.com/event/53105/",
    hashtags = "reactTwoHourHandson"

  window.open("https://twitter.com/intent/tweet?text="+text+"&url="+url+"&hashtags="+hashtags,"window","width=1000, height=400, menubar=no, toolbar=no, scrollbars=yes")
}

_reload = () => {
  window.location.reload()
}
```

`_share`というメソッドは、Twitterにシェアするためのボタンです。

埋め込むテキストなどは、自由につくって頂いて結構です！

`_reload`は、もう一度最初からするためのボタンです。

では、つくった`ShareView`を`App`コンポーネントにマージして完成になります。

まずインポートを追加します。

```js
// App.jsx
import ShareView from "./share/ShareView.jsx"
```

次に`renderView`に代入しないといけません。

if文を書き換えます。

```js
// App.jsx
if(this.state.isUploaded){
  renderView = (
    <EditView
      currentEdit={this.state.currentEdit}
      sliderValues={this.state.sliderValues}
      canvasState={this.state.canvasState}
      ctrlViewType={this.state.controllViewType}
      dataUrl={this.state.dataUrl}
    />
  )
}else{
  renderView = <UploadView/>
}
```

となっている部分に新しくif文を書き加えます。

```js
// App.jsx
if(this.state.isSaved){
  renderView = <ShareView shareImage={this.state.dataUrl} />
}else{
  if(this.state.isUploaded){
    renderView = (
      <EditView
        currentEdit={this.state.currentEdit}
        sliderValues={this.state.sliderValues}
        canvasState={this.state.canvasState}
        ctrlViewType={this.state.controllViewType}
        dataUrl={this.state.dataUrl}
      />
    )
  }else{
    renderView = <UploadView/>
  }
}
```

これでstateの`isSaved`が`false`の場合は今まで通りの挙動で、一番最後に画像を保存したら`isSaved`が`true`になるので、`ShareView`がレンダリングされる仕組みになっています。

これで最後まで実装できたかと思います。

---

これで、Level2ができました！
