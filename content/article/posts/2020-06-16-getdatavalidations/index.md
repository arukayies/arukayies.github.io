---
title: GASでスプレッドシートの範囲内すべての入力規則を効率的に取得する方法
author: arukayies
date: 2020-06-16T14:41:48+00:00
excerpt: GASでスプレッドシートの範囲内すべての入力規則クラスを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1592318509
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
  - getDataValidations()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使って、スプレッドシートのデータ入力規則を効率よく管理する方法を紹介するばい。この「`getDataValidations()`」メソッドは、シート内の特定範囲に設定された入力規則を一括で取得・操作するための便利なツールだっちゃ。

今回は、その技術的な仕様から、実際の使い方まで、どんな場面で役立つかを分かりやすく解説するけ！もちろん、具体的なコードも紹介するから、すぐにでも試せるばい。


## getDataValidations()メソッドの基本

### 仕様について

`getDataValidations()`メソッドは、`Range`オブジェクトに対して呼び出すことで、指定した範囲内のセルに設定されたデータ検証ルールを二次元配列として返すんだよ。例えば、もしそのセルにデータ検証が設定されていなければ、配列の中身は`null`になるけど、検証ルールがあれば`DataValidation`オブジェクトが格納されるけ。

<pre class="wp-block-code"><code>const validations = sheet.getRange('A1:C3').getDataValidations();
validations.forEach((row, rowIndex) =&gt; {
  row.forEach((rule, colIndex) =&gt; {
    if (rule !== null) {
      console.log(`Cell ${String.fromCharCode(65 + colIndex)}${rowIndex + 1}:`, rule.getCriteriaType());
    }
  });
});
</code></pre>

このコードを使うと、範囲内の各セルの検証ルール（例えば、数値が特定の範囲内かどうか）を簡単に取得できるんだよね。

### DataValidationオブジェクトの解析

`DataValidation`オブジェクトからは、どんな種類のデータが許可されているかを知ることができるけ。例えば、以下のようなプロパティがあるんだ。

<ul class="wp-block-list">
  <li>
    <code>getCriteriaType()</code>: 検証基準（例えば、日付や数値の範囲）
  </li>
  <li>
    <code>getCriteriaValues()</code>: その基準値（日付範囲や数値の閾値）
  </li>
  <li>
    <code>getHelpText()</code>: 入力時のヘルプテキスト
  </li>
  <li>
    <code>getAllowInvalid()</code>: 無効な値を許容するかどうか
  </li>
</ul>

## 様々な検証パターンを取り扱う

### ドロップダウンリストの取得

リスト形式で入力規則を設定している場合、そのリストの値を取得する方法だっちゃ。`getCriteriaValues()`を使って参照範囲からリストを取得できるんだよ。

<pre class="wp-block-code"><code>const validation = range.getDataValidation();
if (validation.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
  const sourceRange = validation.getCriteriaValues()&#91;0];
  const values = sourceRange.getValues().flat().filter(String);
  console.log('許可値リスト:', values);
}
</code></pre>

こうすることで、リストから選択できる値を簡単に抽出できるんだ。

### チェックボックスの状態取得

チェックボックスの状態を取得する場合も、`getCriteriaValues()`を使うことで、チェックされた値や未チェックの値を取得できるばい。

<pre class="wp-block-code"><code>const checkboxValidation = cell.getDataValidation();
if (checkboxValidation.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX) {
  const &#91;checkedValue, uncheckedValue] = checkboxValidation.getCriteriaValues();
  console.log(`チェック時: ${checkedValue}, 未チェック時: ${uncheckedValue}`);
}
</code></pre>

## 大規模データの管理

### 一括更新

大量のデータに対して一括で検証ルールを変更したい場合、`getDataValidations()`で取得したデータを走査して、新しいルールを設定することができるけ。

<pre class="wp-block-code"><code>function updateValidations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const rules = range.getDataValidations();
  
  const newRules = rules.map(row =&gt; row.map(rule =&gt; {
    if (rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.DATE_BEFORE) {
      const newDate = new Date(); // 新しい基準日を設定
      return rule.copy().withCriteria(rule.getCriteriaType(), &#91;newDate]).build();
    }
    return rule;
  }));
  
  range.setDataValidations(newRules);
}
</code></pre>

### エクスポート機能

スプレッドシートの検証ルールをJSON形式でエクスポートすることもできるばい。これで後から確認したり、別のシートに適用したりできるんだ。

<pre class="wp-block-code"><code>function exportValidations() {
  const validations = {};
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const rules = range.getDataValidations();
  
  rules.forEach((row, rowIndex) =&gt; {
    row.forEach((rule, colIndex) =&gt; {
      if (rule) {
        const key = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
        validations&#91;key] = {
          criteria: rule.getCriteriaType().toString(),
          values: rule.getCriteriaValues().map(v =&gt; v instanceof Range ? v.getA1Notation() : v),
          helpText: rule.getHelpText()
        };
      }
    });
  });
  
  console.log(JSON.stringify(validations, null, 2));
}
</code></pre>

## パフォーマンスの最適化

### バッチ処理

大量データを扱う際には、バッチ処理を活用することでパフォーマンスを最適化できるけ。メモリ効率も考慮して、処理を分割して行うことが大事なんだよ。

<pre class="wp-block-code"><code>function batchUpdateValidations() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastCol);
  
  // メモリ効率を考慮したチャンク処理
  const chunkSize = 100;
  for (let i = 0; i &lt; lastRow; i += chunkSize) {
    const chunkRange = range.offset(i, 0, Math.min(chunkSize, lastRow - i), lastCol);
    const rules = chunkRange.getDataValidations();
    
    // 処理ロジック
    const newValidations = rules.map(row =&gt; row.map(rule =&gt; {
      if (rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.TEXT_LENGTH) {
        return rule.copy().withCriteria(rule.getCriteriaType(), &#91;rule.getCriteriaValues()&#91;0] + 1]).build();
      }
      return rule;
    }));
    
    chunkRange.setDataValidations(newValidations);
    SpreadsheetApp.flush();
  }
}
</code></pre>

## まとめ

`getDataValidations()`メソッドは、スプレッドシート内でデータ入力規則を管理するために欠かせないツールだっちゃ。これを使いこなすことで、データの整合性を保ちながら、さまざまなカスタマイズができるけ。リストからの選択やチェックボックスの状態、複雑な日付制約など、あらゆるシーンで活躍するばい。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" title="Spreadsheet Service  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v542d3325b8c925a6e7dd14f19a8348c865acec191636e2a431745f59e1ae1e12/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Spreadsheet Service  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-datavalidation/" title="【GAS】スプレッドシートのデータの入力規則機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/datavalidation.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/datavalidation.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのデータの入力規則機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのデータの入力規則機能をすべてまとめました。変なデータを入力させたくない時など、入力に制限をかけたい時、メチャクチャ便利ですね。GASのインプットにセルの値を使用する場合はガチガチにガードをかけておくと、実
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-datavalidation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-datavalidation/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/29119/n/neb9353c45258" title="note &#12372;&#25351;&#23450;&#12398;&#12506;&#12540;&#12472;&#12364;&#35211;&#12388;&#12363;&#12426;&#12414;&#12379;&#12435;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnote.com%2F29119%2Fn%2Fneb9353c45258?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnote.com%2F29119%2Fn%2Fneb9353c45258?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        note &#12372;&#25351;&#23450;&#12398;&#12506;&#12540;&#12472;&#12364;&#35211;&#12388;&#12363;&#12426;&#12414;&#12379;&#12435;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/29119/n/neb9353c45258" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/29119/n/neb9353c45258" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a>
</div>
