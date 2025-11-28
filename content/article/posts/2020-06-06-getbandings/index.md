---
title: "【GAS】getBandings()で交互の背景色（バンディング）設定を取得・操作する方法"
description: "GASの`getBandings()`を使い、スプレッドシートの「交互の背景色」（バンディング）設定を`Banding`オブジェクトとして取得・操作する方法を解説。適用範囲やテーマ、各色設定の取得から、複数のシートのデザインを一括で更新・統一する実践的なスクリプトまで紹介します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "getBandings", "Banding", "デザイン統一", "自動化"]
date: "2020-06-06T05:36:49.000Z"
url: "/gas/getbandings"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年6月"]
lastmod: "2025-11-25T14:33:00+09:00"
---

Google Apps Script (GAS)でスプレッドシートの見た目を自動で整えたい時、「交互の背景色」（バンディング）の設定をプログラムで扱えると非常に便利です。`getBandings()`は、このバンディング情報を取得・操作するための専門的なメソッドです。

この記事では、`getBandings()`の基本から、複数のシートデザインを統一するような実践的な使い方までを解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## getBandings()とは？

`getBandings()`は、シートや特定の範囲に適用されている**交互の背景色設定**を`Banding`オブジェクトの配列として取得するメソッドです。

`getBackgrounds()`が個々のセルの色を取得するのに対し、`getBandings()`は「ヘッダーの色」「1番目の行の色」といった、バンディング設定そのものをオブジェクトとして取得する点が大きな違いです。

- **`Sheet.getBandings()`**: シートに設定されている**すべての**バンディングを取得。
- **`Range.getBandings()`**: 特定の範囲に設定されているバンディングを取得。

## Bandingオブジェクトから取得できる情報

`getBandings()`が返す`Banding`オブジェクトからは、以下のような詳細な設定情報を取得できます。

- **適用範囲**: `getRange()`で、このバンディングがどの範囲に適用されているかを`Range`オブジェクトとして取得できます。
- **テーマ**: `getBandingTheme()`で、`LIGHT_GREY`や`CYAN`といった定義済みのテーマ名を取得できます。
- **各パーツの色**:
    - `getHeaderRowColor()`: ヘッダー行の色
    - `getFooterRowColor()`: フッター行の色
    - `getFirstRowColor()`: 1番目の（奇数）行の色
    - `getSecondRowColor()`: 2番目の（偶数）行の色

### 基本的な使い方：設定内容をログに出力する

以下のスクリプトは、現在アクティブなシートに設定されているすべてのバンディング情報を取得し、その詳細をログに出力します。

```javascript
function logBandingInfo() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const bandings = sheet.getBandings();

  if (bandings.length === 0) {
    console.log("このシートにはバンディングが設定されていません。");
    return;
  }

  bandings.forEach((banding, index) => {
    console.log(`--- バンディング設定 ${index + 1} ---`);
    console.log(`適用範囲: ${banding.getRange().getA1Notation()}`);
    console.log(`テーマ: ${banding.getBandingTheme()}`);
    console.log(`ヘッダー色: ${banding.getHeaderRowColor()}`);
    console.log(`1行目の色: ${banding.getFirstRowColor()}`);
    console.log(`2行目の色: ${banding.getSecondRowColor()}`);
  });
}
```

## 実践例：複数シートのバンディングデザインを一括統一する

`getBandings()`と`remove()`、`applyRowBanding()`を組み合わせることで、複数のシートにまたがる表のデザインを一括で統一するような強力な自動化が可能です。

以下の例では、「テンプレート」シートのバンディング設定を、他のすべてのシートにコピー（複製）します。

```javascript
function unifyBandingStyles() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName("テンプレート");
  const allSheets = ss.getSheets();

  // ① テンプレートシートからバンディング設定を取得
  const templateBandings = templateSheet.getBandings();
  if (templateBandings.length === 0) {
    console.log("テンプレートシートにバンディング設定がありません。");
    return;
  }
  const mainBanding = templateBandings[0]; // 最初のバンディング設定を基準とする
  const theme = mainBanding.getBandingTheme();
  const hasHeader = mainBanding.getHeaderRowColor() !== null;
  const hasFooter = mainBanding.getFooterRowColor() !== null;

  // ② 全てのシート（テンプレート以外）に設定を適用
  allSheets.forEach(sheet => {
    if (sheet.getName() !== templateSheet.getName()) {
      // 既存のバンディングを全て削除
      sheet.getBandings().forEach(b => b.remove());

      // データ範囲に新しいバンディングを適用
      const dataRange = sheet.getDataRange();
      if (dataRange.getNumRows() > 1) {
        dataRange.applyRowBanding(theme, hasHeader, hasFooter);
        console.log(`${sheet.getName()}シートのデザインを統一しました。`);
      }
    }
  });
}
```

## まとめ

`getBandings()`は、スプレッドシートのデザインや視覚的な一貫性をプログラムで管理するための重要なメソッドです。

-   **設定の取得**: 適用範囲、テーマ、各色など、バンディングの詳細情報をオブジェクトとして取得できる。
-   **動的な操作**: 取得した情報を基に、条件に応じてバンディングを削除したり、新しいテーマを適用したりできる。
-   **デザインの統一**: 複数のシートやファイルの表デザインを一括で揃えるなど、高度な自動化が可能。

`getBandings()`を使いこなして、手作業でのデザイン調整から解放され、より効率的なスプレッドシート管理を実現しましょう。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}} 
  
{{< blog-card "https://hajiritsu.com/spreadsheet-gas-getbandings/" >}}
