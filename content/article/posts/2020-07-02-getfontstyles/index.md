---
title: GASのgetFontStyles()メソッドを使いこなす！基本から応用まで解説
author: arukayies
type: post
date: 2020-07-02T13:11:40+00:00
excerpt: GASでスプレッドシートの指定範囲すべての文字装飾を取得する方法を紹介します！
url: /gas/getfontstyles
share: true
toc: true
comment: true
snap_isAutoPosted:
  - 1593695501
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
  - 2025-03-06 11:42:22
categories:
  - GAS
tags:
  - GAS
  - getFontStyles()
  - Google Apps Script
  - スプレッドシート

archives: ["2020年7月"]
---
Google Apps Script（GAS）の`getFontStyles()`メソッドって、スプレッドシート内でセルに適用されているフォントスタイル、特に斜体（italic）を一括で取得できるめっちゃ便利な機能なんよ。今日は、このメソッドの使い方をわかりやすく解説するけど、実際に使ってみるとめっちゃ役立つこと間違いなしばい！

## 基本的な使い方

まず、`getFontStyles()`の使い方からやけど、このメソッドは`Range`クラスに属していて、指定した範囲内のセルのフォントスタイルを取得できるんじゃ。簡単なコードを見てみよう。

<pre class="wp-block-code"><code>const fontStyles = range.getFontStyles();
</code></pre>

このコードを実行すると、選択した範囲のセルに設定されているフォントスタイルが二次元配列として返されるんよ。たとえば、ある範囲が3行2列だったら、3×2の配列が返ってくるわけさ。

### 戻り値の内容

<ul class="wp-block-list">
  <li>
    <code>'italic'</code>: セルの文字が斜体
  </li>
  <li>
    <code>'normal'</code>: 通常のフォントスタイル
  </li>
  <li>
    空文字列: セルが空白の場合
  </li>
</ul>

こんな感じで、セルのスタイルをサクッと取得できるばい。

## 実際の使用例

ここからは、実際にどんな風に活用するかを紹介するけん。例えば、選択した範囲内の各セルのスタイルをログに出力してみよう。

<pre class="wp-block-code"><code>function analyzeFontStyles() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('サンプルシート');
  const targetRange = sheet.getRange('A1:C3');
  const styles = targetRange.getFontStyles();

  styles.forEach((row, rowIndex) =&gt; {
    row.forEach((style, colIndex) =&gt; {
      console.log(`セル ${String.fromCharCode(65 + colIndex)}${rowIndex + 1}: ${style}`);
    });
  });
}
</code></pre>

このコードを実行すれば、A1からC3までの範囲内にある各セルのフォントスタイルがコンソールに表示されるけ。ここで使われてる`String.fromCharCode(65 + colIndex)`は、列をアルファベットで表示するためのちょっとした技なんよ。

## パフォーマンスを意識した使い方

でも、大きな範囲に対してこの処理を使うと、すぐに処理が遅くなったりするけ。例えば、10,000セル以上を処理する場合、時間制限（6分）がきつくなることもあるから注意が必要じゃ。

### バッチ処理の活用

もし処理が重くなりそうなら、範囲を分けて順番に処理する方法を使うと効率的ばい。それでもパフォーマンスが気になる場合は、キャッシュを活用して何度も同じデータを取得せんようにするといいけね。

### スタイルの集計

さらに応用編として、範囲内のスタイルを集計してみるのも面白いんじゃ。たとえば、範囲内で斜体が使われているセルの割合を計算するコードはこんな感じやで。

<pre class="wp-block-code"><code>function generateStyleReport() {
  const range = SpreadsheetApp.getActiveRange();
  const styles = range.getFontStyles();
  let italicCount = 0;

  const analysis = styles.map((row, i) =&gt; {
    return row.map((style, j) =&gt; {
      if(style === 'italic') italicCount++;
      return { row: i+1, col: j+1, status: style };
    });
  });

  console.log(`斜体セル割合: ${(italicCount / (styles.length * styles&#91;0].length) * 100).toFixed(1)}%`);
  return analysis;
}
</code></pre>

このコードを使うと、選択した範囲内でどれくらいのセルに斜体が使われてるか、パーセンテージで教えてくれるけ。

## よくあるトラブルとその対処法

実際に使ってると、ちょっとしたトラブルにぶつかることもあるばい。そんな時の対策も覚えておくと便利じゃ。

### 範囲外エラー

存在しないシートや範囲を指定したらエラーが出ることがあるけど、その時は`getSheetByName()`で戻り値をチェックするようにしよう。

<pre class="wp-block-code"><code>const sheet = SpreadsheetApp.getActive().getSheetByName('データ');
if (!sheet) throw new Error('シートが存在しません');
</code></pre>

### 配列次元の不一致

また、`getFontStyles()`で取得した配列の次元が範囲と合わないときがあるけ。そんなときは、配列のサイズをしっかり検証することが大事じゃ。

<pre class="wp-block-code"><code>function validateArrayDimensions(range, stylesArray) {
  const rows = range.getNumRows();
  const cols = range.getNumColumns();
  if (stylesArray.length !== rows || stylesArray&#91;0].length !== cols) {
    throw new Error('配列の次元が範囲と一致しません');
  }
}
</code></pre>

## 結論

`getFontStyles()`は、スプレッドシート内のフォントスタイルを簡単に取得・操作できる便利なメソッドじゃ。今回紹介したように、大規模なデータ処理からスタイルの一括変更まで幅広い活用法があるけ。エラー対処やパフォーマンス最適化を意識すれば、さらにスムーズに使えるようになるはずよ。

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
  
  <br /> <a href="https://techuplife.tech/gas-ss-rtextwrap/"><a href="https://caymezon.com/gas-font/">https://caymezon.com/gas-font/</a></a>
</div>
