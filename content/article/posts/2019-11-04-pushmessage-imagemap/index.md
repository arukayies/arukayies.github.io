---
title: "【GAS】LINE BOTでイメージマップメッセージを送信する方法｜画像・動画・タップ領域を組み合わせる"
description: "Google Apps Script（GAS）を利用して、LINE BOTでリッチな表現が可能な「イメージマップメッセージ」を送る方法を解説します。複数のタップ領域を持つ画像や、動画を組み合わせたインタラクティブなメッセージの作成手順を、具体的なサンプルコードと共に紹介します。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "Imagemap Message"]
date: "2019-11-04T03:35:05.000Z"
url: "/gas/line_bot/pushmessage-imagemap"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T15:52:00+09:00"
---

この記事では、Google Apps Script (GAS) を使って、LINE BOTで「**イメージマップメッセージ**」を送信する方法を解説します。

イメージマップメッセージは、1つの画像に複数のタップ領域を設定できるメッセージ形式です。ユーザーがタップした場所に応じて、異なるアクション（メッセージ送信、URL遷移など）を実行させることができ、クーポンやキャンペーンの告知など、多様な用途で活用できます。

公式ドキュメント：[イメージマップメッセージ | LINE Developers](https://developers.line.biz/ja/docs/messaging-api/message-types/#imagemap-messages)

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

## イメージマップ用の画像データ配置

イメージマップメッセージでは、表示する画像を事前にサーバーへアップロードしておく必要があります。

画像は`baseUrl`で指定したURLを元に、画像の解像度ごとに分割して用意します。例えば、`baseUrl`が `https://example.com/images/imagemap` の場合、`https://example.com/images/imagemap/1040.png` や `https://example.com/images/imagemap/700.png` といったURLでアクセスできるように配置します。

詳しくは公式ドキュメントの「[画像の設定方法](https://developers.line.biz/ja/docs/messaging-api/message-types/#imagemap-messages)」を参照してください。

{{< custom-figure src="スクリーンショット-2021-03-04-21.59.20.png" title="イメージマップ画像の分割" Fit="1280x1280 webp q90" >}}

## GASでイメージマップメッセージを送信するサンプルコード

以下のサンプルコードは、GASで画像と動画を組み合わせたイメージマップメッセージを送信する例です。

コード内の `TOKEN` と `DEBUGID` は、ご自身の環境に合わせて書き換えてください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';

//LINEBOTでイメージマップメッセージを送るサンプル
function pushmessage_imagemap() {
  //イメージマップメッセージを送る
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, //LINEのトークンを指定
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': DEBUGID, //LINEのユーザIDを指定
      'messages': [
        {
          'type': 'imagemap',
          'baseUrl': 'https://arukayies.com/image/imagemap_sample',
          'altText': 'イメージマップメッセージのサンプルです',
          'baseSize': {
            'width': 1040,
            'height': 1040
          },
          'video': {
            'originalContentUrl': 'https://www9.nhk.or.jp/das/movie/D0002160/D0002160266_00000_V_000.mp4', //猫動画を再生
            'previewImageUrl': 'https://placehold.jp/240x240.jpg?text=test',
            'area': {
              'x': 0,
              'y': 0,
              'width': 1040,
              'height': 520
            },
            'externalLink': {
              'linkUri': 'https://www.nhk.or.jp/archives/creative/material/category-list.html?i=2',
              'label': 'See More'
            }
          },
          'actions': [
            {
              'type': 'message', //タップすると「googleがタップされました」と返信
              'text': 'googleがタップされました',
              'area': {
                'x': 0,
                'y': 520,
                'width': 520,
                'height': 520
              }
            },
            {
              'type': 'message', //タップすると「yahooがタップされました」と返信
              'text': 'yahooがタップされました',
              'area': {
                'x': 520,
                'y': 520,
                'width': 520,
                'height': 520
              }
            }
          ]
        }
      ],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
```

## 送信結果

上記のコードを実行すると、LINEに以下のようなメッセージが届きます。

### 1. メッセージ受信時

上半分が動画、下半分がタップ可能な画像領域として表示されます。

{{< custom-figure src="img_5dfa25de00903.png" title="イメージマップ受信画面" Fit="1280x1280 webp q90" >}}

### 2. 動画領域の操作

動画領域をタップすると再生が始まります。「See More」をタップすると、`externalLink` で指定したURLに遷移します。

{{< custom-figure src="img_5dfa25dec9a31.png" title="動画再生と外部リンク" Fit="1280x1280 webp q90" >}}

### 3. 画像領域の操作

下半分の各領域をタップすると、`actions` で設定したメッセージがBOTに送信されます。

- **左下をタップ**: 「googleがタップされました」というメッセージが送信されます。
{{< custom-figure src="img_5dfa25e0445e1.png" title="左下のタップアクション" Fit="1280x1280 webp q90" >}}

- **右下をタップ**: 「yahooがタップされました」というメッセージが送信されます。
{{< custom-figure src="img_5dfa25e124b2b.png" title="右下のタップアクション" Fit="1280x1280 webp q90" >}}

<br>
*映像素材：[ＮＨＫクリエイティブ・ライブラリー](https://www.nhk.or.jp/archives/creative/)*

## まとめ

今回はGASを使ってイメージマップメッセージを送信する方法を紹介しました。
画像や動画、タップ領域を組み合わせることで、ユーザーの操作に応じて動的に反応するリッチなコンテンツを提供できます。

その他のメッセージアクションについては、以下の記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
