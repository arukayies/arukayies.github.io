---
title: "GASで見えるままの値を取得！getDisplayValue()でフォーマットを維持する方法"
description: "GASでスプレッドシートの日付や通貨を読み込んだら表示が崩れた？そんな時はgetDisplayValue()が解決します。getValue()との明確な違いから、複数セルを一括取得するgetDisplayValues()、レポート作成での実践的な使い方まで徹底解説。"
tags: ["GAS", "getDisplayValue", "getDisplayValues", "Google Apps Script", "スプレッドシート", "フォーマット", "日付", "通貨", "表示形式"]
date: "2020-06-18T17:28:39.000Z"
url: "/gas/getdisplayvalue"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

スプレッドシート上の「¥1,200」や「2025/12/25」といった値をGASで取得したら、`1200` というただの数値や、よく分からない長い日付オブジェクトになって困った経験はありませんか？

これは、GASがセルの「内部的な値」を読み込んでいるために起こる現象です。ユーザーが**画面で見ている通りのフォーマットされた値**を取得したいときに活躍するのが、`getDisplayValue()` メソッドです。

この記事では、`getDisplayValue()` の正しい使い方、`getValue()` との決定的な違い、そして業務で役立つ実践例を分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getDisplayValue()` と `getValue()` の決定的な違い

GASでセルの値を取得するメソッドは主に2つあり、その違いを理解することが非常に重要です。

| メソッド | 取得できるもの | 例 (セル表示が "¥1,000") | データ型 |
|:--- |:--- |:--- |:--- |
| **`getValue()`** | セルの**内部的な元の値** | `1000` | 数値, Dateオブジェクト等 |
| **`getDisplayValue()`** | **画面に見えている表示値** | `"¥1,000"` | **文字列 (String)** |

**▼ コードで違いを確認**
セル `A1` に `2025/12/25` という日付が入力されている場合の比較です。

```javascript
function checkValueDifference() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dateCell = sheet.getRange('A1');

  // getValue() は Dateオブジェクトを返す
  const rawValue = dateCell.getValue();
  console.log(rawValue); // 例: Tue Dec 25 2025 00:00:00 GMT+0900 (Japan Standard Time)
  console.log(typeof rawValue); // 'object'

  // getDisplayValue() は見えている通りの文字列を返す
  const displayValue = dateCell.getDisplayValue();
  console.log(displayValue); // "2025/12/25"
  console.log(typeof displayValue); // 'string'
}
```

計算や日付の比較など、データそのものを処理したい場合は `getValue()`、メール本文の作成やレポート出力など、**見た目をそのまま使いたい場合は `getDisplayValue()`** と使い分けましょう。

## `getDisplayValue()` の使い方

### 1. 単一セルの表示値を取得する

`getRange()` で取得した**単一のセル**に対して使用します。

```javascript
function getSingleDisplayValue() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // B2セルの表示値を取得
  const displayValue = sheet.getRange('B2').getDisplayValue();
  console.log(`B2セルの表示は「${displayValue}」です。`); 
}
```

### 2. 複数セルの表示値をまとめて取得する (`getDisplayValues`)

複数のセルの表示値を効率的に取得したい場合は、`getDisplayValues()` (最後に複数形の `s` が付く) を使います。値は**二次元配列**で返されます。

```javascript
function getMultipleDisplayValues() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:B3');
  // 範囲内の表示値を二次元配列で取得
  const displayValues = range.getDisplayValues();
  
  console.log(displayValues);
  /*
    実行結果の例:
    [
      ["商品名", "価格"],
      ["リンゴ", "¥150"],
      ["バナナ", "¥200"]
    ]
  */
}
```
大量のセルを一つずつループで取得すると処理が遅くなります。複数セルを扱う場合は、`getDisplayValues()` で一括取得するのが鉄則です。

## 実践！こんな時に `getDisplayValue()` が役立つ

### 1. メールやSlack通知で日付や通貨のフォーマットを崩さない

`getValue()` で取得した日付をそのままメールに入れると、意図しない長い形式になってしまいます。`getDisplayValue()` なら見たままの文字列が使えるので簡単です。

```javascript
function sendReportMail() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const date = sheet.getRange('A1').getDisplayValue(); // "2025年12月25日"
  const totalSales = sheet.getRange('B1').getDisplayValue(); // "¥1,234,567"
  
  const subject = `${date} の売上報告`;
  const body = `本日の総売上は ${totalSales} でした。`;
  
  // GmailApp.sendEmail(..., subject, body);
  console.log(body); // 本日の総売上は ¥1,234,567 でした。
}
```

### 2. 外部APIへのデータ送信

外部システムにデータを送信する際、表示されている通りの整形済み文字列を送りたい場合に役立ちます。

```javascript
function postFormattedData() {
  const range = SpreadsheetApp.getActiveSheet().getRange('A1:C10');
  const displayData = range.getDisplayValues(); // 整形済みのデータを取得
  
  const payload = JSON.stringify({ data: displayData });
  
  UrlFetchApp.fetch('https://api.example.com/data', {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  });
}
```

## 注意点：取得した値は必ず「文字列」

`getDisplayValue()` で取得した値は、たとえ見た目が数値でも**必ず文字列 (String) 型**になります。

```javascript
const priceCell = SpreadsheetApp.getActiveSheet().getRange('C1'); // 表示は "1,000"
const price = priceCell.getDisplayValue(); // "1,000" という文字列

// console.log(price * 1.1); // これは正しく計算できない！
```
取得した値で計算を行いたい場合は、`getValue()` を使うか、`getDisplayValue()` で取得した文字列からカンマや円マークを取り除いて数値に変換する処理が必要です。

## まとめ

`getDisplayValue()` と `getDisplayValues()` は、スプレッドシートの「見たまま」の情報を扱いたい場合に必須のメソッドです。

- **`getValue()` は内部データ、`getDisplayValue()` は表示されている文字列**
- **レポート作成や通知など、見た目が重要な場面で活躍**
- **複数セルは `getDisplayValues()` で一括取得が基本**
- **返り値は必ず文字列型なので計算には注意**

この違いをマスターして、GASでのデータ整形の手間を大幅に削減しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getdisplayvalue" >}} 
  
{{< blog-card "https://moripro.net/gas-getdisplayvalue/" >}} 
  
{{< blog-card "https://hajiritsu.com/spreadsheet-gas-getdisplayvalues/" >}}
