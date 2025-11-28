---
title: "【GASスプレッドシート】getNumberFormats()で複数セルの表示形式を一括取得・SEO最適化"
description: "Google Apps Script (GAS) の`getNumberFormats()`メソッドを徹底解説。スプレッドシートの指定範囲から数値、日付、通貨などのセルの表示形式（NumberFormat）を効率的に一括取得する方法を、具体的なコード例で紹介します。`getNumberFormat()`との違い、データ整合性チェック、フォーマット自動修正といった実践的な応用例を通じて、GASによるスプレッドシート自動化とデータ品質向上に役立つ情報を提供します。"
tags: ["GAS", "Google Apps Script", "スプレッドシート", "getNumberFormats", "getNumberFormat", "表示形式", "数値書式", "日付書式", "通貨書式", "一括取得", "自動化", "データ検証", "データ品質", "効率化", "プログラム", "開発"]
date: "2020-08-06T12:29:38.000Z"
lastmod: "2025-11-20T00:00:00.000Z"
url: "/gas/getnumberformats"
share: true
toc: true
categories: "gas"
archives: ["2020年8月"]
---

Google Apps Script (GAS) を用いたスプレッドシートの自動化において、**複数セルの表示形式（数値、日付、通貨、パーセンテージなど）を効率的に管理する**ことは、データの正確性とスクリプトのパフォーマンス向上に不可欠です。個々のセルに対して表示形式を取得する`getNumberFormat()`も便利ですが、広範囲のセルを扱う場合には非効率になります。

本記事では、スプレッドシートの指定範囲からセルの表示形式を**二次元配列で一括取得できる`getNumberFormats()`メソッド**を徹底解説します。基本的な使い方から、`getNumberFormat()`との違い、さらにはデータ整合性チェックや自動修正といった実用的な応用例までを、具体的なコード例を交えて紹介します。

GASによるスプレッドシート操作の効率を最大化し、データ品質を維持するための強力なツールである`getNumberFormats()`の活用法をマスターしましょう。

{{< affsearch keyword="GAS スプレッドシート 表示形式 一括取得 自動化" img="/gas.jpg">}}

## getNumberFormats() とは？GASで複数セルの表示形式を一括取得

`getNumberFormats()` メソッドは、Google Apps Scriptにおける `Range` オブジェクトの重要な機能の一つです。このメソッドを利用することで、**指定したセル範囲（Range）内のすべてのセルの表示形式を、一度の呼び出しでまとめて文字列として取得**できます。

これは、データが入力された広範囲のセルに対して、表示形式の監査や一括変更を行いたい場合に特に有効です。

### `getNumberFormat()` と `getNumberFormats()` の違いと効率性

| 特徴 | `getNumberFormat()` | `getNumberFormats()` |
| :--- | :--- | :--- |
| **対象セル数** | 単一セルのみ | 複数セル範囲 |
| **返り値** | 文字列 (単一の表示形式) | 二次元配列 (範囲内の全ての表示形式) |
| **効率性** | 複数セルへのループ処理ではAPI呼び出しが増え非効率 | 一度のAPI呼び出しで複数セルの情報を取得できるため効率的 |

### 基本的な使用例：A1からC3範囲の表示形式を取得する

`getNumberFormats()` の使い方は、対象範囲を`getRange()`で取得し、そのRangeオブジェクトに対してメソッドを呼び出すだけです。返り値は、指定した範囲の行と列の構造を反映した二次元配列となります。

```javascript
/**
 * アクティブなシートのA1:C3範囲の全セルの表示形式を一括取得し、ログに出力する関数。
 */
function getAndLogAllNumberFormats() {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブなシートを取得
  const range = sheet.getRange("A1:C3");      // 対象範囲をA1:C3に設定
  
  // 指定範囲の各セルの表示形式を二次元配列として一括取得
  const formats = range.getNumberFormats();
  
  // 取得した二次元配列の内容をJSON形式でログに出力 (視認性のため整形)
  Logger.log(`A1:C3範囲の表示形式:\n${JSON.stringify(formats, null, 2)}`);
  /*
   * 例: formats の出力形式
   * [
   *   ['#,##0', 'yyyy/MM/dd', '0.0%'],
   *   ['General', 'h:mm:ss', '"$"#,##0.00'],
   *   ['@', 'yyyy/MM/dd h:mm:ss', '#,##0.00E+00']
   * ]
   */
}
```
このスクリプトを実行すると、`A1:C3`範囲内のすべてのセルの表示形式が、二次元配列としてログに出力されます。

