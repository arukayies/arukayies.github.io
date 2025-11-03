---
title: GASでスプレッドシートの指定セルから入力規則を取得する方法徹底解説
author: arukayies
type: post
date: 2020-06-15T17:13:32+00:00
excerpt: GASでスプレッドシートの入力規則を取得する方法を紹介します！
url: /gas/getdatavalidation
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1592241212
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 22:14:50
categories:
  - GAS
tags:
  - GAS
  - getDataValidation()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）の`getDataValidation()`メソッドは、スプレッドシートにおけるデータ入力規則を管理する際に非常に便利な機能なんよ。これを使えば、入力規則を簡単に取得して処理できるけど、どんな場面でどう活用するのか、今回はその基礎から応用例まで、しっかり説明していくけ。

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

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

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

{{< blog-card "https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" >}}
{{< blog-card "https://qiita.com/Studio344/items/e359bbb48ef79ff24921" >}}
