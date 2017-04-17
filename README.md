# 2時間で学ぶReactハンズオン

![eye chatch](https://connpass-tokyo.s3.amazonaws.com/thumbs/94/3c/943c29cb41ca6c12e4caa8b148ac6bc1.png)

URL: [2時間で学ぶReactハンズオン](https://sha.connpass.com/event/53105/)

## 概要

2016年の秋にも実施した「2時間で学ぶ React ハンズオン」の第二弾を実施いたします。

ReactはFacebookとInstagramで作られた、UIを作るためのJavaScriptライブラリです。複雑な構造データをシンプルにUIへ反映することや、再利用可能なコンポーネントを作るために開発されています。

JSX構文と呼ばれる、JavaScriptとHTMLを組み合わせた独自の書式でコンポーネントを作成し、複数のコンポーネントを組み合わせていくことでWebアプリケーションを構築していきます。

Reactは FacebookMessengerやInstagramなどで、ネイティブアプリと同等のUIを実現するために使われています。

## 対象者

### 初級者と中級者以上両方が楽しめるハンズオンにします

このハンズオンはjQueryを使ったことがあるデザイナーから、モダンなJavaScript開発を仕事に取り入れてみたいと考えているエンジニアを対象にしています。また前回の参加者を考慮し、初級者と中級者以上の両方が楽しめる教材を開発する予定です。

## 準備するもの

- Node.js（v4以降）がインストールされたPC（Windows/Mac/Linux）をご準備下さい。
- インストール方法がわからないという方は当日スタッフにお声かけ下さい。
- お気に入りのエディタ（Sublime Text、Atomなど）

## 環境の構築

このハンズオンでは、npmを使うのでNode.jsをインストールしておくことは必須になります。

公式サイトからインストールする方法とバージョン管理ができるマネージャーをインストールして、Node.jsのバージョンを管理する方法の2通りあります。

推奨は後者のマネージャーをインストールして、Node.jsのバージョンを管理する方法でNode.jsはアップデートがまだまだされているものなので、最新バージョンがすぐ使えるようにするには後者のほうがいいと思います。

まず前者ですが、Node.jsの公式サイト[https://nodejs.org](https://nodejs.org)から直接ダウンロードしてしましましょう。

公式サイトには他に、パッケージマネージャーを使ったインストール方法も書いています（macOSでいうhomebrewなどを使ったインストール方法です。）

[https://nodejs.org/ja/download/package-manager/](https://nodejs.org/ja/download/package-manager/)

後者であるマネージャーをインストールしてNode.jsをインストールする方法ですが、環境によってマネージャーも違うので`mac`,`windows`,`linux`の3つに分けてインストール方法を説明していきたいと思います。

### macOS

macOSでは`nvm`や`nodebrew`を使ってNode.jsのバージョン管理をするのが定番です。

[Macにnvm + Node.jsをインストールする](http://qiita.com/dribble13/items/e895208727c85ef9bc52)

[MacにNode.js環境を作る(nodebrew)](http://qiita.com/saekis/items/d580d1c2ae4f32a6ae99)


### Windows

Windowsでは、`nodist`を使うのがいいので`nodist`をインストールしていきます。

[nodistでNode.jsをバージョン管理](http://qiita.com/satoyan419/items/56e0b5f35912b9374305)

### Linux

Linuxでも`nvm`を使うとよいです。

[CentOS6にNode.jsをインストールする](http://qiita.com/ozawan/items/86ca7551d59005128892)

それぞれのツールを使い、Node.jsをインストールしたらバージョンを確認してください。

```bash
$ node -v
```

4以上のバージョンの方はそのままで大丈夫ですが、0.x.xなどの方はそれぞれのツールを使いNode.jsのバージョンをあげておいてください。

## ハンズオンの流れ

ハンズオンスタート後、課題を一緒に開発していきます。 課題は初心者向け（Lv1）、中級者向け（Lv2）の２パターンを用意します。中級者以上はLv1を飛ばしてご参加ください。

1. Reactを含めたJavaScript開発環境の背景解説
2. Reactの解説と開発環境構築
3. Hello React　初めてのReactコンポーネントを作成します。
4. 課題解説（Lv1）ハンズオンで作成する課題について解説します。
5. Lv1開始
6. 課題解説（Lv2）Lv2の課題について解説します
7. （Lv1が完了した人）Lv2開始

物足り無い人向けの追加課題も用意します。

## 課題Lv1 try! React.js Koans

Koansを利用したReactの練習プログラムです。

全部で7個の課題があり、順番に課題を解いていくことでReactの開発の流れや実装方法がわかるようになっています。


## 課題Lv2 SPA開発（画像加工SPA）

Fluxパターンを導入した本格的なシングルページアプリケーションの作成をします。

フィルターで画像を加工できるSPAをつくります。

時間の都合上、FLuxパターンの実装はしません。コンポーネントの作成に集中していただけます。（Fluxパターンの説明はREADMEに記載しています。）