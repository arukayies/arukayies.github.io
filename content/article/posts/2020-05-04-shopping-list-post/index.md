---
title: "GASとLINEで作る買い物リストBOT開発ガイド【初心者向け】"
description: "Google Apps Script (GAS) を使って、LINEで手軽に使える買い物リストBOTを作成する全手順を解説。リッチメニュー設定からGASのプログラミング、スプレッドシート連携まで、初心者でも簡単に実装できる方法を紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "作り方", "買い物リスト", "自動化"]
date: "2020-05-03T16:43:29.000Z"
url: "/gas/line_bot/shopping-list-post"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2020年5月"]
lastmod: "2025-11-25T17:15:21+09:00"
---
この記事は旧バージョンです。より高機能な新バージョンの記事を公開していますので、ぜひこちらもご覧ください。

{{< self-blog-card "article/posts/2020-06-06-shopping-list-post-v2" >}}

LINEとGoogle Apps Script (GAS) を連携させることで、日常の買い物を便利にする「買い物リストBOT」を自作してみませんか？

この記事では、プログラミング初心者の方でもGASだけで実装できる、買い物リスト管理用LINE BOTの作り方を、手順を追って詳しく解説します。

## このBOTでできること

作成するBOTには、以下の機能を実装します。

- **買い物リストの表示**: 現在のリストをLINEのトーク画面に表示します。
- **品目の追加**: 新しく買うものをリストに追加します。
- **品目の削除**: 買い終わったものをリストから削除します。
- **使い方の確認**: BOTの操作方法を表示します。

これらの操作は、LINEのリッチメニュー（トーク画面下部に表示されるメニュー）のボタンや、特定のテキストメッセージ（「表示」「追加」など）で簡単に行えます。

それでは、さっそく開発を始めましょう！

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 手順1: LINE Botの基本設定

まずはLINE側の設定から進めます。BOTアカウントの作成と、操作の起点となるリッチメニューの設定を行います。

### 1-1. LINE Botアカウントを作成する

BOTアカウントの作成と、後ほど必要になる「チャンネルアクセストークン」の取得方法は、こちらの記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

作成が完了したら、アイコンなどを設定しておくと、より愛着が湧きますよ。

{{< custom-figure src="お買い物BOT.png" title="作成したBOTの例" Fit="1280x1280 webp q90" >}}

### 1-2. リッチメニューを作成する

次に、ユーザーが直感的に操作できる「リッチメニュー」を作成します。

1.  **LINE Official Account Manager**にアクセスします。
    {{< blog-card "https://manager.line.biz/" >}}

2.  作成したアカウントを選択します。
    {{< custom-figure src="アカウントリスト-1024x478.png" title="アカウントリスト" Fit="1280x1280 webp q90" >}}

3.  サイドメニューから**リッチメニュー**を選択し、『**作成**』ボタンをクリックします。
    {{< custom-figure src="リッチメニューを選択-1024x467.png" title="リッチメニューを選択" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="リッチメニューの作成を選択-1024x190.png" title="リッチメニューの作成を選択" Fit="1280x1280 webp q90" >}}

4.  **表示設定**を入力します。メニュー名や表示期間を任意に設定してください。
    {{< custom-figure src="表示設定の例-1024x441.png" title="表示設定の例" Fit="1280x1280 webp q90" >}}

5.  コンテンツ設定で『**テンプレートを選択**』をクリックし、**大**カテゴリの**4分割**テンプレートを選択します。
    {{< custom-figure src="テンプレートを選択-1024x303.png" title="テンプレートを選択" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="テンプレート大を選択.png" title="4分割のテンプレートを選択" Fit="1280x1280 webp q90" >}}

6.  『**画像を作成**』ボタンから、各ボタンに対応する画像をアップロードします。
    {{< custom-figure src="画像を作成-1024x591.png" title="画像を作成" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="画像の例.png" title="作成した画像の例" Fit="1280x1280 webp q90" >}}

7.  各エリア（A〜D）にアクションを設定します。タイプを『**テキスト**』にし、以下の通り入力します。
    - **A**: `買い物リスト表示`
    - **B**: `買い物リスト追加`
    - **C**: `買い物リスト削除`
    - **D**: `使い方`
    {{< custom-figure src="Aを押下した時の動作-1024x515.png" title="Aのアクション設定" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="Bを押下した時の動作-1024x535.png" title="Bのアクション設定" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="Cを押下した時の動作-1024x509.png" title="Cのアクション設定" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="Dを押下したときの動作-1024x516.png" title="Dのアクション設定" Fit="1280x1280 webp q90" >}}

8.  設定が完了したら『**保存**』をクリックします。これでリッチメニューの準備は完了です。

## 手順2: Google Apps Script (GAS) の設定

次に、BOTの頭脳となるGASのコードを準備し、LINEと連携させます。

### 2-1. GASプロジェクトを作成しコードを記述する

GASのプロジェクト作成とコードの登録方法は、以下の記事を参考にしてください。1つのコードファイルだけで全ての機能が動作します。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

### 2-2. スクリプトプロパティを設定する

GASで扱うデータを永続化するために、スクリプトプロパティを利用します。設定方法は以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

今回は以下の**3つ**のプロパティを登録します。

| プロパティ | 値 | 説明 |
| :--- | :--- | :--- |
| `TOKEN` | 取得したチャンネルアクセストークン | 手順1-1で取得したLINEのトークンを設定します。 |
| `LIST` | 初期値　| 買い物リストのデータが保存されます。最初は『初期値』と設定してください。 |
| `CONF` | 0 | BOTの対話状態を管理します。必ず『0』で初期化してください。 |

{{< custom-figure src="スクリプトプロパティ.png" title="スクリプトプロパティの設定例" Fit="1280x1280 webp q90" >}}

### 2-3. Webアプリケーションとして公開する

作成したGASを外部（LINE）から利用できるように、Webアプリケーションとして公開します。公開URLの取得方法は、こちらの記事を参照してください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## 手順3: LINEとGASを連携させる

最後に、LINE DevelopersコンソールでWebhook URLを設定し、LINEへのメッセージがGASに送信されるようにします。

詳しい設定方法は、以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

これで全ての設定が完了です！実際にLINEアプリからBOTを友達追加し、リッチメニューをタップして動作を確認してみてください。

## まとめ

今回は、GASとLINEを連携させて「買い物リストBOT」を作成する方法を紹介しました。特に**リッチメニュー**を使うと、ユーザーが直感的に操作できるBOTを簡単に作れることがお分かりいただけたかと思います。

GASを使えば、スプレッドシートやカレンダーなど、他のGoogleサービスとの連携も可能です。ぜひ、このBOTをベースに、自分だけのオリジナルBOT開発に挑戦してみてください！

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
