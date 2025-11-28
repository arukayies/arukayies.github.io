---
title: "【GAS】Gmailに来た特定メールをLINEにリッチな形式で通知する方法"
description: "Google Apps Script（GAS）を利用して、Gmailに届いた特定メールをLINEにリッチなテンプレートメッセージで通知する具体的な方法を解説します。Gmailの検索機能、GASのキャッシュサービス、LINE Messaging APIを連携させた自動化のステップをコード付きで詳しく紹介。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Gmail", "自動化"]
date: "2020-04-26T16:58:58.000Z"
url: "/gas/line_bot/gmail-rich-style-post-line"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2020年4月"]
lastmod: "2025-11-26T09:35:13+09:00"
---

Gmailに届いた重要なメール、見逃さずにすぐに気づきたいと思ったことはありませんか？
今回は、**Google Apps Script (GAS) を使って、Gmailに届いた特定のメールをLINEにリッチな形式で自動通知する**方法を紹介します。

例えば、証券会社からの取引通知メールを、以下のようにLINEで受け取ることができます。

{{< custom-figure src="メール内容-1024x534.png" title="通知対象のメール例" Fit="1280x1280 webp q90" >}} 

このメールが届くと、LINEにはこのようにボタン付きのメッセージが届きます。

{{< custom-figure src="image1.png" title="LINEへの通知（ボタン付き）" Fit="640x640 webp q90" >}} 

{{< custom-figure src="image2.png" title="メール詳細の表示" Fit="640x640 webp q90" >}} 

この記事を読めば、あなたもこのような便利な通知システムを構築できます。それでは、具体的な手順を解説していきます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## システムの全体像

今回作成するシステムの処理の流れは以下の通りです。

1.  **GASが定期的（例: 5分ごと）に起動**
2.  **指定した検索条件でGmailを検索**
3.  **新しいメールが見つかれば、内容を取得**
4.  **LINE Messaging APIを使い、リッチなメッセージをLINEに送信**
5.  **処理済みのメールにはスターを付けて、二重通知を防止**
6.  **LINEの「詳細はこちら」ボタンをタップすると、GASで作成したWebページでメール本文を表示**

## STEP1: GASのコードを準備する

まず、GASプロジェクトに2つのファイルを作成します。

-   `コード.gs`: メインの処理を記述するスクリプトファイル
-   `index.html`: メール本文を表示するためのHTMLファイル

### `コード.gs` の実装

Gmailを検索し、LINEに通知を送るためのメインロジックです。

#### 1. Gmailを検索してLINEに通知する

```javascript
// 【要設定】LINEで取得したトークン
const token = "LINEのアクセストークン";
// 【要設定】LINEで送信する宛先のユーザーID
const To = "LINEのユーザーID";
// 【要設定】GASの公開URL
const appURL = "GASのウェブアプリURL";

function checkGmailAndNotifyToLINE() {
  // 【要設定】Gmailの検索条件を指定
  const searchGmail = "from:example@co.jp subject:取引通知";

  // スターが付いていないメールを1スレッドのみ検索
  const threads = GmailApp.search(searchGmail + " -is:starred", 0, 1);
  if (threads.length === 0) {
    console.log("新着メールはありませんでした。");
    return;
  }

  const messages = GmailApp.getMessagesForThreads(threads);

  // 検索されたメッセージを1件ずつ処理
  for (let thd in messages) {
    for (let mail in messages[thd]) {
      let mailID = messages[thd][mail].getId(); // メールID
      let mailFrom = /"(.*?)"/.exec(messages[thd][mail].getFrom())[1] || messages[thd][mail].getFrom(); // 差出人
      let mailSubject = messages[thd][mail].getSubject(); // 件名

      // メール本文をキャッシュに保存（有効期限6時間）
      let cache = CacheService.getScriptCache();
      cache.put("mailBody" + mailID, messages[thd][mail].getBody(), 21600);
      
      // LINEにプッシュメッセージを送信
      pushMessage(mailID, mailFrom, mailSubject);
      
      // 処理済みのメールにスターを付ける
      messages[thd][mail].star();
    }
  }
}
```
**ポイント解説**
- `searchGmail`: ここにGmailで使いたい検索クエリ（差出人、件名など）を指定します。
- `is:starred`: 処理済みのメールにスターを付けることで、同じメールを何度も通知しないように制御しています。
- `CacheService`: メール本文を一時的にキャッシュに保存しています。これにより、LINEのボタンから本文を高速に表示できます。

#### 2. LINEにプッシュメッセージを送信する

