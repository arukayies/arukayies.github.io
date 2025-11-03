---
title: GASでスプレッドシートのデータ最終行を取得して効率的に処理する方法
author: arukayies
type: post
date: 2020-07-17T12:43:27+00:00
excerpt: GASでスプレッドシートの指定範囲の最終行番号を取得する方法を紹介します！
url: /gas/getlastrow
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1594989808
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
  - 2025-03-07 21:45:03
categories:
  - GAS
tags:
  - GAS
  - getLastRow()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作する際に便利なメソッドがあるけど、それが「getLastRow()」メソッドだよ。このメソッド、実はデータ管理をとっても効率的にしてくれるんよね。今回はこの「getLastRow()」メソッドについて、初心者の方でも理解できるように、実践的な使い方から応用方法までをわかりやすく解説するけ。

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

## 「getLastRow()」って何？基本を知ろう！

まず最初に「getLastRow()」メソッドが何をしてくれるかから話すばい。このメソッドは、スプレッドシートのシート内でデータが入力されている「最後の行番号」を教えてくれるんよ。たとえば、A1からD6までデータが入っていたら、最後の行番号は6になるけ。

### 基本的な使い方

シンプルにコードを書いてみるけど、こんな感じで使うことができるんよ。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSheet();
const lastRow = sheet.getLastRow();
</code></pre>

このコードで、シートの最後の行番号を取得してくれるんよね。これを使うと、新しいデータの入力位置を簡単に知ることができるけ！

### 動作の仕組み

「getLastRow()」がどんな仕組みで動いているか気になるところだと思うけど、このメソッドは、シートの中でデータが入力されている最下行を探してくれるんよ。内部的には、セルを下に向かってチェックしていって、データが入力されている最後のセルを見つけるんやけど、空のセルは無視されるから、無駄な行を気にせずに済むんよ。

## 実際の使い方は？こんなシーンで活躍するよ！

### 基本のデータ取得

例えば、スプレッドシートに「SalesData」っていうシートがあったとしたら、その最終行を取得するにはこんな感じでコードを書くけ。

<pre class="wp-block-code"><code>function logLastRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SalesData');
  const lastRow = sheet.getLastRow();
  console.log(`データは行 ${lastRow} で終わっています`);
}
</code></pre>

このスクリプトを実行すると、指定したシートの最終行がコンソールに表示されるんよ。業務でよく使われるのは、この値を基に次に入力するデータの位置を決めたりする場面だね。

### ループ処理での活用

もっと高度な使い方として、ループ処理と組み合わせることができるんよ。たとえば、以下のコードはシートの最終行までデータを処理する例だっちゃ。

<pre class="wp-block-code"><code>function processAllRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  for (let i = 1; i &lt;= lastRow; i++) {
    const rowData = sheet.getRange(i, 1).getValue(); // 1列目のデータを取得
    console.log(rowData);
  }
}
</code></pre>

これで、1行目から最終行までのデータを順番に取得して処理できるんだね！

## もっと便利な使い方！

### データの一括処理でパフォーマンスアップ

大量のデータを扱う場合、一行ずつ処理していると時間がかかるけん、一度に範囲を読み込んで処理する方が効率的やで。以下のコードでは、一括でデータを取得してから処理している例だっちゃ。

<pre class="wp-block-code"><code>function optimizePerformance() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // 一括読み込み
  const data = sheet.getRange(1, 1, lastRow, 15).getValues();
  
  // メモリ上で処理
  const processedData = data.map(row =&gt; {
    // ここでデータを加工
  });
  
  // 一括書き込み
  sheet.getRange(1, 16, processedData.length, processedData&#91;0].length)
       .setValues(processedData);
}
</code></pre>

これでAPIを複数回呼び出すことなく、データの処理を高速化できるんよ！

## トラブルを防ぐために！エラーハンドリング

プログラムを実行していると、エラーが出ることもあるけど、しっかりエラーハンドリングしておけば安心ばい。例えば、データがないシートを処理しようとするとエラーが発生することもあるけん、以下のように例外処理を追加することが大事だよ。

