---
title: "GASとLINE Botで実現！特定グループへのメッセージを自動化する『代理発言』機能の作り方"
description: "Google Apps Script (GAS) を使って、LINE Botに特定のグループへメッセージを代理で送信させる方法を解説します。複数グループの管理を効率化し、連絡担当者の負担を軽減したい方におすすめです。"
tags: ["GAS","Google Apps Script","LINE BOT", "LINE Messaging API", "業務効率化"]
date: "2019-12-09T13:16:52.000Z"
url: "/gas/line_bot/speak-on-behalf"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年12月"]
lastmod: "2025-11-27T10:56:00+09:00"
---

サークルの運営や社内連絡など、複数のLINEグループを管理していると、こんな課題はありませんか？

- 「全体連絡を投げるのは少し気が引ける…」
- 「連絡した人に質問が集中してしまい、負担が偏ってしまう…」

今回は、こうした課題を解決するために、**Google Apps Script (GAS) を使ってLINE Botが代わりにメッセージを送信してくれる「代理発言」機能**を開発した事例をご紹介します。

この仕組みを導入することで、連絡の心理的ハードルを下げ、誰でも気軽に情報共有ができるようになります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 「代理発言」機能の概要

この機能は、管理用のLINEグループで特定のキーワードを含めて発言すると、LINE Botが他のグループにメッセージを代理で送信してくれる、というものです。

### システム導入によるメリット

- **属人化の解消**: LINE Botが発言するため、質問が特定の人に集中するのを防ぎます。
- **心理的負担の軽減**: Botが代わりに連絡してくれるので、気軽に全体連絡を行えるようになります。
- **管理の効率化**: 複数のグループへの連絡を円滑にします。

### 動作の仕組み

{{< custom-figure src="img_5dfa1fc3362be.png" title="システム動作フロー" Fit="1280x1280 webp q90" >}}

1.  **管理グループでトリガー発言**: LINE Botがいる管理グループで「**代理発言 〇〇○**」と発言します。
2.  **クイックリプライの表示**: 発言をトリガーに、GASが作動し、送信先を選択するための「クイックリプライ」が返信されます。
3.  **送信先の選択**: 「雑談グループ」「連絡用グループ」などの選択肢からメッセージを送りたいグループを選びます。
4.  **Botによる代理発言**: 選択したグループに、Botが「〇〇○」の部分を代理で送信します。

この機能を実現するためには、各グループにLINE Botが参加している必要があります。



## 実装のための事前準備

実装に入る前に、以下の準備が必要です。それぞれ詳しい手順は関連記事で解説していますので、参考にしてください。

1.  **LINE Botの作成とトークンの取得**
    LINE DevelopersでMessaging APIのチャネルを作成し、アクセストークンを取得します。

{{< self-blog-card "article/posts/2019-07-02-gettoken" >}}

2.  **LINEグループIDの取得**
    メッセージを送信したいグループのIDを事前に調べておきます。

{{< self-blog-card "article/posts/2019-11-03-get-userid" >}}

3.  **GASプロジェクトの作成**
    LINE Botの基本的な応答設定を済ませておきます。



## GASの実装コード解説

それでは、実際のコードを見ていきましょう。この機能は主に5つの関数で構成されています。

### 1. `doPost(e)` - メイン処理

LINEプラットフォームから送信されたPOSTリクエストを受け取り、イベントの種類に応じて各コントローラーに処理を振り分けます。

```javascript:main.js
/*
 * LINEから送信されたデータを処理する
 */
function doPost(e) {
  // スクリプトプロパティを取得
  const prop = PropertiesService.getScriptProperties().getProperties();
  // レスポンスデータをJSON形式に変換
  const response = JSON.parse(e.postData.getDataAsString());
  const responseEvent = response.events[0];
  const replyToken = responseEvent.replyToken;

  // メッセージイベントの場合
  if (responseEvent.type === 'message') {
    messageController(prop, responseEvent, replyToken);
  }

  // ポストバックイベントの場合
  if (responseEvent.type === 'postback') {
    postBackController(prop, responseEvent.postback.data);
  }
}
```

### 2. `messageController(...)` - メッセージイベントの処理

「代理発言」というキーワードに反応し、クイックリプライを生成して返信する関数です。

