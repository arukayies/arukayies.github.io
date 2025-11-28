---
title: "【GAS】LINE BOTでユーザー操作をデータで受け取るポストバックアクションの使い方"
description: "本記事では、Google Apps Script (GAS) を使ってLINE BOTのボタン操作をテキストではなくデータで受け取る「ポストバックアクション」の実装方法を解説します。ユーザーに見えないデータをサーバーに送信し、複雑な対話を実現できます。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "ポストバックアクション"]
date: "2019-11-09T06:27:05.000Z"
url: "/gas/line_bot/postback-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T13:41:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**ポストバックアクション**」を使用する方法を解説します。

ポストバックアクションは、ユーザーがボタンをタップした際に、テキストメッセージを送信するのではなく、**サーバー側（GAS）に特定のデータ（ポストバックデータ）を送信する**機能です。これにより、ユーザーには見えないデータをトリガーとして、BOT側で様々な処理を分岐させることが可能になります。

公式ドキュメントは[こちら](https://developers.line.biz/ja/reference/messaging-api/#postback-action)を参照してください。

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

以下の関数は、ポストバックアクションが設定されたボタンテンプレートメッセージを送信します。

```javascript
/*
ボタンテンプレートメッセージを送る(postback)
-----------------------------*/
function postback_action() {
  /* スクリプトプロパティのオブジェクトを取得 */
  const prop = PropertiesService.getScriptProperties().getProperties();

  /* ボタンテンプレートメッセージを送る(postback) */
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
          "altText": "postback",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=postback", // 画像のURL
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "メニュー",
            "text": "以下より選択してください。",
            "actions": [
              {
                "type": "postback",
                "label": "ポストバック1",
                "data": "action=postback1&item=A" // Webhookで受け取るデータ
              },
              {
                "type": "postback",
                "label": "ポストバック2",
                "data": "action=postback2&item=B" // Webhookで受け取るデータ
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
`actions`配列内の各オブジェクトで`type`に`postback`を指定し、`label`にボタンの表示名、`data`にサーバーに送信したいデータを文字列で設定します。

## 動作確認

GASのスクリプトエディタで`postback_action`関数を実行すると、LINEにボタン付きのメッセージが届きます。

{{< custom-figure src="img_5dfa25746fbbe.jpg" title="" Fit="1280x1280 webp q90" >}}

ボタンをタップすると、そのアクションに設定された`data`がWebhook URL（GASのウェブアプリURL）に送信されます。GAS側で`doPost(e)`関数を実装することで、このデータを受け取り、内容に応じた処理を実行できます。

以下は、スプレッドシートにポストバックデータを記録する簡単なログ出力の例です。
{{< custom-figure src="img_5dfa2574b1db2.jpg" title="" Fit="1280x1280 webp q90" >}}

- 「ポストバック1」をタップすると、`data: action=postback1&item=A`というデータが送信されます。
- 「ポストバック2」をタップすると、`data: action=postback2&item=B`というデータが送信されます。

ポストバックイベントの受け取り方については、以下の記事も参考にしてください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

その他のアクションオブジェクトについては、以下の記事でまとめて解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTでポストバックアクションを利用する方法を紹介しました。ユーザーの選択に応じて複雑な処理をサーバー側で実行したい場合に不可欠な機能です。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
