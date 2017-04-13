# 2時間で学ぶReactハンズオン Level2

**Level2ではInstagramのようなフィルターのSPAを作ります。**

## 使うライブラリ

- [React](https://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)
- [CamanJS](http://camanjs.com/)

## 作る画面

作る画面は3つです。

### 画像を選択するスタート画面

![](file:///Users/kounojunya/Desktop/start.png)

### 画像の編集をする画面

![](file:///Users/kounojunya/Desktop/edit1.png)
![](file:///Users/kounojunya/Desktop/edit2.png)

### シェアする画面

![](file:///Users/kounojunya/Desktop/share.png)

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



## シェア画面を作ろう