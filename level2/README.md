# Instagram風WebアプリをReactで開発してみた

## 開発背景

今回のInstagram風Webアプリは、2017年4月14日にグランフロント大阪大阪イノベーションハブで開催した「[2時間で学ぶReactハンズオン vol2](https://sha.connpass.com/event/53105/)」での教材となるものです。

このイベントは、初心者でも中級者でも楽しめるようにと2つの課題を出しました。

そのうちの中級者向け課題がこのInstagram風Webアプリケーションになります。

## 今回のディレクトリ構成

このWebアプリケーションの構成ですが、次のようになります。

```
dist/
src/
node_modules/
.babelrc
package.json
webpack.config.js
```

*dist/*はコンパイル後のファイルがはいる、アプリケーション本体になる場所です。

*src/*はアプリケーションをつくるのに必要な部分です。コンポーネント本体などもここにはいります。

*.babelrc*ですが、babelというのはReactのJSX記法をJSにトランスパイルするのに必要なトランスパイラーです。

そのbabelの設定ファイルが*.babelrc*です。

*package.json*は、`npm init`すると自動でつくられるファイルで、npmでインストールしたものを管理するために必要になります。

*webpack.config.js*ですが、今回のWebアプリをつくるのに、webpackという技術を使っています。`import`などを使って複数のファイルを連結して、それを1つのファイルとして吐き出してくれる技術です。

*webpack.config.js*は、webpack2系に合わせてかいていますので自分のもっているwebpackのバージョンを確認した上で使ってください。

## 今回使うモジュール・ライブラリ

今回のこのWebアプリケーションで使ったライブラリの説明をします。

### React

[A JavaScript library for building user interfaces](https://facebook.github.io/react/)

まず今回のタイトルともなっているReactです。Reactはフレームワークと混同される場合がありますが、あくまで`View`部分を担っているのがReactです。フレームワークほどフルスタックなものではないことに注意しましょう。

例えば、jQueryなどのライブラリにはAjaxをするためのメソッドが実装されていたりしますが、Reactにはないので、別途Ajaxクライアントのライブラリを呼び込まなければいけません。

### CamanJS

[CamanJS Javascript Image Manipulation](http://camanjs.com/)

CamanJSは、jQueryなどの他のライブラリに依存していない画像にエフェクトをかけるためのライブラリです。

canvasに画像を展開して、フィルターをかけることができます。18のフィルターが標準で搭載されているのも魅力の１つではないかと思います。

### Material UI

[Material-UI](http://www.material-ui.com/#/home)

material uiは、Googleが提唱する**Material Design**をReactのコンポーネントにして提供してくれるライブラリです。

とても簡単なコードでキレイなMaterial DesignのWebページを作ることができます。

## 開発環境の構築

このアプリケーションには、Node.jsのバージョン4以上が必要になります。

端末別にNode.jsのインストール方法をかいているのでこちらを参照してください。

[Node.jsのインストール](https://github.com/Lebe-Inc/react-handson-vol2/tree/master#環境の構築)

Node.jsをインストールしたら、`npm install -g webpack`でwebpackをグローバルへインストールしておきましょう。

ここまでで、開発をするのに必要な要素は揃いました。

## Instagram風Webアプリの全貌

制作物の全貌が掴めるようにスクリーンショットを確認してみましょう。

まずは画像をアップロードする画面をつくっていきます。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/upload.png)

アップロードされたら、画像を編集する画面にきます。

今回は、次の4つの機能だけつくりたいと思います。

- 明るさ（brightness）
- コントラスト（contrast）
- 色合い（hue）
- 彩度（saturation）

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/edit_select.png)

どれかエフェクトを選択すると、スライダーの`View`に切り替わり値を選択します。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/edit_slider.png)

画像の編集が終われば、右上の`SAVE`ボタンを押してシェアする画面へ切り替えます。

もう一度ボタンを押して、最初からアプリを使うことも出来ます。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/share.png)

## Webアプリにでてくるイベント

このWebアプリには9つのイベントがあります。

### *ON_UPLOADED*

`ON_UPLOADED`は、アップロード画面でアップロードされたときに呼ばれるイベントです。

画像のデータをbase64でエンコードして保持しています。

### *CHANGE_CTRL_VIEW*

`CHANGE_CTRL_VIEW`は、エフェクトが選択された時やスライダーでエフェクトをかけて完了した時などに呼ばれるイベントで、セレクト画面とスライダーの画面を書き換えるためのイベントです。

スライダーに書き換わる際は、どのスライダーか（明るさ、彩度など）と最大最小値を一緒に渡しています。

これは、例えば`色合い`は`0 ~ 100`ですが、`明るさ`は`-100 ~ 100`など変化があるからです。

### *UPDATE_CANVAS*

`UPDATE_CANVAS`は、canvasにエフェクトをかけて変更などを行ったときにcanvasを再描画するためにあるイベントです。

このイベントが呼ばれるたびにcanvasは再描画されます。

### *UPDATE＿CURRENT＿EDIT*

`UPDATE_CURRENT_EDIT`は、`UPDATE_CANVAS`と同じようにcanvasを再描画するものですが呼ばれるタイミングが違うため別のイベントにしています。

`UPDATE_CANVAS`はスライダー画面からセレクト画面へ戻る時や今までかけたエフェクトをかけ直すときに呼ばれるイベントですが、`UPDATE_CURRENT_EDIT`はいま編集しているエフェクトかけるだけのものです。

例えば、明るさのスライダーを選択していた場合、`UPDATE_CANVAS`はそれ以外の3つのエフェクトをかけて`UPDATE_CURRENT_EDIT`は明るさのいまスライダーで変更を加えた値を常に最新版へ再描画するためのイベントになります。

### *SAVE＿CURRENT＿EFFECT*

`SAVE_CURRENT_EFFECT`は、スライダーで変更を加えてる間は`UPDATE_CURRENT_EDIT`が呼ばれていますが、`UPDATE_CURRENT_EDIT`はキャンセルをした場合は破棄しなければなりません。

なので、`SAVE_CURRENT_EFFECT`というイベントで現在変更を加えていた値をエフェクト全体を管理している変数へコピーします。

### *SET_IMAGE*

`SET_IMAGE`は、canvasに画像を展開する際に画像のデータをFluxアーキテクチャ内で保存しておくためのセッターになります。

state、propsで画像のデータを扱うことで、画像の処理まわり自体も簡潔に記述することができるようになります。

### *DO_SAVE*

`DO_SAVE`は、右上の`SAVE`ボタンが押されたときに呼ばれます。

canvasの`toDataURL`を用いて、canvasの内容をpngの画像化してFluxアーキテクチャへなげてしまいます。

同時に`isSaved`というフラグを`true`にすることで、シェア画面へ切り替わり、png画像自体を取得し最後に画像として描画をしています。

### *RESTART*

`RESTART`はヘッダー左上の戻るボタンかシェア画面のもう一度ボタンが押されたときに呼ばれるアクションです。

これは、画像データを消してcanvasの内容をクリアし、フラグをデフォルトの値へ戻すことで全てはじめからになるものです。

これによりブラウザのリロードを行わずに全てまっさらな状態でもう一度このSPAを使うことができます。


## storeが持つデータ

Fluxでは**store**と呼ばれる場所が、SPA全体の状態を管理しています。

**store**を見れば、どんな値が流れてきてどんな**actions**があるのかなどを知ることができます。

今回のInstagram風Webアプリケーションで扱うデータをみてみます。

```js
_data = {
  isUploaded: DEFAULT_UPLOADED_STATE,
  isSaved: DEFAULT_SAVED_STATE,
  dataUrl: DEFAULT_DATA_URL,
  image: DEFAULT_IMAGE,
  controllViewType: DEFAULT_CONTROLLER_TYPE,
  sliderValues: {
    type: null,
    min: DEFAULT_SLIDER_MIN_MAX,
    max: DEFAULT_SLIDER_MIN_MAX
  },
  canvasState: {
    brightness: DEFAULT_CANVAS_EFFECT_VALUE,
    contrast: DEFAULT_CANVAS_EFFECT_VALUE,
    hue: DEFAULT_CANVAS_EFFECT_VALUE,
    saturation: DEFAULT_CANVAS_EFFECT_VALUE
  },
  currentEdit: {
    type: DEFAULT_CURRENT_EDIT_TYPE,
    value: DEFAULT_CANVAS_EFFECT_VALUE
  }
}
```

これが今回のSPAのデータの全てです。

`_data`という変数だけでSPAの状態を全て管理しています。

なお、`_data`という変数の命名（最初がアンダーバーから始まる）のはFacebookのFluxのリポジトリがそうなっていたからというだけなので特に決まりはありません。

それぞれは次のような役割をしています。

- isUploaded: 画像がアップロード済みかどうかのフラグ
- isSaved: 画像を保存したかどうかのフラグ
- dataUrl: ユーザーが選択した画像をbase64でエンコードしたデータ
- image: エフェクトをかけるために使う画像がはいる変数
- controllerViewType: コントローラー部分のViewの種類を格納する変数
- sliderValues: スライダーの種類と最大値、最小値を格納する変数
- canvasState: canvasのエフェクトの情報を格納する変数
- currentEdit: 現在編集しているエフェクトの種類と値を格納する変数

## ReactとFluxによる設計パターン

アプリケーションの設計は、この3ページしかないSPAでもかなり複雑化してしまいます。

「viewとstoreの紐付いている部分を図解する」

図にすると複雑さがわかると思います。

しかし、実際実装するとFluxによって大部分を助けてもらえます。

![](https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png)

よく見るこの図ですが、**actions**と**store**があるおかげで実装の手順としては、

1. viewを書く
2. actionsをつくる
3. storeでそれをキャッチして`_data`を書き換える

の3つをひたすらするだけになります。

人によって、作る順番はかわるとおもいますが実装としてviewを書いて、クリックの動作が取れているか。をチェックし、そのイベントですべきアクションをかいてデータをいじるためにストアを書くながれは、単一のフローになるので迷うことがなくなりいい方法だと思います。

ただ設計しながら作ると、アクションが似たようなものになったりストアで無駄な処理を書くことになってしまうので、先に設計をしてしまうことをおすすめします。

## UIを作り出すReactコンポーネント

ReactはFluxアーキテクチャの中でも**view**にあたる部分のライブラリですが、役割は一番重い仕事になります。

コンポーネントをつくっていくには、いま自分がなにを作っているのかを把握し続けることが大切になるので、今回つくったもののコンポーネントを例にしていきたいと思います。

### upload

まずはアップロード画面です。

コンポーネントは2つしかなく、簡潔にかけると思います。

まずはヘッダー部分です。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/upload-header.png)

```js
// UploadView.jsx
<AppBar
  title="Filter"
  iconClassNameLeft="muidocs-icon-navigation-expand-more"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
  style={{"backgroundColor": indigoA200}}
/>
```

AppBarはmaterial-uiが提供してくれるコンポーネントなので、非常に簡単に配置することが出来ます。

次にアップロードボタンです。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/upload-button.png)

```js
// UploadView.jsx
<RaisedButton
  containerElement='label'
  label="Select Image"
  backgroundColor={pinkA400}
  labelColor={white}
  className="uploadButton"
>
  <input type="file" onChange={this._onUploaded}/>
</RaisedButton>
```

この`RaiseButton`もmaterial-uiのコンポーネントになります。ファイルをアップロードするために、`<input>`が存在します。

ここではファイルがアップロードされたときに、`this._onUploaded`を呼ぶようになっています。

`_onUploaded`は**actions**の`uploaded`メソッドを使って画像のアップロードをアプリケーションに伝えます。

### edit

次に編集画面を説明していきます。

まず共通部分である`CanvasView.jsx`です。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-select-canvas.png)

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-slider-canvas.png)

```js
// CanvasView.jsx
<canvas id="canvas" ref="canvas"></canvas>
```

単純なcanvasなのでjsxのHTML部分はとても簡潔になります。

このように、別の画面だけど同じ表示部分がある場合にコンポーネントは実力を発揮してきます。

次に、下のボタンの部分です。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-select-buttons.png)

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-slider-buttons.png)

```js
// Controller.jsx
<ul className="menu">
  <li onClick={this._onCancel}>{menuText.first}</li>
  <li onClick={this._onSave} className="active">{menuText.sec}</li>
</ul>
```

実はこのボタンは別のものではなく、同じコンポーネントになっています。

今回は、FilterとEditを切り替える必要がなかったので`onClick`の関数はキャンセルと完了の時の実装にしています。

`onSave`は、**actions**の`saveEffect`メソッドを呼び編集の値をcanvasのエフェクト状態の部分へコピーしています。

最後にこの画面で唯一コンポーネントを切り替えて使うスライダーとセレクト画面の実装部分です。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-select-controller.png)

```js
// EditListView.jsx
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
```

エフェクトを選択する画面は、`EditListView`としています。

この中に、`EditItem`が一つ一つ存在するようにつくります。

```js
// EditItem.jsx
<li className="grid-item" onClick={this._onSelect}>
  <p className="grid-item--title">{this.props.displayEditName}</p>
  <div className="img">
    <img src={"images/"+ this.props.type +".png"}/>
  </div>
</li>
```

このエフェクトのどれかを選択する画面になります。

エフェクトを選ぶとそのエフェクトに合わせたスライダーの画面へと切り替わります。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/edit-slider-controller.png)

```js
// SliderView.jsx
<Slider
  onChange={this._onChangeValue}
  onDragStop={this._onDragStop}
  min={this.props.sliderValues.min}
  max={this.props.sliderValues.max}
  defaultValue={defaultValue}
  step={1}
/>
```

スライダーはmaterial-uiのものなので、配置するだけで使うことができます。

`onChange`は、スライダーを動かしてる間にeventとvalueを取得することができて、`onDragStop`はeventだけが取得できます。

`onChange`毎にcanvasを更新していては、処理が重たくなってしまうので`onDragStop`でイベントだけをとって、valueをもとにcanvasを実行します。

### share

最後にシェア画面をつくっていきます。

シェア画面は画像の要素と、ボタンを配置します。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/share-image.png)

```js
<img src={this.props.shareImage}/>
```

画像自体は、`img`要素で出力しています。srcはcanvasでエフェクトをかけた画像を書き出してbase64でエンコードした`dataUrl`を使います。

![](https://raw.githubusercontent.com/Lebe-Inc/react-handson-vol2/master/screen_shots/components/share-button.png)

```js
<RaisedButton label="SHARE" primary={true} className="share-button" onClick={this._share}/>
<RaisedButton label="もう一度" secondary={true} className="share-button" onClick={this._reload}/>
```

ボタンはmaterial-uiを使っているので、配置するだけになります。

`_reload`は**actions**の`reset`メソッドを実行して、全てをクリアにします。

`_share`は`window.open`を使ってTwitterへ投稿する小窓を出す実装にしています。

## canvasを扱うにあたっての注意

今回使った`CamanJS`ですが、canvasを使う必要があります。

開発するときに、Operaとsafariやchromeではcanvasの構築する内部の実装が違うようで、ある程度のウエイトを自分でかけたりしていました。

Fluxの設計に変えたことで、解消されたとは思いますがもしレンダリングが上手く行ってない場合は`setTimeout`などでウエイトをかけないといけません。