---
title: GASでスプレッドシートの範囲内にある数式を一括取得・活用する方法
author: arukayies
date: 2020-07-06T16:28:06+00:00
excerpt: GASでスプレッドシートの指定範囲すべての数式を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1594052887
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
  - getFormulas()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Googleスプレッドシートを使ってると、数式を一括で取得したくなることがあるばい。そんなときに役立つのが`getFormulas()`メソッドさ！この記事では、基本的な使い方から応用テクまで分かりやすく解説するばい。


## getFormulas()とは？

`getFormulas()`はGoogle Apps Script（GAS）でスプレッドシートの範囲内にある数式を取得できるメソッドさ。対象のセルに数式があればその内容を、なければ空文字（`''`）を返すばい。

### 使い方の基本

例えば、A1:C3の範囲にある数式を取得するには、こんな感じのコードを書くばい。

<pre class="wp-block-code"><code>function getFormulasExample() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1:C3");
  const formulas = range.getFormulas();
  
  formulas.forEach((row, rowIndex) =&gt; {
    row.forEach((formula, colIndex) =&gt; {
      if (formula) {
        Logger.log(`Cell ${range.getCell(rowIndex+1, colIndex+1).getA1Notation()}: ${formula}`);
      }
    });
  });
}
</code></pre>

## getFormulasR1C1()との違い

数式をR1C1形式（相対参照）で取得するには、`getFormulasR1C1()`を使うばい。

<pre class="wp-block-code"><code>const formulasR1C1 = sheet.getRange("A1:C3").getFormulasR1C1();
Logger.log(formulasR1C1);
</code></pre>

この方法なら`=R[1]C`みたいに参照が相対的になり、大規模データを扱うときに便利さ。

## 実践的な活用方法

### スプレッドシートの数式監査

スプレッドシートの数式を一覧でチェックするシステムを作るばい。

<pre class="wp-block-code"><code>function auditSpreadsheetFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const auditReport = &#91;];
  
  ss.getSheets().forEach(sheet =&gt; {
    const range = sheet.getDataRange();
    const formulas = range.getFormulas();
    
    formulas.forEach((row, i) =&gt; {
      row.forEach((formula, j) =&gt; {
        if (formula) {
          auditReport.push({
            sheet: sheet.getName(),
            cell: sheet.getRange(i+1, j+1).getA1Notation(),
            formula: formula
          });
        }
      });
    });
  });
  
  Logger.log(auditReport);
}
</code></pre>

### 動的な数式生成

テンプレートシートの数式を取得し、動的に値を埋め込むばい。

<pre class="wp-block-code"><code>function generateDynamicFormulas() {
  const templateSheet = SpreadsheetApp.getActive().getSheetByName('Template');
  const outputSheet = SpreadsheetApp.getActive().getSheetByName('Report');
  const lastMonthData = { month: '02', year: '2025' };
  
  const formulas = templateSheet.getRange("B2:F10").getFormulas();
  
  const processedFormulas = formulas.map(row =&gt;
    row.map(formula =&gt;
      formula.replace(/\{\{month\}\}/g, lastMonthData.month)
             .replace(/\{\{year\}\}/g, lastMonthData.year)
    )
  );
  
  outputSheet.getRange("B2:F10").setFormulas(processedFormulas);
}
</code></pre>

## よくあるエラーと対策

### 1. 範囲が不正

指定した範囲が間違ってると、エラーになるばい。

<pre class="wp-block-code"><code>if (!range || !range.getSheet()) {
  throw new Error('Invalid range specified');
}
</code></pre>

### 2. 数式パースエラー

無効な数式が入ってると動かないこともあるけ、エラーをキャッチしとくばい。

<pre class="wp-block-code"><code>try {
  const formulas = range.getFormulas();
} catch (e) {
  Logger.log(`Error: ${e.message}`);
}
</code></pre>

## まとめ

`getFormulas()`メソッドを使えば、スプレッドシートの数式を自在に扱えるばい。これを活用すれば、監査やレポート自動化、データ処理の効率化が簡単にできるけ。ぜひ試してみてさ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range#getFormulas" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Class Range  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://qiita.com/SONER-O/items/e80eb586d5ca8576aa65" title="【GAS】指定範囲のセルから数式と値を両方取得する(getValues()&getFormulas()) - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRmxoNi5nb29nbGV1c2VyY29udGVudC5jb20lMkYtSHNoUzNfZ3VDOUElMkZBQUFBQUFBQUFBSSUyRkFBQUFBQUFBQUFBJTJGQUNIaTNyZmpBMGNYcXRKeGI2ajdmTHctdkk5bm5qVHl3QSUyRnM1MCUyRnBob3RvLmpwZz9peGxpYj1yYi00LjAuMCZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9NGI4NmM4YmY5MTRkODg1ZmE0MGJiYThlN2QyZTliZWE%26blend-x%3D120%26blend-y%3D467%26blend-w%3D82%26blend-h%3D82%26blend-mode%3Dnormal%26s%3D566495f7145059ae0e4d018a499c4eb5?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUUzJTgwJTkwR0FTJUUzJTgwJTkxJUU2JThDJTg3JUU1JUFFJTlBJUU3JUFGJTg0JUU1JTlCJUIyJUUzJTgxJUFFJUUzJTgyJUJCJUUzJTgzJUFCJUUzJTgxJThCJUUzJTgyJTg5JUU2JTk1JUIwJUU1JUJDJThGJUUzJTgxJUE4JUU1JTgwJUE0JUUzJTgyJTkyJUU0JUI4JUExJUU2JTk2JUI5JUU1JThGJTk2JUU1JUJFJTk3JUUzJTgxJTk5JUUzJTgyJThCJTI4Z2V0VmFsdWVzJTI4JTI5JTI2Z2V0Rm9ybXVsYXMlMjglMjklMjkmdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz1mZWY3ZjI0ZmQyZTdkNmM4ZTYyNWE0ZWNiZjllYTllOA&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBTT05FUi1PJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9MTBkYWU0NTFhOGMwMGU2ZTcyODczNTE5NjYzOGNlNzE&#038;blend-x=242&#038;blend-y=480&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;s=550f65658ef564168b8ce96b5e04e95f" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】指定範囲のセルから数式と値を両方取得する(getValues()&getFormulas()) - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        概要 getValues()では値しか取得できません。 getFormulas()では数式しか取得できません。 数式と値が両方取れる関数が見つからなかったので作ってみました。 需要があるのかは謎です。 もっといい方法があるよ！という場合はコ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/SONER-O/items/e80eb586d5ca8576aa65" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/SONER-O/items/e80eb586d5ca8576aa65" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/" title="Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/va726f77ce19c264bc8ae4520f2ee26cc9641a80eead40c2c8c599dc34ccb25d1/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Develop high-quality, cloud-based solutions with ease.
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>
