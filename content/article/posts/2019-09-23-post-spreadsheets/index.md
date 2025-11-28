---
title: "【GAS×LINE BOT】スプレッドシートの情報を自動でLINEに通知する方法"
description: "GAS（Google Apps Script）とLINE BOTを連携させ、特定キーワードに反応してスプレッドシートのリストをLINEに通知する方法を解説します。買い物リストやタスク管理に応用可能です。"
tags: ["GAS","Google Apps Script","LINE BOT", "スプレッドシート", "自動化"]
date: "2019-09-23T03:26:10.000Z"
url: "/gas/line_bot/post-spreadsheets"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年9月"]
lastmod: "2025-11-27T21:05:18+09:00"
---

この記事では、**GAS (Google Apps Script) を使って、LINE BOTがスプレッドシートの情報を自動で通知する仕組み**を構築する方法を解説します。

例えば、「買い物リスト」とLINEで送信すると、スプレッドシートに記載されたリストを返信してくれる、といった応用が可能です。日々のタスク管理や情報共有など、様々な場面で活用できるテクニックです。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## はじめに：実現できること

*   LINEで特定のキーワード（例：「買い物リスト」）を送信する。
*   GASがキーワードを検知し、指定したスプレッドシートのデータを読み込む。
*   読み込んだデータを整形し、LINE BOTを通じて返信する。

この仕組みを使えば、手動でスプレッドシートを開く手間なく、LINEから手軽に情報を確認できるようになります。

## 実装の全体像

処理の流れは以下の通りです。

1.  **LINE BOTの準備**: LINE DevelopersでMessaging APIチャネルを作成し、アクセストークンを取得します。
2.  **スプレッドシートの準備**: 通知したい情報（例：買い物リスト）を記入したスプレッドシートを用意します。
3.  **GASコーディング**: Googleスプレッドシートに紐づいたGASプロジェクトを作成し、コードを記述します。
4.  **デプロイ**: GASプロジェクトをウェブアプリケーションとしてデプロイします。
5.  **Webhook設定**: LINE DevelopersでWebhook URLを設定し、LINEからの通知がGASに届くようにします。

過去の記事でLINE BOTの基本的な設定方法を解説していますので、初めての方はそちらもご覧ください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## GASのコード実装

GASのスクリプトエディタに、以下の3つのファイル（`main.gs`, `messageController.gs`, `replyLine.gs`）を作成してコードを記述します。

### 1. Webhookを受け取る処理 (`main.gs`)

LINEプラットフォームからのWebhook（POSTリクエスト）を受け取り、イベントの種類に応じて処理を振り分けるメインの関数です。

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

### 2. メッセージを制御する処理 (`messageController.gs`)

受信したメッセージの内容を判定し、特定のキーワード（今回は「買い物リスト」）が含まれている場合にスプレッドシートの情報を取得・返信する処理を実行します。

```javascript
//メッセージイベントの処理
function messageController(event, replyToken) {
  //メッセージを取得
  const message = event.message;
  //本文を取得
  const text = message.text;

  //本文に'買い物リスト'と送られてきた場合
  if (text.indexOf('買い物リスト') > -1) {
    //送信するメッセージの変数
    let postMessage = '';
    //シートを取得
    const sheet = SpreadsheetApp.openById("通知させたいシートのIDを指定");// 通知させたいシートのIDを指定
    //シートの中身を２次元配列で取得  
    const sheetData = sheet.getDataRange().getValues();

    //シートの中身を送信するメッセージにすべて入れる     
    for (let row in sheetData) {
      postMessage = postMessage + sheetData[row][0] + '\n';
    }

    //LINEのメッセージ形式にする
    const LineMessageObject = [{
      'type': 'text',
      'text': postMessage
    }];

    //LINEに返信する
    replyLine(LineMessageObject, replyToken);
  }
}
```
**`SpreadsheetApp.openById("...")`** の部分には、対象のスプレッドシートのIDを指定してください。

### 3. LINEに返信する処理 (`replyLine.gs`)

`messageController`から渡されたメッセージデータを元に、LINEのReply Message APIへリクエストを送信し、ユーザーに返信します。

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

## デプロイとWebhook設定

コードの実装が完了したら、ウェブアプリとしてデプロイし、発行されたURLをLINE DevelopersのWebhookに設定します。詳しい手順は以下の記事を参考にしてください。

*   **ウェブアプリのデプロイ**: {{< blog-card "https://arukayies.com/gas/line_bot/line-bot-with-gas#toc6" >}}
*   **Webhook URLの設定**: {{< blog-card "https://arukayies.com/gas/line_bot/line-bot-with-gas#toc7" >}}

## 動作確認

実際にLINE BOTに「買い物リスト」と話しかけてみましょう。スプレッドシートに書かれた内容が返ってくれば成功です。

{{< custom-figure src="img_5dfa287f5a4fd.png" title="「買い物リスト」と送信" Fit="1280x1280 webp q90" >}}

{{< custom-figure src="img_5dfa287fa479c.gif" title="スプレッドシートの内容が通知される様子" >}}


## まとめ

今回は、GASとLINE BOTを連携させてスプレッドシートの情報を通知する方法を紹介しました。

この仕組みを応用すれば、Googleカレンダーの予定を通知したり、タスクリストを共有したりと、様々な業務効率化や情報共有の自動化が可能です。ぜひ、ご自身のアイデアで活用してみてください。

より発展的な内容として、買い物リストを管理するLINE BOTも作成しました。こちらも参考にしていただけると幸いです。

{{< self-blog-card "article/posts/2020-06-06-shopping-list-post-v2" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
