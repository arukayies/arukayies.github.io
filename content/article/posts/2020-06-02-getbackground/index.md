---
title: GASでスプレッドシートのセル背景色を効率的に取得・活用する方法
author: arukayies
date: 2020-06-02T12:30:15+00:00
excerpt: GASでスプレッドシートの指定セルの背景色を取得する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1591101016
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
  - getgetBackground()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Googleスプレッドシートの色管理、ちゃんとやってる？「このセルの色を取得したい！」ってときに使うのが `getBackground()` なんじゃ。GASを使ってスプレッドシートを自動化するなら、セルの色をプログラム的に扱うのは避けて通れんばい！

この記事では `getBackground()` の基本から応用、効率的なデータ処理までをバッチリ解説するけ。知らんかった人も、これを読めばスムーズに使いこなせるようになるさ！


## getBackground()メソッドの基本

`getBackground()` は `Range` クラスのメソッドで、セルの背景色を16進数のカラーコード（例：`#ffffff`）として取得する機能じゃ。

### 使い方

<pre class="wp-block-code"><code>const color = sheet.getRange("A1").getBackground();
console.log(color); // 例: "#ff0000"
</code></pre>

このコードはA1セルの背景色を取得するんじゃけど、範囲指定（例：`A1:B2`）すると左上セルの色しか取れんのじゃ\[1\]\[4\]。

### getBackgrounds()で複数セルの色を取得

複数セルの色を一括で取得したいなら `getBackgrounds()` を使うべし！

<pre class="wp-block-code"><code>const colors = sheet.getRange("A1:B2").getBackgrounds();
console.log(colors);
// &#91;&#91;'#ff0000', '#00ff00'], &#91;'#0000ff', '#ffffff']]
</code></pre>

戻り値は二次元配列になっとるけん、各セルの色をループで処理できるさ。

## 大規模データの最適化テクニック

セルの色を大量に取得すると処理が重くなるばい！こういうときは、**バッチ処理** や **キャッシュ** を活用すると効率アップじゃ！

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:Z1000");
const &#91;values, colors] = &#91;range.getValues(), range.getBackgrounds()];

values.forEach((row, i) =&gt; {
  row.forEach((cell, j) =&gt; {
    if(colors&#91;i]&#91;j] === '#fff000') {
      console.log(`セル ${i+1},${j+1} は警告色！`);
    }
  });
});
</code></pre>

この方法なら、1000行以上のデータでも爆速で処理できるばい！

## 条件付き書式の応用

GASを使えば、標準の条件付き書式じゃできん高度な処理も可能になるんじゃ！

<pre class="wp-block-code"><code>function highlightExpiredItems() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const colors = range.getBackgrounds();

  colors.forEach((row, i) =&gt; {
    row.forEach((color, j) =&gt; {
      if (color === '#ff0000') {
        sheet.getRange(i+1, j+1).setBackground('#ff9999');
      }
    });
  });
}
</code></pre>

このスクリプトを実行すれば、特定の色を見つけて、自動でハイライトする仕組みが作れるち！

## まとめ

`getBackground()` を使いこなせば、Googleスプレッドシートの色情報を活用して、データを直感的に管理できるようになるばい！特に `getBackgrounds()` との組み合わせは最強じゃけ、ぜひ活用してみるさ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://kuronn.com/article/getbackground-gas/" title="【GAS】スプレッドシートでセルの背景色を取得する|getBackground(s) | くろんの部屋" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kuronn.com/wp-content/uploads/2023/09/11-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kuronn.com/wp-content/uploads/2023/09/11-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートでセルの背景色を取得する|getBackground(s) | くろんの部屋
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS（Google Apps Script）を用いて、スプレッドシートのセルの背景色（カラーコード）を取得するメソッドは、単一セルの場合は『getBackgroundメソッド』、範囲の場合は『getBackgroundsメソッド』です。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getbackground-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getbackground-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kuronn.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hajiritsu.com/spreadsheet-gas-getbackground/" title="&#12475;&#12523;&#12398;&#32972;&#26223;&#33394;&#12434;&#21462;&#24471;&#12377;&#12427; | getBackground()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbackground%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhajiritsu.com%2Fspreadsheet-gas-getbackground%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12475;&#12523;&#12398;&#32972;&#26223;&#33394;&#12434;&#21462;&#24471;&#12377;&#12427; | getBackground()&#12304;GAS&#12305; &#8211; &#12399;&#12376;&#12426;&#12388;
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbackground/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hajiritsu.com/spreadsheet-gas-getbackground/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hajiritsu.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-background/" title="【GAS】スプレッドシートの背景色機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/background.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/background.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートの背景色機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートの背景色機能をすべてまとめました。重要なセルの背景色を変えればデータが際立ちますね。データを目立たせたい場合はフォント色の変更よりも効果的だと思います。RGB設定(赤・緑・青)や現在の色の取得などです。交互
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-background/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-background/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
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
</div>
