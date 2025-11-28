---
title: "GAS getDataTable()メソッドでスプレッドシートのデータをグラフ化する徹底解説"
description: "Google Apps Script (GAS) の getDataTable() を使って、スプレッドシートのデータを効率的にグラフ化する方法を解説します。基本的な使い方から、データ型の指定、動的なグラフ生成、大規模データ処理の最適化まで網羅。この記事を読めば、データ可視化の自動化が実現できます。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getDataTable", "グラフ作成", "Charts", "データ可視化", "自動化"]
date: "2020-06-13T14:27:36.000Z"
url: "/gas/getdatatable"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

スプレッドシートのデータを手動でグラフにする作業、面倒に感じていませんか？ Google Apps Script (GAS) を使えばその作業を自動化できますが、データをグラフに適した形に整えるのは少し手間がかかります。

そんな課題を解決するのが `getDataTable()` メソッドです。このメソッドを使えば、**スプレッドシートのデータをたった1行でグラフ用のデータ形式に変換**でき、データ可視化のプロセスを劇的に効率化できます。

本記事では、`getDataTable()` の基本的な使い方から、`getValues()` との違い、Google Charts APIと連携した動的なグラフ生成、大規模データを扱う際の注意点まで、実用的なサンプルコードを交えて分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getDataTable()` とは？ `getValues()` との違い

GASでセルの値を取得する際によく使われる `getValues()` は、データを二次元配列（`Object[][]`）として返します。これは汎用性が高い一方、グラフ作成で使うには、データ型を自分で変換したり、ヘッダー行を別に処理したりする必要があります。

一方、`getDataTable()` は、データを `DataTable` という**グラフ作成に特化したオブジェクト形式**で直接取得します。

| メソッド | 返り値の型 | 特徴 |
| :--- | :--- | :--- |
| `getValues()` | `Object[][]` | 二次元配列。汎用性が高いが、グラフ化には加工が必要。 |
| `getDataTable()`| `DataTable` | グラフ用に構造化されたオブジェクト。ヘッダーやデータ型を自動認識。 |

`getDataTable()` を使う最大のメリットは、Google Charts APIとシームレスに連携できる点です。データ加工の手間を省き、コードをシンプルに保てます。

## `getDataTable()` の基本的な使い方

それでは、`getDataTable()` の基本的な使い方を見ていきましょう。

### 構文と基本的なコード

`getDataTable()` は、`Range` オブジェクトから呼び出します。

```js
// "サンプルA" という名前のシートを取得
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("サンプルA");
// E2:F4 の範囲を取得
const range = sheet.getRange("E2:F4");
// 範囲内のデータを DataTable として取得
const dataTable = range.getDataTable();
```

これだけで、指定範囲のデータが `DataTable` オブジェクトに変換されます。

### ヘッダー行を自動で認識させる方法

データ範囲の1行目をヘッダーとして扱いたい場合、引数に `true` を渡します。

```js
// 最初の行をヘッダーとして認識させる
const dataTableWithHeader = range.getDataTable(true);
```

こうすることで、Charts APIが自動的にヘッダー情報を読み取り、グラフの軸ラベルなどに設定してくれるため非常に便利です。

## `DataTable` をカスタマイズする

`getDataTable()` で取得したデータをそのまま使うだけでなく、`Charts.newDataTable()` を使ってデータ構造をより細かく定義することも可能です。

### 列のデータ型を厳密に定義する

`addColumn()` メソッドで、各列のデータ型（例: `DATE`, `NUMBER`, `STRING`）を明示的に指定できます。これにより、データの整合性が高まり、意図通りのグラフ描画が可能になります。

```js
const dataTable = Charts.newDataTable()
    .addColumn(Charts.ColumnType.DATE, '日付')
    .addColumn(Charts.ColumnType.NUMBER, '売上高')
    .addRow([new Date(2023, 0, 15), 150000])
    .addRow([new Date(2023, 0, 16), 180000])
    .build();
