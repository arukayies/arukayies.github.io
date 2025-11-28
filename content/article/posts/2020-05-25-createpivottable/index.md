---
title: "GASでピボットテーブルを自動作成する方法"
description: "Google Apps Script（GAS）のcreatePivotTableメソッドを利用して、スプレッドシートにピボットテーブルを自動作成する方法を解説します。基本的な使い方から、行・列のグループ化、集計、フィルタリングといったカスタマイズ方法まで、サンプルコード付きで分かりやすく紹介します。"
tags: ["GAS","Google Apps Script","スプレッドシート","createPivotTable"]
date: "2020-05-25T12:53:12.000Z"
url: "/gas/createpivottable"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T15:08:35.000Z"
---

Google Apps Script（GAS）を使えば、スプレッドシートのデータ集計作業を大幅に効率化できます。特に、大量のデータを分析する際に強力なツールとなるのがピボットテーブルです。今回は`createPivotTable(sourceData)`メソッドを使って、ピボットテーブルの作成を自動化する方法を詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 1. createPivotTable(sourceData) とは？

`createPivotTable(sourceData)`は、GASでスプレッドシートにピボットテーブルをプログラム的に作成するためのメソッドです。このメソッドを利用することで、売上データの集計やカテゴリ別の分析などを自動化できます。

### 基本的な使い方

ピボットテーブルを作成する基本的なコードは以下の通りです。

```js
// データが入力されているシートと、ピボットテーブルを作成するシートを取得
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const dataSheet = spreadsheet.getSheetByName('データシート');
const pivotSheet = spreadsheet.getSheetByName('ピボットテーブル');

// データ範囲を取得して、ピボットテーブルを作成
const sourceData = dataSheet.getDataRange();
const pivotTable = pivotSheet.getRange('A1').createPivotTable(sourceData);
```

このコードでは、「データシート」の全データを基に、「ピボットテーブル」シートのA1セルからピボットテーブルを作成しています。`getDataRange()`を使用することで、データが増減しても自動的に範囲を調整してくれるため便利です。

## 2. ピボットテーブルをカスタマイズする

ピボットテーブルは、ただ作成するだけでなく、集計項目や表示形式をカスタマイズすることで、より実践的なデータ分析が可能になります。

### 行と列のグループ化

`addRowGroup()`と`addColumnGroup()`メソッドを使い、データを整理するための行と列を設定します。

```js
// 2列目を行グループに設定
pivotTable.addRowGroup(2);

// 3列目を列グループに設定
pivotTable.addColumnGroup(3);
```

これにより、2列目のデータを基準に行が、3列目のデータを基準に列がそれぞれグループ化されます。

### 集計値を設定する

ピボットテーブルの「値」フィールドに相当する設定です。合計や平均など、様々な集計方法が利用できます。

```js
// 4列目のデータを合計（SUM）で集計
const salesValue = pivotTable.addPivotValue(4, SpreadsheetApp.PivotTableSummarizeFunction.SUM);

// 値フィールドの表示名を「売上総額」に変更
salesValue.setDisplayName('売上総額');
```

このコードでは、4列目のデータを合計し、その表示名を「売上総額」としています。

## 3. フィルターで表示データを絞り込む

大量のデータの中から特定の条件に合致するものだけを表示させたい場合は、フィルター機能が役立ちます。`addFilter()`メソッドと`FilterCriteria`ビルダーを組み合わせて使用します。

```js
// フィルター条件を作成
const criteria = SpreadsheetApp.newFilterCriteria()
  .setVisibleValues(['東京支店', '大阪支店'])
  .build();

// 2列目に対してフィルターを適用
pivotTable.addFilter(2, criteria);
```

この例では、2列目のデータが「東京支店」または「大阪支店」である行のみを表示するようにフィルタリングしています。

## 4. 実践で役立つテクニック

### 1. 列幅を自動調整する

GASで作成したピボットテーブルは、デフォルトでは列幅が調整されません。以下のコードで見やすく整形しましょう。

```js
pivotSheet.autoResizeColumns(1, pivotSheet.getLastColumn());
```

### 2. データ更新時にピボットテーブルを再計算する

元データが更新された際に、その内容をピボットテーブルに反映させるには、リフレッシュ処理が必要です。

```js
function refreshPivotTable() {
  const pivotSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ピボットテーブル');
  const pivotTable = pivotSheet.getPivotTables()[0];
  
  // ピボットテーブルを更新
  pivotTable.refresh();
}
```

この関数をトリガーで定期的に実行するように設定すれば、常に最新のデータに基づいた分析が可能になります。

## まとめ

GASの`createPivotTable(sourceData)`メソッドを活用することで、手作業で行っていたデータ集計や分析を自動化し、業務効率を劇的に向上させることができます。

*   **ピボットテーブル作成の基本**
*   **行・列のグループ化**
*   **集計方法の指定**
*   **フィルターによるデータ絞り込み**

これらのテクニックをマスターし、日々のデータ分析業務にぜひ役立ててください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://qiita.com/goriland/items/fc5dc78b62aa8d769e46" >}} 
  
{{< blog-card "https://kumaroot.readthedocs.io/ja/latest/gas/gas-spreadsheet-pivottable.html" >}}
