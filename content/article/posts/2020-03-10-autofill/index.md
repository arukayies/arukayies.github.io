---
title: GASでスプレッドシートのオートフィル機能を活用してデータ入力を効率化する方法
author: arukayies
date: 2020-03-09T15:06:49+00:00
excerpt: GASでスプレッドシートにオートフィルを設定する方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1246488947288494080";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1246488947288494080";s:5:"pDate";s:19:"2020-04-04 17:24:58";}}";
tags:
  - "GAS"
tags:
  - autoFill()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）の`autoFill(destination, series)`メソッドを使えば、スプレッドシートでデータの自動展開ができるけん、作業効率がぐっと上がるばい！今回は、このメソッドの基本から応用までをわかりやすく解説するけ、実際にどう使うかをしっかり学んでいこうじゃ。


## 基本的な使い方と動作

まず、`autoFill(destination, series)`の基本的な動作から説明するけ。簡単に言うと、このメソッドは指定したセル範囲（sourceRange）のデータを分析して、それを基に別の範囲（destination）に自動で展開してくれる機能だよ。たとえば、数値や日付、テキストなどを指定すると、次々とパターンを見つけて拡張してくれるんよ。

### メソッドの構文

<pre class="wp-block-code"><code>sourceRange.autoFill(destination, seriesType);
</code></pre>

<ul class="wp-block-list">
  <li>
    <strong>sourceRange</strong>: 展開元のセル範囲（最低2つ以上のセルが必要）
  </li>
  <li>
    <strong>destination</strong>: データを展開したい範囲
  </li>
  <li>
    <strong>seriesType</strong>: シリーズのタイプ <ul class="wp-block-list">
      <li>
        <code>SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES</code>（標準的な数値の増加）
      </li>
      <li>
        <code>SpreadsheetApp.AutoFillSeries.ALTERNATE_SERIES</code>（交互に繰り返すパターン）
      </li>
    </ul>
  </li>
</ul>

### 使い方の例

たとえば、連続した数値がある場合、その数値を自動で増やしていくことができるんよ。次のコード例を見てみて。

<pre class="wp-block-code"><code>const testData = &#91;10, 20, 30];
// 期待される出力: &#91;40, 50, 60...]
</code></pre>

この場合、`autoFill`は数値の増加パターンを見つけて、それに従って新しいデータを自動で埋めてくれるんさ。

## 系列タイプの挙動

### DEFAULT_SERIES

`DEFAULT_SERIES`を使うと、数値や日付を自動で増加させるよ。たとえば、`[1, 2, 3]`というデータがあれば、次は`[4, 5, 6]`と増えていくんよ。

