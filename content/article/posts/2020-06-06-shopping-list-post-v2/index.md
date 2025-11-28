---
title: "【GASだけで完結】LINEで使える買い物リスト管理BOTの作り方をコード付きで解説"
description: "Google Apps Script（GAS）とLINE Messaging APIを使って、オリジナルの買い物リスト管理LINE BOTを作成する具体的な手順を解説します。コピペで使える全コードを公開しており、初心者でも簡単に実装できます。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "買い物リスト"]
date: "2020-06-06T14:19:51.000Z"
url: "/gas/line_bot/shopping-list-post-v2"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:24:00+09:00"
---

「あ、あれ買わなきゃ」と思ったことをすぐにメモしたい、家族やパートナーと買い物リストを共有したい、そんな経験はありませんか？

この記事では、**Google Apps Script (GAS) とLINE Messaging APIを使って、無料で簡単に作成できる「買い物リスト管理LINE BOT」の作り方**を、実際のコードを交えながら詳しく解説します。

プログラムの知識が少ない方でも、コピー＆ペーストで実装できるように丁寧に説明していくので、ぜひオリジナルのBOT作りに挑戦してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## このBOTでできること

作成する買い物リストBOTは、LINEのトーク画面で以下のような操作ができます。

*   **リストの表示**: 現在の買い物リストを一覧で表示します。
{{< custom-figure src="IMG_8151.jpg" title="" Fit="640x640 webp q90" >}}

*   **リストへの追加**: 買いたいものをメッセージで送るだけでリストに追加できます。
{{< custom-figure src="IMG_8149.jpg" title="" Fit="640x640 webp q90" >}}

*   **リストからの削除**: 買い物が終わったものをリストから削除します。
{{< custom-figure src="IMG_8150.jpg" title="" Fit="640x640 webp q90" >}}

*   **使い方の確認**: 操作方法がわからなくなったときに使い方を表示します。
{{< custom-figure src="IMG_8148.jpg" title="" Fit="640x640 webp q90" >}}


日常の買い物をよりスマートに、効率的に管理するための便利なツールです。

## BOTの技術的なポイント

このBOTを作成する上での技術的なポイントをいくつか紹介します。

