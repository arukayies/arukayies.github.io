---
title: "【GAS】LINE Messaging APIで画像カルーセルメッセージを送信する方法"
description: "本記事では、Google Apps Script (GAS) を使用してLINE BOTで画像カルーセルテンプレートメッセージを送信する方法を解説します。横にスクロールできる画像リストで、ユーザーに視覚的な選択肢を提示できます。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API"]
date: "2019-11-17T01:23:57.000Z"
url: "/gas/line_bot/pushmessage-image-carousel-template"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T12:25:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**画像カルーセルテンプレートメッセージ**」を送信する方法を解説します。

画像カルーセルは、複数の画像を横にスクロールできる形式で表示し、それぞれにアクションを割り当てることができるメッセージタイプです。商品紹介や選択肢の提示など、視覚的でインタラクティブな表現が可能になります。

公式ドキュメントは[こちら](https://developers.line.biz/ja/reference/messaging-api/#image-carousel-template)を参照してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

実装を始める前に、以下の準備が必要です。

1.  **チャンネルアクセストークンの取得**: LINE Developersコンソールから、利用するBOTのチャンネルアクセストークンを取得してください。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

2.  **ユーザーIDの取得**: メッセージの送信先となるご自身のLINEユーザーIDを取得してください。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

## 実装コード

それでは、GASで画像カルーセルメッセージを送信するコードを見ていきましょう。

### 1. 定数の設定

まず、スクリプトで利用する定数を定義します。取得したチャンネルアクセストークンとユーザーIDを設定してください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';
```

### 2. 画像カルーセルメッセージを送信するコード

以下の関数は、指定したユーザーに画像カルーセルメッセージを送信します。

```javascript
// LINE BOTで画像カルーセルメッセージを送信するサンプル
function pushImageCarousel() {
  const url = 'https://api.line.me/v2/bot/message/push';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN,
  };

  const payload = {
    'to': DEBUGID,
    'messages': [
      {
        'type': 'template',
        'altText': '画像カルーセルメッセージ',
        'template': {
          'type': 'image_carousel',
          'columns': [
            {
              'imageUrl': 'https://placehold.jp/1024x1024.jpg?text=Image1',
              'action': {
                'type': 'message',
                'label': 'メッセージ1',
                'text': '画像1が選択されました'
              }
            },
            {
              'imageUrl': 'https://placehold.jp/1024x1024.jpg?text=Image2',
              'action': {
                'type': 'uri',
                'label': '詳細を見る',
                'uri': 'https://arukayies.com'
              }
            },
            {
              'imageUrl': 'https://placehold.jp/1024x1024.jpg?text=Image3',
              'action': {
                'type': 'postback',
                'label': 'ポストバック',
                'data': 'action=select&item=3'
              }
            }
          ]
        }
      }
    ],
    'notificationDisabled': false
  };

  const options = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
```
このコードでは、`template`オブジェクトの`type`に`image_carousel`を指定し、`columns`配列に表示したい画像の数だけオブジェクトを追加します。各カラムには`imageUrl`（画像のURL）と、タップされたときのアクションを`action`オブジェクトで定義します。1つのカラムには1つのアクションのみ設定可能です。

## 動作確認

GASのスクリプトエディタで`pushImageCarousel`関数を実行すると、LINEに画像カルーセルメッセージが送信されます。

{{< custom-figure src="img_5dfa22ac0c7be.jpg" title="" Fit="1280x1280 webp q90" >}}

画像にはそれぞれ異なるアクション（メッセージ送信、URIを開く、ポストバック）が設定されています。
{{< custom-figure src="img_5dfa22ac4980a.jpg" title="" Fit="1280x1280 webp q90" >}}

アクションオブジェクトの種類については、以下の記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

## まとめ

今回は、GASを使ってLINE BOTで画像カルーセルメッセージを送信する方法を解説しました。この機能を使えば、よりリッチでインタラクティブなユーザー体験を提供できますので、ぜひ活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