<pre class="wp-block-code"><code>const testData = &#91;1, 2, 3];
testData.autoFill(destination, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
</code></pre>

こうすることで、数値の等差数列が展開されるんよ。

### ALTERNATE_SERIES

`ALTERNATE_SERIES`では、例えば交互に表示したい色や曜日などを繰り返し展開することができるんよ。たとえば、`[赤, 青]`というデータを指定すると、`[赤, 青, 赤, 青...]`といった具合に繰り返し展開されるばい。

<pre class="wp-block-code"><code>const colorSeries = &#91;'赤', '青'];
colorSeries.autoFill(destination, SpreadsheetApp.AutoFillSeries.ALTERNATE_SERIES);
</code></pre>

## 応用的な使い方

### 1. 横と縦の多次元オートフィル

`autoFill`は通常、一方向（縦か横）にしか展開できんけど、複数の方向に展開する方法もあるけ。例えば、横方向にデータを埋めた後、縦方向に展開することも可能だよ。

<pre class="wp-block-code"><code>horizontalRange.autoFill(horizontalDest, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
verticalRange.autoFill(verticalDest, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
</code></pre>

これでクロス集計表など、複雑なデータ処理にも対応できるけ。

### 2. 隣接セルのデータに合わせて自動展開

`autoFillToNeighbor`を使えば、隣のセルのデータに応じて自動的に範囲を拡張できるんだよ。

<pre class="wp-block-code"><code>sourceRange.autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
</code></pre>

隣の列や行の長さに応じてデータが展開されるから、非常に便利なんよ。

## エラー処理とパフォーマンス最適化

Google Apps Scriptでの作業中にはエラーが発生することもあるけん、エラー処理をしっかり行うことが大切だよ。例えば、範囲エラーが出た場合には次のようにエラーハンドリングを行うといいさ。

<pre class="wp-block-code"><code>try {
  sourceRange.autoFill(destination, seriesType);
} catch (e) {
  console.error(`AutoFill Error: ${e.message}`);
}
</code></pre>

これで、エラーが起きても適切に処理できるけ。

また、大規模データ（例えば10,000行以上）を扱うときは、パフォーマンスにも気をつけなきゃいけないけ。バッチ処理を使うと、効率よく処理を行えるんよ。

## ベストプラクティス

<ul class="wp-block-list">
  <li>
    <strong>事前バリデーション</strong>: データが空でないか確認することで、エラーを未然に防ぐことができるけ。
  </li>
</ul>

<pre class="wp-block-code"><code>if (!sourceRange.getValues().flat().some(Boolean)) {
  throw new Error('Empty source range');
}
</code></pre>

<ul class="wp-block-list">
  <li>
    <strong>ユーザーインタラクション</strong>: 作業完了後にメッセージを表示することで、ユーザーに通知できるけ。
  </li>
</ul>

<pre class="wp-block-code"><code>SpreadsheetApp.getUi().alert('AutoFill完了');
</code></pre>

<ul class="wp-block-list">
  <li>
    <strong>非同期処理</strong>: 処理を非同期で行うことで、スクリプトの実行時間を短縮できるんよ。
  </li>
</ul>

<pre class="wp-block-code"><code>setTimeout(() =&gt; { /* 後処理 */ }, 0);
</code></pre>

## 結論

`autoFill(destination, series)`メソッドは、Google Sheetsでの作業を劇的に効率化できる非常に強力なツールだばい。基本的な使い方を理解し、応用編やエラー処理、パフォーマンス最適化までしっかり学んでおくと、さらに便利に使えるようになるよ。今後はAIによるデータパターン認識や、3次元展開の機能追加なども期待されとるけ、ますます進化していくけん、常に新しい機能にも注目していこうじゃ！


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://note.com/yucco72/n/n65c83020f853" title="【GAS】一行目に数式を入れてオートフィルする｜yucco" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://assets.st-note.com/production/uploads/images/83570395/rectangle_large_type_2_09a93307cd3036adc4220ac8987da83c.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://assets.st-note.com/production/uploads/images/83570395/rectangle_large_type_2_09a93307cd3036adc4220ac8987da83c.png?fit=bounds&#038;quality=85&#038;width=1280" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】一行目に数式を入れてオートフィルする｜yucco
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        結論 // 出力用のシートを取得しておくconst activeSheet = SpreadsheetApp.getActiveSpreadsheet();const sheet_b = activeSheet.getSheetByName...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://note.com/yucco72/n/n65c83020f853" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://note.com/yucco72/n/n65c83020f853" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          note.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://hawksey.info/blog/2020/09/adding-some-autofill-magic-to-your-google-sheets-apps-script-projects/" title="Adding some AutoFill magic to your Google Sheets Apps Script projects" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://hawksey.info/wp-content/uploads/2020/09/AutoFill-Macro.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://hawksey.info/wp-content/uploads/2020/09/AutoFill-Macro.gif" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Adding some AutoFill magic to your Google Sheets Apps Script projects
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Sheets users can already use the magic of AutoFill to expand data automatically detecting a series of numbers, le...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://hawksey.info/blog/2020/09/adding-some-autofill-magic-to-your-google-sheets-apps-script-projects/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://hawksey.info/blog/2020/09/adding-some-autofill-magic-to-your-google-sheets-apps-script-projects/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          hawksey.info
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
  
  <br /> <a rel="noopener" href="https://www.reddit.com/r/googlesheets/comments/198dcyh/script_for_autofill_based_on_another_cells/" title="Blocked" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.reddit.com%2Fr%2Fgooglesheets%2Fcomments%2F198dcyh%2Fscript_for_autofill_based_on_another_cells%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.reddit.com%2Fr%2Fgooglesheets%2Fcomments%2F198dcyh%2Fscript_for_autofill_based_on_another_cells%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Blocked
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://www.reddit.com/r/googlesheets/comments/198dcyh/script_for_autofill_based_on_another_cells/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://www.reddit.com/r/googlesheets/comments/198dcyh/script_for_autofill_based_on_another_cells/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          www.reddit.com
        </div>
      </div>
    </div>
  </div></a>
</div>
