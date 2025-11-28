---
title: "GAS getDataTable(true) でヘッダー行を正しく扱う方法【グラフ作成】"
description: "Google Apps Script (GAS) の getDataTable() でヘッダー行がデータとして扱われてしまう問題の解決策を解説。firstRowIsHeader パラメータを true に設定する重要性と、false との使い分けを具体例で紹介します。グラフ作成の自動化で失敗しないための必須知識です。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getDataTable", "DataTable", "firstRowIsHeader", "グラフ作成"]
date: "2020-06-14T16:19:48.000Z"
url: "/gas/getdatatable-firstrowisheader"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

GASの `getDataTable()` を使ってグラフを作ったら、「ヘッダー（見出し）までデータとして扱われてしまい、グラフがおかしくなった」という経験はありませんか？

これは `getDataTable()` の非常に重要なパラメータ `firstRowIsHeader` の設定が原因です。この設定を正しく理解するだけで、データ取得の精度が格段に上がり、グラフ作成の自動化がスムーズに進みます。

本記事では、`getDataTable()` の `firstRowIsHeader` パラメータに焦点を当て、その役割と `true` / `false` の使い分け、そして実践的な応用例までを分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `firstRowIsHeader` パラメータの重要性

`getDataTable()` メソッドは、スプレッドシートのデータをグラフ化などに適した `DataTable` オブジェクトとして取得します。その際、取得範囲の1行目を「ヘッダー」として扱うか、それとも「データ」として扱うかを決めるのが `firstRowIsHeader` パラメータです。

-   `getDataTable(true)`: 範囲の**1行目をヘッダー**として認識します。グラフの凡例や軸ラベルに自動で設定されるため、グラフ作成時は基本的にこちらを使います。
-   `getDataTable(false)` または `getDataTable()`: 範囲の**すべての行をデータ**として扱います。ヘッダーが存在しないデータや、ヘッダーもデータの一部として処理したい場合に利用します。

`getValues()` が単純な二次元配列を返すのに対し、`getDataTable()` はこのパラメータによってデータ構造を明確に定義できる点が大きなメリットです。

## `true` と `false` の挙動の違いを比較

具体的に、`firstRowIsHeader` の設定値によって `DataTable` の中身がどう変わるのか見てみましょう。

仮に、以下のようなデータが `A1:C3` の範囲にあるとします。

| Product | Sales | Profit |
| :--- | :--- | :--- |
| A | 100 | 20 |
| B | 150 | 35 |

### `getDataTable(true)` の場合

1行目がヘッダーとして認識され、列ラベル（`ColumnLabel`）に設定されます。

```js
const range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1').getRange('A1:C3');
const dataWithHeader = range.getDataTable(true);

// 取得できるDataTableのイメージ
// 列ラベル: ['Product', 'Sales', 'Profit']
// データ行: [['A', 100, 20], ['B', 150, 35]]
```

### `getDataTable(false)` の場合

1行目もデータとして扱われ、列ラベルは自動的に `Col0`, `Col1`... となります。

```js
const range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1').getRange('A1:C3');
const dataWithoutHeader = range.getDataTable(false);

// 取得できるDataTableのイメージ
// 列ラベル: ['Col0', 'Col1', 'Col2']
// データ行: [['Product', 'Sales', 'Profit'], ['A', 100, 20], ['B', 150, 35]]
```

このように、グラフ化を目的とする場合は `true` を設定しないと、意図しない結果になってしまうことが分かります。

## 実践的なサンプルコード

`getDataTable(true)` を使って、売上データからグラフを生成する簡単なサンプルコードです。

```js
function createDailySalesReport() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('売上データ');
  const dataRange = sheet.getRange('A1:B11'); // A列:日付, B列:売上, 1行目はヘッダー
  
  // 最初の行をヘッダーとしてDataTableを取得
  const dataTable = dataRange.getDataTable(true);
  
  // 取得したDataTableを基に折れ線グラフを生成
  const chart = Charts.newLineChart()
    .setDataTable(dataTable)
    .setTitle('日次売上推移')
    .setXAxisTitle('日付')
    .setYAxisTitle('売上')
    .build();
  
  // 新しいシートを作成してグラフを挿入
  const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('売上グラフ');
  newSheet.insertChart(chart);
}
```
このコードでは、`getDataTable(true)` を使うことで、`'日付'` や `'売上'` といったヘッダー情報がグラフに自動で反映されます。

## 応用例：レポートメールの自動送信

`getDataTable()` を活用すれば、日次レポートの作成とメール送信を自動化できます。

```js
function sendDailyReportEmail() {
  const dataSheet = SpreadsheetApp.getActive().getSheetByName('日次データ');
  
  // データ範囲を最終行まで動的に取得
  const dataRange = dataSheet.getRange('A1:F' + dataSheet.getLastRow());
  const dataTable = dataRange.getDataTable(true);
  
  // データからグラフを生成し、画像Blobとして取得
  const chartBlob = Charts.newColumnChart()
    .setDataTable(dataTable)
    .setDimensions(800, 600)
    .setTitle('デイリーパフォーマンス')
    .build()
    .getBlob();
  
  // メールの本文を作成
  let mailBody = '<h1>日次レポート</h1><p>本日のパフォーマンスです。</p>';
  // ここにDataTableからサマリー情報を作成するコードを追加できます
  mailBody += '<img src="cid:chartImage">'; // グラフをインラインで表示

  // グラフ画像を添付してメールを送信
  MailApp.sendEmail({
    to: 'report@example.com',
    subject: '日次セールスレポート',
    htmlBody: mailBody,
    inlineImages: {
      chartImage: chartBlob
    }
  });
}
```
このスクリプトをトリガー設定で毎日実行すれば、手作業なしで関係者にグラフ付きのレポートを届けられます。

## まとめ

`getDataTable()` の `firstRowIsHeader` パラメータは、データ構造をスクリプトに正しく伝えるための重要なスイッチです。

- **グラフ化が目的なら `getDataTable(true)` を使うのが基本**
- **1行目をヘッダーとして認識させ、グラフのラベルなどに自動反映できる**
- **`false` はヘッダーのないデータや、ヘッダー自体を分析したい特殊なケースで使う**

この使い分けをマスターするだけで、GASによるデータ処理や可視化の自動化がより簡単かつ正確になります。ぜひ活用してください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getDataTable(Boolean)" >}} 

{{< blog-card "https://developers.google.com/chart/interactive/docs/gallery?hl=ja" >}}
