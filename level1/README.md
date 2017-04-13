try! React.js Koans
========================

※ 今までの流れでnpmなどはインストール済とします



## React.js Koansとは

Reactの練習プログラムです。

全部で7個の課題があり、順番に課題を解いていくことでReactの開発の流れや実装方法がわかるようになっています。

- [React.js Koans](https://github.com/arkency/reactjs_koans)


## Koansのセットアップ

ターミナルから以下のコードを順に入力して行って下さい。

1. `git clone https://github.com/arkency/reactjs_koans.git`
2. `cd reactjs_koans`
3. `npm run setup`
4. `npm run start`

`npm run setup`が完了すると、`exercises`ディレクトリが作成されます。

このターミナルはプレビューを実行し続けるために残してください。

## Koansの確認

ブラウザで`http://localhost:8080/`を開いてください。

![](./images/01.png)


## テストの実行

課題を解いたら以下のコマンドをターミナルで実行します。

~~~
npm run test

1) 01 - HelloWorld should complete all tasks:

      AssertionError: Your React component shouldn't render any `div` HTML elements
      + expected - actual

      -false
      +true
~~~

課題内容と結果が表示されます。



## 課題1 Hello World

- [exercises/01-HelloWorld.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/01-HelloWorld.jsx) を編集します
- `<span>`タグを利用して`Hello World`という文字列を出力してください

![](./images/blank.png)
　
## 回答 課題1 Hello World

```
<div>FILL ME IN!</div>
```

↓

```
<span>Hello World</span>
```

`npm run test`を実行して以下が出力されたら成功です。

~~~
01 - HelloWorld
    ✓ should complete all tasks

※ この下に課題2の失敗が表示されますが問題ありません
~~~


![](./images/blank.png)


## 課題2 リスト

- [exercises/02-PartiesList.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/02-PartiesList.jsx) を編集します
- `<ul>`の子要素`<li>`を足して下さい（テキストは何でも可）
- `<ul>`を`<ul class="parties-list">`と出力されるようにして下さい

![](./images/blank.png)

## 回答　課題2 リスト

```
<ul className="FILL ME">
	<li>Party at Aperture Laboratories</li>
</ul>
```

↓

```
<ul className="parties-list">
	<li>Party at Aperture Laboratories</li>
	<li>Party at Aperture Laboratories</li>
</ul>
```

> *Point*「class」属性を出力するには「className」属性を書き換える必要があります


![](./images/blank.png)


## 課題3 What's your name

この課題はブラウザで実際に動作を確認しながら作成します。

ここから1つの課題の中に複数のTaskがあります。

- [exercises/03-WhatsYourName.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/03-WhatsYourName.jsx) を編集します
- Task1
	- `<input>`に入力された値を`state.name`に代入する関数「`onNameChange`」を完成させてください
	- *Point* stateを更新には`setState`関数を使います
	- `<input>`の値は「`event.target.value`」で取得出来ます。
- Task2
	- 名前が空の時は「`Hey there. Enter your name.`」が表示されるようにして下さい
	- 名前が入力された時だけ挨拶「`Hello 名前`」が出力されるようにしてください


![](./images/blank.png)

## 回答　課題3 What's your name


```
// Task1
onNameChange(event) {
	this.setState({name: event.target.value});
}
```

```
// Task2
render() {
  	var greeting;

  	if(this.state.name){
  		greeting = "Hello " + this.state.name;
  	}else{
  		greeting = "Hey there. Enter your name.";
  	}

    return (
      <div>
        <p>{greeting}</p>
        <input type="text" name="name" onChange={this.onNameChange} />
      </div>
    );
}
```
![](./images/blank.png)

## 課題4 Quiz

今までの内容を復習するためのクイズです。

- [exercises/04-Quiz.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/04-Quiz.jsx) を編集します
- Task1. Reactのコンポーネントは全てあるクラスを拡張して作成されます。クラス名を入力してください。
	- ヒント 今までの課題を見てください
- Task2. JSXファイルは全てJavaScriptに変換される？`true`か`false`で答えてください
- Task3. 全てのコンポーネントに必須な関数はなんですか？関数名を答えてください
- Task4. `<div>`要素に`class`属性を指定したい時にJSXでは何の属性をかきますか？属性名を答えてください。
- Task5. `props`の値はコンポーネントが作成後に変更が可能でしょうか？`true`か`false`で答えてください
- Task6. `state`の値を変更する関数はなんですか？関数名を答えてください
- Task7. コンポーネントの各メソッドは`this`にbindする必要がありますか？`true`か`false`で答えてください

![](./images/blank.png)

## 回答 課題4 Quiz

- Task1 React.Component
- Task2 true
- Task3 render
- Task4 className
- Task5 false
- Task6 setState
- Task7 true

![](./images/blank.png)


## 課題5 GroceryList

お買い物リストを作成していきます。細かく4段階に分かれています。


## 5-1 リスト

