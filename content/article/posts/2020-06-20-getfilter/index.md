---
title: "GASでフィルターを自動操作！getFilter()でデータ絞り込みを効率化する方法"
description: "毎日の面倒なフィルター操作をGASで自動化しませんか？getFilter()メソッドを使い、スプレッドシートのフィルター設定の確認、更新、動的な条件設定を行う方法を解説。日次レポート作成などを効率化する実践的コードが満載です。"
tags: ["GAS", "getFilter", "Google Apps Script", "スプレッドシート", "Filter", "自動化", "業務効率化", "データ絞り込み", "FilterCriteria"]
date: "2020-06-20T05:36:12.000Z"
lastmod: "2025-11-28T00:00:00.000Z"
url: "/gas/getfilter"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
---

スプレッドシートで大量のデータを扱う際、「特定の条件で絞り込んで表示する」フィルター機能は欠かせません。しかし、毎日同じ条件でフィルターをかけ直したり、データが追加されるたびに範囲を再設定したりするのは、地味に面倒な作業です。

Google Apps Script (GAS) の **`getFilter()`** メソッドを使えば、こうしたフィルター操作を完全に自動化できます。

この記事では、`getFilter()` の基本から、既存フィルターの更新や、スクリプト実行時に特定の条件で自動的にデータを絞り込む応用テクニックまで、分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getFilter()` の基本 - シートにフィルターが存在するか確認する

`getFilter()` は、シートに適用されている `Filter` オブジェクトを取得するためのメソッドです。フィルターが存在すればそのオブジェクトを、存在しなければ `null` を返します。

これを利用して、まずはシートにフィルターが設定されているかをチェックするのが基本の第一歩です。

```javascript
function checkFilterExists() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // シートに設定されているフィルターを取得
  const filter = sheet.getFilter();

  if (filter) {
    const rangeA1 = filter.getRange().getA1Notation();
    console.log(`このシートにはフィルターが適用されています。範囲: ${rangeA1}`);
  } else {
    console.log("このシートにフィルターは適用されていません。");
  }
}
```
**ポイント**: `sheet.getFilter()` を使うと、シート全体のフィルターを簡単に取得できます。特定の範囲にフィルターがあるか調べたい場合は `range.getFilter()` を使います。

## 実践！フィルターをGASで操作する主要パターン

### 1. フィルターを「リフレッシュ」する (削除 & 再作成)

元データの行数や列数が変わった際に、フィルターの適用範囲を最新の状態に更新したいケースは頻繁にあります。そんな時は、一度フィルターを削除してから、現在のデータ範囲全体に再作成するのが最も確実です。

```javascript
function refreshFilterRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // 最新のデータ範囲を取得 (例: A1からデータがある最後のセルまで)
  const dataRange = sheet.getDataRange();
  
  // 既存のフィルターが存在すれば、まず削除する
  const currentFilter = sheet.getFilter();
  if (currentFilter) {
    currentFilter.remove();
  }

  // 最新のデータ範囲に対して新しいフィルターを作成
  dataRange.createFilter();
  console.log(`フィルターを範囲 ${dataRange.getA1Notation()} で更新しました。`);
}
```
このスクリプトをトリガーで定期実行すれば、データが変動しても常に最適な範囲にフィルターが適用された状態を保てます。

### 2. フィルターの「絞り込み条件」を動的に設定する

`getFilter()` の真骨頂は、特定の条件でデータを自動的に絞り込む処理です。例えば、「ステータスが“完了”のものだけ表示する」「今日の日付のデータだけ表示する」といった操作をスクリプトで実現できます。

**▼ 1列目(A列)が「重要」という文字を含む行だけを表示する例**

```javascript
function applyDynamicFilter() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // シートのフィルターを取得。なければデータ範囲全体に新規作成する
  const filter = sheet.getFilter() || sheet.getDataRange().createFilter();

  // 絞り込み条件（FilterCriteria）を作成
  const criteria = SpreadsheetApp.newFilterCriteria()
    .whenTextContains("重要") // テキストに「重要」が含まれる
    .build();

  // 1列目（A列）にフィルター条件をセット
  // この命令で、実際のシート上の表示が絞り込まれる
  filter.setColumnFilterCriteria(1, criteria);
  
  console.log("1列目を「重要」で絞り込みました。");
}
```
`newFilterCriteria()` ビルダーを使えば、`whenNumberGreaterThan(100)`（数値が100より大きい）や `whenDateEqualTo(new Date())`（今日の日付）など、様々な条件を柔軟に組み立てることが可能です。

### 3. すべての絞り込み条件をクリアする

設定されているフィルターの絞り込み条件をすべてリセットし、全データを表示状態に戻したい場合は、`removeColumnFilterCriteria()` を使います。

```javascript
function clearAllFilterCriteria() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const filter = sheet.getFilter();

  if (filter) {
    const range = filter.getRange();
    // フィルター範囲のすべての列に対してループ
    for (let i = 1; i <= range.getNumColumns(); i++) {
      // 各列の絞り込み条件を削除
      filter.removeColumnFilterCriteria(i);
    }
    console.log("すべてのフィルター条件をクリアしました。");
  }
}
```

## まとめ

`getFilter()` と関連メソッドを使えば、手作業で行っていた面倒なフィルター操作をGASで自動化し、業務効率を大幅に向上させることができます。

-   **`sheet.getFilter()`** でフィルターの有無や範囲を簡単に確認できる。
-   **`remove()` と `createFilter()`** の組み合わせで、フィルター範囲を常に最新に保てる。
-   **`setColumnFilterCriteria()`** を使えば、特定の条件でのデータ絞り込みを自動化できる。

これらのテクニックを駆使して、日々のデータチェックやレポート作成業務をよりスマートなものにしていきましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/filter?hl=ja" >}}

{{< blog-card "https://i-dea.jp/work/gas-spreadsheet-filter-sort/" >}}