```javascript:messageController.js
/*
 * 「代理発言」キーワードをトリガーにクイックリプライを返す
 */
function messageController(prop, events, replyToken) {
  const message = events.message;
  const text = message.text;

  // 本文に「代理発言」が含まれていた場合
  if (text.indexOf('代理発言') > -1) {
    // 「代理発言」の部分を除いたメッセージ本文を取得
    const postMessage = text.replace('代理発言', '管理部からの連絡です。\n');
    
    // クイックリプライ形式のメッセージオブジェクトを作成
    const LineMessageObject = [{
      'type': 'text',
      'text': '以下のメッセージの送信先を選択してください。\n\n' + postMessage,
      'quickReply': {
        'items': [{
          'type': 'action',
          'action': {
            'type': 'postback',
            'label': '雑談グループに送信',
            'data': 'send group1' + postMessage,
            'displayText': '雑談グループに送信します'
          }
        }, {
          'type': 'action',
          'action': {
            'type': 'postback',
            'label': '連絡用に送信',
            'data': 'send group2' + postMessage,
            'displayText': '連絡用に送信します'
          }
        }, {
          'type': 'action',
          'action': {
            'type': 'postback',
            'label': '送信をキャンセル',
            'data': 'send no',
            'displayText': '送信をキャンセルしました'
          }
        }]
      }
    }];

    // LINEに返信する
    replyLine(prop, LineMessageObject, replyToken);
  }
}
```

### 3. `postBackController(...)` - ポストバックイベントの処理

ユーザーがクイックリプライの選択肢をタップした際に作動します。`data`に含まれる情報をもとに、指定されたグループにメッセージを送信します。

```javascript:postBackController.js
/*
 * LINEのポストバックイベントを処理する
 */
function postBackController(prop, data) {
  // 雑談用グループへの送信
  if (data.indexOf('send group1') > -1) {
    const to = prop.GROUP1_ID; // 送信先のグループID
    const message = data.replace('send group1', '');
    pushLine(prop, to, message);
  }
  // 連絡用グループへの送信
  if (data.indexOf('send group2') > -1) {
    const to = prop.GROUP2_ID; // 送信先のグループID
    const message = data.replace('send group2', '');
    pushLine(prop, to, message);
  }
  // キャンセル処理
  if (data.indexOf('send no') > -1) {
    const to = prop.ADMIN_GROUP_ID; // 管理グループのID
    pushLine(prop, to, '送信を取り消しました。');
  }
}
```

### 4. `replyLine(...)` / `pushLine(...)` - メッセージ送信用関数

LINE Messaging APIを呼び出し、実際に応答やプッシュメッセージを送信するための汎用的な関数です。

```javascript:utils.js
/*
 * LINEに返信する処理
 */
function replyLine(prop, LineMessageObject, replyToken) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + prop.LINE_TOKEN
  };
  const payload = JSON.stringify({
    "replyToken": replyToken,
    "messages": LineMessageObject
  });
  const options = {
    "method": "POST",
    "headers": headers,
    "payload": payload
  };
  UrlFetchApp.fetch(url, options);
}

/*
 * 指定した宛先にプッシュメッセージを送信する
 */
function pushLine(prop, to, text) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + prop.LINE_TOKEN,
  };
  const payload = JSON.stringify({
    "to": to,
    "messages": [{
      'type': 'text',
      'text': text,
    }]
  });
  const options = {
    "method": "post",
    "headers": headers,
    "payload": payload
  };
  UrlFetchApp.fetch(url, options);
}
```

## 実際の動作イメージ

### 1. 管理グループで「代理発言 送信テスト」と入力

{{< custom-figure src="img_5dfa1fc37deba.jpg" title="管理グループでの発言" Fit="1280x1280 webp q90" >}}

### 2. クイックリプライから送信先を選択

「グルチャに送信」をタップすると、Botが代理でメッセージを送ってくれます。

**▼ 管理グループの画面**
{{< custom-figure src="img_5dfa1fc3c0a74.jpg" title="クイックリプライの選択" Fit="1280x1280 webp q90" >}}

**▼ 雑談グループの画面**
{{< custom-figure src="img_5dfa1fc419eba.jpg" title="Botによる代理発言" Fit="1280x1280 webp q90" >}}

無事にBotが代理で発言してくれました！同様に「連絡用に送信」をタップすれば、連絡用グループにも送信できます。

## まとめ

今回は、GASとLINE Botを連携させて、複数グループへの連絡を効率化する「代理発言」機能を紹介しました。

この仕組みを導入したことで、
- **クイックリプライなど、より高度なLINE Botの機能を試すことができた**
- **管理メンバーがスムーズに使いこなしてくれた**
- **Botの存在がメンバーに浸透し、気軽に全体連絡できる雰囲気を作れた**

という大きな成果がありました。

日々の連絡業務に課題を感じている方は、ぜひこの記事を参考に、独自のBot開発に挑戦してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
