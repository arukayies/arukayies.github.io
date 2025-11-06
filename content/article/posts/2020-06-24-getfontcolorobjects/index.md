---
title: GASでスプレッドシートの指定範囲から文字色のカラークラスを効率的に取得する方法
author: arukayies
date: 2020-06-23T15:39:23+00:00
excerpt: GASでスプレッドシートの指定範囲すべてのカラークラスを取得する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1592926764
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
  - getFontColorObjects()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Google Apps Script（GAS）を使ってスプレッドシートを操作しとると、セルの文字色を取得したい場面が出てくるばい。最近、`getFontColorObjects()`メソッドが登場して、これまでの`getFontColors()`からパワーアップしたんじゃ。今回は、この新メソッドをしっかり使いこなすための基礎から応用まで解説していくけ！


## getFontColorObjects()って何？

このメソッドを使うと、スプレッドシートのセル範囲の文字色を取得できるばい。返ってくるのは**Colorオブジェクト**の2次元配列で、各セルの色をRGB値や16進数カラーコードとして取得できるけ。

<pre class="wp-block-code"><code>const range = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A1:C3");
const colors = range.getFontColorObjects();
Logger.log(colors&#91;0]&#91;0].asHexString()); // A1セルの色を取得
</code></pre>

これまでの`getFontColors()`は単なる文字列を返すだけやったけど、`getFontColorObjects()`は色の操作がしやすくなったっちゃ。

## 旧メソッドと何が違うと？

<table class="has-fixed-layout">
  <tr>
    <th>
      メソッド
    </th>
    
    <th>
      返り値
    </th>
    
    <th>
      特徴
    </th>
  </tr>
  
  <tr>
    <td>
      getFontColors()
    </td>
    
    <td>
      文字列（&#8221;#FF0000&#8243; など）
    </td>
    
    <td>
      文字色を直接16進数コードで取得
    </td>
  </tr>
  
  <tr>
    <td>
      getFontColorObjects()
    </td>
    
    <td>
      Colorオブジェクト
    </td>
    
    <td>
      RGB値やHex形式に変換可能
    </td>
  </tr>
</table></figure> 

新メソッドを使えば、RGBの各成分を取得したり、カスタム処理に組み込んだりできるけ。

<pre class="wp-block-code"><code>const color = range.getFontColorObjects()&#91;0]&#91;0];
Logger.log(`R:${color.getRed()} G:${color.getGreen()} B:${color.getBlue()}`);
</code></pre>

## 実践！範囲内の文字色をチェックして変更する

例えば、セルの文字色が赤（#FF0000）なら緑（#00FF00）に変更するスクリプトを作ってみるばい。

<pre class="wp-block-code"><code>function changeRedToGreen() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("A1:D10");
  const colors = range.getFontColorObjects();

  const newColors = colors.map(row =&gt;
    row.map(cell =&gt; {
      return (cell.asHexString() === "#FF0000")
        ? SpreadsheetApp.newColor().setRgbColor("#00FF00").build()
        : cell;
    })
  );

  range.setFontColorObjects(newColors);
}
</code></pre>

これで、赤文字を一括で緑文字に変えられるっちゃ！

## まとめ

`getFontColorObjects()`メソッドを活用すれば、

<ul class="wp-block-list">
  <li>
    文字色の取得と変換が自由自在
  </li>
  <li>
    旧メソッド<code>getFontColors()</code>よりも細かい操作が可能
  </li>
  <li>
    色の条件分岐や一括変更がスムーズにできる
  </li>
</ul>

GASでスプレッドシートの色管理をもっと便利にしたい人は、ぜひこの新メソッドを試してみるばい！


<hr class="wp-block-separator has-alpha-channel-opacity" />

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
  
  <br /> <a rel="noopener" href="https://kuronn.com/article/getfontcolorobject-gas/" title="【GAS】スプレッドシートで値・文字列の文字色を取得 | くろんの部屋" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kuronn.com/wp-content/uploads/2023/09/10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kuronn.com/wp-content/uploads/2023/09/10.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートで値・文字列の文字色を取得 | くろんの部屋
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS（Google Apps Script）を用いて、スプレッドシートのセルに入力された値・文字列の文字色（カラーコード）を取得するメソッドは単一セルの場合は『getFontColorObjectメソッド』、範囲の場合は『getFontC
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getfontcolorobject-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/getfontcolorobject-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kuronn.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://stackoverflow.com/questions/68414551/unknown-function-getfontcolor" title="Unknown function: &#039;getFontColor&#039;" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
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
        Unknown function: 'getFontColor'
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        I am trying to use getFontColor() in a conditional concatenate formula, but google sheets keeps throwing the error Unkno...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/68414551/unknown-function-getfontcolor" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://stackoverflow.com/questions/68414551/unknown-function-getfontcolor" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          stackoverflow.com
        </div>
      </div>
    </div>
  </div></a>
</div>
