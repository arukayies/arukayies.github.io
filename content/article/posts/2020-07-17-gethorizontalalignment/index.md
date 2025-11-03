---
title: GASでスプレッドシートのセルの水平方向配置を取得する具体的な方法
author: arukayies
type: post
date: 2020-07-17T12:18:41+00:00
excerpt: GASでスプレッドシートのセルの水平方向の位置を取得する方法を紹介します！
url: /gas/gethorizontalalignment
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1594988322
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
  - 2025-03-07 23:09:10
categories:
  - GAS
tags:
  - GAS
  - getHorizontalAlignment()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使うと、Googleスプレッドシートの操作がより便利になるけど、その中でも特に「セルのテキスト配置」をプログラムで制御できるメソッドって、意外と使いどころが多いんだよね。今回はその中でも「getHorizontalAlignment()」メソッドに焦点を当てて、基本的な使い方から実際の活用法まで、分かりやすく解説するけんね！

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

<hr class="wp-block-separator has-alpha-channel-opacity" />

## セルの配置って何？

スプレッドシートでセルのテキストをどこに配置するか、例えば「左寄せ」「中央」「右寄せ」って設定するのは、見やすいデータを作るために欠かせんよね。この設定を手動で行うだけじゃなくて、GASを使うと自動化できるんだよ。

GASの「getHorizontalAlignment()」メソッドは、セルの現在の水平方向の配置を取得するために使うんよね。これを使うと、セルがどんな配置になっているかをプログラムで簡単に確認できるんだ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getHorizontalAlignment()の基本的な使い方

まずは、基本的な使い方から紹介するけ。

### メソッドの構文

<pre class="wp-block-code"><code>Range.getHorizontalAlignment() → String
</code></pre>

これだけで、指定したセルの配置がどんな状態かを文字列で返してくれるんだよ。

### 戻り値の種類

<ul class="wp-block-list">
  <li>
    <strong>&#8216;left&#8217;</strong>: 左寄せ
  </li>
  <li>
    <strong>&#8216;center&#8217;</strong>: 中央寄せ
  </li>
  <li>
    <strong>&#8216;right&#8217;</strong>: 右寄せ
  </li>
  <li>
    <strong>&#8216;general&#8217;</strong>: デフォルト（数値は右寄せ、文字は左寄せ）
  </li>
  <li>
    <strong>&#8216;general-left&#8217;</strong>: デフォルトで左寄せ（テキスト）
  </li>
  <li>
    <strong>null</strong>: 設定リセット状態
  </li>
</ul>

例えば、「数値データ」は通常右寄せになるんだけど、文字データは左寄せになるってことね。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 実際に使ってみよう

### 単一セルの配置取得

<pre class="wp-block-code"><code>function getAlignment() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('シート名');
  const cell = sheet.getRange('A1');
  const alignment = cell.getHorizontalAlignment();
  
  Logger.log('A1セルの配置は: ' + alignment);
}
</code></pre>

このコードでは、A1セルの配置を取得してログに表示するだけのシンプルな例なんだけど、セルの配置を確認したいときにはすごく便利なんよね。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 実践的な活用法

次に、実際にどんな場面で役立つかを見てみよう。

### 条件に応じて配置を変更

例えば、数値は右寄せ、テキストは左寄せにしたい場合、以下のように書けるんだ。

<pre class="wp-block-code"><code>function applyAlignment() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('データシート');
  const range = sheet.getRange('B2:F20');
  
  range.getValues().forEach((row, rowIndex) =&gt; {
    row.forEach((cellValue, colIndex) =&gt; {
      const cell = range.getCell(rowIndex + 1, colIndex + 1);
      const currentAlign = cell.getHorizontalAlignment();
      
      if (typeof cellValue === 'number' && currentAlign !== 'right') {
        cell.setHorizontalAlignment('right');
      } else if (typeof cellValue === 'string' && currentAlign !== 'left') {
        cell.setHorizontalAlignment('left');
      }
    });
  });
}
</code></pre>

このコードでは、セルの値が数値の場合は右寄せ、文字列の場合は左寄せに自動的に配置を変更するんよ。これで見た目が整うばい。

### 複数セルの配置分析

<pre class="wp-block-code"><code>function analyzeAlignment() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('売上データ');
  const range = sheet.getDataRange();
  const alignments = range.getHorizontalAlignments();
  
  let leftCount = 0, centerCount = 0, rightCount = 0;
  
  alignments.forEach(row =&gt; {
    row.forEach(align =&gt; {
      if (align === 'left') leftCount++;
      else if (align === 'center') centerCount++;
      else if (align === 'right') rightCount++;
    });
  });
  
  const result = `左寄せ: ${leftCount}セル, 中央: ${centerCount}セル, 右寄せ: ${rightCount}セル`;
  Logger.log(result);
}
</code></pre>

このコードでは、スプレッドシート内のセルの配置を集計して、どの配置が何セルあるのかをカウントしてるんだよ。大きなデータセットを扱う時に便利な機能ばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## よくある注意点とベストプラクティス

### 1. 範囲指定時の挙動

範囲を指定した場合、必ず左上のセルの配置が返ってくるけん、注意が必要だよ。

### 2. 数式セルの挙動

数式セルはその結果によって配置が決まるんだよね。結果が数値なら右寄せ、文字なら左寄せになるから、注意しよう。

### 3. バッチ処理を使おう

大量のセルの配置を取得する場合、一度に範囲全体を取得した方が効率的だよ。個別に取得するより、範囲全体を一括で取得した方がパフォーマンスが良いんだよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

GASのgetHorizontalAlignment()メソッドは、スプレッドシートのセル配置をプログラムでコントロールするための強力なツールなんだ。単に配置を取得するだけじゃなくて、条件に応じて配置を変更したり、大規模データの配置分析に活用したりと、いろんな場面で役立つんよ。データ可視化を行う上でも欠かせん機能だから、ぜひ使ってみてくれ！

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
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-ralignment/" title="[GAS]水平方向・垂直方向のテキスト位置を取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-4.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-4.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]水平方向・垂直方向のテキスト位置を取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のセルの水平方向・垂直方向のテキスト位置を取得・設定する
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-ralignment/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-ralignment/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/31525029/how-to-set-horizontal-alignment-on-a-table-in-apps-script" title="How to Set Horizontal Alignment On A Table In Apps Script" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        How to Set Horizontal Alignment On A Table In Apps Script
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I am not able to find a way to horizontally align a table in a Google Doc using Google Apps Script. I have thoroughly ch...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/31525029/how-to-set-horizontal-alignment-on-a-table-in-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/31525029/how-to-set-horizontal-alignment-on-a-table-in-apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>

<hr class="wp-block-separator has-alpha-channel-opacity" />

これで、GASを使ったスプレッドシートのテキスト配置管理がばっちりできるようになったばい！
