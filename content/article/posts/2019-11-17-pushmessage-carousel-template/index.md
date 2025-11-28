---
title: "【GAS】LINE Messaging APIでカルーセルテンプレートメッセージを送信する方法"
description: "本記事では、Google Apps Script (GAS) を使用して、LINE BOTで複数の情報をカード形式で横にスクロール表示できる「カルーセルテンプレートメッセージ」を送信する方法を解説します。豊富なアクションを設定できるコード例も紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API"]
date: "2019-11-17T01:04:14.000Z"
url: "/gas/line_bot/pushmessage-carousel-template"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T13:20:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**カルーセルテンプレートメッセージ**」を送信する方法を解説します。

カルーセルテンプレートは、複数のアイテム（カラム）をカードのように横に並べて表示できるメッセージ形式です。各カードには画像、タイトル、説明文、複数のアクションボタンを設定でき、商品リストやレストランのメニュー紹介など、豊富な情報をインタラクティブに見せたい場合に非常に有効です。

公式ドキュメントは[こちら](https://developers.line.biz/ja/docs/messaging-api/message-types/#carousel-template)を参照してください。

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

以下の関数は、指定したユーザーにカルーセルテンプレートメッセージを送信します。

```javascript
/*
カルーセルテンプレートメッセージを送る
-----------------------------*/
function pushmessage_carousel_template() {
  /* スクリプトプロパティのオブジェクトを取得 */
  const prop = PropertiesService.getScriptProperties().getProperties();

  /* カルーセルテンプレートメッセージを送る */
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
          "altText": "カルーセルテンプレートメッセージ",
          "template": {
            "type": "carousel",
            "columns": [
              {
                "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=postback", // 画像のURL
                "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                "title": "メニュー1",
                "text": "ポストバックアクション",
                "actions": [
                  {
                    "type": "postback",
                    "label": "ポストバック1",
                    "data": "action=postback1"
                  },
                  {
                    "type": "postback",
                    "label": "ポストバック2",
                    "data": "action=postback2"
                  }
                ]
              },
              {
                "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=message", // 画像のURL
                "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                "title": "メニュー2",
                "text": "メッセージアクション",
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
              },
              {
                "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                "title": "メニュー3",
                "text": "URIアクション",
                "actions": [
                  {
                    "type": "uri",
                    "label": "Yahoo",
                    "uri": "https://www.yahoo.co.jp/"
                  },
                  {
                    "type": "uri",
                    "label": "Google",
                    "uri": "https://www.google.com/"
                  }
                ]
              }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
          }
        }
      ],
      "notificationDisabled": false // trueだとユーザーに通知されない
    }),
  });
}
```
このコードでは、`template`の`type`に`carousel`を指定し、`columns`配列に表示したいカードの数だけオブジェクトを追加します。各カード（カラム）には、画像、タイトル、テキスト、そして複数のアクションボタンを設定できます。

## 動作確認

GASのスクリプトエディタで`pushmessage_carousel_template`関数を実行すると、LINEにカルーセルメッセージが送信されます。

{{< custom-figure src="img_5dfa22e66a9f5.jpg" title="" Fit="1280x1280 webp q90" >}}

左右にスワイプすることで、異なるカードを表示できます。
{{< custom-figure src="img_5dfa22e6ac611.jpg" title="" Fit="1280x1280 webp q90" >}}

その他のアクションについては、以下の記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTでカルーセルテンプレートメッセージを送信する方法を解説しました。多くの情報を整理して見せることができるため、ユーザーにとって分かりやすく、魅力的なBOTを作成するのに役立ちます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
