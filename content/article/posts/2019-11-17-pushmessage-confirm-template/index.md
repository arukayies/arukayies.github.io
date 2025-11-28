---
title: "【GAS】LINE Messaging APIで確認テンプレートメッセージを送信する方法"
description: "本記事では、Google Apps Script (GAS) を使用してLINE BOTで「はい/いいえ」などの二者択一の応答をユーザーに促す「確認テンプレートメッセージ」を送信する方法を解説します。コード例付きで具体的に説明します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API"]
date: "2019-11-17T00:32:10.000Z"
url: "/gas/line_bot/pushmessage-confirm-template"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T12:33:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**確認テンプレートメッセージ**」を送信する方法を解説します。

確認テンプレートは、「はい/いいえ」や「許可/拒否」など、ユーザーに二者択一の選択を促すのに便利なメッセージ形式です。

公式ドキュメントは[こちら](https://developers.line.biz/ja/docs/messaging-api/message-types/#confirm-template)を参照してください。

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

以下の関数は、指定したユーザーに確認テンプレートメッセージを送信します。

```javascript
/*
確認テンプレートメッセージを送る
-----------------------------*/
function pushmessage_confirm_template() {
  /* スクリプトプロパティのオブジェクトを取得 */
  const prop = PropertiesService.getScriptProperties().getProperties();

  /* 確認テンプレートメッセージを送る */
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
          "altText": "確認テンプレートメッセージ",
          "template": {
            "type": "confirm",
            "text": "以下より選択してください。",
            "actions": [
              {
                "type": "message",
                "label": "Yes",
                "text": "yes"
              },
              {
                "type": "message",
                "label": "No",
                "text": "no"
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
このコードでは、`template`オブジェクトの`type`に`confirm`を指定し、`text`に質問文、`actions`に2つのアクションオブジェクト（例: Yes/No）を定義します。

## 動作確認

GASのスクリプトエディタで`pushmessage_confirm_template`関数を実行すると、LINEに確認テンプレートメッセージが送信されます。

{{< custom-figure src="img_5dfa23250153e.jpg" title="" Fit="1280x1280 webp q90" >}}

各ボタンをタップすると、`actions`で指定したテキストがBOTに送信されます。
{{< custom-figure src="img_5dfa232537cf4.jpg" title="" Fit="1280x1280 webp q90" >}}

その他のアクションについては、以下の記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTで確認テンプレートメッセージを送信する方法を解説しました。ユーザーからの明確な応答を得たい場合に非常に有効な機能ですので、ぜひご活用ください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
