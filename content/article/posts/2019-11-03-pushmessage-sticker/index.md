---
title: "【GAS】LINE BOTでスタンプメッセージを送信する方法｜Package IDとSticker IDを指定"
description: "Google Apps Script（GAS）を利用して、LINE BOTでスタンプメッセージを送信する方法を解説します。スタンプを指定するための`packageId`と`stickerId`の調べ方や、具体的なサンプルコードを紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Sticker Message"]
date: "2019-11-03T05:28:05.000Z"
url: "/gas/line_bot/pushmessage-sticker"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T16:10:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**スタンプメッセージ**」を送信する方法を解説します。

スタンプを使うことで、BOTとのコミュニケーションをより豊かで親しみやすいものにできます。

公式ドキュメント：[スタンプメッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#sticker-messages)

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

## GASでスタンプメッセージを送信するサンプルコード

以下のサンプルコードは、GASでスタンプメッセージを送信する例です。送信したいスタンプの `packageId` と `stickerId` を指定します。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTでスタンプメッセージを送るサンプル
function pushmessage_sticker() {
  //スタンプメッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'sticker',
        'packageId': '11538',
        'stickerId': '51626494'
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

### packageIdとstickerIdの確認方法

送信できるスタンプは、以下の公式リストで確認できます。リストに記載されている `packageId` と `stickerId` をコードに設定してください。

**公式スタンプリスト：** [Sticker list (PDF)](https://developers.line.biz/media/messaging-api/sticker_list.pdf)

## 送信結果

上記のGAS関数 `pushmessage_sticker` を実行すると、指定したユーザーにスタンプメッセージが送信されます。

{{< custom-figure src="img_5dfa276905ff5.png" title="スタンプメッセージ受信画面" Fit="1280x1280 webp q90" >}}

## まとめ

今回は、GASを利用してLINE BOTからスタンプメッセージを送信する方法を紹介しました。`packageId`と`stickerId`を指定するだけで簡単に実装できるので、BOTの応答にバリエーションを持たせたい場合に活用してみてください。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
