---
title: "【GAS】LINE BOTでテキストメッセージを送信する方法｜LINE絵文字も使える"
description: "Google Apps Script（GAS）を使って、LINE BOTで基本となる「テキストメッセージ」を送信する方法を解説します。特定のユーザーにプッシュメッセージを送るサンプルコードや、LINE独自の絵文字をメッセージに含める方法も紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Text Message", "LINE絵文字"]
date: "2019-11-02T13:40:59.000Z"
url: "/gas/line_bot/pushmessage-text"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T17:41:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで最も基本となる「**テキストメッセージ**」を送信する方法を解説します。

特定のユーザーに対して、任意のテキストやLINE絵文字を含んだメッセージを送るプッシュメッセージの実装方法を紹介します。

公式ドキュメント：[テキストメッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#text-messages)

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

プッシュメッセージを送信するには、送信先のユーザーIDを事前に知っておく必要があります。

### 1. チャンネルアクセストークンの取得

LINE Developersコンソールから、利用するBOTのチャンネルアクセストークンを取得してください。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

### 2. ユーザーIDの取得

メッセージの送信先となるLINEユーザーのIDが必要です。取得方法は以下の記事を参考にしてください。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

## GASでテキストメッセージを送信するサンプルコード

以下のサンプルコードは、特定のユーザーID（`DEBUGID`）に対してテキストメッセージを送信する例です。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTでテキストメッセージを送るサンプル
function pushmessage_text() {
  //テキストメッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'text',
        'text': 'こんにちは！\nこれはGASから送信されたテキストメッセージです。'
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

### LINE絵文字を送信する方法

テキストメッセージには、LINE独自の絵文字を含めることができます。

```javascript
function pushmessage_text_with_emoji() {
  const text = 'このメッセージにはLINE絵文字が含まれています\\uDBC0\\uDC84';
  
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID,
      'messages': [{
        'type': 'text',
        'text': text
      }],
    }),
  });
}
```
送信したい絵文字のUnicode（サロゲートペア）をテキストに含めることで、絵文字を表示できます。利用可能な絵文字の一覧は、以下の公式リストで確認できます。

**LINE絵文字リスト：** [Emoji list (PDF)](https://developers.line.biz/media/messaging-api/emoji-list.pdf)

## 送信結果

上記のGAS関数 `pushmessage_text` を実行すると、指定したユーザーにテキストメッセージが送信されます。

{{< custom-figure src="img_5dfa27880adb1.png" title="テキストメッセージ受信画面" Fit="1280x1280 webp q90" >}}

## まとめ

今回は、GASを利用してLINE BOTから基本のテキストメッセージを送信する方法を解説しました。プッシュメッセージと組み合わせることで、能動的な情報発信が可能です。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
