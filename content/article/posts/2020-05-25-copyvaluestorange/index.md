---
title: GASでスプレッドシートの指定範囲を値のみコピーする効率的な方法
author: arukayies
date: 2020-05-24T15:56:33+00:00
excerpt: GASでスプレッドシートの値のみをコピーする方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1590335793
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
  - copyValuesToRange()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年5月"]
---
Google Apps Script（GAS）を使ってスプレッドシート操作を自動化する際に、特定のセル範囲の値を別のシートにコピーする方法って、かなり便利ばい。そのために使うメソッドが`copyValuesToRange`なんだけど、ちょっと難しそうに見えるかもしれんね。でも心配せんで！ここでしっかり解説するけん、すぐに使えるようになるけ。


## copyValuesToRangeメソッドってどんなもの？

まず、このメソッドがどんなものか簡単に説明するばい。`copyValuesToRange(gridId, column, columnEnd, row, rowEnd)`って構文なんやけど、要するに「ある範囲の値を、別のシートの指定した範囲にコピーする」ためのものじゃ。これは、値だけをコピーして、書式とか数式は無視するところが特徴的やけ。

### 使い方の基本

<pre class="wp-block-code"><code>sourceRange.copyValuesToRange(gridId, column, columnEnd, row, rowEnd);
</code></pre>

このメソッドには5つのパラメータがあるけど、それぞれ簡単に説明するけ。

<ol class="wp-block-list">
  <li>
    <strong>gridId</strong>（シートID）<br />コピー先シートのIDを指定するんよ。これは<code>SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート名").getSheetId()</code>で取得できるけんね。
  </li>
  <li>
    <strong>column</strong>（開始列）<br />コピー先の開始列番号を指定するけ。たとえば「C列」は3番目なので、<code>3</code>って指定するんや。
  </li>
  <li>
    <strong>columnEnd</strong>（終了列）<br />コピー先の終了列番号も指定するけ。例えば「F列まで」コピーしたい場合、<code>6</code>って指定すればOKじゃ。
  </li>
  <li>
    <strong>row</strong>（開始行）<br />コピー先の開始行番号を指定するけ。1から始めるけど、例えば「5行目」からスタートしたいなら、<code>5</code>を指定するんや。
  </li>
  <li>
    <strong>rowEnd</strong>（終了行）<br />コピー先の終了行番号を指定するけ。たとえば「10行目」で終わるなら、<code>10</code>を指定するんじゃ。
  </li>
</ol>

## 実際のコードで見る基本の使い方

<pre class="wp-block-code"><code>function basicCopyExample() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('SalesData');
  const targetGridId = ss.getSheetByName('Archive').getSheetId();
  
  const sourceRange = sourceSheet.getRange('B2:E10');
  sourceRange.copyValuesToRange(
    targetGridId,
    3,  // C列から
    6,  // F列まで
    5,  // 5行目から
    13  // 13行目まで
  );
}
</code></pre>

このコードは、「SalesData」シートから「Archive」シートにデータをコピーするものやけ。範囲を指定する際に、行数や列数が一致していないとエラーが出るけ、注意せんといけんよ。

## 実践的な動的範囲コピー

次は、データの量が変動する場合のコピー方法について説明するけ。

<pre class="wp-block-code"><code>function dynamicRangeCopy() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('Inventory');
  const lastRow = sourceSheet.getLastRow();
  
  const sourceRange = sourceSheet.getRange(2, 1, lastRow-1, 4);
  const targetSheet = ss.getSheetByName('Backup');
  
  sourceRange.copyValuesToRange(
    targetSheet.getSheetId(),
    1, 
    4, 
    2, 
    lastRow
  );
}
</code></pre>

このコードは、「Inventory」シートのデータを「Backup」シートにコピーするものやけ。`getLastRow()`を使って最終行を動的に取得し、データの変動に対応しとるんや。

## よくあるエラーとその解決法

実装しているときに、よく出るエラーもあるけ。ここではそれに対する対策を紹介するけ。

### パラメータ不一致エラー

`Exception: Parameters don't match the method signature`ってエラーが出た場合、パラメータの型が違うことがあるけ。数値型を使うべきところで、文字列を使ってしまうことが多いけ、確認してみて。

### 範囲サイズ不一致エラー

コピー元とコピー先の範囲が一致しないと、`Exception: The coordinates or dimensions of the range are invalid`が出るけ。範囲をしっかり確認して、合わせるようにしようね。

## 最後に

`copyValuesToRange`メソッドを使うと、スプレッドシートのデータを簡単にコピーできるけ、特にデータ転送作業を自動化したいときにはとても役立つ機能じゃ。ただし、範囲やパラメータに注意が必要なので、実装前にしっかり確認してから使うようにしてほしいけね。

これで、スプレッドシートの操作をよりスムーズにできるようになるけ！みんなもぜひ使ってみてね。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://stackoverflow.com/questions/74161559/google-apps-script-copy-row-paste-as-values" title="Google Apps Script - copy row & paste as values" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Google Apps Script - copy row & paste as values
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I am trying to copy one range to another using GAS - but I need the range to 'paste as values'This code works (but paste...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/74161559/google-apps-script-copy-row-paste-as-values" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/74161559/google-apps-script-copy-row-paste-as-values" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/379/" title="【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートのGASでCopyToを使用して行列コピーしたり、自動で別シートにコピーや値のみコピーなど、CopyToでできることをまとめて解説しています。複数行にコピーする時の範囲指定など、なるべくわかりやすく解説してみたいと思います。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet/range" title="Class Range  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/v90b15eef664021f94a1ab8a4ca14c533325a9006d6183b165fb79714a6fcd6a0/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
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
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rmovecopyclear/" title="[GAS]このセル範囲の移動・コピー・削除を行う方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]このセル範囲の移動・コピー・削除を行う方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲の移動・コピー・削除を行う方法を説明します。 Range
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmovecopyclear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmovecopyclear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://note.com/light_mimosa502/n/n7c707ec41748" title="【生成AI×GAS】違うシートに値をコピーする｜オレンジピーチ★トシ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/145066185/rectangle_large_type_2_5115ee9419e1a3ce18bbd189606fc007.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/145066185/rectangle_large_type_2_5115ee9419e1a3ce18bbd189606fc007.jpeg?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【生成AI×GAS】違うシートに値をコピーする｜オレンジピーチ★トシ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        オレンジピーチのトシです。 今回は、シートを飛び越えて、値をコピーする方法を紹介します。 　データをコピーするときには、違うシートや、違うファイルにコピーすることが多いですよね。 　GAS(Google Apps Script)でスプレッド...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/light_mimosa502/n/n7c707ec41748" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/light_mimosa502/n/n7c707ec41748" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
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
  
  <br /> <a rel="noopener" href="https://developers.google.com/apps-script/reference/spreadsheet?hl=ja" title="Spreadsheet Service  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
</div>