## `getNumberFormats()` の実践的な活用術

`getNumberFormats()` は、スプレッドシートのデータ管理と自動化において多岐にわたる場面でその真価を発揮します。

### 1. 範囲内の各セルの表示形式をループ処理で確認する

一括取得した二次元配列をループ処理することで、範囲内の各セルの表示形式を個別に確認・操作できます。これは、特定の条件に基づいてセルの書式を調整したい場合に便利です。

```javascript
/**
 * 指定範囲の各セルの表示形式を読み取り、A1表記と共にログに出力する関数。
 */
function iterateAndLogNumberFormats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データシート'); // 対象シート名
  if (!sheet) {
    Logger.log("エラー: 指定されたシートが見つかりません。");
    return;
  }
  const range = sheet.getRange('A1:B3'); // 検査対象範囲
  const formats = range.getNumberFormats();
  
  // 取得した二次元配列 (formats[rowIndex][colIndex]) をループ処理
  formats.forEach((rowFormats, rowIndex) => {
    rowFormats.forEach((format, colIndex) => {
      // getCell(row, column) は1から始まるインデックス
      const cellAddress = range.getCell(rowIndex + 1, colIndex + 1).getA1Notation();
      Logger.log(`セル ${cellAddress} の表示形式: ${format}`);
      
      // 例: 日付フォーマットのセルを検出
      if (format.includes('yyyy') || format.includes('MM') || format.includes('dd')) {
        Logger.log(`  -> このセル (${cellAddress}) は日付形式の可能性があります。`);
      }
    });
  });
}
```
この例では、日付形式の可能性があるセルを検出するシンプルなロジックを追加しています。

### 2. 特定の列・行の表示形式をまとめて検証・修正する

例えば、データベースからインポートしたデータで、日付列が誤って文字列形式になっていたり、金額列が標準形式になっていたりする場合があります。`getNumberFormats()` を使えば、特定の列や行全体の表示形式をまとめて検証し、必要であれば`setNumberFormat()`で一括修正できます。

```javascript
/**
 * 特定の列（C列、D列、E列）の表示形式を検証し、期待値と異なる場合は警告を出す関数。
 * 自動修正機能を追加することも可能です。
 */
function validateAndCorrectColumnFormats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('売上データ');
  if (!sheet) {
    Logger.log("エラー: '売上データ' シートが見つかりません。");
    return;
  }
  
  // 列番号と期待されるフォーマットの定義 (GASの列は1から始まる)
  const formatRules = {
    3: 'yyyy/MM/dd',      // C列: 日付
    4: '#,##0',           // D列: 数量（整数）
    5: '"¥"#,##0'         // E列: 金額（円）
  };

  const startRow = 2;     // データ開始行 (ヘッダー行を除く)
  const lastRow = sheet.getLastRow();
  // 検証対象範囲を複数の列にまたがるように取得 (C列からE列まで)
  const rangeToValidate = sheet.getRange(startRow, 3, lastRow - startRow + 1, 3); // C列からE列
  const formats = rangeToValidate.getNumberFormats(); // 範囲の表示形式を一括取得

  formats.forEach((rowFormats, rowIndex) => {
    Object.keys(formatRules).forEach(colNumberStr => {
      const colNumber = parseInt(colNumberStr, 10); // 列番号を数値に変換
      const colIndexInArray = colNumber - 3; // 取得した配列内での列インデックス (0から始まる)
      
      const expectedFormat = formatRules[colNumber];
      const actualFormat = rowFormats[colIndexInArray];
      
      if (actualFormat !== expectedFormat) {
        const cellAddress = sheet.getRange(startRow + rowIndex, colNumber).getA1Notation();
        Logger.warn(`フォーマット不一致を検出: セル ${cellAddress} | 期待: "${expectedFormat}", 実際: "${actualFormat}"`);
        
        // ★ オプション: ここで setNumberFormat() を使って自動修正することも可能
        // sheet.getRange(cellAddress).setNumberFormat(expectedFormat);
        // Logger.log(`-> セル ${cellAddress} のフォーマットを修正しました。`);
      }
    });
  });
  Logger.log("表示形式の検証が完了しました。");
}
```
このスクリプトは、指定した列の各セルの表示形式をルールと比較し、不一致があれば警告をログに出力します。コメントアウトされた部分を有効にすることで、自動修正機能も追加できます。

