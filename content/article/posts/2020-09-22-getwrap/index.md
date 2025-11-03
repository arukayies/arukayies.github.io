---
title: GASでスプレッドシートのセルの折り返し設定状態を取得・判定する方法
author: arukayies
type: post
date: 2020-09-22T09:22:22+00:00
excerpt: GASでスプレッドシートの指定セルがテキストの折り返しか取得する方法を紹介します！
url: /gas/getwrap
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1600766545
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
  - 2025-03-07 21:17:18
categories:
  - GAS
tags:
  - GAS
  - getWrap()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年9月"]
---
Google Apps Script（GAS）を使うと、スプレッドシートのテキスト折り返し設定をプログラムで簡単に管理できるんよ。今回はその中でも、`getWrap()`メソッドに焦点を当てて、具体的な使い方を紹介するけね。これを覚えると、大量のデータを扱うシートでも効率よく作業できるようになるばい！

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

## まずはテキスト折り返しって何？

スプレッドシートにおける「テキスト折り返し」とは、セル内に収まりきらないテキストが自動的に複数行に分かれる機能のことじゃ。これを設定することで、セル内のテキストが見やすくなったり、セルを越えてテキストが表示されるのを防いだりできるんよ。スプレッドシートでよく使われるテキスト表示のモードは次の3つやけ。

<ol class="wp-block-list">
  <li>
    <strong>折り返し（WRAP）</strong>：テキストがセル内で折り返して表示される。
  </li>
  <li>
    <strong>オーバーフロー（OVERFLOW）</strong>：隣接するセルにテキストが表示される。
  </li>
  <li>
    <strong>切り詰め（CLIP）</strong>：セル内でテキストが切り捨てられて表示される。
  </li>
</ol>

GASを使うと、この設定をプログラムで確認したり変更したりできるんよ。

## getWrap()メソッドってどう使うん？

`getWrap()`メソッドは、指定したセルのテキスト折り返しの状態を取得するためのメソッドじゃ。これを使うと、セルが折り返し設定されているかどうかを確認できるんよ。

### こんな風に使うと便利

例えば、あるシートの特定のセルが折り返し設定されているかどうかをチェックしたいときに使えるんよ。簡単なコード例を紹介するけ。

<pre class="wp-block-code"><code>function checkSingleCellWrap() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Report');
  const cell = sheet.getRange('B2');
  
  const isWrapped = cell.getWrap();
  console.log(`B2セルの折り返し状態: ${isWrapped}`);
}
</code></pre>

このコードでは、B2セルの折り返し状態を確認して、ログに出力してるんよ。`getWrap()`メソッドが返すのは、`true`（折り返しあり）か`false`（折り返しなし）やけ。

### 範囲全体でチェックする方法

複数のセルの折り返し状態を一度にチェックしたいときは、`getWraps()`を使うと便利じゃ。これを使うと、範囲内のすべてのセルの折り返し状態を二次元配列で取得できるんよ。

<pre class="wp-block-code"><code>function analyzeRangeWrapStatus() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getRange('A1:C10');
  const wrapStates = dataRange.getWraps();
  
  wrapStates.forEach((row, rowIndex) =&gt; {
    row.forEach((state, colIndex) =&gt; {
      if(!state) {
        console.log(`セル ${String.fromCharCode(65 + colIndex)}${rowIndex + 1} で折り返し未設定を検出`);
      }
    });
  });
}
</code></pre>

こうやって、シート内の特定範囲のセルで折り返しが設定されていないセルを見つけ出すことができるんよ。

## 応用的な使い方

### テキスト長に応じた折り返しの設定

たとえば、テキストが長すぎるときに自動で折り返しを設定したい場合、次のように書けるんよ。

<pre class="wp-block-code"><code>function applyDynamicWrapping() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  const wraps = values.map(row =&gt; 
    row.map(value =&gt; 
      value.toString().length &gt; 50 ? true : false
    )
  );
  
  range.setWraps(wraps);
}
</code></pre>

ここでは、文字数が50を超えるセルに対して自動で折り返しを設定してるんよ。

### パフォーマンスを最適化する方法

大量のデータを扱う場合、個別にセルを設定するより、範囲全体に一括で設定する方が断然早いんよ。たとえば、次のように処理をバッチで行うことができるんじゃ。

<pre class="wp-block-code"><code>function optimizeWrapProcessing() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const batchSize = 1000;
  
  for(let i=1; i &lt;= lastRow; i+=batchSize) {
    const range = sheet.getRange(i, 1, batchSize, sheet.getLastColumn());
    range.setWrap(true);  // 一度に範囲を設定
  }
}
</code></pre>

これで、1000行ごとにまとめて折り返しを設定できるから、処理が速くなるんよ。

## よくあるエラーとその解決法

### エラー事例

<ul class="wp-block-list">
  <li>
    <strong>範囲指定誤り</strong>：存在しないセルを指定すると、<code>TypeError</code>が発生することがあるけん、範囲を正しく確認してから使うようにしよう。
  </li>
  <li>
    <strong>権限不足</strong>：スクリプト実行時に適切な権限が設定されてないと、<code>アクセス権エラー</code>が出ることがあるから注意してね。
  </li>