```

### `DataTable` のメタ情報を活用する

`DataTable` オブジェクトは、データそのものだけでなく、列数や列ラベルといったメタデータも保持しています。これらを利用することで、データの構造に応じた動的な処理を実装できます。

```js
// DataTable の列数を取得
const numberOfColumns = dataTable.getNumberOfColumns();
// 最初の列（インデックス0）のラベルを取得
const columnLabel = dataTable.getColumnLabel(0);

console.log(`列数: ${numberOfColumns}, 最初の列のラベル: ${columnLabel}`);
```

## Google Charts API と連携してグラフを生成する

`getDataTable()` の真価は、Google Charts API との連携で発揮されます。

### `DataTable` から動的にグラフを作成

取得した `DataTable` を `setDataTable()` メソッドに渡すだけで、棒グラフ、折れ線グラフ、円グラフなど、様々なグラフを簡単に生成できます。

以下は、棒グラフと折れ線グラフを組み合わせたコンボチャートを作成する例です。

```js
const chart = Charts.newComboChart()
    .setDataTable(dataTable)
    .setTitle('売上分析')
    .setSeriesType(Charts.ChartType.COLUMN) // デフォルトを棒グラフに
    .setOption('series', { 1: { type: 'line' } }) // 2番目の系列だけ折れ線グラフに
    .setDimensions(800, 600)
    .build();
```

### グラフのデザインをカスタマイズする

`setOption()` メソッドを使えば、グラフの色、線の太さ、凡例の位置など、デザインを細かく調整できます。

```js
const styledChart = Charts.newAreaChart()
    .setDataTable(dataTable)
    .setOption('series', {
        0: { color: '#FF6D00', lineWidth: 3 }, // 1番目の系列のスタイル
        1: { dataLabel: 'value', annotations: { textStyle: { color: '#2962FF' } } } // 2番目の系列のスタイル
    })
    .build();
```

## 大規模データを扱う際の注意点と最適化

数万行を超える大規模なデータセットに `getDataTable()` を使用すると、メモリ上限や実行時間制限に達する可能性があります。

### メモリ消費を抑えるバッチ処理

対策として、一度に全てのデータを読み込むのではなく、データを小さな塊（バッチ）に分割して処理する方法が有効です。この場合、まず `getValues()` でデータを配列として取得し、`slice()` で分割しながら処理を進めるのが定石です。

```js
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LargeData');
const values = sheet.getDataRange().getValues(); // まずは全データを配列で取得
const totalRows = values.length;
const batchSize = 5000; // 一度に処理する行数

// ヘッダー行(1行目)をスキップしてループ
for (let i = 1; i < totalRows; i += batchSize) {
    const batchValues = values.slice(i, i + batchSize);
    
    // ここでバッチごとに処理を実行する
    // 例: データを加工して別のシートに書き出す、APIに送信するなど
    console.log(`${i}行目から${batchSize}行分のデータを処理しました。`);
}
```
大規模データを直接グラフ化する際は、`getDataTable()` よりも、このように手動でデータを間引いたり集計したりするアプローチが必要になることを覚えておきましょう。

## まとめ

この記事では、GASの `getDataTable()` メソッドについて解説しました。

- **`getDataTable()` はスプレッドシートのデータをグラフ化に適した `DataTable` 形式で取得する**
- **`getValues()` よりもデータ加工の手間が少なく、コードがシンプルになる**
- **引数 `true` でヘッダー行を自動認識できる**
- **Google Charts API との連携がスムーズで、動的なグラフ生成が容易になる**
- **大規模データを扱う際は、バッチ処理などのメモリ最適化が必要**

`getDataTable()` を使いこなせば、面倒なデータ可視化作業を大幅に効率化できます。ぜひ本記事を参考に、あなたの業務自動化に役立ててください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getDataTable()" >}}

{{< blog-card "https://developers.google.com/chart/interactive/docs/reference?hl=ja" >}}
