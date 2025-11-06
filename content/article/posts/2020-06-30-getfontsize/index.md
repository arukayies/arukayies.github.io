---
title: Google Apps Scriptでフォントサイズを取得する方法：getFontSize()完全ガイド
author: arukayies
type: post
date: 2020-06-29T15:04:02+00:00
excerpt: GASでスプレッドシートの指定セルの文字サイズを取得する方法を紹介します！
url: /gas/getfontsize
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1593443044
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
  - 2025-03-06 16:47:53
categories:
  - GAS
tags:
  - GAS
  - getFontSize()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年6月"]
---
Googleスプレッドシートを使ってると、セルのフォントサイズを取得したい場面って結構あるばい。特にスクリプトを組んでると「このセルのフォントサイズは何ptか？」って知りたいことがあるっちゃね。そこで登場するのが `getFontSize()` メソッドじゃ。

今回は `getFontSize()` の基本から、複数セルのフォントサイズ取得、応用的な使い方まで、わかりやすく解説するけ！

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFontSize() とは？

`getFontSize()` はGoogle Apps Script（GAS）でスプレッドシートのセルのフォントサイズを取得するメソッドたい。

### 基本構文

<pre class="wp-block-code"><code>const fontSize = sheet.getRange("A1").getFontSize();
</code></pre>

このメソッドを使うと、指定したセルのフォントサイズを整数値（ポイント単位）で取得できるっちゃ。

### 動作のポイント

<ul class="wp-block-list">
  <li>
    <strong>整数値で返る</strong>（小数点以下の値は切り捨てられる）
  </li>
  <li>
    <strong>複数セルを選択すると、左上のセルの値が返る</strong>（範囲指定するなら <code>getFontSizes()</code> を使うべし）
  </li>
  <li>
    <strong>空白セルや未設定セルはデフォルト値（10pt）を返す</strong>
  </li>
</ul>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 単一セルのフォントサイズを取得する

まずは基本的な使い方を見てみるばい。

<pre class="wp-block-code"><code>function getSingleCellFontSize() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const targetCell = sheet.getRange("B2");
  const fontSize = targetCell.getFontSize();
  Logger.log(`B2セルのフォントサイズ: ${fontSize}pt`);
}
</code></pre>

B2セルのフォントサイズを取得してログに出力するだけのシンプルなスクリプトたい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## 複数セルのフォントサイズを取得する

複数セルのフォントサイズを取得したいときは `getFontSizes()` を使うばい。

<pre class="wp-block-code"><code>function getRangeFontSizes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("B2:C3");
  const fontSizes = range.getFontSizes();
  
  fontSizes.forEach((row, rowIndex) =&gt; {
    row.forEach((size, colIndex) =&gt; {
      const cellAddress = String.fromCharCode(66 + colIndex) + (2 + rowIndex);
      Logger.log(`セル${cellAddress}: ${size}pt`);
    });
  });
}
</code></pre>

<hr class="wp-block-separator has-alpha-channel-opacity" />

## getFontSize() の応用編

### エラー処理を組み込む

<pre class="wp-block-code"><code>function safeGetFontSize() {
  try {
    const range = SpreadsheetApp.getActiveRange();
    if (!range) throw new Error('有効な範囲が選択されていません');
    return range.getFontSize();
  } catch (error) {
    console.error(`エラーが発生しました: ${error.message}`);
    return -1; // エラー識別用の戻り値
  }
}
</code></pre>

スクリプト実行時に範囲が選択されていない場合のエラーを回避するための処理たい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

<ul class="wp-block-list">
  <li>
    <code>getFontSize()</code> はセルのフォントサイズを整数値で取得するメソッド
  </li>
  <li>
    <strong>複数セルを取得したいなら <code>getFontSizes()</code> を使うべし</strong>
  </li>
  <li>
    <strong>エラーハンドリングを組み込んで安全にスクリプトを動かすのが吉</strong>
  </li>
</ul>

Google Apps Scriptを使いこなすには、こういった細かい部分の理解も大事ばい。`getFontSize()` を活用して、スプレッドシートのデータ整理をもっと便利にしてみるけ！

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
  
  <br /> <a rel="noopener" href="https://mebee.info" title="IT技術情報共有サイト│mebee" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://mebee.info/wp-content/uploads/2020/02/mebee.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://mebee.info/wp-content/uploads/2020/02/mebee.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        IT技術情報共有サイト│mebee
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        IT技術情報共有サイト
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://mebee.info" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://mebee.info" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          mebee.info
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a href="https://techuplife.tech/gas-ss-rtextwrap/"><a href="https://qiita.com)/">https://qiita.com</a></a>
</div>
