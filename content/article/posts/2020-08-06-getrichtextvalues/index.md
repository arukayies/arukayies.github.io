---
title: GASでスプレッドシートの指定範囲からリッチテキスト情報を一括取得する方法
author: arukayies
date: 2020-08-06T14:31:40+00:00
excerpt: GASでスプレッドシートの指定範囲すべてのリッチテキストを取得する方法を紹介します！
toc: true
snap_isAutoPosted:
  - 1596724301
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
  - getRichTextValues()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年8月"]
---
Googleスプレッドシートを使いこなしたいなら、&#8221;リッチテキスト&#8221; も避けては通れんばい。普通の文字列じゃなくて、部分的に太字にしたり、色を変えたり、リンクを仕込んだり……そんな高度な装飾を自在に操れると、シートの見栄えも格段にアップするっちゃね！

今回は、Google Apps Script（GAS）の `getRichTextValues()` メソッドを中心に、リッチテキストの扱い方を分かりやすく解説するけん、しっかりついてきてね。


<hr class="wp-block-separator has-alpha-channel-opacity" />

## リッチテキストとは？

スプレッドシートのセルに書き込む文字列は、普通のテキスト（プレーンテキスト）とリッチテキストの2種類があるとばい。リッチテキストは、文字ごとに違うフォントや色、太字・斜体などのスタイル情報を持っとるとさ。

例えば、`getValues()` で取得できるのは単なる文字列ばってん、`getRichTextValues()` を使うと、書式情報も含めて取得できるけん、より柔軟な処理ができるとばい。

<pre class="wp-block-code"><code>const range = sheet.getRange("A1:C3");
const richTextData = range.getRichTextValues();
</code></pre>

これで、`richTextData[row][col]` にリッチテキスト情報がまるごと格納されるっちゃん。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## リッチテキストの構造とスタイル管理

リッチテキストは `RichTextValue` オブジェクトとして扱われ、部分ごとに異なるスタイルを適用できるとよ。

### getRuns() でスタイル情報を分解

リッチテキストのスタイルを細かく取得したいときは、`getRuns()` を使うとばい。

<pre class="wp-block-code"><code>const runs = richTextValue.getRuns();
runs.forEach(run =&gt; {
  const style = run.getTextStyle();
  console.log(`Text: ${run.getText()}, Bold: ${style.isBold()}`);
});
</code></pre>

こうすると、セル内の文字列のどこが太字か、色がついとるかが分かるけん、より細かい処理が可能になるばい。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## リッチテキストの編集と適用

### リッチテキストを作成する

GAS では `newRichTextValue()` を使って、新しくリッチテキストを作ることもできるっちゃね。

<pre class="wp-block-code"><code>const builder = SpreadsheetApp.newRichTextValue()
  .setText("Hello World")
  .setTextStyle(0, 5, SpreadsheetApp.newTextStyle().setBold(true).build());
cell.setRichTextValue(builder.build());
</code></pre>

この方法を使えば、「特定の単語だけ強調表示したい！」みたいなことも簡単にできるけん、便利やね。

### 文字列のスタイルを保持しつつ置換する

リッチテキストの内容を変更したいばってん、スタイルは維持したい！ そんなときは、以下の方法を試してみるとよ。

<pre class="wp-block-code"><code>function replaceTextKeepStyle(sheet, search, replace) {
  const range = sheet.getRange("A1:C3");
  const richTexts = range.getRichTextValues();

  richTexts.forEach((row, rowIndex) =&gt; {
    row.forEach((richText, colIndex) =&gt; {
      if (!richText) return;
      const newText = richText.getText().replace(new RegExp(search, "g"), replace);
      const builder = SpreadsheetApp.newRichTextValue().setText(newText);
      richText.getRuns().forEach(run =&gt; {
        builder.setTextStyle(run.getStartIndex(), run.getEndIndex(), run.getTextStyle());
      });
      richTexts&#91;rowIndex]&#91;colIndex] = builder.build();
    });
  });
  range.setRichTextValues(richTexts);
}
</code></pre>

これを使えば、「旧社名を新社名に変えたい！」みたいなシーンでも、太字や色をキープしたまま置換できるっちゃ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## リンク付きテキストを扱う

セル内の一部の文字にリンクを埋め込むことも可能ばい。

<pre class="wp-block-code"><code>const builder = SpreadsheetApp.newRichTextValue()
  .setText("Google公式サイト")
  .setTextStyle(0, 6, SpreadsheetApp.newTextStyle().setLinkUrl("https://www.google.com").build());
cell.setRichTextValue(builder.build());
</code></pre>

部分的にリンクを埋め込めるけん、「特定のキーワードにだけリンクをつける」とかも簡単にできるとよ。

<hr class="wp-block-separator has-alpha-channel-opacity" />

## まとめ

`getRichTextValues()` を使えば、スプレッドシートのセル内のリッチテキスト情報を取得して、スタイルを適用したり編集したりできるばい。

**今回のポイントはコレ！**

<ul class="wp-block-list">
  <li>
    <code>getRichTextValues()</code> でリッチテキストを取得できる。
  </li>
  <li>
    <code>getRuns()</code> で部分ごとのスタイル情報を取り出せる。
  </li>
  <li>
    <code>newRichTextValue()</code> でリッチテキストを作成・編集できる。
  </li>
  <li>
    スタイルを保持しながらテキストを置換することも可能。
  </li>
  <li>
    ハイパーリンク付きテキストの処理もできる。
  </li>
</ul>

スプレッドシートをもっと使いこなしたいなら、このリッチテキスト機能は知っておくべきばい！ ぜひ試してみてね！


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
  
  <br /> <a rel="noopener" href="https://example.com/rich-text-guide" title="Example Domain" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2Frich-text-guide?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fexample.com%2Frich-text-guide?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Example Domain
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://example.com/rich-text-guide" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://example.com/rich-text-guide" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          example.com
        </div>
      </div>
    </div>
  </div></a>
</div>
