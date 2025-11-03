---
title: GASでスプレッドシートの指定範囲から列数を取得する方法徹底解説
author: arukayies
type: post
date: 2020-07-17T16:55:18+00:00
excerpt: GASでスプレッドシートの指定範囲の列数を取得する方法を紹介します！
url: /gas/getnumcolumns
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1595004920
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
  - 2025-03-07 21:41:46
categories:
  - GAS
tags:
  - GAS
  - getNumColumns()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
こんにちは！今日はGoogle Apps Script（GAS）の`getNumColumns()`メソッドについて解説するけん、興味がある人はぜひ読んでみてちょうだいね。

Google Apps Scriptは、Googleのスプレッドシートを使って自動化を進めるための便利なツールばい。その中でも、`getNumColumns()`メソッドはスプレッドシート内で特定の範囲に含まれる列数を取得するために使うことができるんだよね。実際にどんな場面で使えるのか、いろいろな使い方を紹介していくけん、見てみてちょうだい。

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

## getNumColumns()メソッドって何？

まずは、このメソッドの基本的な使い方を紹介するばい。`getNumColumns()`は、`Range`オブジェクトが保持しているセル範囲の列数を返すメソッドなんだ。例えば、セル範囲`B2:F20`を指定した場合、5列（B,C,D,E,F）の列数を返してくれるけど、範囲内の列数を動的に取得できるからめっちゃ便利だよ。

### 使い方

<pre class="wp-block-code"><code>function basicExample() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SalesData');
  const dataRange = sheet.getRange('B2:F20');
  const columnCount = dataRange.getNumColumns();
  Logger.log(`指定範囲の列数: ${columnCount}`); // 5が出力
}
</code></pre>

こんな感じで、シンプルに列数を取得できるけんね。

## 実践的な活用方法

### 動的に範囲を取得して列数を計算

次は、範囲を動的に取得して、列数を使って計算をする例を紹介するばい。ここでは、動的に取得した範囲の列ごとの合計値を求める処理をしているんだよ。

<pre class="wp-block-code"><code>function dynamicRangeProcessing() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange(2, 1, lastRow-1, sheet.getMaxColumns());
  
  const totalColumns = dataRange.getNumColumns();
  const columnData = dataRange.getValues();
  
  for (let col = 0; col &lt; totalColumns; col++) {
    let columnSum = 0;
    for (let row = 0; row &lt; columnData.length; row++) {
      columnSum += columnData&#91;row]&#91;col] || 0;
    }
    sheet.getRange(1, col + 1).setValue(columnSum);
  }
}
</code></pre>

ここでは、`getNumColumns()`を活用して範囲内の全列を処理して、列ごとの合計を求めることができるんだよ。

### 列数を基にしたデータ検証

さらに進んだ使い方も紹介するけん。例えば、データ検証を行うために、スプレッドシート内の列数をチェックして、足りない列を自動的に追加することができるんだ。

<pre class="wp-block-code"><code>function dataValidationSystem() {
  const templateSheet = SpreadsheetApp.openById('テンプレートID').getSheetByName('標準フォーマット');
  const currentSheet = SpreadsheetApp.getActiveSheet();
  
  const requiredColumns = templateSheet.getRange('A1:Z1').getNumColumns();
  const currentColumns = currentSheet.getDataRange().getNumColumns();
  
  if (currentColumns &lt; requiredColumns) {
    const missing = requiredColumns - currentColumns;
    currentSheet.insertColumnsAfter(currentColumns, missing);
    SpreadsheetApp.flush();
  }
}
</code></pre>

これで、必要な列数が足りてなければ、新しい列を追加してくれるんだよ。データ処理を効率的に行うために、列数をしっかり管理することが大切だよね。

## よくあるエラーとその対策

使ってると、こんなエラーに遭遇することもあるけど、簡単に解決できる方法もあるけんね。

### 範囲未定義エラー

<pre class="wp-block-code"><code>const range = sheet.getRange('存在しない範囲');
range.getNumColumns(); // エラー発生
</code></pre>

こんなエラーが出たら、範囲がちゃんと定義されているか確認して、範囲が存在しない場合はエラーを回避するようにしよう。

<pre class="wp-block-code"><code>if (range) {
  const cols = range.getNumColumns();
}
</code></pre>

### 0列範囲の処理

空の範囲を指定した場合、0列でも元の列幅が返ってきちゃうこともあるけん、注意が必要だよ。

<pre class="wp-block-code"><code>const emptyRange = sheet.getRange('A1:A10').clear();
console.log(emptyRange.getNumColumns()); // 1が返る
</code></pre>

