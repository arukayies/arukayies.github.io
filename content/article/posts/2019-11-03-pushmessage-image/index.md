---
title: "【GAS】LINE BOTで画像メッセージを送信する方法｜プレビュー画像も指定"
description: "Google Apps Script（GAS）を利用して、LINE BOTで画像メッセージを送信する方法を解説します。トーク画面に表示するプレビュー画像と、タップ時に表示されるオリジナル画像のURLを指定して送信するサンプルコードを紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Image Message"]
date: "2019-11-03T05:49:29.000Z"
url: "/gas/line_bot/pushmessage-image"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T16:22:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**画像メッセージ**」を送信する方法を解説します。

画像メッセージは、視覚的な情報を効果的に伝えることができるため、商品紹介やイベント告知など、様々なシーンで活用できます。

公式ドキュメント：[画像メッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#image-messages)

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

メッセージを送信するには、以下の2つの情報が必要です。

### 1. チャンネルアクセストークンの取得

LINE Developersコンソールから、利用するBOTのチャンネルアクセストークンを取得してください。詳しい手順は以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

### 2. ユーザーIDの取得

メッセージの送信先となるLINEユーザーのIDが必要です。取得方法は以下の記事を参考にしてください。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

## GASで画像メッセージを送信するサンプルコード

以下のサンプルコードは、GASで画像メッセージを送信する例です。トーク画面に表示されるプレビュー画像と、ユーザーがタップしたときに表示されるオリジナル画像のURLを指定します。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTで画像メッセージを送るサンプル
function pushmessage_image() {
  //画像メッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'image',
        'originalContentUrl': 'https://placehold.jp/640x480.jpg?text=test',
        'previewImageUrl': 'https://placehold.jp/240x240.jpg?text=test'
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

- **`originalContentUrl`**: ユーザーが画像をタップしたときに表示される、オリジナル画像のURL（HTTPS）を指定します。
- **`previewImageUrl`**: トーク画面に表示される、プレビュー用の画像URL（HTTPS）を指定します。

## 送信結果

上記のGAS関数 `pushmessage_image` を実行すると、指定したユーザーに画像メッセージが送信されます。

{{< custom-figure src="img_5dfa274738ac8.png" title="画像メッセージ受信画面" Fit="1280x1280 webp q90" >}} 

## まとめ

今回は、GASを利用してLINE BOTから画像メッセージを送信する方法を紹介しました。プレビュー画像とオリジナル画像を使い分けることで、ユーザー体験を向上させることができます。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボ_bot 作り方" img="/line.jpg">}}
