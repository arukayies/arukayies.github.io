---
title: "【GAS】LINE BOTのボタンにURLリンクを設定するURIアクションの使い方"
description: "本記事では、Google Apps Script (GAS) を使用して、LINE BOTのメッセージに含まれるボタンにウェブサイトへのリンクを設定する「URIアクション」の実装方法を解説します。ユーザーを指定のURLに誘導したい場合に便利です。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "URIアクション"]
date: "2019-11-09T06:27:43.000Z"
url: "/gas/line_bot/uri-action"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T13:25:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTのメッセージに設定するボタンをタップした際に指定のウェブページを開かせる「**URIアクション**」の使い方を解説します。

URIアクションは、ユーザーを特定のウェブサイトやサービスに誘導したい場合に非常に便利な機能です。

公式ドキュメントは[こちら](https://developers.line.biz/ja/reference/messaging-api/#uri-action)を参照してください。

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

以下の関数は、URIアクションが設定されたボタンテンプレートメッセージを送信します。

```javascript
/*
ボタンテンプレートメッセージを送る(uri)
-----------------------------*/
function uri_action() {
  /* スクリプトプロパティのオブジェクトを取得 */
  const prop = PropertiesService.getScriptProperties().getProperties();

  /* ボタンテンプレートメッセージを送る(uri) */
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
          "altText": "uri",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
            "imageAspectRatio": "rectangle", // 画像のアスペクト比
            "imageSize": "cover", // 画像の表示形式
            "imageBackgroundColor": "#FFFFFF", // 画像の背景色
            "title": "メニュー",
            "text": "以下より選択してください。",
            "actions": [
              {
                "type": "uri",
                "label": "yahoo",
                "uri": "https://www.yahoo.co.jp/"
              },
              {
                "type": "uri",
                "label": "google",
                "uri": "https://www.google.com/"
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
`actions`配列内の各オブジェクトで`type`に`uri`を指定し、`label`にボタンの表示名、`uri`に遷移させたいURLを設定します。

## 動作確認

GASのスクリプトエディタで`uri_action`関数を実行すると、LINEにボタン付きのメッセージが届きます。

{{< custom-figure src="img_5dfa2530bb03d.jpg" title="" Fit="1280x1280 webp q90" >}}

- 「**yahoo**」ボタンをタップすると、Yahoo! JAPANのトップページが開きます。
- 「**google**」ボタンをタップすると、Googleのトップページが開きます。

このように、簡単に外部サイトへユーザーを誘導することができます。

その他のアクションオブジェクトについては、以下の記事でまとめて解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTでURIアクションを利用する方法を紹介しました。キャンペーンサイトへの誘導や、詳細情報のページへのリンクなど、様々な用途で活用できる重要な機能です。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
