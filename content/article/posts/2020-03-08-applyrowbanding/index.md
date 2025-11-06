---
title: GASでスプレッドシートの行に交互の背景色を簡単設定する方法
author: arukayies
date: 2020-03-08T14:01:55+00:00
excerpt: GASでスプレッドシートの行方向に交互の背景色を設定する方法を紹介します！
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
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1246304511045464066";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1246304511045464066";s:5:"pDate";s:19:"2020-04-04 05:12:05";}}";
tags:
  - "GAS"
tags:
  - applyRowBanding()
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年3月"]
---
Google Apps Script（GAS）を使って、スプレッドシートの行方向に交互の背景色を設定するには、`applyRowBanding()`メソッドを活用するのが便利ばい。このメソッドを使うと、データをより見やすく、読みやすくすることができるんじゃけ。今回はその基本的な使い方から、応用方法、最適化テクニックまでをわかりやすく解説していくけん、ちょっとしたテクニックも学んでいこうかね。


## applyRowBanding()メソッドの基本

まず、`applyRowBanding()`メソッドは、Google スプレッドシートの「行方向」に交互に色をつける機能を提供してくれるばい。このメソッドは、`Range`クラスに属していて、指定した範囲に色を適用するんだよね。使い方もシンプルじゃけ、ちょっとした工夫で大きな効果が得られるんだわ。

### デフォルト設定で使う

基本の使い方はこんな感じ。

<pre class="wp-block-code"><code>range.applyRowBanding();
</code></pre>

この書き方だと、`SpreadsheetApp.BandingTheme.LIGHT_GREY`という、薄いグレーの背景色が適用されるけん、シンプルで見やすいんじゃ。

### テーマを指定して使う

もしちょっとカラフルにしたい場合、テーマを指定することもできるんじゃけ。例えば、こんな感じでインディゴのテーマを選ぶことができる。

<pre class="wp-block-code"><code>range.applyRowBanding(SpreadsheetApp.BandingTheme.INDIGO);
</code></pre>

テーマにはいろんな色があって、12種類以上のバリエーションがあるから、デザインに合わせて選べるけん便利だよね。

### 詳細設定でカスタマイズ

さらに、ヘッダーやフッターの色を変更したい場合もできるんよ。以下のように、`showHeader`と`showFooter`でヘッダーやフッターの表示/非表示を制御できるんだわ。

<pre class="wp-block-code"><code>range.applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
</code></pre>

これで、ヘッダー行は色がついて、フッター行は色がつかない設定ができるけ。

## 技術的な詳細

このメソッドが適用する色は、実は4つの要素から成り立ってるんじゃ。具体的には。

<ol class="wp-block-list">
  <li>
    ヘッダー行の色
  </li>
  <li>
    フッター行の色
  </li>
  <li>
    第1行の色
  </li>
  <li>
    第2行の色
  </li>
</ol>

例えば、`BandingTheme.BLUE`を適用した場合、こんな色になるんじゃけ。

<ul class="wp-block-list">
  <li>
    ヘッダー：<code>#c9daf8</code>（淡い青）
  </li>
  <li>
    フッター：<code>#c9daf8</code>
  </li>
  <li>
    第1行：<code>#ffffff</code>（白）
  </li>
  <li>
    第2行：<code>#eaf1fb</code>（薄い青）
  </li>
</ul>

これによって、視覚的に区別しやすいデザインになるんじゃ。

### 動的範囲の設定

データが増えるたびに背景色を自動で拡張する場合、こんなふうに動的に範囲を設定することもできるんよ。

<pre class="wp-block-code"><code>const lastRow = sheet.getLastRow();
const range = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
range.applyRowBanding(SpreadsheetApp.BandingTheme.GREEN, true, false);
</code></pre>

これで、データの追加に応じて、背景色も自動的に更新されるんじゃけ。

## 応用事例

### 複数のテーマを適用

もし、シート内で異なるセクションごとに違うテーマを使いたい場合、こうするんじゃ。

<pre class="wp-block-code"><code>function applyMultiThemes() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  sheet.getRange('1:10').applyRowBanding(SpreadsheetApp.BandingTheme.BLUE);
  sheet.getRange('11:20').applyRowBanding(SpreadsheetApp.BandingTheme.GREEN);
  sheet.getRange('21:30').applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE);
}
</code></pre>

こうやって、セクションごとに背景色を変えることで、データの区切りが視覚的にわかりやすくなるんじゃけ。

### 条件付きで背景色を変更

例えば、ある条件に合った行に色を付けたい場合、こんなコードを使うことができるばい。

<pre class="wp-block-code"><code>function applyConditionalBanding() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  
  dataRange.getValues().forEach((row, index) =&gt; {
    if (row&#91;0] === '重要') {
      sheet.getRange(index + 1, 1, 1, sheet.getLastColumn())
           .applyRowBanding(SpreadsheetApp.BandingTheme.RED);
    }
  });
}
</code></pre>

これで、例えば「重要」という文字が入っている行にだけ赤色の背景をつけることができるんだわ。

## 最適化のテクニック

### バッチ処理の利用

たくさんの範囲に背景色を一括で適用したい時は、バッチ処理を使うと効率的じゃけ。こんな風に、範囲とテーマを配列にまとめて、一度に処理できるんよ。

<pre class="wp-block-code"><code>function optimizedBandingApply() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const ranges = &#91;
    {range: 'A1:D10', theme: SpreadsheetApp.BandingTheme.BLUE},
    {range: 'A11:D20', theme: SpreadsheetApp.BandingTheme.GREEN},
    {range: 'A21:D30', theme: SpreadsheetApp.BandingTheme.ORANGE}
  ];

  ranges.forEach(config =&gt; {
    sheet.getRange(config.range)
         .applyRowBanding(config.theme);
  });
}
</code></pre>

これで、複数の範囲に一度に適用できるから、処理速度もアップするけんね。

### キャッシュを活用

背景色の設定を頻繁に変更しない場合、キャッシュを使って処理を早くすることもできるんじゃ。例えば、こんな感じでキャッシュに設定を保存して、無駄なAPI呼び出しを減らせるんだよ。

<pre class="wp-block-code"><code>const cache = CacheService.getScriptCache();

function getCachedBanding(range) {
  const cached = cache.get(range.getA1Notation());
  return cached ? JSON.parse(cached) : null;
}

function setCachedBanding(range, theme) {
  cache.put(range.getA1Notation(), JSON.stringify(theme), 21600);
}
</code></pre>

これで、同じ範囲に何度も設定を適用する手間が省けるんじゃ。

## まとめ

`applyRowBanding()`メソッドを使うと、Google スプレッドシートのデータを見やすくするための強力なツールとなるんじゃけ。基本的な使い方を覚えたら、テーマの変更や動的範囲の設定など、さらに応用できる部分が広がるばい。適切に使いこなせば、作業効率がぐんと上がるし、データ分析もしやすくなるよ。パフォーマンス最適化やキャッシュの活用も覚えて、よりスムーズに作業を進めようね。


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
</div>