<pre class="wp-block-code"><code>function safeGetLastRow() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow === 0) {
      throw new Error('シートにデータがありません');
    }
    
    return lastRow;
    
  } catch (error) {
    console.error(`エラーが発生しました: ${error.message}`);
    return null;
  }
}
</code></pre>

こうすることで、エラーが発生してもちゃんとログを取って問題を解決できるようになるんよ。

## まとめ

「getLastRow()」は、Google Apps Scriptでスプレッドシートを扱うときに非常に便利なメソッドやけん、しっかり理解して使いこなせば、データ管理がずっと楽になるよ。特に大量のデータを扱う場合、このメソッドを上手に使うことでパフォーマンスを向上させることができるけ！データ処理が楽になって、より効率的に仕事ができるようになるけん、ぜひ活用してみてね。

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
  <a rel="noopener" href="https://rinyan-7.com/gas/sheet_getlastrow/" title="&#12304;getLastRow&#12513;&#12477;&#12483;&#12489;&#12305;&#12487;&#12540;&#12479;&#31649;&#29702;&#12434;&#12473;&#12512;&#12540;&#12474;&#12395;&#65281;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fsheet_getlastrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Fsheet_getlastrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;getLastRow&#12513;&#12477;&#12483;&#12489;&#12305;&#12487;&#12540;&#12479;&#31649;&#29702;&#12434;&#12473;&#12512;&#12540;&#12474;&#12395;&#65281;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/sheet_getlastrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/sheet_getlastrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://tetsuooo.net/gas/330/" title="【GAS】getLastRowでスプレッドシートの最終行を取得する" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://tetsuooo.net/wp-content/uploads/2022/07/21830a0I9A97521937.jpg.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://tetsuooo.net/wp-content/uploads/2022/07/21830a0I9A97521937.jpg.webp" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】getLastRowでスプレッドシートの最終行を取得する
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script（GAS）のgetLastRowメソッドの使い方を解説します。スプレッドシートでデータが格納されているシートの最終行を取得してくれるため、シート...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://tetsuooo.net/gas/330/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://tetsuooo.net/gas/330/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          tetsuooo.net
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://auto-worker.com/blog/?p=1354" title="Google Apps Script(GAS)でスプレッドシートの最終行を取得する(getLastRow) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://auto-worker.com/blog/wp-content/uploads/2020/08/20200803_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://auto-worker.com/blog/wp-content/uploads/2020/08/20200803_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script(GAS)でスプレッドシートの最終行を取得する(getLastRow) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Googleスプレッドシートでデータが格納されているシートの最終行を、Google Apps Script(GAS)で取得する方法を解説します。 シート内にある全てのデータを処理...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1354" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=1354" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          auto-worker.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://uncle-gas.com/get-last-row/" title="GASでシートの最終行を取得する方法【列指定の方法も解説】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://uncle-gas.com/wp-content/uploads/2024/11/e4cf24c2c64c1a7d0572d10c4f6ff69b-1.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://uncle-gas.com/wp-content/uploads/2024/11/e4cf24c2c64c1a7d0572d10c4f6ff69b-1.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでシートの最終行を取得する方法【列指定の方法も解説】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートの最終行を取得する方法について解説します。実際の業務であり得るシーンを想定して、ケース別に詳しく解説していきます。また、Googleフォームの回答を別シートに転記する実践例も紹介します。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://uncle-gas.com/get-last-row/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://uncle-gas.com/get-last-row/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          uncle-gas.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://rinyan-7.com/gas/range_getlastrow/" title="&#12304;getLastRow&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#12398;&#12487;&#12540;&#12479;&#31649;&#29702;&#12434;&#21177;&#29575;&#21270;&#12377;&#12427;&#20855;&#20307;&#20363;&#12392;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getlastrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getlastrow%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;getLastRow&#12434;&#20351;&#12356;&#12371;&#12394;&#12381;&#12358;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#12398;&#12487;&#12540;&#12479;&#31649;&#29702;&#12434;&#21177;&#29575;&#21270;&#12377;&#12427;&#20855;&#20307;&#20363;&#12392;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getlastrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getlastrow/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a>
</div>
