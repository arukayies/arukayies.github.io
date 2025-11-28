---
title: "【GAS】LINE BOTでユーザーに特定のテキストを送信させるメッセージアクションの使い方"
description: "本記事では、Google Apps Script (GAS) を使って、LINE BOTのボタンをタップしたユーザーに代わって特定のテキストメッセージを送信させる「メッセージアクション」の実装方法を解説します。簡単な応答を促すのに便利です。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "メッセージアクション"]
date: "2019-11-09T06:27:22.000Z"
url: "/gas/line_bot/message-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T13:51:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**メッセージアクション**」を使用する方法を解説します。

メッセージアクションは、ユーザーがボタンをタップすると、ユーザーに代わってあらかじめ設定されたテキストメッセージをBOTとのトークに送信する機能です。ユーザーが文字を入力する手間を省き、簡単な応答を促すのに役立ちます。

公式ドキュメントは[こちら](https://developers.line.biz/ja/reference/messaging-api/#message-action)を参照してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

実装を始める前に、以下の準備が必要です。

1.  **チャンネルアクセストークンの取得**: LINE Developersコンソールからアクセストークンを取得します。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

2.  **ユーザーIDの取得**: メッセージの送信先となるご自身のLINEユーザーIDを取得します。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

3.  **スクリプトプロパティの設定**: 今回のサンプルコードでは、アクセストークンとユーザーIDをスクリプトプロパティに保存して使用します。以下の記事を参考に、`TOKEN`と`DEBUGID`というキーでそれぞれの値を設定してください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## 実装コード

以下の関数は、メッセージアクションが設定されたボタンテンプレートメッセージを送信します。

```javascript
/*
ボタンテンプレートメッセージを送る(message)
-----------------------------*/
function message_action() {
  /* スクリプトプロパティのオブジェクトを取得 */
  const prop = PropertiesService.getScriptProperties().getProperties();

  /* ボタンテンプレートメッセージを送る(message) */
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + prop.TOKEN, // スクリプトプロパティにトークンは事前に追加しておく
    },
    'method': 'POST',
    'payload': JSON.stringify({
      "to": prop.DEBUGID, // スクリプトプロパティに送信先IDは事前に追加しておく
      "messages": [
        {
          "type": "template",
          "altText": "message",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=message", // 画像のURL
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "メニュー",
            "text": "以下より選択してください。",
            "actions": [
              {
                "type": "message",
                "label": "Yes",
                "text": "Yes"
              },
              {
                "type": "message",
                "label": "No",
                "text": "No"
              }
            ]
          }
        }
      ],
      "notificationDisabled": false // trueだとユーザーに通知されない
    }),
  });
}
```
`actions`配列内の各オブジェクトで`type`に`message`を指定し、`label`にボタンの表示名、`text`にユーザーが送信するテキストを設定します。

## 動作確認

GASのスクリプトエディタで`message_action`関数を実行すると、LINEにボタン付きのメッセージが届きます。

{{< custom-figure src="img_5dfa25538d770.jpg" title="" Fit="1280x1280 webp q90" >}}

「Yes」ボタンをタップすると、ユーザーが「Yes」と入力したのと同じように、BOTとのトーク画面にメッセージが送信されます。このメッセージをWebhookで受信することで、GAS側で次の処理を行うことができます。

その他のアクションオブジェクトについては、以下の記事でまとめて解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTでメッセージアクションを利用する方法を紹介しました。ユーザーの入力を補助し、スムーズな対話を実現するために活用してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
