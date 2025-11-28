---
title: "【GAS】getDataSourceUrl()で外部連携URLを取得する方法（※非推奨・代替案あり）"
description: "GASの古いメソッド`getDataSourceUrl()`について解説します。このメソッドは過去にスプレッドシートのデータを外部公開URLとして取得するために使われましたが、現在ではセキュリティ上の懸念から非推奨です。代替となる`ContentService`を使ったより安全なデータ公開方法も紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getDataSourceUrl", "データ連携", "非推奨", "ContentService"]
date: "2020-06-11T14:50:07.000Z"
url: "/gas/getdatasourceurl"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-21T00:00:00+00:00"
---

Google Apps Script (GAS)でスプレッドシートのデータを外部システムと連携させたい場合、過去には`getDataSourceUrl()`というメソッドが使われていました。しかし、このメソッドは**現在では非推奨**となっており、利用には注意が必要です。

この記事では、`getDataSourceUrl()`がどのような機能であったかと、現在推奨されている代替方法について解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getDataSourceUrl()とは？（※非推奨）

`getDataSourceUrl()`は、指定した`Range`のデータを、外部からJSON形式で取得できる特殊なURLを生成するメソッドでした。

このURLを知っていれば誰でもデータにアクセスできるため、手軽なデータ公開手段として利用されていましたが、セキュリティ上のリスクも大きいものでした。

### 過去の基本的な使い方

```javascript
// ※ このコードは現在推奨されていません
function generateLegacyDataSourceUrl() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('公開データ');
  
  // スプレッドシートの共有設定を「リンクを知っている全員」にする必要があった
  const dataRange = sheet.getRange('A1:B10');
  
  const sourceUrl = dataRange.getDataSourceUrl();
  console.log('生成されたデータソースURL:', sourceUrl);
}
```
この機能は、Googleのセキュリティ強化方針により、現在ではその利用が推奨されていません。既存のスクリプトで使われている場合を除き、新規での利用は避けるべきです。

## 代替案：ContentServiceを使って安全なAPIを作成する

現在、スプレッドシートのデータを外部に公開する最も安全で推奨される方法は、**`ContentService`を使って自作のWeb APIを作成する**ことです。

`doGet()`という特別な関数を定義することで、GASプロジェクトのURLにアクセスがあった際に、指定したデータを返すAPIとして機能させることができます。

### `doGet()`を使ったAPIの基本実装

以下のスクリプトは、特定のスプレッドシートのデータをJSON形式で返すシンプルなWeb APIです。

```javascript
// この関数は、ウェブアプリとしてデプロイすると機能します
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById("ここにスプレッドシートIDを入力");
    const sheet = ss.getSheetByName("公開用シート");
    const data = sheet.getDataRange().getValues();

    // データをJSON文字列に変換
    const jsonString = JSON.stringify(data);

    // ContentServiceを使ってJSONとして出力
    return ContentService.createTextOutput(jsonString)
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // エラーハンドリング
    const errorJson = JSON.stringify({ error: error.message });
    return ContentService.createTextOutput(errorJson)
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### この方法のメリット

1.  **アクセス制御**: スクリプトの実行権限を「自分のみ」または「Googleアカウントでログインしているユーザー」に限定でき、意図しない第三者によるアクセスを防げます。
2.  **柔軟なデータ加工**: `getValues()`で取得したデータをGAS上で自由に加工・整形してから返すことができます。必要なデータだけを選別したり、形式を整えたりすることが可能です。
3.  **セキュリティ**: スプレッドシート自体を「リンクを知っている全員」に公開する必要がありません。スクリプト経由でのみデータが公開されるため、元データの安全性が高まります。
4.  **パラメータの利用**: `doGet(e)`の引数`e`を通じて、URLのクエリパラメータ（例: `?id=123`）を受け取り、返すデータを動的に変更することも可能です。

## まとめ

`getDataSourceUrl()`は過去の遺物であり、**現在では`ContentService`を用いたWeb APIの作成がベストプラクティス**です。

-   `getDataSourceUrl()`はセキュリティリスクがあるため**使用しない**。
-   `ContentService`と`doGet(e)`を使って、**安全で柔軟なAPIを自作する**。
-   API化することで、スプレッドシートを共有設定で公開する必要がなくなり、**元データの安全性が向上**する。

外部とのデータ連携を実装する際は、必ず`ContentService`を利用する方法を検討してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
