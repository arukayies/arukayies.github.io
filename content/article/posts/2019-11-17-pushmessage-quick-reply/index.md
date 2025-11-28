---
title: "【GAS】LINE Messaging APIでクイックリプライメッセージを送信する方法"
description: "本記事では、Google Apps Script (GAS) を使用してLINE BOTでクイックリプライメッセージを送信し、ユーザーの応答を処理する方法を解説します。サンプルコード付きで、初心者にも分かりやすく手順を説明しています。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API"]
date: "2019-11-17T01:58:01.000Z"
url: "/gas/line_bot/pushmessage-quick-reply"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T12:20:00+09:00"
---

この記事では、Google Apps Script (GAS) を利用して、LINE BOTで「**クイックリプライ**」メッセージを送信する方法を初心者向けに分かりやすく解説します。

クイックリプライは、ユーザーがメッセージに対して簡単なボタン操作で返信できるようにする機能です。これにより、ユーザー体験を向上させることができます。

公式ドキュメントは[こちら](https://developers.line.biz/ja/docs/messaging-api/using-quick-reply/)です。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 事前準備

実装を始める前に、以下の準備が必要です。

1.  **チャンネルアクセストークンの取得**: LINE Developersコンソールから、利用するBOTのチャンネルアクセストークンを取得してください。詳しい手順は以下の記事で解説しています。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

2.  **ユーザーIDの取得**: メッセージの送信先となるご自身のLINEユーザーIDを取得してください。手順はこちらの記事で確認できます。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

## 実装コード

それでは、実際にGASでクイックリプライを実装するコードを見ていきましょう。

### 1. 定数の設定

まず、スクリプトで利用する定数を定義します。取得したチャンネルアクセストークンとユーザーIDを設定してください。

```javascript
const TOKEN = 'LINEのトークンを指定(取得方法：https://arukayies.com/gas/line_bot/gettoken)';
const DEBUGID = 'LINEのユーザIDを指定(取得方法：https://arukayies.com/gas/line_bot/get-userid)';
```

### 2. クイックリプライメッセージを送信するコード

以下の関数は、指定したユーザーにクイックリプライボタン付きのメッセージを送信します。

```javascript
//LINEBOTでクイックリプライボタンを設定したメッセージを送るサンプル
function pushmessage_quick_reply() {
  //クイックリプライボタンを設定したメッセージを送る
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
          'type': 'text',
          'text': 'お気に入りの食べ物のカテゴリを選択してください！',
          'quickReply': {
            'items': [
              {
                'type': 'action',
                'imageUrl': 'https://example.com/sushi.png',
                'action': {
                  'type': 'message',
                  'label': '寿司',
                  'text': '寿司'
                }
              },
              {
                'type': 'action',
                'imageUrl': 'https://example.com/sushi.png',
                'action': {
                  'type': 'message',
                  'label': '天ぷら',
                  'text': '天ぷら'
                }
              }
            ]
          }
        }
      ],
      'notificationDisabled': false //trueだとユーザーに通知されない
    }),
  });
}
```
このコードでは、`messages`配列の中に`quickReply`オブジェクトを追加することで、ボタンを表示しています。各ボタンは`items`配列内で定義され、`label`がボタンのテキスト、`text`がユーザーがタップした際に送信されるメッセージになります。

### 3. ユーザーからの応答を処理するコード

ユーザーがクイックリプライボタンをタップすると、LINEプラットフォームからWebhook URLにリクエストが送信されます。そのリクエストを処理し、選択されたボタンに応じて異なるメッセージを返信するのが以下のコードです。

```javascript
//LINEで選択したクイックリプライボタンの結果によってメッセージを分ける
function doPost(e) {
  //レスポンスを取得 */
  const responseLine = e.postData.getDataAsString();
  //JSON形式に変換する
  const event = JSON.parse(responseLine).events[0];
  //イベントへの応答に使用するトークンを取得
  const replyToken = event.replyToken;

  //寿司か天ぷらでメッセージを分ける
  let sendMessage;
  if (event.message.text == '天ぷら') {
    sendMessage = '天ぷらをタップしました！';
    replyLine(sendMessage, replyToken);
  }
  if (event.message.text == '寿司') {
    sendMessage = '寿司をタップしました！';
    replyLine(sendMessage, replyToken);
  }
}

//LINEに返信する処理
function replyLine(sendMessage, replyToken) {
  //LINEのメッセージ形式にする
  const LineMessageObject = [{
    'type': 'text',
    'text': sendMessage
  }];
  const replyHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN
  };
  const replyBody = {
    'replyToken': replyToken,
    'messages': LineMessageObject
  };
  const replyOptions = {
    'method': 'POST',
    'headers': replyHeaders,
    'payload': JSON.stringify(replyBody)
  };
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}
```
`doPost(e)`関数がWebhookのトリガーとなり、受け取ったメッセージ(`event.message.text`)の内容によって返信するメッセージを分岐させています。

## デプロイと設定

コードを実装したら、GASプロジェクトをウェブアプリとしてデプロイし、Webhook URLをLINE Developersコンソールに設定する必要があります。

1.  **ウェブアプリとしてデプロイ**: 詳しい手順は以下の記事を参照してください。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

2.  **Webhook URLの設定**: デプロイ時に発行されたURLをLINE Developersに設定します。

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

## 動作確認

すべての設定が完了したら、動作を確認してみましょう。

1.  GASのスクリプトエディタで`pushmessage_quick_reply`関数を実行します。
    {{< custom-figure src="スクリーンショット_2021-02-27_14_32_17-1024x291.png" title="" Fit="1280x1280 webp q90" >}}

2.  実行すると、LINEにクイックリプライボタン付きのメッセージが届きます。
    {{< custom-figure src="img_5dfa227d58934.jpg" title="" Fit="1280x1280 webp q90" >}} 

3.  「寿司」ボタンをタップすると、「寿司をタップしました！」という返信がBOTから送られてきます。
    {{< custom-figure src="LINE_capture_636096477.293758.jpg" title="" Fit="1280x1280 webp q90" >}} 

## まとめ

今回は、GASを使ってLINE BOTでクイックリプライメッセージを送受信する方法を解説しました。クイックリプライはユーザーの操作を簡略化し、インタラクティブなBOTを作成する上で非常に便利な機能です。

クイックリプライで利用できるアクションには、今回紹介したメッセージアクション以外にも様々な種類があります。詳しくは以下の記事で解説していますので、ぜひご覧ください。

{{< self-blog-card "article/posts/2019-11-09-action-objects" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
