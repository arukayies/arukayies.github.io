---
title: "【GAS】LINE BOTでユーザーIDを取得する方法｜Webhookで情報を受け取る"
description: "Google Apps Script（GAS）を使って、LINE BOTと友だちになっているユーザーのIDを取得する方法を解説します。Webhook経由で送信されるイベント情報から、特定のユーザーを識別するための`userId`を抜き出すサンプルコードを紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Webhook", "userId"]
date: "2019-11-03T07:35:31.000Z"
url: "/gas/line_bot/get-userid"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T17:31:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTと友だちになっているユーザーの「**ユーザーID**」を取得する方法を解説します。

ユーザーIDは、特定のユーザーにメッセージを送信（プッシュメッセージ）したり、ユーザーごとの情報を管理したりする際に必須となる重要な情報です。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

### チャンネルアクセストークンの取得

LINE Developersコンソールから、利用するBOTのチャンネルアクセストークンを取得してください。詳しい手順は以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

## GASでユーザーIDを取得するサンプルコード

以下のコードは、ユーザーがBOTにメッセージを送った際に、そのユーザーのIDを取得し、オウム返しで返信するサンプルです。LINEプラットフォームからのWebhookリクエストをGASの`doPost`関数で受け取ります。

コード内の `TOKEN` は、ご自身のチャンネルアクセストークンに書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';

//メッセージを送ったらそのユーザーIDを返信する
function doPost(e) {
  // Webhookで受信した応答用データを取得
  const responseLine = e.postData.getDataAsString();
  // JSON形式に変換
  const event = JSON.parse(responseLine).events[0];
  // 応答用トークンを取得
  const replyToken = event.replyToken;
  // ユーザーIDを取得
  const userID = event.source.userId;

  // 返信するメッセージを作成
  const LineMessageObject = [{
    'type': 'text',
    'text': `あなたのユーザーID: ${userID}`
  }];

  // 応答メッセージ用のヘッダーを作成
  const replyHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN
  };

  // 応答メッセージ用のペイロードを作成
  const replyBody = {
    'replyToken': replyToken,
    'messages': LineMessageObject
  };
  
  // 応答メッセージ用のオプションを作成
  const replyOptions = {
    'method': 'POST',
    'headers': replyHeaders,
    'payload': JSON.stringify(replyBody)
  };
  
  // LINE Messaging APIに応答メッセージを送信
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}
```

このコードでは、Webhookイベントオブジェクトの `event.source.userId` からユーザーIDを取得しています。

## 設定手順

上記のコードをGASで動作させるには、以下の設定が必要です。

### 1. ウェブアプリとしてデプロイ

作成したGASプロジェクトを「ウェブアプリ」としてデプロイし、URLを取得します。詳しい手順は以下の記事を参考にしてください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

### 2. LINE DevelopersにWebhook URLを設定

LINE Developersコンソールのチャンネル設定画面で、上記で取得したウェブアプリのURLを「Webhook URL」に設定します。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## 動作確認

すべての設定が完了したら、LINEアプリからBOTアカウントに何かメッセージを送ってみてください。BOTがあなたのユーザーIDを返信してくれれば成功です。

{{< custom-figure src="LINE_capture_636179728_011168.jpg" title="ユーザーIDの取得結果" Fit="1280x1280 webp q90" >}}

## まとめ

今回は、GASの`doPost`関数を使ってWebhookイベントを受け取り、そこからユーザーIDを取得する方法を解説しました。このユーザーIDを使えば、特定のユーザーに対する様々なアプローチが可能になります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
