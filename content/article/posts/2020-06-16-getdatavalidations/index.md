---
title: "GAS getDataValidations()で入力規則を一括操作！業務自動化テクニック"
description: "GASのgetDataValidations()を使い、スプレッドシートの入力規則を一括取得、更新、バックアップする方法を徹底解説。面倒な設定作業を自動化し、データ整合性を高める実践的コードを満載。パフォーマンスの注意点も紹介します。"
tags: ["GAS", "getDataValidations", "Google Apps Script", "スプレッドシート", "入力規則", "自動化", "業務効率化", "一括処理"]
date: "2020-06-16T14:41:48.000Z"
url: "/gas/getdatavalidations"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-28T00:00:00+00:00"
---

スプレッドシートで多数のセルに入力規則を設定していると、「一部のルールだけ一括で変更したい」「設定をバックアップしておきたい」といったニーズが出てきます。しかし、これらを手作業で行うのは非常に面倒で、ミスも起こりがちです。

そんな課題を解決するのが、Google Apps Script (GAS) の **`getDataValidations()`** メソッドです。

このメソッドを使えば、指定した範囲の入力規則を**まとめて取得し、プログラムで効率的に操作**できます。この記事では、`getDataValidations()` の基本から、設定の一括更新やバックアップといった実践的な自動化テクニックまで、詳しく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `getDataValidations()`の基本 - 範囲の入力規則をごっそり取得

`getDataValidations()` は、`Range` オブジェクト（セルの範囲）に設定されたすべての入力規則を、**`DataValidation` オブジェクトの二次元配列**として取得します。

-   **入力規則があるセル**: `DataValidation` オブジェクトが格納される
-   **入力規則がないセル**: `null` が格納される

この二次元配列の構造は、スプレッドシートの行と列の配置にそのまま対応しているため、直感的に扱うことができます。

**▼ 基本的な使い方**
`A1:C3` の範囲にあるすべての入力規則を取得し、その種類をログに出力するサンプルコードです。

```javascript
function fetchAllValidations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1:C3');
  // 範囲内の入力規則を二次元配列で取得
  const validations = range.getDataValidations();

  // 二次元配列をループ処理
  validations.forEach((row, rowIndex) => {
    row.forEach((rule, colIndex) => {
      if (rule !== null) {
        // DataValidationオブジェクトから基準タイプを取得
        const criteriaType = rule.getCriteriaType();
        // セルの番地（A1形式）を計算して表示
        const cellAddress = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
        console.log(`セル ${cellAddress} の規則: ${criteriaType}`);
      }
    });
  });
}
```

## 取得した`DataValidation`オブジェクトを解析する

取得した `DataValidation` オブジェクトからは、入力規則の様々な設定情報を読み取れます。これにより、ルールの詳細な分析が可能です。

| 主要なメソッド | 説明 |
| :--- | :--- |
| `getCriteriaType()` | 規則の種類（例: `DATE_BEFORE`, `VALUE_IN_RANGE`）を取得 |
| `getCriteriaValues()` | 規則の条件値（例: 日付、数値、リストの参照範囲）を配列で取得 |
| `getHelpText()` | セル選択時に表示されるヘルプテキストを取得 |
| `getAllowInvalid()` | 無効なデータ入力を許可するかどうか（`true`/`false`）を取得 |

これらのメソッドを組み合わせることで、複雑な入力規則も正確に把握できます。

## 実践！特定の入力規則をピンポイントで取得する方法

`getDataValidations()` で取得した配列の中から、特定の種類の入力規則だけを抜き出して処理する方法を解説します。

### 1. ドロップダウンリスト（範囲参照）の選択肢を取得

ドロップダウンの選択肢が別シートの範囲を参照している場合、その参照先の値を取得します。

```javascript
function getDropdownValues() {
  const cell = SpreadsheetApp.getActiveSheet().getRange('A1');
  const validation = cell.getDataValidation();

  // 基準タイプが「範囲内のリスト」かを確認
  if (validation && validation.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
    // 基準値から参照範囲（Rangeオブジェクト）を取得
    const sourceRange = validation.getCriteriaValues()[0];
    // 参照範囲の値を取得し、空のセルを除外して一次元配列に変換
    const values = sourceRange.getValues().flat().filter(String);
    console.log('ドロップダウンの選択肢:', values);
  }
}
```

### 2. チェックボックスのON/OFF時の値を取得

チェックボックスにカスタムで設定された「チェック時の値」と「未チェック時の値」を取得します。

```javascript
function getCheckboxCustomValues() {
  const cell = SpreadsheetApp.getActiveSheet().getRange('B1');
  const checkboxValidation = cell.getDataValidation();

  if (checkboxValidation && checkboxValidation.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
    // 基準値から [チェック時の値, 未チェック時の値] の配列を取得
    const [checkedValue, uncheckedValue] = checkboxValidation.getCriteriaValues();
    console.log(`チェック時の値: ${checkedValue}, 未チェック時の値: ${uncheckedValue}`);
  }
}
```

## 【応用】業務を効率化する自動化スクリプト例

`getDataValidations()` を活用すれば、手動では時間がかかる作業も一瞬で完了できます。

### 1. 入力規則の一括更新

シート全体の「今日より前の日付」という日付規則を、常に最新の状態に更新します。

```javascript
function updateAllDateValidations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const rules = range.getDataValidations();
  
  const newRules = rules.map(row => {
    return row.map(rule => {
      // 日付が指定日より前であるかチェックする規則のみを対象
      if (rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.DATE_BEFORE) {
        const today = new Date(); // 新しい基準日として今日の日付を設定
        // 既存のルールをコピーして新しい基準で再構築
        return rule.copy().withCriteria(rule.getCriteriaType(), [today]).build();
      }
      return rule; // 対象外のルールはそのまま返す
    });
  });
  
  // 更新した入力規則の二次元配列を範囲に再設定
  range.setDataValidations(newRules);
}
```

### 2. 入力規則の設定をバックアップ・複製する

シートのすべての入力規則をJSON形式でエクスポートします。これにより、設定のバックアップや、他のシートへの複製が容易になります。

```javascript
function exportValidationsToJson() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const rules = range.getDataValidations();
  const validationsData = {};
  
  rules.forEach((row, rowIndex) => {
    row.forEach((rule, colIndex) => {
      if (rule) {
        const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
        validationsData[cellAddress] = {
          criteria: rule.getCriteriaType().toString(),
          values: rule.getCriteriaValues().map(v => (v.constructor.name === 'Range' ? v.getA1Notation() : v)),
          helpText: rule.getHelpText()
        };
      }
    });
  });
  
  // JSON文字列として出力
  console.log(JSON.stringify(validationsData, null, 2));
}
```

## パフォーマンスに関する注意点

`getDataValidations()` や `setDataValidations()` は、APIへのリクエストを伴うため、数千〜数万といった大量のセルに対して実行すると処理が遅くなることがあります。

大規模なシートでパフォーマンスが問題になる場合は、一度に処理する範囲を小さく分割する「**バッチ処理**」を検討しましょう。

## まとめ

`getDataValidations()` は、スプレッドシートの入力規則をプログラムで柔軟に扱うための強力な武器です。

-   **一括取得**: 面倒なルールの棚卸しや分析を自動化
-   **一括更新**: 仕様変更にも迅速に対応
-   **設定のエクスポート**: バックアップや他シートへの展開が容易に

このメソッドを使いこなし、データ管理の品質と効率をさらに向上させましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" >}} 
  
{{< blog-card "https://caymezon.com/gas-datavalidation/" >}} 
  
{{< blog-card "https://note.com/29119/n/neb9353c45258" >}}
