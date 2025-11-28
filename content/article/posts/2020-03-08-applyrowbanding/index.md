---
title: "GASでスプレッドシートの行に交互の背景色を簡単設定する方法"
description: "Google Apps Script（GAS）のapplyRowBanding()メソッドを使い、スプレッドシートの行に交互の背景色を簡単かつ動的に設定する方法を解説。テーマの適用からカスタマイズ、パフォーマンス最適化まで、データを見やすくするための実践的テクニックを紹介します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "applyRowBanding", "背景色"]
date: "2020-03-08T14:01:55.000Z"
url: "/gas/applyrowbanding"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-27T09:34:09.000Z"
---

Google Apps Script（GAS）を使用すれば、スプレッドシートの見た目をプログラムで簡単に整えることができます。特に、`applyRowBanding()`メソッドを活用すると、行ごとに交互の背景色を適用でき、データの可読性を大幅に向上させることが可能です。

この記事では、`applyRowBanding()`の基本的な使い方から、テーマのカスタマイズ、動的な範囲設定、パフォーマンスを考慮した最適化テクニックまで、幅広く解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `applyRowBanding()`メソッドの基本的な使い方

`applyRowBanding()`は、`Range`クラスに属するメソッドで、指定したセル範囲の行に対して交互に背景色を設定します。この機能は、一般的に「交互の背景色」や「ストライプテーブル」として知られています。

### デフォルト設定で適用する

最もシンプルな使い方は、引数を指定せずにメソッドを呼び出すことです。

```js
function applyDefaultBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  range.applyRowBanding();
}
```

この場合、デフォルトのテーマである`SpreadsheetApp.BandingTheme.LIGHT_GREY`（薄いグレー）が適用され、シンプルで視認性の高いテーブルが作成されます。

### カラーテーマを指定して適用する

スプレッドシートの用途やデザインに合わせて、事前に用意されたカラーテーマを指定することもできます。

```js
function applyThemeBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  // INDIGOテーマを適用
  range.applyRowBanding(SpreadsheetApp.BandingTheme.INDIGO);
}
```

GASには12種類以上のテーマ（`BLUE`, `GREEN`, `ORANGE`など）が用意されており、簡単にシートの印象を変えることができます。

### ヘッダーとフッターの色を個別に設定する

`applyRowBanding()`メソッドの第2、第3引数を使用することで、範囲内の先頭行（ヘッダー）と最終行（フッター）に特別な背景色を適用するかどうかを制御できます。

```js
function applyHeaderFooterBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  // GREENテーマを適用し、ヘッダーは有効(true)、フッターは無効(false)にする
  range.applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
}
```

これにより、テーブルのヘッダーを視覚的に強調するなどのカスタマイズが可能です。

## `applyRowBanding()`の技術的な詳細

このメソッドで適用される配色は、以下の4つの要素で構成されています。

-   ヘッダー行の色
-   フッター行の色
-   1番目の交互色（奇数行など）
-   2番目の交互色（偶数行など）

例えば`BandingTheme.BLUE`テーマでは、ヘッダーに淡い青（`#c9daf8`）、交互色に白（`#ffffff`）とさらに薄い青（`#eaf1fb`）が設定されており、視覚的な区別がつきやすいデザインとなっています。

### データ量に応じて範囲を動的に設定する

データが頻繁に追加・削除されるシートでは、範囲を動的に取得するのがベストプラクティスです。`getLastRow()`や`getLastColumn()`を使い、常にデータが存在する範囲全体に背景色を適用できます。

```js
function applyDynamicBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  
  if (lastRow > 0 && lastColumn > 0) {
    const range = sheet.getRange(1, 1, lastRow, lastColumn);
    range.applyRowBanding(SpreadsheetApp.BandingTheme.CYAN, true, true);
  }
}
```

## `applyRowBanding()`の応用事例

### 1. セクションごとに異なるテーマを適用する

1つのシート内でデータのセクションを分けたい場合、範囲を区切ってそれぞれに異なるテーマを適用すると効果的です。

```js
function applyMultiThemeSections() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  sheet.getRange('A1:D10').applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  sheet.getRange('A11:D20').applyRowBanding(SpreadsheetApp.BandingTheme.GREEN);
  sheet.getRange('A21:D30').applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE);
}
```

### 2. 特定の条件に基づいて背景色を適用する

特定の条件を満たす行にのみ背景色を適用することも可能です。ただし、`applyRowBanding`は範囲全体に作用するため、条件付きで「行」の色を変えるには`setBackground()`を組み合わせるのが一般的です。もし特定の行グループにテーマを適用したい場合は、以下のように実装できます。

```js
function applyConditionalBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  values.forEach((row, index) => {
    // A列の値が「重要」である行にREDテーマを適用
    if (row[0] === '重要') {
      sheet.getRange(index + 1, 1, 1, sheet.getLastColumn())
           .applyRowBanding(SpreadsheetApp.BandingTheme.RED);
    }
  });
}
```

## パフォーマンス最適化のテクニック

### バッチ処理による高速化

複数の範囲に設定を適用する場合、ループ処理で1つずつ実行するよりも、設定情報を配列にまとめて処理する方が効率的です。

```js
function applyBandingInBatch() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const bandingConfigs = [
    { range: 'A1:D10', theme: SpreadsheetApp.BandingTheme.BLUE },
    { range: 'A11:D20', theme: SpreadsheetApp.BandingTheme.GREEN },
    { range: 'A21:D30', theme: SpreadsheetApp.BandingTheme.ORANGE }
  ];

  bandingConfigs.forEach(config => {
    sheet.getRange(config.range).applyRowBanding(config.theme);
  });
  // 変更を即時反映
  SpreadsheetApp.flush();
}
```

### キャッシュの活用

設定を頻繁に変更しない場合は、`CacheService`を利用してAPI呼び出しの回数を減らし、処理速度を向上させることができます。

## まとめ

`applyRowBanding()`メソッドは、スプレッドシートのデータを視覚的に整理し、可読性を高めるためのシンプルかつ強力なツールです。

基本的な使い方から、テーマのカスタマイズ、動的な範囲設定といった応用テクニックまで使いこなすことで、GASによる業務効率化をさらに推進できるでしょう。本記事で紹介した内容を参考に、ぜひご自身のプロジェクトで活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
