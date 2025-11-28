---
title: "【GAS】LINE BOTで見栄えの良いボタン付きメッセージを送信する方法（ボタンテンプレート）"
description: "本記事では、Google Apps Script (GAS) を使用して、LINE BOTで画像やタイトル、複数のアクションボタンを組み合わせた「ボタンテンプレートメッセージ」を送信する方法を解説します。視覚的に分かりやすいメッセージを送りたい場合に最適です。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "ボタンテンプレート"]
date: "2019-11-09T06:37:39.000Z"
url: "/gas/line_bot/pushmessage-buttons-template"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T13:34:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**ボタンテンプレートメッセージ**」を送信する方法を解説します。

ボタンテンプレートは、画像、タイトル、説明文、そして複数のアクションボタンを一つのまとまりとして送信できるメッセージ形式です。ユーザーに対して視覚的に分かりやすく、次のアクションを促したい場合に非常に効果的です。

公式ドキュメントは[こちら](https://developers.line.biz/ja/docs/messaging-api/message-types/#buttons-template)を参照してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

実装を始める前に、以下の準備が必要です。

1.  **チャンネルアクセストークンの取得**: LINE Developersコンソールからアクセストークンを取得します。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

2.  **ユーザーIDの取得**: メッセージの送信先となるご自身のLINEユーザーIDを取得します。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

## 実装コード

以下の関数は、ボタンテンプレートメッセージを送信します。

### 1. 定数の設定

まず、スクリプトで利用する定数を定義します。取得したチャンネルアクセストークンとユーザーIDを設定してください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';
```

### 2. ボタンテンプレートメッセージを送信するコード

以下の関数を実行することで、指定したユーザーにボタンテンプレートメッセージが送信されます。

```javascript
//LINEBOTでボタンテンプレートを設定したメッセージを送るサンプル
function pushmessage_buttons_template() {
  //ボタンテンプレートを設定したメッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID,
      'messages': [
        {
          'type': 'template',
          'altText': 'ボタンテンプレートメッセージ',
          'template': {
            'type': 'buttons',
            'thumbnailImageUrl': 'https://placehold.jp/640x480.jpg?text=サンプル', // 画像のURL
            'imageAspectRatio': 'rectangle', // 画像のアスペクト比
            'imageSize': 'cover', // 画像の表示形式
            'imageBackgroundColor': '#FFFFFF', // 画像の背景色
            'title': 'メニュー',
            'text': '以下より選択してください。',
            'defaultAction': { // 画像やタイトル・テキスト部分をタップした際のアクション
              'type': 'uri',
              'label': 'View detail',
              'uri': 'https://arukayies.com/'
            },
            'actions': [ // ボタンのアクション
              {
                'type': 'uri',
                'label': 'TOPを開く',
                'uri': 'https://arukayies.com/'
              },
              {
                'type': 'uri',
                'label': '記事を開く',
                'uri': 'https://arukayies.com/gas/line_bot/pushmessage-buttons-template'
              }
            ]
          }
        }
      ],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```
このコードでは、`template`の`type`に`buttons`を指定し、`thumbnailImageUrl`や`title`、`text`、そして複数の`actions`を設定しています。

## 動作確認

GASのスクリプトエディタで`pushmessage_buttons_template`関数を実行します。

{{< custom-figure src="スクリーンショット_2021-02-28_17_03_56-1024x388.png" title="" Fit="1280x1280 webp q90" >}} 

実行すると、LINEにボタンテンプレートメッセージが送信されます。
{{< custom-figure src="LINE_capture_636192301.334029.jpg" title="" Fit="1280x1280 webp q90" >}} 

「**TOPを開く**」ボタンをタップすると、指定したURL（この例ではブログのトップページ）が開きます。
{{< custom-figure src="IMG_7401DC506856-1-576x1024.jpeg" title="" Fit="1280x1280 webp q90" >}} 

その他のアクションについては、以下の記事でまとめて解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTでボタンテンプレートメッセージを送信する方法を解説しました。ユーザーに複数の選択肢を分かりやすく提示できるため、BOTの利便性を大きく向上させることができます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
