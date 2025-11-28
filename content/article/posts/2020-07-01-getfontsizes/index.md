---
title: "【GAS高速化】getFontSizes()でフォントサイズを一括取得！API呼び出しを激減させる方法"
description: "GASのループ処理でセルのフォントサイズを一つずつ取得し、スクリプトが遅くなっていませんか？getFontSizes()なら、たった1回のAPI呼び出しで範囲全体のフォントサイズを二次元配列として一括取得できます。パフォーマンスを劇的に改善する実践テクニックを紹介。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getFontSizes", "高速化", "パフォーマンス", "一括取得", "二次元配列", "API"]
date: "2020-06-30T15:14:42.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfontsizes"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年7月"]
---

Google Apps Script (GAS)で大量のセルの書式を扱う際、スクリプトの実行速度が遅いと感じたことはありませんか？その原因は、十中八九**ループ処理の中でのAPIの連続呼び出し**です。

セルのフォントサイズを取得する際、`getFontSize()`をループで回すのは最も避けるべき実装パターンです。

この記事では、パフォーマンスを劇的に改善するための必須メソッド**`getFontSizes()`**に焦点を当て、その効果的な使い方と、取得した二次元配列データを活用する実践的なテクニックを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## なぜ`getFontSizes()`がパフォーマンスの鍵なのか？

`getFontSize()`（単数形）をループ内で呼び出すと、セルの数だけAPI呼び出し（ネットワーク通信）が発生し、処理に膨大な時間がかかります。

`getFontSizes()`は、このAPI呼び出しを**たった1回**に集約します。指定した範囲の全セルのフォントサイズを一度に取得し、高速に処理できる**二次元配列 (`Number[][]`)** として返すことで、スクリプトの実行時間を劇的に短縮するのです。

## `getFontSizes()`の使い方と二次元配列の扱い方

`getFontSizes()`の基本的な使い方はシンプルです。

```javascript
function fetchAllFontSizes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:C3");
  
  // API呼び出しはここでの1回だけ
  const fontSizes = range.getFontSizes();
  
  // 戻り値は二次元配列
  // 例: [[10, 12, 10], [10, 14, 10], [18, 10, 10]]
  
  // 二次元配列を効率的に処理
  fontSizes.forEach((row, rowIndex) => {
    row.forEach((size, colIndex) => {
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      console.log(`セル ${cellAddress} のフォントサイズ: ${size}pt`);
    });
  });
}
```
取得した二次元配列は、`forEach`や`map`といった配列メソッドを駆使することで、様々な形に加工できます。

## 実践！`getFontSizes()`活用シナリオ

### シナリオ1：シート内のフォントサイズ分布を分析する

シート内で使用されているフォントサイズを種類別に集計し、簡易的なレポートを作成します。

```javascript
function analyzeFontSizeDistribution() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // flat()で二次元配列を一次元配列に変換
  const sizes = sheet.getDataRange().getFontSizes().flat(); 
  const sizeStats = {};

  // フォントサイズごとの使用回数を集計
  sizes.forEach(size => {
    sizeStats[size] = (sizeStats[size] || 0) + 1;
  });

  // 新しいシートを作成してレポートを出力
  const reportSheet = SpreadsheetApp.getActive().insertSheet('FontSizeReport');
  reportSheet.appendRow(['フォントサイズ (pt)', '使用セル数']);
  
  // サイズ順にソートして出力
  const sortedData = Object.entries(sizeStats).sort((a, b) => Number(a[0]) - Number(b[0]));
  
  if (sortedData.length > 0) {
    reportSheet.getRange(2, 1, sortedData.length, 2).setValues(sortedData);
  }
}
```

### シナリオ2：書式情報を一括でバックアップ・復元する

シートの書式を大胆に変更する前に、現在のフォントサイズ情報を別のシートにバックアップし、後から復元できるようにします。

**ポイントは、読み込み(`getFontSizes`)だけでなく、書き込み(`setFontSizes`)も一括で行うことです。**

```javascript
const BACKUP_SHEET_NAME = '書式バックアップ';

// 現在のフォントサイズを別シートにバックアップ
function backupFontFormats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const fontSizes = range.getFontSizes();
  
  let backupSheet = SpreadsheetApp.getActive().getSheetByName(BACKUP_SHEET_NAME);
  if (backupSheet) {
    backupSheet.clear();
  } else {
    backupSheet = SpreadsheetApp.getActive().insertSheet(BACKUP_SHEET_NAME);
  }
  
  // バックアップシートにフォントサイズ情報を一括書き込み
  backupSheet.getRange(1, 1, fontSizes.length, fontSizes[0].length).setValues(fontSizes);
}

// バックアップからフォントサイズを復元
function restoreFontFormats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const backupSheet = SpreadsheetApp.getActive().getSheetByName(BACKUP_SHEET_NAME);
  if (!backupSheet) {
    SpreadsheetApp.getUi().alert('バックアップシートが見つかりません。');
    return;
  }
  
  const backupRange = backupSheet.getDataRange();
  const fontSizes = backupRange.getValues(); // バックアップシートから値を取得
  
  // 元のシートにフォントサイズを一括適用
  sheet.getRange(1, 1, fontSizes.length, fontSizes[0].length).setFontSizes(fontSizes);
}
```

## まとめ：GAS高速化の鍵は常に「一括処理」

`getFontSizes()`は、スプレッドシートのフォントサイズ情報を扱うスクリプトのパフォーマンスを向上させるための**必須メソッド**です。

-   **ループでAPIを叩かない**: `getFontSize()`のループは避け、常に一括取得を心がける。
-   **データは配列で操作**: 取得した二次元配列を効率的に処理する。
-   **書き込みも一括で**: `setFontSizes()`のようなメソッドを使い、読み書き両方でパフォーマンスを最適化する。

この「一括処理」の原則をマスターすることが、高速で安定したGASを開発するための最も重要なスキルと言えるでしょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja#getfontsizes" >}}