## GASでよく使われる代表的な表示形式の文字列

`getNumberFormats()`で取得できる表示形式の文字列は多種多様ですが、ここではスプレッドシートで頻繁に利用される代表的なフォーマットとその表示例、データの種類をまとめました。これらの文字列を理解しておくことで、スクリプト内での表示形式の判別や`setNumberFormat()`での指定が容易になります。

| フォーマット文字列 | 表示例 | データの種類 | 解説 |
| :--- | :--- | :--- | :--- |
| `General` | 12345 | 標準 | 特殊な書式なし（入力値そのまま） |
| `#,##0` | 12,345 | 整数 | 3桁区切りの整数表示 |
| `#,##0.00` | 12,345.67 | 小数点付き数値 | 3桁区切り、小数点以下2桁表示 |
| `0.00%` | 98.76% | パーセンテージ | 小数点以下2桁のパーセンテージ表示 |
| `yyyy-MM-dd` | 2025-03-06 | 日付 | 年-月-日形式の日付表示 |
| `h:mm:ss` | 14:30:05 | 時刻 | 時:分:秒形式の時刻表示 |
| `yyyy/MM/dd h:mm` | 2025/03/06 14:30 | 日付と時刻 | 年/月/日 時:分形式 |
| `[$¥-411]#,##0` | ¥12,345 | 通貨（円） | 日本円の通貨表示（3桁区切り） |
| `[$$-409]#,##0.00` | $12,345.67 | 通貨（ドル） | 米ドルの通貨表示（3桁区切り、小数点以下2桁） |
| `0.0E+00` | 1.2E+03 | 指数表記 | 科学的な指数表記 |
| `@` | (そのまま表示) | 文字列 | 数値として扱わず、入力値をそのまま文字列として表示 |

これらのフォーマット文字列は、スプレッドシートのメニュー「表示形式」→「カスタム数値形式」で確認できます。スクリプトで表示形式を操作する際には、これらの文字列を正確に指定することが成功の鍵となります。

## まとめ：`getNumberFormats()`でスプレッドシートのデータ管理を自動化・効率化

`getNumberFormats()` メソッドは、Google Apps Scriptでスプレッドシートの広範囲なデータ管理を効率的に自動化するための、非常に強力な機能です。

*   **高速な一括取得**: 複数セルの表示形式を一度のAPI呼び出しで二次元配列として取得できるため、スクリプトの実行速度と効率が大幅に向上します。
*   **データ整合性の維持**: 取得したフォーマット情報に基づいて、データのバリデーション（検証）や自動修正を行うことで、シート全体のデータ品質を高いレベルで維持できます。
*   **柔軟なデータ処理**: 特定の表示形式を持つセルを識別し、それに応じた処理を分岐させることで、より柔軟で堅牢なGASスクリプトの開発が可能になります。

本記事で紹介した`getNumberFormats()`の知識と実践的な応用例を活用し、あなたのGASスプレッドシート自動化プロジェクトを次の段階へと進めてください。データの正確性と効率性を両立させることが、ビジネスプロセスの最適化に繋がります。

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://gsuiteguide.jp/sheets/getnumberformats/" >}}
