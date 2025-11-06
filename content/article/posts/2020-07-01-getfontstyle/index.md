---
title: GASでスプレッドシートの指定セルからフォントスタイルを取得する方法
author: arukayies
date: 2020-07-01T13:37:02+00:00
excerpt: GASでスプレッドシートの指定セルの文字装飾を取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1593610623
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
  - getFontStyle()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）を使えば、Googleスプレッドシートのセルのフォントスタイルを取得できるばい。特に`getFontStyle()`メソッドを活用すれば、セル内のテキストが「標準」「イタリック」「疑似イタリック」のどれなのかを簡単に取得できるけ！この記事では、初心者でも分かりやすく、このメソッドの使い方を解説していくばい。


## フォントスタイルとは？

Googleスプレッドシートで使えるフォントスタイルは、以下の3種類じゃ。

<ul class="wp-block-list">
  <li>
    <strong>normal</strong>：標準の直立書体
  </li>
  <li>
    <strong>italic</strong>：右に傾いたイタリック体
  </li>
  <li>
    <strong>oblique</strong>：機械的に傾斜をつけた疑似イタリック体
  </li>
</ul>

通常の業務では「italic」を使うことが多く、「oblique」はほぼ使われんじゃろうね。

## getFontStyle()メソッドの基本

このメソッドを使うことで、セルのフォントスタイルを取得できるっちゃ！

### 使い方

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const range = sheet.getRange("A1");
const fontStyle = range.getFontStyle();
console.log("A1のフォントスタイル: " + fontStyle);
</code></pre>

このコードを実行すると、A1セルのフォントスタイル（&#8221;normal&#8221;、&#8221;italic&#8221;、&#8221;oblique&#8221;のいずれか）がログに表示されるけ。

### 複数セルの場合

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:C3");
const fontStyles = range.getFontStyles();
console.log(fontStyles);
</code></pre>

複数のセルを選択した場合は、2次元配列でそれぞれのフォントスタイルを取得できるばい。

## getFontStyle()の活用例

### イタリックのセルをハイライトする

<pre class="wp-block-code"><code>function highlightItalicCells() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const styles = range.getFontStyles();

  styles.forEach((row, i) =&gt; {
    row.forEach((style, j) =&gt; {
      if (style === "italic") {
        sheet.getRange(i + 1, j + 1).setBackground("#FFF3CD");
      }
    });
  });
}
</code></pre>

このスクリプトを実行すると、イタリックのセルが黄色くなるっちゃ！

## getFontStyle()の注意点

### リッチテキストには未対応

リッチテキスト（セル内の一部だけ異なるフォントスタイルを設定したテキスト）の場合、`getFontStyle()`は最初の部分のスタイルしか取得できんばい。リッチテキストを扱うには`getRichTextValue()`を使う必要があるけ。

### 大量データ処理には最適化が必要

何千、何万行のデータを処理するときは、`getFontStyles()`を使って一括取得するとパフォーマンスが向上するばい。

## まとめ

`getFontStyle()`メソッドを使えば、スプレッドシート内のフォントスタイルを簡単に取得できるばい。業務でのデータ整理やフォーマットチェックに活用できるけ、ぜひ試してみてね！


<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://www.tuyano.com/index3?id=641001&#038;page=4" title="&#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#21033;&#29992;&#12398;&#22522;&#26412;(4/5):&#21021;&#24515;&#32773;&#12398;&#12383;&#12417;&#12398;Google Apps Script&#12503;&#12525;&#12464;&#12521;&#12511;&#12531;&#12464;&#20837;&#38272; - libro" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.tuyano.com%2Findex3%3Fid%3D641001%26page%3D4?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.tuyano.com%2Findex3%3Fid%3D641001%26page%3D4?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        &#12473;&#12503;&#12524;&#12483;&#12489;&#12471;&#12540;&#12488;&#21033;&#29992;&#12398;&#22522;&#26412;(4/5):&#21021;&#24515;&#32773;&#12398;&#12383;&#12417;&#12398;Google Apps Script&#12503;&#12525;&#12464;&#12521;&#12511;&#12531;&#12464;&#20837;&#38272; - libro
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシート利用の基本(4/5):初心者のためのGoogle Apps Scriptプログラミング入門 - libro/Google Apps Scriptの最初の活用先といえば、やはり「スプレッドシート」のマクロとしての役割でしょう。...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.tuyano.com/index3?id=641001&#038;page=4" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.tuyano.com/index3?id=641001&#038;page=4" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.tuyano.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://kurage-studyroom.com/spreadsheets-change-font-color-gas" title="【GAS】スプレッドシートで複数セルの文字色を一括で自動変更する方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kurage-studyroom.com/wp-content/uploads/2024/11/gas-spreadsheet-font-color-automation.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kurage-studyroom.com/wp-content/uploads/2024/11/gas-spreadsheet-font-color-automation.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートで複数セルの文字色を一括で自動変更する方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script(GAS)を使ってスプレッドシートの複数セルの文字色を自動変更する方法を詳しく解説します。初心者向けにステップバイステップガイドで解説しているので、簡単に作業効率アップを実現できます！
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kurage-studyroom.com/spreadsheets-change-font-color-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kurage-studyroom.com/spreadsheets-change-font-color-gas" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kurage-studyroom.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rfontsetting/" title="[GAS]フォントやフォントの色・線・斜体などを取得・設定する方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-3.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-3.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]フォントやフォントの色・線・斜体などを取得・設定する方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲のフォントや、色・線・斜体などのフォント関連の設定を取得
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rfontsetting/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rfontsetting/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://atmarkit.itmedia.co.jp/ait/articles/1702/27/news023_2.html" title="GASでGoogleスプレッドシートのセルのフォーマット、文字位置、色、サイズ、けい線などを変えるには" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://image.itmedia.co.jp/images/logo/1200x630_500x500_ait.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://image.itmedia.co.jp/images/logo/1200x630_500x500_ait.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでGoogleスプレッドシートのセルのフォーマット、文字位置、色、サイズ、けい線などを変えるには
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Googleが提供するGoogle Apps Script（GAS）のプログラミングで、Google Apps（主にスプレッドシート）を操作する方法を解説していく連載。今回は、スプレッドシートのセルのフォーマット、文字位置、色、サイズ、けい...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://atmarkit.itmedia.co.jp/ait/articles/1702/27/news023_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://atmarkit.itmedia.co.jp/ait/articles/1702/27/news023_2.html" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          atmarkit.itmedia.co.jp
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://caymezon.com/gas-font/" title="【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://caymezon.com/wp-content/uploads/2019/07/font.jpeg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのフォント機能まとめ【サンプルソース付】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS開発者向けにスプレッドシートのフォント機能をすべてまとめました。セルのデータを扱う時、フォントの色を変更したり、お気に入りの字体に変えたり、自由自在にオシャレに装飾できると素敵ですね。色、字体、太字、斜体、下線、サイズ設定と取得です。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://caymezon.com/gas-font/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          caymezon.com
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