*   **データ保存**: 買い物リストのデータは、スプレッドシートやデータベースを使わず、GASの**スクリプトプロパティ**に保存しています。データ量が少ないため、カンマ区切りのテキストとして手軽に管理しています。
*   **リッチメニュー**: トーク画面下部に表示される「表示」「追加」などのボタン（リッチメニュー）の画像は、デザインツールの[Canva](https://www.canva.com/)で簡単に作成しました。プログラミングだけでなく、少しデザインにこだわるだけでBOTがぐっと使いやすくなります。

## 事前準備

このBOTを作成するにあたり、LINE Botアカウントの作成やリッチメニューの設定、GASプロジェクトの準備が必要です。これらの基本的な設定方法については、旧バージョンの記事で詳しく解説していますので、まずはこちらをご覧ください。

{{< self-blog-card "article/posts/2020-05-04-shopping-list-post" >}}

## GASのコード解説

それでは、BOTを動作させるためのGoogle Apps Scriptのコードを見ていきましょう。機能ごとにファイルを分割して、管理しやすくしています。

### 1. メイン処理 (`main.js`)

LINEプラットフォームからのWebhookを受け取るメインの処理です。受け取ったイベントの種類（メッセージか、ボタンタップなどのポストバックか）を判別し、それぞれの処理に振り分けます。

```javascript:main.js
/*
関数概要
 買い物リストBOTのメイン処理

引数
 e LINEから受け取ったイベント情報

戻り値
 なし
———————————–*/
function doPost(e) {
  /* テキスト内容によって制御 */
  try {
    const res = e.postData.getDataAsString();
    postLog(res);
    const event = JSON.parse(res).events[0];

    switch (event.type) {
      /* メッセージイベントの場合 */
      case "message":
        getMessage(event);
        break;
      /* ポストバックイベントの場合 */
      case "postback":
        getPostback(event);
        break;
      default:
        addLog(res);
        break;
    }
  } catch (e) {
    addLog(e);
  }
}
```

### 2. メッセージイベントの処理 (`getMessage.js`)

ユーザーから送信されたテキストメッセージの内容に応じて、処理を分岐させます。

*   `表示`: `pushShoppingLists`関数を呼び出し、現在のリストを表示します。
*   `追加`: `addShoppingLists`関数を呼び出し、アイテム追加モードに移行します。
*   `削除`: `deleteShoppingLists`関数を呼び出し、アイテム削除モードに移行します。
*   `使い方`: `pushReadme`関数を呼び出し、操作説明を送信します。
*   上記以外: アイテム追加モードであれば、送られてきたテキストをリストに追加します。

```javascript:getMessage.js
/*
関数概要
 メッセージイベントの処理

引数
 event LINEから受け取ったメッセージイベント情報

戻り値
 なし
———————————–*/
function getMessage(event) {
  /* テキスト内容によって制御 */
  try {
    /* eventの宛先IDを取得 */
    let to;
    if (event.source.type == "user") {
      to = event.source.userId;
    } else {
      to = event.source.roomId;
    }
    switch (event.message.text) {
      /* 買い物リストを表示 */
      case "表示":
        pushShoppingLists(to);
        break;
      /* 買い物リストの追加 */
      case "追加":
        addShoppingLists(to);
        break;
      /* 買い物リストの削除 */
      case "削除":
        deleteShoppingLists(to);
        break;
      /* 使い方の表示 */
      case "使い方":
        pushReadme(to);
        break;
      default:
        /* スクリプトプロパティ情報を取得 */
        const prop = PropertiesService.getScriptProperties();
        /* 現在の設定値を取得 */
        const CONF = prop.getProperty("CONF");
        /* 設定値が1なら買い物リストを追加する */
        if (CONF == 1) {
          /* 設定値を0にする */
          prop.setProperty("CONF", 0);
          /* 空文字は削除する */
          let shoppingLists = event.message.text.split(/\\n/);
          shoppingLists = shoppingLists.filter(function (x) {
            return !(x === null || x === undefined || x === "");
          })
          /* 買い物リストを追加する */
          prop.setProperty("LIST", prop.getProperty("LIST") + "," + shoppingLists.join(","));
          const lineMessageObject = [
            {
              type: "text",
              text: "追加しました！",
            },
          ];
          pushLine(lineMessageObject, to);
          pushShoppingLists(to);
        }
        break;
    }
  } catch (event) {
    addLog(event);
  }
}
```

### 3. ポストバックイベントの処理 (`getPostback.js`)

削除モードの際に表示されるリストアイテムがタップされたときの処理です。ポストバックデータに含まれるアイテム名を取得し、リストから該当するアイテムを削除します。

```javascript:getPostback.js
/*
関数概要
 ポストバックイベントの処理

引数
 event LINEから受け取ったメッセージイベント情報

戻り値
 なし
———————————–*/
function getPostback(event) {
  /* eventの宛先IDを取得 */
  let to;
  if (event.source.type == "user") {
    to = event.source.userId;
  } else {
    to = event.source.roomId;
  }
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* 設定値を0にする */
  prop.setProperty("CONF", 0);
  /* 買い物リストの文字列を取得 */
  const stringLists = prop.getProperty("LIST");
  /* 買い物リストの文字列を配列に変換して取得 */
  const ArrayLists = stringLists.split(",");

  /* ポストバックから受け取ったデータを取得 */
  const data = event.postback.data;

  /* 買い物リストから削除する */
  const newArrayLists = ArrayLists.filter(function (a) {
    return a != data.replace("delete=", "");
  });

  /* 買い物リストを更新する */
  prop.setProperty("LIST", newArrayLists.join(","));

  /* 削除結果をLINEに送信する */
  const lineMessageObject = [
    {
      type: "text",
      text: `『${data.replace("delete=", "")}』を削除しました`,
    },
  ]
  return pushLine(lineMessageObject, to);
}
```

### 4. 買い物リストの表示 (`pushShoppingLists.js`)

スクリプトプロパティに保存されている買い物リストを読み出し、`createContents`関数で整形してユーザーに送信します。リストが空の場合はその旨を伝えます。

```javascript:pushShoppingLists.js
/*
関数概要
 買い物リストの内容をLINEに送信する処理

引数
 to 送る宛先

戻り値
 送信した結果のレスポンス
———————————–*/
function pushShoppingLists(to) {
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* 設定値を0にする */
  prop.setProperty("CONF", 0);
  /* 買い物リストの文字列を取得 */
  const stringLists = prop.getProperty("LIST");
  /* 買い物リストの文字列を配列に変換して取得 */
  const ArrayLists = stringLists.split(",");
  /* 先頭の『初期値』は削除する */
  ArrayLists.shift();

  /* 買い物リストが空の場合 */
  if (stringLists == "初期値") {
    let lineMessageObject = [
      {
        type: "text",
        text: "買い物リストは空っぽです。"
      }
    ];
    return pushLine(lineMessageObject, to);
    /* 買い物リストがある場合 */
  } else {
    return pushLine(createContents(ArrayLists, "買い物リスト", "primary"), to);
  }
}
```

### 5. アイテム追加モードへの移行 (`addShoppingLists.js`)

「追加」と送信された際に、BOTを「アイテム追加モード」に設定します。次に送信されるメッセージがリストに追加されるようになります。

```javascript:addShoppingLists.js
/*
関数概要
 買い物リストを追加モードにする処理

引数
 to 送る宛先

戻り値
 送信した結果のレスポンス
———————————–*/
function addShoppingLists(to) {
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* 設定値を1にする */
  prop.setProperty("CONF", 1);
  /* 使い方の内容 */
  const message =
    `追加したい品目を入力してください。
改行すると、複数追加できます。`;
  const lineMessageObject = [
    {
      type: "text",
      text: message,
    },
  ];
  return pushLine(lineMessageObject, to);
}
```

### 6. アイテム削除モードへの移行 (`deleteShoppingLists.js`)

「削除」と送信された際に、現在の買い物リストをタップ可能なボタン形式で送信し、BOTを「アイテム削除モード」に設定します。

```javascript:deleteShoppingLists.js
/*
関数概要
 買い物リストをカルーセルテンプレートでLINEに送る処理

引数
 to 送る宛先

戻り値
 送信した結果のレスポンス
———————————–*/
function deleteShoppingLists(to) {
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* 設定値を2にする */
  prop.setProperty("CONF", 2);
  /* 買い物リストの文字列を取得 */
  const stringLists = prop.getProperty("LIST");
  /* 買い物リストの文字列を配列に変換して取得 */
  const ArrayLists = stringLists.split(",");
  /* 先頭の『初期値』は削除する */
  ArrayLists.shift();

  /* 買い物リストが空の場合 */
  if (stringLists == "初期値") {
    const lineMessageObject = [
      {
        type: "text",
        text: "買い物リストは空っぽです。"
      }
    ];
    return pushLine(lineMessageObject, to);
    /* 買い物リストがある場合 */
  } else {
    pushLine(createContents(ArrayLists, "削除する品名をタップ", "secondary"), to);
  }
}
```

### 7. 表示メッセージの組み立て (`createContents.js`)

買い物リストの配列データから、LINEで表示するためのFlex Messageオブジェクトを生成します。アイテム一つひとつがボタンになり、タップでアクションを起こせるようになります。

```javascript:createContents.js
/*
関数概要
 買い物リストのFlex Messageを組み立てる処理

引数
 shoppingLists  買い物リストの配列
 message リストのタイトルメッセージ

戻り値
 lineMessageObjecを返す
———————————–*/
function createContents(shoppingLists, message, button_type) {
  let contents = [];

  /* 買い物リストのカルーセルを組み立てる */
  for (let i in shoppingLists) {
    /* 空文字以外 */
    if (shoppingLists[i] != "") {
      contents.push({
        "type": "button",
        "action": {
          "type": "postback",
          "label": shoppingLists[i],
          "data": "delete=" + shoppingLists[i]
        },
        "style": button_type,//買い物リストを表示するときprimary、削除するときは灰色のボタンsecondary
        "height": "sm"
      });
    }
  }

  /* Flex Messageを組み立てる */
  const lineMessageObject = [{
    "type": "flex",
    "altText": "買い物リスト",
    "contents": {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": message,
            "weight": "bold",
            "size": "xl"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": contents,
        "flex": 0
      }
    }
  }];

  return lineMessageObject;
}
```

### 8. LINEへのプッシュ通知 (`pushLine.js`)

LINE Messaging APIのエンドポイントに対して、生成したメッセージオブジェクトをPOSTリクエストで送信するコアな関数です。

```javascript:pushLine.js
/*
関数概要
 LINEに送信する処理

引数
 lineMessageObject LINEに送るメッセージオブジェクト
 to 送る宛先

戻り値
 送信した結果のレスポンス
———————————–*/
function pushLine(lineMessageObject, to) {
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* LINEに送信用のURL */
  const PUSH_API_URL = "https://api.line.me/v2/bot/message/push";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + prop.getProperty("TOKEN")
  };
  const data = {
    to: to,
    messages: lineMessageObject
  };
  const options = {
    method: "POST",
    headers: headers,
    payload: JSON.stringify(data)
  };
  return UrlFetchApp.fetch(PUSH_API_URL, options);
}
```

### 9. 使い方メッセージの送信 (`pushReadme.js`)

BOTの基本的な使い方をテキストメッセージでユーザーに送信します。

```javascript:pushReadme.js
/*
関数概要
 使い方の内容をLINEに送信する処理

引数
 to 送る宛先

戻り値
 送信した結果のレスポンス
———————————–*/
function pushReadme(to) {
  /* スクリプトプロパティ情報を取得 */
  const prop = PropertiesService.getScriptProperties();
  /* 設定値を0にする */
  prop.setProperty("CONF", 0);
  /* 使い方の内容 */
  const message =
    `以下のキーワードに反応します。

①『表示』:リストを表示。
②『追加』:リストに追加。
③『削除』:リストを削除。
④『使い方』:使い方を表示。`;
  const lineMessageObject = [
    {
      type: "text",
      text: message,
    },
  ];
  return pushLine(lineMessageObject, to);
}
```

## まとめ

今回は、Google Apps Script (GAS) を利用して、実用的な買い物リスト管理LINE BOTを作成する方法を紹介しました。

思いついた時にすぐにLINEでリストに追加できるので、買い忘れを防いだり、家族との情報共有をスムーズにしたりと、日々の生活が少し便利になります。

今回紹介したコードをベースに、自分好みに機能を拡張してみるのも面白いでしょう。ぜひ、この記事を参考にオリジナルのLINE BOT開発に挑戦してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