</ul>

### デバッグ方法

エラーが出たときには、ログを使って調査するのが有効じゃ。たとえば、次のようにしてエラーメッセージを出力することができるんよ。

<pre class="wp-block-code"><code>function debugWrapMethods() {
  try {
    const range = SpreadsheetApp.getActiveRange();
    console.log('Selected Range:', range.getA1Notation());
    console.log('Wrap States:', JSON.stringify(range.getWraps()));
    
    range.setWrap(true);
    console.log('After setting wrap:', range.getWrap());
    
  } catch (error) {
    console.error(`Error: ${error.message}`, error.stack);
  }
}
</code></pre>

これで、問題がどこで発生しているのか、細かく追跡できるんよ。

## まとめ

`getWrap()`メソッドを使うと、スプレッドシートでテキスト折り返しを簡単に管理できるけん、業務で役立つこと間違いなしだよ。範囲指定やデータの動的処理もできるし、大規模データのパフォーマンス最適化にも活用できるんよ。今回紹介したテクニックを使って、スプレッドシート操作をもっと効率的にしてみてね！

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
  <a rel="noopener" href="https://techuplife.tech/gas-ss-rtextwrap/" title="[GAS]セルのテキストの折り返し設定を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/b3f88bbabf6a5371d5cba7108fdade92.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/b3f88bbabf6a5371d5cba7108fdade92.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]セルのテキストの折り返し設定を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルのテキストの折り返し設定を取得・設定する方法を説明
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rtextwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rtextwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ja" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getwrap/" title="セルの折り返しを取得する：getWrap()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="http://gsuiteguide.jp/wp-content/uploads/cover_googlespreadsheet-486x290.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        セルの折り返しを取得する：getWrap()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        セルの折り返しを取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプレッドシートにある最初のシートを取得 v...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getwrap/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/workstream/n/n882b8a7d601d" title="GAS(Google Apps Script)の公式ドキュメントとリリースノート｜KCompany" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/44473832/rectangle_large_type_2_c93503000ffbc44a8dcc023b7866601d.jpg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/44473832/rectangle_large_type_2_c93503000ffbc44a8dcc023b7866601d.jpg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GAS(Google Apps Script)の公式ドキュメントとリリースノート｜KCompany
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        こんにちは！KCompany代表のケータです！ 本日はGAS(Google Apps Script)の公式ドキュメントとリリースノートの紹介をします。紹介というか、実質個人的な備忘録・ブックマーク的なエントリーです。 公式ドキュメント 公式...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/workstream/n/n882b8a7d601d" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/workstream/n/n882b8a7d601d" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/body_gettext/" title="&#12304;`getText`&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12391;&#12489;&#12461;&#12517;&#12513;&#12531;&#12488;&#12398;&#12486;&#12461;&#12473;&#12488;&#12434;&#31777;&#21336;&#12395;&#21462;&#24471;&#12375;&#12424;&#12358;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fbody_gettext%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fbody_gettext%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;`getText`&#12513;&#12477;&#12483;&#12489;&#12398;&#39749;&#21147;&#12305;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12391;&#12489;&#12461;&#12517;&#12513;&#12531;&#12488;&#12398;&#12486;&#12461;&#12473;&#12488;&#12434;&#31777;&#21336;&#12395;&#21462;&#24471;&#12375;&#12424;&#12358;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/body_gettext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/body_gettext/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://matsukiyoshi.com/gas-getrange/" title="【スプレッドシート】GASで取得できるセル範囲の情報まとめ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://matsukiyoshi.com/wp-content/uploads/2022/07/student-g5f4750313_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://matsukiyoshi.com/wp-content/uploads/2022/07/student-g5f4750313_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【スプレッドシート】GASで取得できるセル範囲の情報まとめ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        この記事では「Rangeクラス」の機能のうち，セル範囲の情報の取得に関する機能をご紹介します．
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://matsukiyoshi.com/gas-getrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://matsukiyoshi.com/gas-getrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          matsukiyoshi.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-wrap-overflow-clip/" title="【GAS】スプレッドシートのテキスト折り返し機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/abarrow.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/abarrow.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのテキスト折り返し機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのテキスト折り返し機能をすべてまとめました。長いテキスト文字列をセルに設定する場合、折り返すか(WRAP)、はみ出すか(OVERFLOW)、切り詰めるか(CLIP)、迷いませんか？GASを使えばテキストの内
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-wrap-overflow-clip/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-wrap-overflow-clip/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://www.youtube.com/watch?v=jYtdF-ClN4g" title="YouTube" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjYtdF-ClN4g?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjYtdF-ClN4g?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        YouTube
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        作成した動画を友だち、家族、世界中の人たちと共有
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.youtube.com/watch?v=jYtdF-ClN4g" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.youtube.com/watch?v=jYtdF-ClN4g" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.youtube.com
        </div>
      </div>
    </div>
  </div></a>
</div>
