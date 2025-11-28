---
title: "【GAS】LINE BOTで動画メッセージを送信する方法｜MP4とプレビュー画像を送る"
description: "Google Apps Script（GAS）を利用して、LINE BOTで動画メッセージ（MP4）を送信する方法を解説します。動画のURLとプレビュー画像のURLを指定するだけで簡単に実装できるサンプルコードを交えて、具体的な手順を紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Video Message"]
date: "2019-11-03T06:45:30.000Z"
url: "/gas/line_bot/pushmessage-video"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T15:57:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**動画メッセージ**」を送信する方法を解説します。

動画メッセージは、ユーザーの注目を引きやすく、情報を効果的に伝えることができるメッセージ形式です。

公式ドキュメント：[動画メッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#video-messages)

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

## GASで動画メッセージを送信するサンプルコード

以下のサンプルコードは、GASで動画メッセージを送信する例です。動画（MP4）のURLと、トークルームに表示されるプレビュー画像のURLを指定します。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTで動画メッセージを送るサンプル
function pushmessage_video() {
  //動画メッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'video',
        'originalContentUrl': 'https://www9.nhk.or.jp/das/movie/D0002160/D0002160266_00000_V_000.mp4', //映像：ＮＨＫクリエイティブ・ライブラリー
        'previewImageUrl': 'https://placehold.jp/240x240.jpg?text=test'
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

- **`originalContentUrl`**: 再生する動画ファイル（mp4）のURLを指定します。URLはHTTPSである必要があります。
- **`previewImageUrl`**: トーク画面に表示されるプレビュー画像のURLを指定します。URLはHTTPSである必要があります。

## 送信結果

上記のGAS関数 `pushmessage_video` を実行すると、指定したユーザーに動画メッセージが送信されます。

{{< custom-figure src="img_5dfa271fe6127.png" title="動画メッセージ受信画面" Fit="1280x1280 webp q90" >}}

ユーザーはトーク画面上で動画を再生できます。

<br>
*映像素材：[ＮＨＫクリエイティブ・ライブラリー](https://www.nhk.or.jp/archives/creative/)*

## まとめ

今回は、GASを利用してLINE BOTから動画メッセージを送信する方法を紹介しました。動画のURLとプレビュー画像のURLを指定するだけで簡単に実装できるため、ぜひ活用してみてください。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
