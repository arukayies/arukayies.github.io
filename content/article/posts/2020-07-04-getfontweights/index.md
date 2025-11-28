---
title: "【GAS高速化】getFontWeights()で太字を一括取得！API呼び出しを激減させる方法"
description: "GASのループでセルの太字設定を一つずつチェックし、スクリプトが遅くなっていませんか？getFontWeights()なら、たった1回のAPI呼び出しで範囲全体の太字情報を二次元配列として一括取得できます。パフォーマンスを劇的に改善する実践テクニックを紹介。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontWeights", "高速化", "パフォーマンス", "一括取得", "二次元配列", "API", "太字", "bold"]
date: "2020-07-04T12:38:21.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontweights"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS)で、スプレッドシートの大量のセルの中から「太字（bold）のセル」を探す処理を書いたとき、実行に時間がかかりすぎて困った経験はありませんか？その原因は、十中八九、ループの中で`getFontWeight()`（単数形）を呼び出していることにあります。

この記事では、パフォーマンスを劇的に改善するための必須メソッド**`getFontWeights()`**に焦点を当て、その効果的な使い方と、取得した書式情報を他のデータと組み合わせて活用する、より高度なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ`getFontWeights()`がパフォーマンスの鍵なのか？

`getFontWeight()`をループ内でセルごとに呼び出すと、セルの数だけAPI呼び出し（ネットワーク通信）が発生し、処理に膨大な時間がかかります。

`getFontWeights()`は、このAPI呼び出しを**たった1回**に集約します。指定した範囲の全セルのフォントウェイト情報を一度に取得し、高速に処理できる**二次元配列 (`String[][]`)** として返すことで、スクリプトの実行時間を劇的に短縮するのです。

## `getFontWeights()`の使い方と二次元配列の活用

`getFontWeights()`は、指定した範囲のフォントウェイト（`'bold'`または`'normal'`）を二次元配列で返します。

```javascript
function fetchAllFontWeights() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:C3");
  
  // API呼び出しはここでの1回だけ
  const weights = range.getFontWeights();
  
  // 戻り値は二次元配列
  // 例: [["bold", "normal", "normal"], ["normal", "bold", "normal"], ["bold", "bold", "normal"]]
  
  // 二次元配列を効率的に処理
  weights.forEach((row, rowIndex) => {
    row.forEach((weight, colIndex) => {
      if(weight === 'bold') {
        const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
        console.log(`セル ${cellAddress} は太字です。`);
      }
    });
  });
}
```

## 実践！書式と値を組み合わせた高度なデータ処理

`getFontWeights()`の真価は、`getValues()`など他のメソッドと組み合わせることで発揮されます。

### シナリオ1：太字のセルだけを効率的にハイライトする

シート内のすべての太字セルをハイライトします。`map`メソッドと`setBackgrounds`を組み合わせ、**変更のないセルは`null`を指定する**ことで、既存の背景色を保持するのがポイントです。

```javascript
function highlightBoldCellsEfficiently() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const weights = range.getFontWeights();
  
  // 各セルの状態に応じて背景色を決定する二次元配列を生成
  const backgrounds = weights.map(row => 
    row.map(cellWeight => (cellWeight === 'bold' ? '#fff2cc' : null)) // 'bold'なら薄い黄色、それ以外は変更なし(null)
  );
  
  // 決定した背景色を一度に適用
  range.setBackgrounds(backgrounds);
}
```

### シナリオ2：太字の行だけを抽出し、別シートに転記する

`getFontWeights()`で取得した書式情報を**フィルター条件**として利用し、`getValues()`で取得したセルの値と組み合わせて、データ抽出を行います。

```javascript
function extractBoldRowsToNewSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 値とフォントウェイトをそれぞれ一括取得
  const values = range.getValues();
  const weights = range.getFontWeights();
  
  // A列が太字の行だけを抽出
  const boldRows = values.filter((row, index) => {
    // A列（weightsの各行の0番目の要素）が 'bold' かどうかを判定
    return weights[index][0] === 'bold';
  });
  
  if (boldRows.length > 0) {
    // 新しいシートを作成して、抽出したデータを一括書き込み
    const newSheet = SpreadsheetApp.getActive().insertSheet('太字の行リスト');
    newSheet.getRange(1, 1, boldRows.length, boldRows[0].length).setValues(boldRows);
    SpreadsheetApp.getUi().alert(`${boldRows.length}件の太字の行を抽出しました。`);
  } else {
    SpreadsheetApp.getUi().alert('太字の行は見つかりませんでした。');
  }
}
```
このコードは、読み込み（`getValues`, `getFontWeights`）と書き込み（`setValues`）をすべて一括で行い、さらに`filter`メソッドで効率的にデータを処理する、GASのベストプラクティスを凝縮した例です。

## まとめ

`getFontWeights()`は、複数セルの太字情報を扱う上で欠かせない、パフォーマンス最適化の要です。

-   **ループでAPIを叩かない**: 常に`getFontWeights()`で一括取得する。
-   **書式と値を組み合わせる**: `getValues()`など他のメソッドと組み合わせ、高度なデータ処理を実現する。
-   **書き込みも一括で**: `setBackgrounds()`や`setValues()`を使い、読み書き両方のパフォーマンスを最適化する。

この「一括処理」の原則をマスターし、書式情報を単なる「見た目」ではなく「データ」として活用することで、GASによる自動化の可能性はさらに広がります。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontweights" >}}
