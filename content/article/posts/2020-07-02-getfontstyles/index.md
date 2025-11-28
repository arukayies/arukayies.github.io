---
title: "【GAS高速化】getFontStyles()でフォントスタイルを一括取得！API呼び出しを激減させる方法"
description: "GASのループでセルのフォントスタイルを一つずつチェックし、処理が遅くなっていませんか？getFontStyles()なら、たった1回のAPI呼び出しで範囲全体のスタイル情報を二次元配列として一括取得できます。パフォーマンスを劇的に改善する実践テクニックを紹介。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontStyles", "高速化", "パフォーマンス", "一括取得", "二次元配列", "API", "イタリック"]
date: "2020-07-02T13:11:40.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontstyles"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS) で、スプレッドシート内の大量のセルのフォントスタイル（イタリック体など）をチェックする際に、スクリプトの実行が遅いと感じたことはありませんか？その原因は、ほぼ間違いなく**APIの呼び出し回数**にあります。

`getFontStyle()`（単数形）をループ処理で使うのは、パフォーマンスを著しく低下させるアンチパターンです。

この記事では、スクリプトを劇的に高速化するための必須メソッド**`getFontStyles()`**に焦点を当て、その効果的な使い方と、取得した二次元配列を活用する実践的なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ`getFontStyles()`による一括取得が重要なのか？

`getFontStyle()`をループ内でセルごとに呼び出すと、セルの数だけネットワーク通信が発生し、実行時間が肥大化します。

`getFontStyles()`は、このAPI呼び出しを**たった1回**に集約します。指定範囲の全セルのフォントスタイル情報を一度に取得し、高速に処理できる**二次元配列 (`String[][]`)** として返すことで、パフォーマンスを劇的に改善するのです。

```javascript
// 【非推奨】APIを何度も呼び出す遅いコード
function slowStyleCheck(range) {
  for (let i = 1; i <= range.getNumRows(); i++) {
    for (let j = 1; j <= range.getNumColumns(); j++) {
      const style = range.getCell(i, j).getFontStyle();
      // ...処理...
    }
  }
}

// 【推奨】API呼び出しは1回のみ！高速なコード
function fastStyleCheck(range) {
  const styles = range.getFontStyles(); // API呼び出しはここだけ
  styles.forEach(row => {
    row.forEach(style => {
      // ...取得した配列を処理...
    });
  });
}
```

## `getFontStyles()`の使い方と戻り値

`getFontStyles()`は、指定した範囲のフォントスタイルを二次元配列で返します。

戻り値の各要素に含まれる文字列は以下の通りです。

-   **`'italic'`**: イタリック体
-   **`'normal'`**: 標準スタイル

### 二次元配列のループ処理

取得した二次元配列は、`forEach`を使って簡単に処理できます。

```javascript
function logAllFontStyles() {
  const range = SpreadsheetApp.getActiveSheet().getRange("A1:B3");
  const styles = range.getFontStyles();
  
  styles.forEach((row, rowIndex) => {
    row.forEach((style, colIndex) => {
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      console.log(`セル ${cellAddress} のスタイル: ${style}`);
    });
  });
}
```

## 実践！`getFontStyles()`活用シナリオ

### シナリオ1：フォントスタイルの統計レポートを作成する

シート内で`italic`がどのくらいの割合で使われているかを集計し、レポートを出力します。

```javascript
function generateStyleReport() {
  const range = SpreadsheetApp.getActiveSheet().getDataRange();
  const styles = range.getFontStyles();
  let italicCount = 0;
  const totalCells = range.getNumRows() * range.getNumColumns();

  // flat()で二次元配列を一次元化し、効率的に集計
  styles.flat().forEach(style => {
    if (style === 'italic') {
      italicCount++;
    }
  });

  const italicPercentage = (italicCount / totalCells * 100).toFixed(1);
  const message = `調査範囲: ${range.getA1Notation()}\n` +
                  `総セル数: ${totalCells}\n` +
                  `イタリックセルの数: ${italicCount}\n` +
                  `イタリックセルの割合: ${italicPercentage}%`;
  
  SpreadsheetApp.getUi().alert(message);
}
```

### シナリオ2：不要なイタリック体を一括で標準スタイルに戻す

シート内のすべてのイタリック体を`normal`スタイルに一括で修正します。**読み込みと書き込みの両方を一括処理する**ことが、最高のパフォーマンスを引き出す鍵です。

```javascript
function normalizeAllItalicStyles() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  
  // 変更対象のスタイル情報を一括で読み込む
  const styles = range.getFontStyles();
  
  let isChanged = false;

  // メモリ上の配列データを書き換える（ここでの処理は高速）
  const newStyles = styles.map(row => {
    return row.map(style => {
      if (style === 'italic') {
        isChanged = true;
        return 'normal'; // イタリックをnormalに置換
      }
      return style;
    });
  });
  
  // 変更があった場合のみ、シートに一括で書き込む
  if (isChanged) {
    range.setFontStyles(newStyles);
    SpreadsheetApp.getUi().alert('イタリック体を標準スタイルに修正しました。');
  } else {
    SpreadsheetApp.getUi().alert('イタリック体のセルは見つかりませんでした。');
  }
}
```
このコードは、`setFontStyles()`を使うことで、変更後のスタイル情報を一度のAPI呼び出しでシートに適用しており、非常に効率的です。

## まとめ

`getFontStyles()`は、複数セルのフォントスタイルを扱う上で欠かせない、パフォーマンス最適化の要です。

-   **ループで`getFontStyle()`を叩かない**: 常に`getFontStyles()`で一括取得する。
-   **データは配列で操作**: 取得した二次元配列を`map`や`forEach`で効率的に処理する。
-   **書き込みも一括で**: `setFontStyles()`を使い、読み書き両方のパフォーマンスを最適化する。

この「一括処理」の原則は、GAS開発における最も重要なベストプラクティスの一つです。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontstyles" >}}
