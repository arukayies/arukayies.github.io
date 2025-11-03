---
title: GASでスプレッドシートの指定セルから値を取得する方法と注意点まとめ
author: arukayies
type: post
date: 2020-09-22T03:31:37+00:00
excerpt: GASでスプレッドシートの指定セルの値を取得する方法を紹介します！
url: /gas/getvalue
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600745499
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 2.5
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
last_modified:
  - 2025-03-07 21:25:20
categories:
  - GAS
tags:
  - GAS
  - getValue()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）を触ってると、必ず出てくるのが`getValue()`メソッドばい！スプレッドシートのデータを取得するための基本中の基本じゃけど、意外と落とし穴があるっちゃね。今回は、この`getValue()`の基本から応用まで、わかりやすく解説していくばい！

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

## getValue()って何するメソッド？

簡単に言うと、指定したセルの値を取得するメソッドたい。例えば、スプレッドシートのA1セルの値を取ってくるコードはこんな感じさ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const value = sheet.getRange("A1").getValue();
Logger.log(value);
</code></pre>

めっちゃシンプルじゃろ？でも、シンプルだからこそ、使い方を間違うとエラーやパフォーマンスの問題にハマるとよ。

## getValue()の基本的な使い方

### 単一セルの値を取得

<pre class="wp-block-code"><code>function getSingleValue() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const value = sheet.getRange("B5").getValue();
  Logger.log("B5の値: " + value);
}
</code></pre>

このコードで、B5セルの値を取得してログに出力するばい。特に難しいことはないけど、実際に使うときはデータ型に気をつけんといかんさ！

### 取得するデータ型に注意！

`getValue()`は、セルの内容に応じて返すデータ型が変わるとよ。<figure class="wp-block-table">

<table class="has-fixed-layout">
  <tr>
    <th>
      セルの内容
    </th>
    
    <th>
      返されるデータ型
    </th>
  </tr>
  
  <tr>
    <td>
      数値（123）
    </td>
    
    <td>
      Number型
    </td>
  </tr>
  
  <tr>
    <td>
      文字列（&#8221;Hello&#8221;）
    </td>
    
    <td>
      String型
    </td>
  </tr>
  
  <tr>
    <td>
      TRUE/FALSE
    </td>
    
    <td>
      Boolean型
    </td>
  </tr>
  
  <tr>
    <td>
      日付（2024/12/01）
    </td>
    
    <td>
      Dateオブジェクト
    </td>
  </tr>
</table></figure> 

例えば、セルが「2025/03/05」みたいな日付の時、`getValue()`は`Date`オブジェクトを返すばい。これを文字列として使いたいなら、`Utilities.formatDate()`を使うと良かけ。

<pre class="wp-block-code"><code>const dateValue = sheet.getRange("C3").getValue();
const formattedDate = Utilities.formatDate(dateValue, Session.getScriptTimeZone(), "yyyy/MM/dd");
Logger.log("フォーマット後の日付: " + formattedDate);
</code></pre>

## getValue()の応用編

### 複数セルの値を取得したい？

`getValue()`は1セルしか取れんばい。複数セルをまとめて取るときは、`getValues()`を使うのがオススメ！

<pre class="wp-block-code"><code>function getMultipleValues() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getRange("A1:A10").getValues();
  Logger.log(values);
}
</code></pre>

この方法なら、A1からA10の値を一気に取れるばい。ループ処理を使うときも、この方法のほうが高速じゃけ。

### 条件付きでセルの色を変更！

取得した値を使って、条件を満たしたセルに色を付けることもできるばい。

<pre class="wp-block-code"><code>function highlightCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getRange("A1:C10").getValues();
  
  values.forEach((row, rowIndex) =&gt; {
    row.forEach((cellValue, colIndex) =&gt; {
      if(cellValue &gt; 100) {
        sheet.getRange(rowIndex + 1, colIndex + 1).setBackground("#FF0000");
      }
    });
  });
}
</code></pre>

このコードを使えば、100以上の値が入ってるセルに赤色を付けられるばい！

## getValue()の落とし穴と対策

### 1. getValue()をループで使うのはNG！

こんなコードを書いてないかい？

<pre class="wp-block-code"><code>for (let i = 1; i &lt;= 100; i++) {
  let value = sheet.getRange("A" + i).getValue();
  Logger.log(value);
}
</code></pre>

この方法、めちゃくちゃ遅いばい！`getValues()`を使えば、一気に取得できて処理が速くなるさ。

<pre class="wp-block-code"><code>const values = sheet.getRange("A1:A100").getValues();
values.forEach(value =&gt; Logger.log(value));
</code></pre>

### 2. 存在しないセルを取得しようとするとエラー！

指定した範囲が無効だと、`getValue()`はエラーを出すばい。エラーを防ぐには、例外処理を入れるのがオススメさ。

<pre class="wp-block-code"><code>try {
  const value = sheet.getRange("Z1000").getValue();
  Logger.log(value);
} catch (e) {
  Logger.log("エラー発生: " + e.message);
}
</code></pre>

## まとめ

`getValue()`はシンプルだけど、データ型やパフォーマンスを意識せんと意外とハマるメソッドばい。以下のポイントを押さえれば、スマートに使いこなせるさ。

<ul class="wp-block-list">
  <li>
    <code>getValue()</code>は1セル専用、複数セルなら<code>getValues()</code>を使う！
  </li>
  <li>
    取得するデータ型を意識する！
  </li>
  <li>
    ループで<code>getValue()</code>を使わず、まとめて取得して高速化する！
  </li>
  <li>
    例外処理を入れてエラー対策をする！
  </li>
</ul>

GASを使いこなして、効率よくスプレッドシートを操作しようばい！

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

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Class Range  |  Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://uncle-gas.com/spreadsheet-getvalue-setvalue/" title="【GASの始め方】getValueで値を取得してsetValueで入力しよう" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://uncle-gas.com/wp-content/uploads/2023/07/d4db07e0d3efc649e67f27455486b2f7.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://uncle-gas.com/wp-content/uploads/2023/07/d4db07e0d3efc649e67f27455486b2f7.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GASの始め方】getValueで値を取得してsetValueで入力しよう
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        連載「GASでスプレッドシートを自由自在に操るためのスキル習得講座」シリーズの第3回です。今回は単一のセルの値を取得するためのプログラム「getValue」について解説していきます。また、setValueと組み合わせて使う方法も説明します。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://uncle-gas.com/spreadsheet-getvalue-setvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://uncle-gas.com/spreadsheet-getvalue-setvalue/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          uncle-gas.com
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
</div>
