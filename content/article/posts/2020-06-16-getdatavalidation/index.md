---
title: GASでスプレッドシートの指定セルから入力規則を取得する方法徹底解説
author: arukayies
date: 2020-06-15T17:13:32+00:00
excerpt: GASでスプレッドシートの入力規則を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592241212
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
tags:
  - "GAS"
tags:
  - GAS
  - getDataValidation()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）の`getDataValidation()`メソッドは、スプレッドシートにおけるデータ入力規則を管理する際に非常に便利な機能なんよ。これを使えば、入力規則を簡単に取得して処理できるけど、どんな場面でどう活用するのか、今回はその基礎から応用例まで、しっかり説明していくけ。


## 1. getDataValidation()メソッドの基礎

### メソッドの動作とは？

`getDataValidation()`は、スプレッドシートのセルに設定された入力規則を取得するメソッドさ。これを使うと、セルに設定されたバリデーション（入力規則）の内容を取得できるんよ。規則が設定されていない場合は`null`が返ってくるけど、規則があればその情報をきちんと取り出すことができるんじゃ。

例えば、以下のコードを使えば、セル`B5`に設定されている入力規則を取得できるよ。

<pre class="wp-block-code"><code>function checkSingleCellValidation() {
  const cell = SpreadsheetApp.getActive().getRange('B5');
  const validation = cell.getDataValidation();
  
  if (validation !== null) {
    console.log('入力規則タイプ:', validation.getCriteriaType());
    console.log('ヘルプテキスト:', validation.getHelpText());
  } else {
    console.log('入力規則未設定');
  }
}
</code></pre>

### 複数セルの規則取得

複数セルの入力規則を一度に取得したい場合、`getDataValidations()`メソッドを使えば、範囲内のすべてのセルに設定された規則をまとめて取得できるんだ。これを使うと、複数セルを一括で処理できるから便利じゃけ。

<pre class="wp-block-code"><code>function processRangeValidations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('サンプル');
  const range = sheet.getRange('A1:D10');
  const validations = range.getDataValidations();

  validations.forEach((row, rowIndex) =&gt; {
    row.forEach((validation, colIndex) =&gt; {
      if (validation !== null) {
        console.log(`セル ${String.fromCharCode(65 + colIndex)}${rowIndex + 1}:`, 
          validation.getCriteriaType());
      }
    });
  });
}
</code></pre>

## 2. 入力規則の動的管理

### 条件判定フローを効率化

`getDataValidation()`を使うと、入力規則に基づいてリアルタイムで検証を行うことができるけ。特に`getAllowInvalid()`を利用することで、無効な入力に対する警告を表示したり、拒否したりできるんよ。

<pre class="wp-block-code"><code>function validateInputCriteria() {
  const cell = SpreadsheetApp.getActive().getRange('C3');
  const validation = cell.getDataValidation();

  if (validation) {
    switch(validation.getCriteriaType()) {
      case SpreadsheetApp.DataValidationCriteria.NUMBER_BETWEEN:
        const &#91;min, max] = validation.getCriteriaValues();
        console.log(`数値範囲: ${min} - ${max}`);
        break;
      case SpreadsheetApp.DataValidationCriteria.CHECKBOX:
        console.log('チェックボックス形式');
        break;
      default:
        console.log('その他の入力規則');
    }
  }
}
</code></pre>

### 動的なバリデーションエンジンを作成

`getDataValidation()`を使って、入力内容が規則に合っているかをリアルタイムでチェックする動的なバリデーションシステムを構築することもできるんじゃ。

<pre class="wp-block-code"><code>function dynamicValidationEngine() {
  const cell = SpreadsheetApp.getActive().getRange('E5');
  const validation = cell.getDataValidation();
  
  if (!validation) return;

  const currentValue = cell.getValue();
  const criteria = validation.getCriteriaType();
  const params = validation.getCriteriaValues();

  let isValid = false;
  switch(criteria) {
    case SpreadsheetApp.DataValidationCriteria.NUMBER_NOT_EQUAL:
      isValid = currentValue !== params&#91;0];
      break;
    case SpreadsheetApp.DataValidationCriteria.TEXT_CONTAINS:
      isValid = currentValue.includes(params&#91;0]);
      break;
    case SpreadsheetApp.DataValidationCriteria.DATE_AFTER:
      isValid = new Date(currentValue) &gt; new Date(params&#91;0]);
      break;
  }

  if (!isValid) {
    SpreadsheetApp.getUi().alert('入力値が規則に違反しています');
  }
}
</code></pre>

## 3. 応用システムの設計

### チェックボックス状態管理

スプレッドシートに設定されたチェックボックスの状態を制御するシステムも作れるんよ。たとえば、ユーザーが選択した状態を基に、他のセルのバリデーションを変更することも可能なんじゃけ。

<pre class="wp-block-code"><code>function manageCheckboxStates() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const validations = range.getDataValidations();
  const values = range.getValues();

  validations.forEach((row, i) =&gt; {
    row.forEach((validation, j) =&gt; {
      if (validation?.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
        const isChecked = values&#91;i]&#91;j] === true;
        const validationRule = validation.copy().setCheckboxValues(isChecked, !isChecked);
        range.getCell(i+1, j+1).setDataValidation(validationRule);
      }
    });
  });
}
</code></pre>

### ダイナミックフォームの生成

スプレッドシート内のデータ規則を使って、動的にフォームを生成するシステムも作れるんよ。これによって、入力規則に基づいたフォームを自動生成できるけ。

<pre class="wp-block-code"><code>function generateDynamicForm() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('FormConfig');
  const configRange = sheet.getRange('A1:C10');
  const form = FormApp.create('Dynamic Form');

  configRange.getDataValidations().forEach((row, i) =&gt; {
    const &#91;title, type] = configRange.getCell(i+1, 1).getValue().split(':');
    const validation = row&#91;0];

    if (validation) {
      switch(type) {
        case 'dropdown':
          const items = validation.getCriteriaValues()&#91;0].getValues();
          form.addListItem().setTitle(title).setChoiceValues(items.flat());
          break;
        case 'checkbox':
          form.addCheckboxItem().setTitle(title)
            .setChoiceValues(validation.getCriteriaValues()&#91;0]);
          break;
      }
    }
  });
}
</code></pre>

## 結論

`getDataValidation()`メソッドを使えば、スプレッドシートの入力規則を管理し、効率よくデータ整合性を保つことができるんじゃ。このメソッドを活用すれば、動的な入力バリデーションや高度なデータ管理システムを簡単に構築できるんよ。さらに、この技術を活用した応用システムや業務自動化も目指せるけ、ぜひ活用してみてちょうだい！


{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
{{< blog-card "https://qiita.com/Studio344/items/e359bbb48ef79ff24921" >}}
