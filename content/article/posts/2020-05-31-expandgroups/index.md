---
title: "GASのexpandGroupsメソッドでグループ化された行や列を展開する方法"
description: "Google Apps Script（GAS）のexpandGroupsメソッドを使用して、スプレ_ッドシートでグループ化され折りたたまれた行や列を一括で展開する方法を解説。シート全体、選択範囲のみの展開や、トリガーを使った自動化など実践的なスクリプトを紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "スプレッドシート", "expandGroups", "グループ化"]
date: "2020-05-31T11:56:24.000Z"
url: "/gas/expandgroups"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年5月"]
lastmod: "2025-11-25T14:50:00+09:00"
---

Googleスプレッドシートの「グループ化」機能は、大量のデータを整理し、一時的に非表示にするのに非常に便利です。しかし、折りたたまれたグループを一つずつ手動で展開するのは手間がかかります。Google Apps Script (GAS) の `expandGroups()` メソッドを使えば、この操作を自動化し、一括でグループを展開できます。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## expandGroups()メソッドとは？

`expandGroups()` は、`Range` クラスに属するメソッドで、指定したセル範囲内に存在する、折りたたまれた全てのグループ（行または列）を展開します。

基本的な構文は非常にシンプルです。

```javascript
// "A1:D10" の範囲に含まれるすべてのグループを展開
const range = sheet.getRange("A1:D10");
range.expandGroups();
```

このメソッドを呼び出すだけで、対象範囲内のグループがすべて表示状態になります。

## expandGroups()の実践的な実装例

`expandGroups()` を活用した具体的なスクリプトを3つのパターンで紹介します。

### 1. シート全体のすべてのグループを展開する

シートに含まれるデータ全体のグループを展開する最も基本的なスクリプトです。

```javascript
function expandAllGroupsInSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  // データが存在するすべての範囲を取得
  const dataRange = sheet.getDataRange();
  
  // 範囲内の全グループを展開
  dataRange.expandGroups();
  
  // 変更を即時反映
  SpreadsheetApp.flush(); 
}
```

メニューにこの関数を登録しておけば、ワンクリックでシート内の全グループを展開できます。

### 2. ユーザーが選択した範囲のグループのみを展開する

特定の範囲だけグループを展開したい場合に便利なスクリプトです。

```javascript
function expandSelectedGroups() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const selection = sheet.getSelection();
  // 現在選択されている範囲を取得
  const activeRange = selection.getActiveRange();
  
  if (activeRange) {
    activeRange.expandGroups();
  }
}
```

### 3. トリガーを利用して自動で展開する

特定のセルの値が変更されたことをきっかけに、グループを自動で展開するスクリプトです。例えば、チェックボックスと連動させると便利です。

```javascript
/**
 * onEditイベントで実行されるトリガー関数
 * @param {Object} e イベントオブジェクト
 */
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // A1セルの値がTRUEに変更された場合
  if (range.getA1Notation() === "A1" && e.value === "TRUE") {
    // "B2:F20"の範囲のグループを展開
    sheet.getRange("B2:F20").expandGroups();
  }
}
```

このスクリプトを設置しておくと、A1セルにチェックを入れるだけで指定範囲のグループが展開されるようになります。

## expandGroups()を使用する際の注意点

*   **対象グループがない場合**: 指定した範囲に展開可能なグループが存在しない場合、このメソッドは何も実行せず、エラーも発生しません。
*   **範囲指定のミス**: 存在しないシートや範囲を指定しようとするとエラーが発生します。
*   **エラーハンドリング**: ユーザーが予期せぬ範囲を選択する可能性がある場合など、`try...catch` ブロックでエラーを捕捉すると、より安定したスクリプトになります。

```javascript
function safeExpandGroups() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const range = sheet.getRange("A1:D10"); // 対象範囲
    range.expandGroups();
  } catch (e) {
    console.error(`グループの展開に失敗しました: ${e.message}`);
    SpreadsheetApp.getUi().alert("グループの展開中にエラーが発生しました。");
  }
}
```

## まとめ

`expandGroups()` メソッドを活用することで、スプレッドシートのグループ展開作業を効率化・自動化できます。

*   **一括展開**: シート全体または特定の範囲のグループを一度に展開。
*   **自動化**: `onEdit` などのトリガーと組み合わせ、特定の操作に応じて自動でグループを展開。
*   **安定性向上**: `try...catch` によるエラー処理で、より堅牢なスクリプトを構築。

手動での繰り返し作業をGASで自動化し、スプレッドシートの操作をさらに快適にしましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range#expandgroups" >}} 

{{< blog-card "https://caymezon.com/gas-group-collapse-expand/" >}}
