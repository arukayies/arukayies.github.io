---
title: "【GAS】スプレッドシートの編集権限を確認するcanEdit()メソッドの完全ガイド"
description: "Google Apps Script (GAS) を用いて、スプレッドシートの特定範囲に対する編集権限を動的に確認するcanEdit()メソッドの基本的な使い方から、役職別・時間帯別のアクセス制御といった高度な応用例までをソースコード付きで詳しく解説します。"
tags: ["GAS", "Google Apps Script", "Spreadsheet", "canEdit", "権限管理", "Protect"]
date: "2020-03-11T14:48:29.000Z"
url: "/gas/canedit"
share: true
toc: true
categories: ["GAS"]
archives: ["2020年3月"]
lastmod: "2025-11-27T09:25:11+09:00"
---

Google Apps Script (GAS) を利用したスプレッドシートの自動化において、セキュリティと権限管理は避けて通れない重要なテーマです。特に、`canEdit()`メソッドは、ユーザーの編集権限を動的にチェックするための鍵となります。本記事では、`canEdit()`の基本的な使い方から、実務で役立つ高度な権限管理の実装方法までを、初心者から経験者まで幅広く役立つように解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

## `canEdit()`メソッドの基本

`canEdit()`メソッドは、スクリプトを実行しているユーザーが、特定の範囲（`Range`）や保護設定（`Protection`）に対して編集権限を持っているかどうかを**ブール値（true/false）**で返します。これにより、権限に応じた処理の分岐が容易になります。

```javascript
function checkAndRemoveProtection() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:B10");
  const protection = range.protect().setDescription('Sample Protection');
  
  // 現在のユーザーがこの保護範囲を編集できるか確認
  if (protection.canEdit()) {
    // 権限があれば保護を解除
    protection.remove();
    Logger.log('編集権限があるため、保護を解除しました。');
  } else {
    Logger.log('編集権限がありません。');
  }
}
```
この例では、指定範囲を保護し、`canEdit()`で編集可否を判定後、権限があれば保護を解除しています。

## `canEdit()`の実用的な応用例

### 1. 役職に応じた動的な権限管理

`onEdit(e)`トリガーと組み合わせることで、編集イベント発生時にリアルタイムで権限をチェックし、不正な編集を防ぐことができます。

```javascript
function onEdit(e) {
  const editedRange = e.range;
  const sheetName = editedRange.getSheet().getName();
  
  // '財務データ'シートの特定範囲のみを対象
  if (sheetName === '財務データ' && editedRange.getColumn() >= 2 && editedRange.getColumn() <= 4) {
    const protection = editedRange.getSheet().getProtections(SpreadsheetApp.ProtectionType.RANGE)[0];
    
    // 保護が設定されており、かつ編集権限がない場合
    if (protection && !protection.canEdit()) {
      e.source.toast('この範囲の編集権限がありません。');
      // 変更を元に戻す
      editedRange.setValue(e.oldValue);
    }
  }
}
```
このスクリプトは、特定のシート・範囲が編集された際に、`canEdit()`を用いて権限を検証し、権限がなければ編集内容を元に戻します。

### 2. マルチテナント環境での権限分離

SaaSアプリケーションのように、複数の組織が同じスプレッドシート基盤を利用する環境では、テナントごとに厳密な権限分離が求められます。`canEdit()`は、ドメインベースの権限設定と組み合わせて活用できます。

```javascript
function configureTenantAccess(tenantDomain) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TenantData');
  const protection = sheet.protect();
  
  // ドメイン内のユーザーのみ編集を許可
  protection.setDomainEdit(true);
  
  // 既存の編集者をクリアし、指定ドメインの管理者を追加
  protection.removeEditors(protection.getEditors());
  const tenantAdmins = getAdminsForDomain(tenantDomain); // ドメイン管理者リストを取得する独自関数
  protection.addEditors(tenantAdmins);
  
  // 設定が正しく適用されたか確認
  if (protection.canEdit()) {
    Logger.log(`テナント '${tenantDomain}' の権限設定が完了しました。`);
  }
}
```

## 権限管理を実装する際の注意点

### 保護設定の優先順位

スプレッドシートでは、「シート全体の保護」と「範囲の保護」を同時に設定できます。GASで権限を扱う際は、これらの**保護設定が競合した場合の優先順位**を理解しておくことが重要です。一般的に、より限定的な範囲の保護設定が優先されますが、意図しない動作を防ぐため、設計段階で保護ルールを明確に定義しましょう。

### 条件付き書式との連携

`canEdit()`の結果に基づいて条件付き書式を適用する場合、権限チェックを先に行い、権限がある場合にのみ書式ルールを適用するべきです。権限がない状態で書式を変更しようとすると、スクリプトがエラーで停止する可能性があります。

```javascript
function applyConditionalFormattingWithAuthCheck(range) {
  // canEdit()はRangeオブジェクトにも直接使える
  if (range.canEdit()) {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenCellEmpty()
      .setBackground('#FF0000') // 空のセルを赤くする
      .build();
    range.setConditionalFormatRules([rule]);
  } else {
    Logger.log('書式設定の変更権限がありません。');
  }
}
```

## 高度なシナリオ：時間帯に基づくアクセス制御

`canEdit()`と時刻情報を組み合わせることで、特定の時間帯（例：業務時間内）のみ編集を許可する、といった高度なアクセス制御も実現可能です。

```javascript
function timeBasedEditTrigger(e) {
  const businessHours = { start: 9, end: 18 }; // 業務時間: 9時～18時
  const currentHour = new Date().getHours();
  
  // 業務時間外かどうかを判定
  if (currentHour < businessHours.start || currentHour >= businessHours.end) {
    // 編集権限があるユーザーでも、時間外なら編集をブロック
    if (e.range.canEdit()) {
      e.source.toast('業務時間外の編集は許可されていません。');
      e.range.setValue(e.oldValue);
    }
  }
}
```
この関数を`onEdit`トリガーに設定することで、時間外の編集操作を自動的に差し戻すことができます。

## まとめ

`canEdit()`メソッドは、GASを用いたスプレッドシートの権限管理において、非常に柔軟かつ強力なツールです。基本的な使い方から応用シナリオまでをマスターすることで、セキュアで信頼性の高い自動化システムを構築できます。ただし、権限管理はシステムの根幹に関わる部分であるため、慎重な設計と十分なテストが不可欠です。本記事で紹介したテクニックを参考に、ぜひご自身のプロジェクトで活用してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}

{{< blog-card "https://caymezon.com/gas-protect/" >}} 
  
{{< blog-card "https://qiita.com/STSHISHO/items/8cec8041951d182c937e" >}} 
  
{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
