---
title: GASでスプレッドシートの指定セルから数式を取得して活用する方法
author: arukayies
date: 2020-07-05T16:07:45+00:00
excerpt: GASでスプレッドシートの指定セルの数式を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593965267
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
  - getFormula()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを自動化したい？そげんときに役立つのが`getFormula()`メソッドばい！これは、セルに設定されとる数式を文字列として取得できる便利な機能たい。

「このセルにどんな数式が入っとるんやろ？」そんなときにサクッと使えるけん、しっかりマスターしてスプレッドシートをもっと便利にしよう！


## 1. getFormula()って何？

まずは基本から！このメソッドを使えば、指定したセルの数式を取得できるとよ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const cell = sheet.getRange("B2");
const formula = cell.getFormula();
Logger.log(formula); // "=SUM(A1:A10)" などが出力されるばい！
</code></pre>

もしB2に数式がなかったら、空文字`""`が返ってくるけん注意しよう。

## 2. 他のメソッドとどう違うと？

GASには数式を取得するメソッドが他にもあるばい！<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド名
    </th>
    
    <th>
      取得範囲
    </th>
    
    <th>
      表記法
    </th>
    
    <th>
      戻り値型
    </th>
  </tr>
  
  <tr>
    <td>
      getFormula()
    </td>
    
    <td>
      単一セル
    </td>
    
    <td>
      A1
    </td>
    
    <td>
      String
    </td>
  </tr>
  
  <tr>
    <td>
      getFormulas()
    </td>
    
    <td>
      範囲
    </td>
    
    <td>
      A1
    </td>
    
    <td>
      String[][]
    </td>
  </tr>
  
  <tr>
    <td>
      getFormulaR1C1()
    </td>
    
    <td>
      単一セル
    </td>
    
    <td>
      R1C1
    </td>
    
    <td>
      String
    </td>
  </tr>
  
  <tr>
    <td>
      getFormulasR1C1()
    </td>
    
    <td>
      範囲
    </td>
    
    <td>
      R1C1
    </td>
    
    <td>
      String[][]
    </td>
  </tr>
</table></figure> 

範囲指定したいときは`getFormulas()`や`getFormulasR1C1()`を使うと効率的たい！

## 3. getFormula()の活用テクニック

### 3.1 数式のバックアップを取ろう！

スプレッドシートの数式を別のシートにバックアップして、誤って上書きしても復元できるようにしよう！

<pre class="wp-block-code"><code>function backupFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Data');
  const sourceRange = sheet.getRange("A1:D10");
  const formulas = sourceRange.getFormulas();

  const backupSheet = ss.getSheetByName('Backup') || ss.insertSheet('Backup');
  backupSheet.getRange("A1:D10").setFormulas(formulas);
}
</code></pre>

### 3.2 どのセルがどこを参照しているか分析！

シート内の数式を解析して、どのセルがどのセルを参照しているかを可視化するスクリプトばい。

<pre class="wp-block-code"><code>function analyzeFormulaDependencies() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const formulas = range.getFormulas();

  const dependencyMap = {};

  formulas.forEach((row, rowIndex) =&gt; {
    row.forEach((formula, colIndex) =&gt; {
      if (formula) {
        const matches = formula.match(/&#91;A-Z]+\d+/g) || &#91;];
        dependencyMap&#91;`${colIndex + 1}-${rowIndex + 1}`] = matches;
      }
    });
  });
  
  console.log(JSON.stringify(dependencyMap, null, 2));
}
</code></pre>

## 4. 大量のデータを効率的に処理する！

スプレッドシートのデータが大量にある場合、一括で取得して処理する方が速いばい！

<pre class="wp-block-code"><code>function optimizedBatchProcessing() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('LargeData');
  const dataRange = sheet.getDataRange();
  
  const formulas = dataRange.getFormulas();
  const values = dataRange.getValues();
  
  const processedData = formulas.map((row, i) =&gt; {
    return row.map((formula, j) =&gt; {
      return formula ? formula : values&#91;i]&#91;j];
    });
  });
  
  sheet.getRange(1, 1, processedData.length, processedData&#91;0].length)
       .setFormulas(processedData);
}
</code></pre>

## 5. まとめ

`getFormula()`メソッドを活用すれば、スプレッドシートの数式を自在に操れるばい！

<ul class="wp-block-list">
  <li>
    <strong>数式の取得</strong> → <code>getFormula()</code>で単一セル、<code>getFormulas()</code>で範囲を取得
  </li>
  <li>
    <strong>数式のバックアップ</strong> → 別のシートに保存しておけば安心！
  </li>
  <li>
    <strong>数式の依存関係分析</strong> → どのセルがどこを参照しているかチェック
  </li>
  <li>
    <strong>大量データの最適化</strong> → 一括処理でサクサク動かす！
  </li>
</ul>

これを使いこなせば、スプレッドシートの自動化が一気にレベルアップするばい！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://zenn.dev/tokushun109/articles/b92550e069abf4" title="GASのgetFormula()で式を文字列として取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://res.cloudinary.com/zenn/image/upload/s--VMbxT1Az--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:GAS%25E3%2581%25AEgetFormula%2528%2529%25E3%2581%25A7%25E5%25BC%258F%25E3%2582%2592%25E6%2596%2587%25E5%25AD%2597%25E5%2588%2597%25E3%2581%25A8%25E3%2581%2597%25E3%2581%25A6%25E5%258F%2596%25E5%25BE%2597%25E3%2581%2599%25E3%2582%258B%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:tokushun109%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzg3NmE5NDU4ZWEuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://res.cloudinary.com/zenn/image/upload/s--VMbxT1Az--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:GAS%25E3%2581%25AEgetFormula%2528%2529%25E3%2581%25A7%25E5%25BC%258F%25E3%2582%2592%25E6%2596%2587%25E5%25AD%2597%25E5%2588%2597%25E3%2581%25A8%25E3%2581%2597%25E3%2581%25A6%25E5%258F%2596%25E5%25BE%2597%25E3%2581%2599%25E3%2582%258B%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:tokushun109%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzg3NmE5NDU4ZWEuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png?_a=BACAGSGT" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASのgetFormula()で式を文字列として取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://zenn.dev/tokushun109/articles/b92550e069abf4" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://zenn.dev/tokushun109/articles/b92550e069abf4" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          zenn.dev
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
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-formula/" title="【GAS】スプレッドシートの数式機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/formula.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/formula.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの数式機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの数式機能をすべてまとめました。たくさんある便利な関数を数式で簡単に設定できるようになると、やれることが無限大に拡がります。特にスプレッドシートはExcelにはない超強力な関数があるので、積極的に使うべきで
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-formula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-formula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getformula/" title="&#12475;&#12523;&#12398;&#25968;&#24335;&#12434;&#21462;&#24471;&#12377;&#12427; | getFormula()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getformula%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getformula%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#25968;&#24335;&#12434;&#21462;&#24471;&#12377;&#12427; | getFormula()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rformula/" title="[GAS]セルの数式を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-8.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-8.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]セルの数式を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルの数式を取得・設定する方法を説明します。 Rang
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rformula/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>

この情報を活かして、GASをどんどん使いこなしていこう！