- [exercises/05-Challenge-GroceryList-part-1.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/05-Challenge-GroceryList-part-1.jsx) を編集します
- `render()`メソッドを完成させてください
	- Task1. `groceriesComponents`を出力出来るようにしてください
	- Task2. `GroceryListItem`コンポーネントを完成させてください。親のコンポーネントから渡されたpropsから、商品名（`name`）を出力してください

### ループの処理について

```
let groceriesComponents = [];
for(var index = 0; index < this.state.groceries.length; index++) {
  groceriesComponents.push(
      <GroceryListItem
        grocery={this.state.groceries[index]}
      />
  );
}
```

ループして1件毎に`<GroceryListItem>`を作成するコードが準備されています。


![](./images/blank.png)


## 回答 5-1 リスト

```
return (
  <div>
    { groceriesComponents }
  </div>
);
```

```
return (
    <li>
      { this.props.grocery.name }
    </li>
);
```


![](./images/blank.png)



## 5-2 買い物を追加する

- [exercises/05-Challenge-GroceryList-part-2.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/05-Challenge-GroceryList-part-2.jsx) を編集します
- Task1. 商品名を追加するための`<input>`を出力してください
- Task2. `Add new Product`ボタンを出力してください
- Task3. `Add new Product`を押した時に`addGroceryItem()`を呼び出してください
- Task4. `addGroceryItem()`を完成させてください。`<input>`が空の時は追加しないようにしてください。
- Task5. `addGroceryItem()`をした時に`<input>`が空になるようにしてください


![](./images/blank.png)


## 回答 5-2 買い物を追加する

``` 
//Task1. 商品名を追加するための`<input>`を出力してください
//Task2. `Add new Product`ボタンを出力してください
return (
      <div>
        <ul>
          {groceriesComponents}
        </ul>
      </div>

      {newProductInput}
      {newProductAddButton}
    );
```

```
//Task3. `Add new Product`を押した時に`addGroceryItem()`を呼び出してください
newProductAddButton = <button className='add-product' 
	onClick={this.addGroceryItem}>Add new Product</button>;
```

```
//Task4 `addGroceryItem()`を完成させてください。
addGroceryItem() {
    
	if(this.state.newGroceryName){
		this.setState({ 
			groceries : this.state.groceries.concat({ name : this.state.newGroceryName }),
			newGroceryName : ""
		})
	}

}
```

```
//Task5. `addGroceryItem()`をした時に`<input>`が空になるようにしてください
newProductInput = <input className='new-item' type="text" 
onChange={this.inputChanged} value={this.state.newGroceryName} />;
```

![](./images/blank.png)

## 5-3 お買い物リストを空にする

- [exercises/05-Challenge-GroceryList-part-3.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/05-Challenge-GroceryList-part-3.jsx) を編集します
- Task1. お買い物リストを空にするためのボタン（clearListButton）を出力してください。
- Task2. `clearList()`を完成させてください。


![](./images/blank.png)


## 回答 5-3 お買い物リストを空にする

```
//Task1
return (
  <div>
    <ul>
      {groceriesComponents}
    </ul>
    {newProductInput}
    {newProductAddButton}
    {clearListButton}
  </div>
);
```

```
//Task2
clearList() {
	this.setState({ groceries : []})
}
```

![](./images/blank.png)


## 5-4 お買い物完了機能を作る

- [exercises/05-Challenge-GroceryList-part-4.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/05-Challenge-GroceryList-part-4.jsx) を編集します
- Task. `toggleGroceryCompleteness()`メソッドを完成させてください



![](./images/blank.png)


## 回答 5-4 お買い物完了機能を作る

```
toggleGroceryCompleteness(groceryIndex) {
	var groceries = this.state.groceries;
	groceries[groceryIndex].completed = !groceries[groceryIndex].completed;
	this.setState({ groceries: groceries});
}
```

![](./images/blank.png)

## 課題6 Reactの機能を理解するその１

- [exercises/06-RenderComponent.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/06-RenderComponent.jsx) を編集します
- `renderNameComponent()`を完成させて、Reactのコンポーネントを自分で表示させてみましょう。

![](./images/blank.png)

## 回答 課題6 

```
function renderNameComponent(domNode) {
  React.render(React.createElement(Name), domNode)
}
```

![](./images/blank.png)

## 課題7 Reactの機能を理解するその２

- [exercises/07-LifecycleMethods.js.jsx](https://github.com/arkency/reactjs_koans/blob/master/koans/07-LifecycleMethods.js.jsx) を編集します
- コンポーネントのライフサイクル（生成、表示などのイベント順）のメソッドがいくつかあることを理解してください。
	- 1. `componentDidMount()` コンポーネントが設置された
	- 2. `componentDidUpdate()` コンポーネントの値が書き換わった
	- 3. `componentWillUnmount()` コンポーネントが除去された

![](./images/blank.png)

## 回答 課題7 Reactの機能を理解するその２

```
componentDidMount() {
	console.log("I'm mounted!");
}

componentDidUpdate(prevProps, prevState) {
	console.log("Updated!");
}

componentWillUnmount() {
	console.log("Goodbye, cruel world! :(");
}
```


