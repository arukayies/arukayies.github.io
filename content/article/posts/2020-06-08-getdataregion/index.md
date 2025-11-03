---
title: GASでスプレッドシートの指定セルから値が存在する範囲を簡単取得する方法
author: arukayies
type: post
date: 2020-06-08T13:14:09+00:00
excerpt: GASでスプレッドシートの指定箇所から値が存在する範囲を取得する方法を紹介します！
url: /gas/getdataregion
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1591622049
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
  - 2025-03-07 22:21:21
categories:
  - GAS
tags:
  - GAS
  - getDataRegion()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使うと、Google スプレッドシートを簡単に操作できるばい。特に`getDataRegion()`メソッドは、データ範囲を自動で見つけるための便利なツールで、業務効率がグンと上がるんじゃけ。今回は、この`getDataRegion()`メソッドを初心者でもわかるように、使い方を説明していくけ。

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

## まずは基本！getDataRegion()とは？

`getDataRegion()`メソッドは、指定したセルを起点にして、その周りのデータが続く範囲を自動で探してくれるんじゃ。例えば、スプレッドシートで「データ範囲を全部選びたい！」ってとき、手動で範囲を選ばなくても、このメソッドを使えば自動で範囲を特定してくれるんだよ。ほんと便利ばい。

<pre class="wp-block-code"><code>function basicUsage() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('SalesData');
  const startingCell = sheet.getRange('B2');
  const dataRange = startingCell.getDataRegion();
  console.log(`検出範囲: ${dataRange.getA1Notation()}`);
}
</code></pre>

こんなふうに使うと、`B2`からデータが続いている範囲を自動で見つけてくれるけ。これでスプレッドシートの操作がぐっと楽になるんじゃ。

## ちょっと応用！列や行だけを選びたいとき

次は、もうちょっと高度な使い方を紹介するけ。実は、`getDataRegion()`メソッドには、**列（COLUMNS）**や**行（ROWS）**だけに限定して範囲を取得する機能もあるんよ。

<pre class="wp-block-code"><code>function dimensionExample() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Inventory');
  const baseCell = sheet.getRange('C5');
  
  // 列方向の範囲を取得
  const colRange = baseCell.getDataRegion(SpreadsheetApp.Dimension.COLUMNS);
  console.log(`列方向範囲: ${colRange.getA1Notation()}`);
  
  // 行方向の範囲を取得
  const rowRange = baseCell.getDataRegion(SpreadsheetApp.Dimension.ROWS);
  console.log(`行方向範囲: ${rowRange.getA1Notation()}`);
}
</code></pre>

これを使うと、例えば「列だけの範囲を選びたい」って時に便利さ。行と列で分けて範囲を取得できるから、表のデータ構造が複雑な時でも役立つばい。

## 実践！動的なデータ範囲の処理

例えば、販売データや在庫管理みたいなデータが毎月増えていくとき、手動で範囲を更新するのは大変じゃけ。そんなときに`getDataRegion()`を使うと、新しくデータが追加されても自動で範囲を調整してくれるんよ。

<pre class="wp-block-code"><code>function processDynamicData() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('MonthlySales');
  const headerCell = sheet.getRange('A1');
  const dataBody = headerCell.getDataRegion().offset(1, 0);
  
  const salesData = dataBody.getValues();
  salesData.forEach(row =&gt; {
    // データ処理のロジック
  });
}
</code></pre>

これで、データが追加されてもスクリプトを更新する必要がなくなるんじゃけ。まさに、スプレッドシートを動的に扱うための救世主ばい。

## 高度な活用法！複数のデータブロックを処理する

`getDataRegion()`は、複数のデータブロックを扱うときにも便利じゃけ。隣接したデータブロックを順番に処理したい場合、`getNextDataCell()`メソッドと組み合わせると、さらに強力になるんよ。

<pre class="wp-block-code"><code>function processMultipleRegions() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('MultiBlock');
  let currentCell = sheet.getRange('A1');
  
  while (currentCell.getValue()) {
    const region = currentCell.getDataRegion();
    processRegion(region);
    
    // 次のデータブロックへ
    currentCell = region.offset(region.getNumRows() + 1, 0);
  }
}
</code></pre>

