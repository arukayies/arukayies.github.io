---
title: "【GAS】LINE BOTで音声メッセージを送信する方法｜m4aファイルを送る"
description: "Google Apps Script（GAS）を利用して、LINE BOTで音声メッセージ（m4a）を送信する方法を解説します。音声ファイルのURLと再生時間を指定してメッセージを送る具体的なサンプルコードを紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Audio Message"]
date: "2019-11-03T06:55:05.000Z"
url: "/gas/line_bot/pushmessage-audio"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T17:23:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**音声メッセージ**」を送信する方法を解説します。

音声メッセージを使えば、テキストや画像だけでは伝わりにくいニュアンスや情報をユーザーに届けることができます。

公式ドキュメント：[音声メッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#audio-messages)

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

## GASで音声メッセージを送信するサンプルコード

以下のサンプルコードは、GASで音声メッセージを送信する例です。再生する音声ファイル（m4a）のURLと、その再生時間をミリ秒単位で指定します。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTで音声メッセージを送るサンプル
function pushmessage_audio() {
  //音声メッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [{
        'type': 'audio',
        'originalContentUrl': 'https://soundeffect-lab.info/sound/battle/mp3/sword-slash1.mp3',//音声：効果音ラボ
        'duration': 60000 // 音声ファイルの長さ（ミリ秒）
      }],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

- **`originalContentUrl`**: 再生する音声ファイル（m4a形式）のURL（HTTPS）を指定します。
- **`duration`**: 音声ファイルの再生時間（ミリ秒）を指定します。

## 送信結果

上記のGAS関数 `pushmessage_audio` を実行すると、指定したユーザーに音声メッセージが送信されます。

{{< custom-figure src="img_5dfa264ed78f9.png" title="音声メッセージ受信画面" Fit="1280x1280 webp q90" >}}

ユーザーはトーク画面上で音声を再生できます。

<br>
*音声素材：[効果音ラボ](https://soundeffect-lab.info/)*

## まとめ

今回は、GASを利用してLINE BOTから音声メッセージを送信する方法を紹介しました。音声コンテンツを配信したい場合に、ぜひご活用ください。

その他のメッセージタイプやアクションについては、以下の記事で紹介しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
