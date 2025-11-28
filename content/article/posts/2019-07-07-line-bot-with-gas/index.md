---
title: "【GAS】Google Apps Scriptで簡単なLINE BOTを作る方法（コピペ可）"
description: "Google Apps Script(GAS)を使って、特定のキーワードに反応するシンプルなLINE BOTを作成する手順を解説します。Googleアカウントさえあれば無料で開発可能。初心者でもコピペで実装できるよう、コードと設定方法を詳しく紹介します。"
tags: ["GAS","Google Apps Script","LINE BOT", "Webhook"]
date: "2019-07-07T05:51:39.000Z"
url: "/gas/line_bot/line-bot-with-gas"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年7月"]
lastmod: "2025-11-27T18:12:00+09:00"
---
今回は、**Google Apps Script (GAS)** を使って、無料で簡単に作成できるLINE BOTの作り方を紹介します。

プログラミング初心者の方でも大丈夫。「**サンプル**」というメッセージを送ると「**サンプルサンプルサンプル**」と返信する、シンプルなBOTを一緒に作ってみましょう。

{{< custom-figure src="gas-line-bot-demo.gif" title="LINE BOTの動作デモ">}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## はじめに：準備するもの

開発を始める前に、以下の3つを準備してください。

*   **Googleアカウント**: GASの利用に必要です。
*   **LINEアカウント**: BOTとやりとりするために必要です。
*   **LINEチャンネルアクセストークン**: LINEのAPIを利用するためのキーです。取得方法は以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

## 1. GASプロジェクトを準備する

まずは、LINE BOTのプログラムを記述するGASプロジェクトを作成します。

1.  **Googleドライブ**にアクセスし、『**新規**』>『**その他**』>『**Google Apps Script**』を選択して、新しいプロジェクトを開始します。
    {{< custom-figure src="gas-line-bot-03.png" title="Googleドライブから新規作成" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-02.png" title="その他を選択" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-01.png" title="Google Apps Scriptを選択" Fit="1280x1280 webp q90" >}}

2.  プロジェクト名（例: `LINE-BOT`）を設定します。
    {{< custom-figure src="gas-line-bot-04.png" title="プロジェクト名をクリック" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-05.png" title="プロジェクト名を設定" Fit="1280x1280 webp q90" >}}

## 2. GASのコードを記述する

次に、BOTの動作を制御する3つのスクリプトファイルを作成し、コードを記述します。

### ① main.gs (Webhook処理)
最初に表示されている`コード.gs`ファイルの名前を`main.gs`に変更し、以下のコードを貼り付けます。
1行目の`'LINEのトークンを指定...'`の部分は、ご自身で取得した**チャンネルアクセストークン**に書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';

//LINEから送信されたデータを処理する
function doPost(e) {
  //レスポンスを取得 */
  const responseLine = e.postData.getDataAsString();
  //JSON形式に変換する
  const responseLineJson = JSON.parse(responseLine).events[0];
  //イベントへの応答に使用するトークンを取得
  const replyToken = responseLineJson.replyToken;
  
  //メッセージイベントの場合
  if (responseLineJson.type == 'message') {
    messageController(responseLineJson, replyToken);
  } 
}
```
**役割**: LINEプラットフォームからの通知（Webhook）を受け取り、それがメッセージイベントであれば、次の`messageController`に処理を渡します。

### ② messageController.gs (メッセージ制御)
次に、『**ファイル**』>『**＋**』 > 『**スクリプト**』から新しいファイルを追加し、ファイル名を`messageController.gs`として、以下のコードを貼り付けます。

```javascript
//メッセージイベントの処理
function messageController(event, replyToken) {
	//メッセージを取得
	const message = event.message;
	//本文を取得
	const text = message.text;

	//本文に'サンプル'と送られてきた場合
	if (text.indexOf('サンプル') > -1) {
		//LINEのメッセージ形式にする
		let LineMessageObject = [{
			'type': 'text',
			'text': 'サンプルサンプルサンプル'
		}];

		//LINEに返信する
		replyLine(LineMessageObject, replyToken);
	}
}
```
**役割**: 受け取ったメッセージの内容を判断します。もしメッセージに「サンプル」という文字列が含まれていれば、返信するメッセージを作成し、次の`replyLine`に処理を渡します。

### ③ replyLine.gs (返信処理)
最後に、同様の手順で`replyLine.gs`というファイルを作成し、以下のコードを貼り付けます。

```javascript
//LINEに返信する処理
function replyLine(LineMessageObject, replyToken) {
	const replyHeaders = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + TOKEN
	};
	const replyBody = {
		'replyToken': replyToken,
		'messages': LineMessageObject
	};
	const replyOptions = {
		'method': 'POST',
		'headers': replyHeaders,
		'payload': JSON.stringify(replyBody)
	};
	UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}
```
**役割**: `messageController`から受け取ったメッセージを、LINEの返信APIを使ってユーザーに送信します。

## 3. ウェブアプリとしてデプロイする

作成したプログラムを、LINEからのアクセスを受け付けられるようにウェブアプリとして公開（デプロイ）します。

1.  画面右上の『**デプロイ**』>『**新しいデプロイ**』を選択します。
    {{< custom-figure src="gas-line-bot-11.png" title="新しいデプロイを選択" Fit="1280x1280 webp q90" >}}

2.  歯車アイコンをクリックし、種類の選択で『**ウェブアプリ**』を選びます。
    {{< custom-figure src="gas-line-bot-12.png" title="種類を選択" Fit="1280x1280 webp q90" >}}

3.  アクセスできるユーザーを『**全員**』に変更し、『**デプロイ**』ボタンを押します。
    {{< custom-figure src="gas-line-bot-13.png" title="アクセス権限を「全員」に設定" Fit="1280x1280 webp q90" >}}

4.  アカウントの承認を求められるので、画面の指示に従って許可してください。
    {{< custom-figure src="gas-line-bot-14.png" title="アクセスを承認" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-15.png" title="アカウントを選択" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-17.png" title="安全でないページへ移動" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-18.png" title="許可を選択" Fit="1280x1280 webp q90" >}}

5.  デプロイが完了すると表示される**ウェブアプリのURL**をコピーします。このURLは次のステップで使います。
    {{< custom-figure src="gas-line-bot-19.png" title="ウェブアプリのURLをコピー" Fit="1280x1280 webp q90" >}}
    > **Note:** コードを修正した場合は、再度デプロイ（『デプロイを管理』> 新しいバージョンを選択）しないと変更が反映されないので注意してください。

## 4. LINE DevelopersでWebhook URLを設定する

最後に、LINE Developersの管理画面で、LINEへのイベント（メッセージ送信など）が発生したことをGASに通知するための**Webhook URL**を設定します。

1.  LINE Developersにログインし、対象のチャンネルの「Messaging API設定」タブを開きます。
2.  「Webhook設定」の項目で、先ほどコピーした**ウェブアプリのURL**を入力し、『**更新**』ボタンを押します。
    {{< custom-figure src="gas-line-bot-20.png" title="Webhook設定" Fit="1280x1280 webp q90" >}}
    {{< custom-figure src="gas-line-bot-21.png" title="Webhook URLを入力" Fit="1280x1280 webp q90" >}}
3.  『**検証**』ボタンを押して「成功」と表示されることを確認し、「Webhookの利用」をオンに切り替えます。
    {{< custom-figure src="gas-line-bot-22.png" title="Webhookを検証し、利用をオンにする" Fit="1280x1280 webp q90" >}}

## 動作確認

お疲れ様でした！これで設定は完了です。
LINE Developersの「Messaging API設定」タブにあるQRコードからBOTを友だち追加し、「サンプル」とメッセージを送ってみてください。BOTから返信があれば成功です。

{{< custom-figure src="gas-line-bot-23.png" title="QRコードで友だち追加" Fit="1280x1280 webp q90" >}}
{{< custom-figure src="gas-line-bot-demo.gif" title="LINE BOTの動作デモ" Fit="1280x1280 webp q90" >}}

## まとめ

今回はGASを使ってシンプルなLINE BOTを作成しました。GASはサーバーの準備が不要で、手軽に始められるのが大きな魅力です。今回のコードをベースに、キーワードの種類を増やしたり、返信するメッセージを複雑にしたりと、ぜひオリジナルのBOT開発に挑戦してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