これを使えば、隣接するデータブロックを自動で順に処理できるけ。これも業務効率化には欠かせんテクニックばい。

## エラーやデバッグも大事！

使いこなすうえで、よくあるエラーには気をつけなきゃいけんけ。例えば、意図しない範囲を取得してしまったり、処理が遅くなることもあるんじゃけ。そんな時は、エラーハンドリングやデバッグをしっかりと行うことが大事ばい。

<pre class="wp-block-code"><code>function debugDataRegion() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('TestData');
  const testCell = sheet.getRange('B3');
  
  try {
    const region = testCell.getDataRegion();
    console.log(`検出範囲: ${region.getA1Notation()}`);
    console.log(`包含データ: ${JSON.stringify(region.getValues())}`);
  } catch (e) {
    console.error(`エラー発生: ${e.message}`);
    console.log(`セル内容: ${testCell.getValue()}`);
  }
}
</code></pre>

こうすることで、エラー発生時にもどこが問題だったかを追いやすくなるんじゃけ。デバッグをしっかりと行って、安心してスクリプトを運用できるようにしようね。

## 結論

`getDataRegion()`メソッドは、Google Apps Scriptを使ったスプレッドシート操作の中でも超便利な機能の一つばい。これをうまく使いこなすことで、スプレッドシートでのデータ処理がスムーズになり、業務効率が大きくアップするんじゃ。データの範囲を自動で認識する機能は、どんな場面でも大活躍してくれるけ。これからも積極的に活用していくべきツールばい！

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
  <a rel="noopener" href="https://techuplife.tech/gas-ss-rcellrange/" title="[GAS]このセル範囲を起点として様々なセル範囲を取得する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/05/techuplife.tech_-10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/05/techuplife.tech_-10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]このセル範囲を起点として様々なセル範囲を取得する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲を起点として、様々なセル範囲を取得する方法を説明します。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rcellrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rcellrange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/gas-spreadsheet-getdatarange/" title="&#12487;&#12540;&#12479;&#12364;&#23384;&#22312;&#12377;&#12427;&#31684;&#22258;&#12434;&#21462;&#24471;&#12377;&#12427; | getDataRange()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fgas-spreadsheet-getdatarange%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fgas-spreadsheet-getdatarange%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12487;&#12540;&#12479;&#12364;&#23384;&#22312;&#12377;&#12427;&#31684;&#22258;&#12434;&#21462;&#24471;&#12377;&#12427; | getDataRange()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/gas-spreadsheet-getdatarange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/gas-spreadsheet-getdatarange/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://technical.verybestcbp.com/gascheckcheck/" title="【GAS】 チェックボックスでそのへんのチェックボックスをすべてON/OFFする方法(getDataRegion)" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://technical.verybestcbp.com/wp-content/uploads/2024/05/スプレッドシート-2.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://technical.verybestcbp.com/wp-content/uploads/2024/05/スプレッドシート-2.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】 チェックボックスでそのへんのチェックボックスをすべてON/OFFする方法(getDataRegion)
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        シート内の変化により(OnEdit)起動させる方法がわかります。 getDataRegionによりある程度の範囲を取得する方法がわかります。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://technical.verybestcbp.com/gascheckcheck/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://technical.verybestcbp.com/gascheckcheck/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          technical.verybestcbp.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" title="GASでのスプレッドシートの範囲選択について – TD SYNNEX BLOG" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/12/spreadsheet-gb43636953_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://jp.tdsynnex.com/blog/wp-content/uploads/2021/12/spreadsheet-gb43636953_1920.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでのスプレッドシートの範囲選択について – TD SYNNEX BLOG
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        この記事では、GoogleAppsScript（GAS）で扱うスプレッドシートの範囲選択について解説しています。GASでGoogleスプレッドシートを利用する場合、シートのセルを選択してデータを取得したり書き込んだりする場面が多々あるかと思...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://jp.tdsynnex.com/blog/google/gas-select-range-of-spreadsheet/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          jp.tdsynnex.com
        </div>
      </div>
    </div>
  </div></a>
</div>
