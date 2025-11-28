---
title: "GASでスプレッドシートにフィルターを自動作成・操作する方法"
description: "Google Apps Script（GAS）のcreateFilter()メソッドを使って、スプレッドシートにフィルターを自動で作成・設定する方法を解説します。基本的な使い方から、動的な範囲設定、複数条件の組み合わせまで、サンプルコード付きで分かりやすく紹介します。"
tags: ["GAS","Google Apps Script","スプレッドシート","createFilter"]
date: "2020-05-25T09:57:22.000Z"
url: "/gas/createfilter"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T15:11:25.000Z"
---

Google Apps Script（GAS）を利用すれば、スプレッドシートのフィルター操作を自動化し、データ管理を大幅に効率化できます。今回は、`createFilter()`メソッドを中心に、基本的なフィルターの作成から、動的な範囲設定、複数条件の組み合わせといった応用テクニックまでを詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 1. フィルターを新規作成する基本

まず、GASを使ってスプレッドシートの特定範囲にフィルターを作成する基本的なコードを紹介します。

```js
function createBasicFilter() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('データシート');
  
  // A1:D100の範囲にフィルターを作成
  const dataRange = sheet.getRange('A1:D100');
  const newFilter = dataRange.createFilter();
}
```

このコードを実行するだけで、指定した`A1:D100`の範囲にフィルターが設定されます。非常にシンプルですが、データ管理の第一歩として重要です。

## 2. 既存のフィルターを安全に削除・再作成する

スクリプトを繰り返し実行する際、フィルターが重複して作成されるのを防ぐため、既存のフィルターを一度削除してから新規作成するのが安全です。

```js
function createFilterSafely() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 範囲内に既存のフィルターがあれば削除
  const existingFilter = range.getFilter();
  if (existingFilter) {
    existingFilter.remove();
  }
  
  // 新しいフィルターを作成
  const newFilter = range.createFilter();
}
```

この処理を組み込むことで、エラーを防ぎ、常に新しい状態のフィルターを適用できます。

## 3. データ範囲を動的に取得してフィルターを設定する

データの行数が変動する場合、範囲を固定で指定すると新しいデータにフィルターが適用されない可能性があります。`getDataRange()`を使えば、現在のデータが存在する範囲全体を自動で取得できます。

```js
function createFilterForDynamicRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // データが存在する範囲全体を自動で取得
  const dataRange = sheet.getDataRange();
  dataRange.createFilter();
}
```

これにより、データの増減に柔軟に対応できる、より実用的なスクリプトになります。

## 4. 特定の列にフィルター条件を設定する

`setColumnFilterCriteria()`メソッドを使用すると、特定の列に対して表示・非表示の条件を指定できます。

```js
function setColumnFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter();
  
  // 非表示にする値を指定するフィルター条件を作成
  const criteria = SpreadsheetApp.newFilterCriteria()
    .setHiddenValues(['対応完了', '保留'])
    .build();
  
  // 2列目（B列）にフィルター条件を適用
  filter.setColumnFilterCriteria(2, criteria);
}
```

この例では、2列目の値が「対応完了」または「保留」の行を非表示にしています。

## 5. 複数列にまたがる複雑なフィルター条件を設定する

複数の列に対して、それぞれ異なるフィルター条件を組み合わせることも可能です。

```js
function setMultiColumnFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter();
  
  // 条件1: 売上高が1000未満
  const salesCriteria = SpreadsheetApp.newFilterCriteria()
    .whenNumberLessThan(1000)
    .build();
  
  // 条件2: 地域が「関東」
  const regionCriteria = SpreadsheetApp.newFilterCriteria()
    .setVisibleValues(['関東'])
    .build();
  
  // 各列にフィルターを適用
  filter.setColumnFilterCriteria(3, salesCriteria); // 3列目（売上高）
  filter.setColumnFilterCriteria(4, regionCriteria); // 4列目（地域）
}
```

これにより、「売上高が1000未満」かつ「地域が関東」という複合条件でのデータ抽出が自動化できます。

## 6. 【応用】フィルターの変更履歴を記録する

誰がいつ、どのようなフィルターをかけたのかを記録しておくと、データ管理の透明性が向上します。

```js
function logFilterChanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const filter = sheet.getFilter();
  
  const logSheet = ss.getSheetByName('フィルター操作ログ') || ss.insertSheet('フィルター操作ログ');
  const logData = [
    new Date(), // タイムスタンプ
    sheet.getName(), // 対象シート名
    JSON.stringify(filter.getColumnFilterCriteria(2)) // 2列目のフィルター条件
  ];
  
  logSheet.appendRow(logData);
}
```

この関数を実行することで、フィルターの変更履歴を別のシートに記録できます。

## まとめ

GASの`createFilter()`関連のメソッドを使いこなすことで、スプレッドシートのデータ管理を大幅に自動化・効率化できます。

*   **基本的なフィルター作成**: `createFilter()`で簡単に実現。
*   **安全なフィルター操作**: 既存フィルターの削除を組み合わせる。
*   **動的な範囲設定**: `getDataRange()`でデータの増減に対応。
*   **詳細な条件設定**: `setColumnFilterCriteria()`で特定の列を絞り込み。
*   **複合条件の適用**: 複数列のフィルターを組み合わせる。

これらの機能を活用し、日々の定型業務を効率化させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://qiita.com/dadadaiiiiiii/items/4185d0a6e2c3a55b14af" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/filter" >}} 
  
{{< blog-card "https://note.com/kawamura_/n/nc252a869c79e" >}}
