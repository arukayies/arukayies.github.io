---
title: GASでスプレッドシートの指定セルから数式をR1C1形式で取得する方法
author: arukayies
type: post
date: 2020-07-07T16:19:33+00:00
excerpt: GASでスプレッドシートの指定セルの数式(R1C1表記)を取得する方法を紹介します！
url: /gas/getformular1c1
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1594138775
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
  - 2025-03-07 21:51:42
categories:
  - GAS
tags:
  - GAS
  - getFormulaR1C1()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Googleスプレッドシートを自動化するとき、「セルの数式を取得して処理したい！」ってことあるよね？ そんなときに役立つのが `getFormulaR1C1()` ばい！ 今回は、これをどう活用するか、わかりやすく解説するさ。

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

## getFormulaR1C1()って何？

スプレッドシートのセルには、計算式が設定できるけど、それをスクリプトから取得したいときに使うメソッドが `getFormulaR1C1()` じゃ。普通の `getFormula()` との違いは、数式を **R1C1表記** で取得できること。

### A1表記とR1C1表記の違い

<table class="has-fixed-layout">
  <tr>
    <th>
      表記方法
    </th>
    
    <th>
      A1表記
    </th>
    
    <th>
      R1C1表記
    </th>
  </tr>
  
  <tr>
    <td>
      例
    </td>
    
    <td>
      <code>B5</code>
    </td>
    
    <td>
      <code>R5C2</code>
    </td>
  </tr>
  
  <tr>
    <td>
      相対参照
    </td>
    
    <td>
      <code>B2</code>
    </td>
    
    <td>
      <code>R[-3]C</code>
    </td>
  </tr>
</table></figure> 

`R1C1` は **行（Row）と列（Column）を数値で指定する方法** で、相対参照を使うと動的な範囲指定ができるさ。

## getFormulaR1C1()の基本的な使い方

<pre class="wp-block-code"><code>function getFormulaExample() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getRange("B5");
  const formula = cell.getFormulaR1C1();
  Logger.log(formula);
}
</code></pre>

例えば、B5セルに `=SUM(A2:A4)` が入ってる場合、`getFormulaR1C1()` で取得すると `=SUM(R[-3]C[-1]:R[-1]C[-1])` って返ってくるばい。

## 範囲の数式を一括取得する方法

セルが1つだけじゃなくて、複数のセル範囲の数式を一気に取得するには、 `getFormulasR1C1()` を使うといいち。

<pre class="wp-block-code"><code>function getMultipleFormulas() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B5:C6");
  const formulas = range.getFormulasR1C1();
  Logger.log(formulas);
}
</code></pre>

この方法を使うと、2次元配列で数式が返ってくるから、効率的に処理できるばい。

## getFormulaR1C1()の応用

### 1. 数式を監視して変更をログに記録

<pre class="wp-block-code"><code>function trackFormulaChanges() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:Z100");
  const formulas = range.getFormulasR1C1();
  
  formulas.forEach((row, rowIndex) =&gt; {
    row.forEach((formula, colIndex) =&gt; {
      if (formula.includes("IMPORTRANGE")) {
        Logger.log(`外部参照が R${rowIndex+1}C${colIndex+1} にあるばい: ${formula}`);
      }
    });
  });
}
</code></pre>

### 2. 動的な数式を挿入

<pre class="wp-block-code"><code>function insertDynamicFormulas() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startRow = 5;
  const numRows = 30;
  
  const baseFormula = "=SUM(R&#91;0]C&#91;-3]:R&#91;0]C&#91;-1])";
  const formulas = Array(numRows).fill(&#91;baseFormula]);
  
  sheet.getRange(startRow, 4, numRows, 1)
       .setFormulasR1C1(formulas);
}
</code></pre>

このスクリプトを実行すると、指定範囲のセルに動的な数式を一括設定できるっちゃ。

## getFormulaR1C1()を活用するとできること

✅ 相対参照を活用したダイナミックな数式処理  
✅ 範囲の数式を一括取得・設定して処理を効率化  
✅ 変更監視システムを作って数式の異常をチェック

GASでスプレッドシートをもっと便利に使いたいなら、`getFormulaR1C1()` は覚えておくべき機能ばい！

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
{{< blog-card "https://caymezon.com/gas-formula/" >}}
