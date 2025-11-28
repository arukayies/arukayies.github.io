---
title: "【GAS】スプレッドシートの結合セルを自在に操作！getMergedRanges()徹底解説"
description: "Google Apps Script (GAS) の`getMergedRanges()`メソッドで、スプレッドシートの結合セルを効率的に取得・管理する方法を徹底解説。結合セルの基本から、動的なレポート生成、テンプレート構造の検証、解除まで、GASによるスプレッドシート操作の柔軟性を高める実践的テクニックを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getMergedRanges", "結合セル", "セル結合", "自動化", "レポート生成", "テンプレート検証"]
date: "2020-07-17T16:03:20.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getmergedranges"
share: true
toc: true
categories: "gas"
archives: ["2020年7月"]
---

Google Apps Script (GAS) を使ってスプレッドシートを自動化する際、結合されたセル（結合セル）の存在は、通常のセル操作とは異なる考慮を必要とします。`getMergedRanges()` メソッドは、この結合セルを効率的に特定・管理し、複雑なシート構造をプログラムで自在に扱うための強力な機能です。

本記事では、GASの`getMergedRanges()`の基本的な使い方から、結合セルの構造を理解する方法、動的なレポート生成、テンプレートの検証、さらには結合の解除（`unmerge()`）といった実践的な応用例まで、具体的なコードを交えて徹底解説します。結合セルにまつわる課題を克服し、GASによるスプレッドシート自動化の可能性を広げましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## 結合セルとは？

スプレッドシートにおける「結合セル」とは、複数のセルを一つに統合したものです。見出しの視覚的な整理、複雑な表レイアウトの作成、データのグループ化などに利用されます。Google Apps Scriptでは、`merge()`、`mergeAcross()`、`mergeVertically()`といったメソッドでセルを結合・作成でき、`getMergedRanges()`メソッドでこれらの結合セル情報を取得します。

## getMergedRanges()メソッドの概要

`getMergedRanges()`は、指定した`Range`オブジェクト内に存在するすべての結合セルを、一つ以上の`Range`オブジェクトの配列として返すメソッドです。このメソッドを使うことで、特定の範囲（例: A1:F10）に含まれる結合セルの位置、値、書式などをプログラムから簡単にリストアップし、操作できます。

### 基本的な使い方

```js
function getSampleMergedRanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('サンプルシート');
  const targetRange = sheet.getRange('A1:F10');
  const mergedAreas = targetRange.getMergedRanges();
  
  mergedAreas.forEach((range, index) => {
    console.log(`結合領域 ${index + 1}: ${range.getA1Notation()}`);
    console.log(`保持値: ${range.getDisplayValue()}`);
  });
}
```

このコードは、`A1:F10`の範囲内にある結合領域を検出し、それぞれの位置（A1形式）と表示されている値をコンソールに出力します。これにより、結合セルの状態をプログラムから簡単に確認できます。

### 実践的な活用例

#### 動的なレポート生成

月次レポートなどでヘッダー部分が結合されている場合、その結合セルを自動で抽出し、データ処理に活用できます。

```js
function extractReportHeaders() {
  const reportSheet = SpreadsheetApp.getActive().getSheetByName('月次レポート');
  const headerRange = reportSheet.getRange('A1:Z5');
  const mergedHeaders = headerRange.getMergedRanges();
  
  const headerData = mergedHeaders.map(range => ({
    title: range.getDisplayValue(),
    position: range.getA1Notation(),
    columnSpan: range.getNumColumns()
  }));
  
  // ヘッダー構造に基づいてデータ処理を実行
  processReportData(headerData);
}
```
このように、結合セルのタイトルや位置、列幅を取得し、その情報を基に後続の処理を動的に構築することが可能です。

#### 結合セルの構造を検証

テンプレートとして使用するスプレッドシートの結合構造が、意図した通りに設定されているかを確認することもできます。

```js
function validateMergedStructure() {
  const templateSheet = SpreadsheetApp.openById('テンプレートID').getSheetByName('フォーマット');
  const requiredMerges = [
    { address: 'B2:D2', expectedValue: '部門別集計' },
    { address: 'F3:H5', expectedValue: '四半期比較' }
  ];

  requiredMerges.forEach(({ address, expectedValue }) => {
    const range = templateSheet.getRange(address);
    const mergedRanges = range.getMergedRanges();
    
    // getMergedRanges()は範囲内の結合セルを返すため、対象のRangeが結合されているか確認
    const isMerged = mergedRanges.some(mergedRange => mergedRange.getA1Notation() === address);

    if (!isMerged) {
      throw new Error(`テンプレート構造が不正です: ${address} は結合されていません。`);
    }
    
    if (range.getDisplayValue() !== expectedValue) {
      throw new Error(`テンプレート構造が不正です: ${address} の値が異なります。`);
    }
  });
}
```
このスクリプトにより、テンプレートの結合構造と内容の整合性を事前に検証し、エラーを防ぐことができます。

## 注意点とベストプラクティス

`getMergedRanges()`を使用する際には、いくつかの注意点があります。

### 取得順序

このメソッドが返す結合セルの配列の順序は、スプレッドシート上の視覚的な順序と必ずしも一致しません。特定の順序で処理する必要がある場合は、取得後にソート処理を追加することをお勧めします。

```js
const mergedRanges = range.getMergedRanges()
  .sort((a, b) => a.getRow() - b.getRow() || a.getColumn() - b.getColumn());
```

### 処理の最適化

大量のセルが含まれるシートで処理を行う場合、`getDataRange()`と組み合わせてシート全体の結合セルを一括で取得することで、処理の効率を高めることができます。

```js
function processAllMergedCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const allMerged = sheet.getDataRange().getMergedRanges();
  // 大量の結合セルを効率的に処理するためのロジックを実装
}
```

## まとめ

`getMergedRanges()`は、Google Apps Scriptで結合セルを扱う上で非常に強力なメソッドです。このメソッドを使いこなすことで、レポート作成の自動化やデータ分析の精度向上など、スプレッドシート操作の可能性が大きく広がります。ぜひ、実際の業務で活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://caymezon.com/gas-merge/" >}}

{{< blog-card "https://auto-worker.com/blog/?p=1986" >}}

{{< blog-card "https://techuplife.tech/gas-ss-rmerge/" >}}

{{< blog-card "https://teratail.com/questions/l1s3uj20zw048c" >}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
