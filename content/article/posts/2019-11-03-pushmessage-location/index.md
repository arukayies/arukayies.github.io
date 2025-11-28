---
title: "【GAS】LINE BOTで位置情報メッセージを送信する方法｜緯度・経度を指定"
description: "Google Apps Script（GAS）を利用して、LINE BOTで位置情報（マップ）メッセージを送信する方法を解説します。タイトル、住所、緯度、経度を指定して、ユーザーに地図情報を送る具体的なサンプルコードを紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Location Message"]
date: "2019-11-03T08:45:17.000Z"
url: "/gas/line_bot/pushmessage-location"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T16:17:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**位置情報メッセージ**」を送信する方法を解説します。

店舗の場所を案内したり、イベント会場の地図を送ったりと、様々な場面で活用できるメッセージ形式です。

公式ドキュメント：[位置情報メッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#location-messages)

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

## GASで位置情報メッセージを送信するサンプルコード

以下のサンプルコードは、GASで位置情報メッセージを送信する例です。タイトル、住所、緯度、経度を指定してメッセージを作成します。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTで位置情報メッセージを送るサンプル
function pushmessage_location() {
  //位置情報メッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'location',
        'title': 'my location', //タイトル
        'address': '〒150-0002 東京都渋谷区渋谷２丁目２１−１', //住所
        'latitude': 35.65910807942215, //緯度
        'longitude': 139.70372892916203 //経度
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

- **`title`**: メッセージのタイトル（例：「本社ビル」など）
- **`address`**: 住所のテキスト
- **`latitude`**: 緯度
- **`longitude`**: 経度

## 送信結果

上記のGAS関数 `pushmessage_location` を実行すると、指定したユーザーに位置情報メッセージが送信されます。

{{< custom-figure src="LINE_capture_636553402.764755.jpg" title="位置情報メッセージ受信画面" Fit="1280x1280 webp q90" >}} 

ユーザーがメッセージをタップすると、地図アプリで場所を確認できます。

## まとめ

今回は、GASを利用してLINE BOTから位置情報メッセージを送信する方法を紹介しました。店舗への誘導や待ち合わせ場所の共有などに便利な機能ですので、ぜひ活用してみてください。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