```javascript
function pushMessage(id, from, subject) {
  const url = "https://api.line.me/v2/bot/message/push";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const payload = {
    to: To,
    messages: [
      {
        type: "template",
        altText: from.substr(0, 29) + "からメールがありました",
        template: {
          type: "buttons",
          title: from.substr(0, 29) + "からメールがありました",
          text: subject.substr(0, 60),
          actions: [
            {
              type: "uri",
              label: "メールの詳細はこちら",
              uri: appURL + "?mailID=" + id,
              altUri: {
                desktop: appURL + "?mailID=" + id,
              },
            },
          ],
        },
      },
    ],
  };

  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, options);
}
```
**ポイント解説**
- `buttons` テンプレート: LINEにボタン付きのメッセージを送るための形式です。
- `uri` アクション: ボタンをタップした際に、指定したURLを開かせます。ここでは、メールIDをパラメータとして渡しています。

#### 3. メール本文を表示するWebアプリ

LINEのボタンからアクセスされた際に、メール本文を表示するためのコードです。

```javascript
function doGet(e) {
  // URLパラメータからメールIDを取得
  const ID = e.parameter.mailID;
  if (!ID) {
    return HtmlService.createHtmlOutput("メールIDが指定されていません。");
  }

  // メールIDに対応する本文をキャッシュから取得
  const cache = CacheService.getScriptCache();
  const mailBody = cache.get("mailBody" + ID);
  if (!mailBody) {
      return HtmlService.createHtmlOutput("メールの本文が見つからないか、有効期限が切れました。");
  }
  
  // テンプレートHTMLに本文を埋め込んで返す
  const template = HtmlService.createTemplateFromFile("index");
  template.mailBody = mailBody;
  
  return template.evaluate().addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1.0"
  );
}
```

### `index.html` の実装

`doGet`関数から呼び出されるHTMLファイルです。

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    <?!= mailBody ?>
  </body>
</html>
```
`<?!= mailBody ?>`の部分に、`doGet`関数から渡されたメール本文が展開されます。


## STEP2: LINEの設定

LINE側の設定を行い、**アクセストークン**と**ユーザーID**を取得します。詳しい手順は以下の記事を参考にしてください。

-   **アクセストークン取得:** {{< blog-card "https://arukayies.com/gas/line_bot/gettoken" >}}
-   **ユーザーID取得:** {{< blog-card "https://arukayies.com/gas/line_bot/get-userid" >}}

取得した値は、`コード.gs`の先頭にある`token`と`To`の変数に設定してください。

## STEP3: GASのデプロイとトリガー設定

最後に、作成したGASをWebアプリとして公開し、定期的に実行するためのトリガーを設定します。

### Webアプリとしてデプロイ

1.  GASエディタ画面右上の「デプロイ」>「新しいデプロイ」を選択。
2.  「種類の選択」で歯車アイコンをクリックし、「ウェブアプリ」を選択。
3.  「アクセスできるユーザー」を「全員」に設定して「デプロイ」。
4.  表示された**ウェブアプリURL**をコピーし、`コード.gs`の`appURL`変数に設定します。

### トリガーの設定

1.  GASエディタ左側のメニューから時計アイコンの「トリガー」を選択。
2.  右下の「トリガーを追加」をクリック。
3.  以下の通り設定します。
    -   実行する関数を選択: `checkGmailAndNotifyToLINE`
    -   イベントのソースを選択: `時間主導型`
    -   時間ベースのトリガーのタイプを選択: `分ベースのタイマー`
    -   時間の間隔を選択: `5分おき` （お好みで調整してください）
4.  「保存」をクリックします。

{{< custom-figure src="スクリーンショット-2020-04-27-1.50.29-1-1000x1024.png" title="トリガー設定の例" Fit="1280x1280 webp q90" >}} 

これで全ての設定は完了です！指定した条件のメールがGmailに届くと、設定した時間間隔でLINEに通知が届くようになります。

## まとめ

今回は、GASを使ってGmailとLINEを連携させ、特定のメールをリッチな形式で通知する方法を解説しました。

この仕組みのポイントは以下の通りです。

-   **GmailApp**で柔軟なメール検索が可能
-   処理済みメールの**スター付け**による二重通知防止
-   **CacheService**を活用した高速なメール本文表示
-   LINEの**Buttons Template**によるリッチな通知

この仕組みを応用すれば、様々なサービスからの通知をLINEに集約するなど、日々の業務や生活をさらに効率化できます。ぜひ試してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}