## 結論

`getNumColumns()`メソッドを使えば、スプレッドシートの列数を動的に取得して、データの管理や自動化を進めることができるんだ。列数に関する他のメソッド（`getLastColumn()`や`getColumn()`）と合わせて使うことで、より複雑な処理を効率的に進められるばい。

普段から使っているスプレッドシートでも、ちょっとした工夫で自動化できるから、ぜひ試してみてちょうだいね！

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
  <a rel="noopener" href="https://rinyan-7.com/gas/range_getcolumn/" title="&#12304;`getColumn`&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#21015;&#30058;&#21495;&#12434;&#21462;&#24471;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getcolumn%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Frinyan-7.com%2Fgas%2Frange_getcolumn%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12304;`getColumn`&#12513;&#12477;&#12483;&#12489;&#12398;&#27963;&#29992;&#27861;&#12305;&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#12391;&#21015;&#30058;&#21495;&#12434;&#21462;&#24471;&#12377;&#12427;&#20351;&#12356;&#26041;&#12539;&#20855;&#20307;&#20363;&#12539;&#12469;&#12531;&#12503;&#12523;&#12467;&#12540;&#12489;&#12434;&#24505;&#24213;&#35299;&#35500;&#65281; &#8211; AI&#12392;&#23398;&#12406;&#65281;&#27096;&#12293;&#12394;&#12486;&#12540;&#12510;&#12304;&#12426;&#12435;&#12420;&#12435;&#23455;&#39443;&#23460;&#12305;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getcolumn/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://rinyan-7.com/gas/range_getcolumn/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          rinyan-7.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://community.monday.com/t/why-am-i-getting-this-error-with-google-apps-scripts/42036" title="Why am I getting this error with Google Apps Scripts?" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://global.discourse-cdn.com/monday/optimized/2X/b/bf17efcc990b3af42b34df4c9a38cfe9e86ff127_2_1024x234.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://global.discourse-cdn.com/monday/optimized/2X/b/bf17efcc990b3af42b34df4c9a38cfe9e86ff127_2_1024x234.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Why am I getting this error with Google Apps Scripts?
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Hi all, I am trying to get column IDs on GAS (google apps script) with the code below. But I am getting an error with be...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://community.monday.com/t/why-am-i-getting-this-error-with-google-apps-scripts/42036" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://community.monday.com/t/why-am-i-getting-this-error-with-google-apps-scripts/42036" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          community.monday.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-row-col-pnt-num-get/" title="【GAS】スプレッドシートの行列位置と行列数取得機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/row-col_num.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/row-col_num.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの行列位置と行列数取得機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの行列位置と行列数取得機能をすべてまとめました。スプレッドシート内の行や列の位置や選択したセルの行数、列数を取得して様々な処理に応用する場面はしょっちゅうあるはずです。この行列位置と行列数は基本中の基本では
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-row-col-pnt-num-get/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-row-col-pnt-num-get/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/20306794/google-apps-script-how-to-get-the-number-of-columns-in-a-sheet-alternative-wa" title="Google Apps Script: how to get the number of columns in a sheet? (alternative way)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Script: how to get the number of columns in a sheet? (alternative way)
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I want to use the number of columns in a sheet in a for loop. I could use a function like this, to stop when the loop fi...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/20306794/google-apps-script-how-to-get-the-number-of-columns-in-a-sheet-alternative-wa" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/20306794/google-apps-script-how-to-get-the-number-of-columns-in-a-sheet-alternative-wa" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://gsuiteguide.jp/sheets/getnumcolumns/" title="セル範囲にある列の列数を取得する：getNumColumns()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        セル範囲にある列の列数を取得する：getNumColumns()【GAS】 | G Suite ガイド - G Suite ガイド：G Suite の導入方法や使い方を徹底解説!
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        getNumColumns() セル範囲にある列の列数を取得する。 サンプルコード // 現在アクティブなスプレッドシートを取得 var ss = SpreadsheetApp.getActiveSpreadsheet(); // そのスプ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumcolumns/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://gsuiteguide.jp/sheets/getnumcolumns/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          gsuiteguide.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://www.youtube.com/watch?v=w9AXRfrhTCQ" title=" - YouTube" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dw9AXRfrhTCQ?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dw9AXRfrhTCQ?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        - YouTube
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.youtube.com/watch?v=w9AXRfrhTCQ" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.youtube.com/watch?v=w9AXRfrhTCQ" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.youtube.com
        </div>
      </div>
    </div>
  </div></a>
</div>
