---
title: GASのV8ランタイムで使えるECMAScript構文のまとめ
author: arukayies
type: post
date: 2020-05-05T09:56:16+00:00
excerpt: GASのV8ランタイムで使えるECMAScript構文をまとめてみました！これを活用すると今まで以上に効率よくコードを書けるので、ぜひ使ってみてください！
url: /gas/v8-runtime-ecmascript
share: true
toc: true
comment: true
page_type:
  - default
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1588672578
snapEdIT:
  - 1
snapTW:
  - |
    s:214:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";
categories:
  - GAS
tags:
  - GAS
  - Google Apps Script

archives: ["2020年5月"]
---
<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-official">
      <a rel="noopener" href="https://developers.google.com/apps-script/guides/v8-runtime?hl=ja" title="V8 ランタイムの概要  |  Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
      
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
            V8 ランタイムの概要  |  Apps Script  |  Google for Developers
          </div>
          
          <div class="blogcard-snippet external-blogcard-snippet">
          </div>
        </div>
        
        <div class="blogcard-footer external-blogcard-footer cf">
          <div class="blogcard-site external-blogcard-site">
            <div class="blogcard-favicon external-blogcard-favicon">
              <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/guides/v8-runtime?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
              
              <noscript>
                <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script/guides/v8-runtime?hl=ja" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
              </noscript>
            </div>
            
            <div class="blogcard-domain external-blogcard-domain">
              developers.google.com
            </div>
          </div>
        </div>
      </div></a>
    </div>
    
    <p class="has-text-align-left">
      結構前に公式よりお知らせがありました「<strong>V8ランタイムの対応</strong>」
    </p>
    
    <p>
      今回はこの<strong>V8ランタイム</strong>で使える<strong>ECMAScript構文</strong>をまとめてみました！
    </p>
    
    <p>
      これが書けるとこんなメリットがあります。
    </p>
  </div>
</div>

<div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box has-background has-border-color has-watery-red-background-color has-red-border-color">
  <div class="iconlist-title">
    V8ランタイムのメリット！！
  </div>
  
  <ul class="wp-block-list">
    <li>
      <span class="keyboard-key"><strong>let&nbsp;</strong></span>と<span class="keyboard-key"><strong>&nbsp;const</strong></span>&nbsp;の使い分けで、変数を間違ってしまう可能性を減らすことできます。
    </li>
    <li>
      <strong>アロー関数</strong>で無名関数を短く表現することができます。
    </li>
    <li>
      <strong>Class構文</strong>を使うことで、同じモノの設計を繰り返し使う時に便利！
    </li>
    <li>
      <strong>Class構文</strong>でコードが見やすくなる！
    </li>
    <li>
      <strong>Class構文</strong>は見た目がかっこいい！
    </li>
    <li>
      <strong>分割代入</strong>で、複数の変数に代入する時に1行で書けるようになる！
    </li>
    <li>
      <strong>テンプレート文字列</strong>で、ダブルクォーテーションやシングルクォーテーションを打つ量が減ります！
    </li>
    <li>
      <strong>テンプレート文字列</strong>で、『\n』を使わずに、改行を表すことができます！
    </li>
    <li>
      <strong>デフォルト引数</strong>で、デフォルト値を指定することで、処理を簡略化することができます！
    </li>
  </ul>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p class="has-text-align-center">
      それでは各構文を紹介していきます！
    </p>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-caret-right block-box has-background has-border-color has-icon-color has-watery-blue-background-color has-key-color-border-color has-key-color-icon-color">
  <div class="iconlist-title">
    こんな人にむけた記事です。
  </div>
  
  <ul class="wp-block-list">
    <li>
      簡単な書き方を理解して、きれいなコードを書きたい！
    </li>
    <li>
      便利な機能を使いこなして、効率よくしたい！
    </li>
  </ul>
</div>

## V8ランタイムを有効にする

新しい機能を使う前に、V8ランタイムを有効にします。

やり方はとても簡単です！

メニューの <span class="keyboard-key">実行</span> > <span class="keyboard-key">Chrome V8 を搭載した新しい Apps Script ランタイムを有効にする</span>

と選択するだけです！<figure class="wp-block-image size-large">

{{< custom-figure src="v8_on-1-1024x458.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>実行 > Chrome V8 を搭載した新しい Apps Script ランタイムを有効にする を選択</figcaption></figure> 

## 【新機能①】ECMAScript構文

### ECMAScript構文とは？

ECMAScript略して**ES**って呼ばれます。JavaScriptを使用したサービスで使われる一般的な構文です。

GASのJavaScriptは古いものでした。。。

それでは実際に使える構文を見ていきましょう。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

### let と const

まず最初に、

<span class="fz-24px">いままで変数を宣言してきた <span class="keyboard-key">var</span> は使わないようにしましょう。</span>

時代は <span class="keyboard-key">let</span> と <span class="keyboard-key">const</span> です。それでは使い方を見ていきます。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### <span class="keyboard-key">let</span>は**再宣言が不可能**な宣言です

<pre class="wp-block-code javascript"><code>function let_sample() {
  let test = "サンプル";
  test = "OK";
  let test = "NG";
}</code></pre>

GASで**保存**する時点で以下のエラーとなります。

<pre class="wp-block-preformatted">SyntaxError: Identifier 'test' has already been declared（行 4、ファイル「sample.gs」） </pre>

**再代入**はできますが、4行目の**再宣言**が不可能なためです。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### <span class="keyboard-key">const</span>は**再宣言と再代入が不可能**な宣言です

<pre class="wp-block-code javascript"><code>function const_sample() {
  const test = "サンプル";
  test = "NG";
}</code></pre>

GASで**実行**しようとすると 以下のエラーとなります。

<pre class="wp-block-preformatted">TypeError: Assignment to constant variable.at const_sample(sample:3:8)</pre>

3行目の**再代入**が不可能なためです。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

また、**再宣言**も

<pre class="wp-block-code javascript"><code>function const_sample() {
  const test = "サンプル";
  const test = "NG";
}</code></pre>

GASで**保存**する時点で以下のエラーとなります。

<pre class="wp-block-preformatted">SyntaxError: Identifier 'test' has already been declared（行 3、ファイル「sample.gs」） </pre>

3行目の**再宣言**が不可能なためです。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### ちなみに <span class="keyboard-key">var</span> は再宣言も再代入も可能な宣言です

<pre class="wp-block-code javascript"><code>function var_sample() {
  var test = "サンプル";
  test = "OK";
  var test = "OK";
}</code></pre>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### let と constを使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        <span class="keyboard-key">let</span> と <span class="keyboard-key">const</span> の使い分けで、変数を間違ってしまう可能性を減らすことできます。
      </li>
      <li>
        コードを見る人にとって、読みやすくなります。
      </li>
    </ul>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

### アロー関数

アロー関数は今までの無名関数の書き方より短いコードで表現することができます。

その名の通り <span class="keyboard-key">=></span> 矢を使ってコードを書きます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <ul class="wp-block-list">
      <li>
        今までの書き方
      </li>
    </ul>
    
    <pre class="wp-block-code javascript"><code>// 従来の無名関数
function arrow_before_sample() {
  var addText = function (text) {
  return text + "サンプル";
  };
  console.log(addText("サンプル"));
  // サンプルサンプルというログが出力
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <ul class="wp-block-list">
    <li>
      アロー関数での書き方
    </li>
  </ul>
  
  <pre class="wp-block-code javascript"><code>// アロー関数
function arrow_after_sample1() {
  let addText = (text) => {
  return text + "サンプル";
  };
  console.log(addText("サンプル"));
  // サンプルサンプルというログが出力
}</code></pre>

<p>
</p>
</div>
</div>

<span class="keyboard-key">function</span> の代わりに <span class="keyboard-key">=></span> が使われています。

また、アロー関数は条件によってさらに簡単に表現することができます。

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### 関数が1文の場合、{&#8230;}とreturnが省略できます

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <ul class="wp-block-list">
      <li>
        アロー関数での書き方
      </li>
    </ul>
    
    <pre class="wp-block-code javascript"><code>// アロー関数
function arrow_after_sample1() {
  let addText = (text1,text2) => {
  return text1 + text2 + "サンプル3";
  };
  console.log(addText("サンプル1","サンプル2"));
  // サンプル1サンプル2サンプル3というログが出力
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <ul class="wp-block-list">
    <li>
      さらに簡単にした書き方
    </li>
  </ul>
  
  <pre class="wp-block-code javascript"><code>// 関数が1文の場合、{...}とreturenが省略できます
function arrow_after_sample2() {
  let addText = (text1,text2) => text1 + text2 + "サンプル3";
  console.log(addText("サンプル1","サンプル2"));
  // サンプル1サンプル2サンプル3というログが出力
}</code></pre>

<p>
</p>
</div>
</div>

このように簡単なコードで表現できます！

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### 関数が1文で引数が1つの場合、{&#8230;}とreturnと(&#8230;)が省略できます

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <ul class="wp-block-list">
      <li>
        アロー関数での書き方
      </li>
    </ul>
    
    <pre class="wp-block-code javascript"><code>// アロー関数
function arrow_after_sample1() {
  let addText = (text) => {
  return text + "サンプル";
  };
  console.log(addText("サンプル"));
  // サンプルサンプルというログが出力
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <ul class="wp-block-list">
    <li>
      さらに簡単にした書き方
    </li>
  </ul>
  
  <pre class="wp-block-code javascript"><code>// 関数が1文で引数が1つの場合、{...}とreturenと(...)が省略できます
function arrow_after_sample2() {
  let addText = text => text + "サンプル";
  console.log(addText("サンプル"));
  // サンプルサンプルというログが出力
}</code></pre>

<p>
</p>
</div>
</div>

さらにシンプルになりましたね！

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### アロー関数は this の値を束縛します。。。？

<span class="keyboard-key">this</span> についていろいろ書かれており、整理できたら追記します。

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      <span class="keyboard-key">this</span> を使うようなコードを書いたことないよ。。。
    </p>
  </div>
</div>

#### アロー関数を使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        無名関数を短く表現することができます。
      </li>
    </ul>
  </div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

### Class構文

今回のアップデートで**Class**が使えるようになりました！

JavaScriptのClassはこちらの記事が参考になりました！

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://qiita.com/JPNYKW/items/248f99c94c00c3d1aa27" title="JavaScript初心者にclassを伝える - Qiita" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.0.0%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGMjAxNDYzJTJGcHJvZmlsZS1pbWFnZXMlMkYxNjI2MjkxMzI5P2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZiZz1GRkZGRkYmZm09cG5nMzImcz1kNzRiZjNhNDNlOGExMWRiN2Q2OGYyYjllOWI4ODU0Zg%26blend-x%3D120%26blend-y%3D462%26blend-w%3D90%26blend-h%3D90%26blend-mode%3Dnormal%26mark64%3DaHR0cHM6Ly9xaWl0YS1vcmdhbml6YXRpb24taW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1vcmdhbml6YXRpb24taW1hZ2UlMkY4OTJlYzFlNGI2NDgxMWYwODZiNDU5OGJkZmEwZjE4M2IxYTFjODFiJTJGb3JpZ2luYWwuanBnJTNGMTYxNzg0OTM3Mz9peGxpYj1yYi00LjAuMCZ3PTQ0Jmg9NDQmZml0PWNyb3AmbWFzaz1jb3JuZXJzJmNvcm5lci1yYWRpdXM9OCZiZz1GRkZGRkYmYm9yZGVyPTIlMkNGRkZGRkYmZm09cG5nMzImcz0xMGNhYmFjOWZkYTFjZTIyMmVhZGMzNTEwMDQ5Yzg0Ng%26mark-x%3D186%26mark-y%3D515%26mark-w%3D40%26mark-h%3D40%26s%3D40599610841b5323ff2559c946bd4910?ixlib=rb-4.0.0&#038;w=1200&#038;fm=jpg&#038;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9SmF2YVNjcmlwdCVFNSU4OCU5RCVFNSVCRiU4MyVFOCU4MCU4NSVFMyU4MSVBQmNsYXNzJUUzJTgyJTkyJUU0JUJDJTlEJUUzJTgxJTg4JUUzJTgyJThCJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LXBhZD0wJnM9MzlkMjUwY2UyYjc1ZGViNmIxYjMyNWY5ZDU2MGM3NGI&#038;mark-x=120&#038;mark-y=112&#038;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDBqcG55a3cmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtcGFkPTAmcz02M2JlZTFiOGJhMWU0ZmFiYjJjY2VkN2ZjNWI2ZjQzNg&#038;blend-x=242&#038;blend-y=454&#038;blend-w=838&#038;blend-h=46&#038;blend-fit=crop&#038;blend-crop=left%2Cbottom&#038;blend-mode=normal&#038;txt64=TumrmOetieWtpuagoeODu1Ppq5jnrYnlrabmoKE&#038;txt-x=242&#038;txt-y=539&#038;txt-width=838&#038;txt-clip=end%2Cellipsis&#038;txt-color=%231E2121&#038;txt-font=Hiragino%20Sans%20W6&#038;txt-size=28&#038;s=f71d9a465b5346df26bc2faa0713955d" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" /></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        JavaScript初心者にclassを伝える - Qiita
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        初めに この記事ではJavascriptのclassについてザックリですが解説します。 多くの初心者にとってclassは「何だこれ？？？」と躓くポイントだと思います。 （実際、自分も最初眺めた時は意味が分からず頭が学級崩壊してました。） な...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://qiita.com/jpnykw/items/248f99c94c00c3d1aa27" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://qiita.com/jpnykw/items/248f99c94c00c3d1aa27" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          qiita.com
        </div>
      </div>
    </div>
  </div></a>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

実際にClass構文を使わない場合と使った場合で比べてみます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      Classを使わないで実装する場合
    </p>
    
    <pre class="wp-block-code"><code>function class_sample_before() {
  let persons = &#91;];

  persons&#91;0] = {
    firstName: "田中",
    lastName: "太郎",
    height: 165,
    weight: 65,
    bmi: getBMI(165, 65),
    standardWeight: getStandardWeight(165, 65),
  };

  persons&#91;1] = {
    firstName: "木村",
    lastName: "花子",
    height: 150,
    weight: 45,
    bmi: getBMI(150, 45),
    standardWeight: getStandardWeight(150, 45),
  };

  console.log(persons);
}

function getBMI(height, weight) {
  return Math.round(weight / (((height / 100) * height) / 100));
}

function getStandardWeight(height, weight) {
  return Math.round((((height / 100) * height) / 100) * 22);
}
</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    Classを使って実装した場合
  </p>
  
  <pre class="wp-block-code"><code>function class_sample_after() {
  class Person {
    constructor(firstName, lastName, height, weight) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.height = height;
      this.weight = weight;
      this.bmi();
      this.standardWeight();
    }

    bmi() {
      this.bmi = Math.round(
        this.weight / (((this.height / 100) * this.height) / 100)
      );
    }

    standardWeight() {
      this.standardWeight = Math.round(
        (((this.height / 100) * this.height) / 100) * 22
      );
    }
  }

  let persons = &#91;];
  persons&#91;0] = new Person("田中", "太郎", 165, 65);
  persons&#91;1] = new Person("木村", "花子", 150, 45);
  console.log(persons);
}</code></pre>
</div>
</div>

どっちのコードも同じ結果を返します。

<pre class="wp-block-code"><code> &#91; { firstName: '田中',
    lastName: '太郎',
    height: 165,
    weight: 65,
    bmi: 24,
    standardWeight: 60 },
  { firstName: '木村',
    lastName: '花子',
    height: 150,
    weight: 45,
    bmi: 20,
    standardWeight: 50 } ]
</code></pre>

2人のみのデータを格納するだけなので、コード量は変わりませんが、

これが10人、100人と増えた場合どうなるでしょう。。。

**<span class="fz-20px"><span class="fz-24px"><span class="bold-red">Classを使えば、こんなシンプルに書くことができます！</span></span></span>**

<pre class="wp-block-code"><code>persons&#91;0] = new Person("田中", "太郎", 165, 65);
persons&#91;1] = new Person("木村", "花子", 150, 45);
persons&#91;2] = new Person("鈴木", "潤", 160, 55);
persons&#91;3] = new Person("佐々木", "次郎", 170, 80);
persons&#91;4] = new Person("中村", "かおり", 150, 45);</code></pre>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### Class構文を使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        同じモノの設計を繰り返し使う時に便利！
      </li>
      <li>
        コードが見やすくなる！
      </li>
      <li>
        見た目がかっこいい！
      </li>
    </ul>
  </div>
</div>

### 分割代入

配列やオブジェクトを複数の変数に**分割**して**代入**できます。

#### 配列の分割代入

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      従来の方法
    </p>
    
    <pre class="wp-block-code"><code>function before() {
  let array = &#91;1, 2, 3];
  let x = array&#91;0];
  let y = array&#91;1];
  let z = array&#91;2];
  // ログに『1 2 3』と出力
  console.log(x, y, z);
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    分割代入を使った方法
  </p>
  
  <pre class="wp-block-code"><code>function after() {
  let array = &#91;1, 2, 3];
  let &#91;x, y, z] = array;
  // ログに『1 2 3』と出力
  console.log(x, y, z);
}</code></pre>

<p>
</p>
</div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### オブジェクトの分割代入

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      従来の方法
    </p>
    
    <pre class="wp-block-code"><code>function before() {
  let data = {a: 12, b: false, c: 'blue'};
  let a = data.a;
  let c = data.c;
  // ログに『12 'blue'』と出力
  console.log(a, c);
}
</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    分割代入を使った方法
  </p>
  
  <pre class="wp-block-code"><code>function after() {
  let data = {a: 12, b: false, c: 'blue'};
  let {a, c} = data;
  // ログに『12 'blue'』と出力
  console.log(a, c);
}
</code></pre>

<p>
</p>
</div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### 分割代入を使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        複数の変数に代入する時に1行で書けるようになる！
      </li>
      <li>
        コードが見やすくなります！
      </li>
    </ul>
  </div>
</div>

### テンプレート文字列

`<strong><span class="badge-grey">``</span></strong>`（**バッククオート**）で文字列を囲むと、`<strong><span class="badge-grey">${}</span></strong>`で変数を展開できます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      従来の方法
    </p>
    
    <pre class="wp-block-code"><code>function before() {
  let first = '田中';
  let last = '太郎';
  let name =　'Hi ' + first + ' ' + last + '.';
  // ログに『Hi 田中 太郎.』と出力
  console.log(name);
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    テンプレート文字列を使った方法
  </p>
  
  <pre class="wp-block-code"><code>function after() {
  let first = '田中';
  let last = '太郎';
  let name =　`Hi ${first} ${last}.`;
  // ログに『Hi 田中 太郎.』と出力
  console.log(name);
}
</code></pre>

<p>
</p>
</div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### テンプレート文字列を使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        ダブルクォーテーションやシングルクォーテーションを打つ量が減ります！
      </li>
    </ul>
  </div>
  
  <p>
  </p>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

### デフォルト引数

読んで字のごとくです。関数にデフォルト引数を指定できます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      従来の場合
    </p>
    
    <pre class="wp-block-code"><code>function before() {
  // ログに『hello world!』と出力
  hello()
}

function hello(greeting, name) {
  greeting = greeting || "hello";
  name = name || "world";
  console.log(greeting + " " + name + "!");
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    デフォルト引数を使う場合
  </p>
  
  <pre class="wp-block-code"><code>function after() {
  let hello =
  function(greeting="hello", name="world") {
    console.log(greeting + " " + name + "!");
  }
  // ログに『hello world!』と出力
  hello();
}</code></pre>
</div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

#### デフォルト引数を使うメリット

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        デフォルト値を指定することで、処理を簡略化することができます！
      </li>
    </ul>
  </div>
  
  <p>
  </p>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

### 複数行の文字列

`<strong><span class="badge-grey">``</span></strong>`（**バッククオート**）で文字列を囲むと、**改行**をそのまま表すことができます！

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <p>
      従来の方法
    </p>
    
    <pre class="wp-block-code"><code>function before() {
  let multiline = "This string is sort of\n"
  + "like a multi-line string,\n"
  + "but it's not really one.";
  console.log(multiline);
}</code></pre>
</div>

<div class="wp-block-cocoon-blocks-column-right column-right">
  <p>
    『<span class="badge-grey">\n</span>』を使わない方法
  </p>
  
  <pre class="wp-block-code"><code>function after() {
  let multiline = `This on the other hand,
  actually is a multi-line string,
  thanks to JavaScript ES6`;
  console.log(multiline);
}
</code></pre>

<p>
</p>
</div>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<div class="wp-block-cocoon-blocks-tab-box-1 blank-box bb-tab bb-point block-box has-border-color has-red-border-color">
  <div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box">
    <div class="iconlist-title">
      これが使うメリット！
    </div>
    
    <ul class="wp-block-list">
      <li>
        『<span class="badge-grey">\n</span>』を使わずに、改行を表すことができます！
      </li>
    </ul>
  </div>
  
  <p>
  </p>
</div>

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

## まとめ

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      今回紹介した新しい構文を活用して、どんどんGASを使っていきたいですね！
    </p>
  </div>
</div>

<div class="wp-block-cocoon-blocks-iconlist-box iconlist-box blank-box list-check block-box has-background has-border-color has-watery-red-background-color has-red-border-color">
  <div class="iconlist-title">
    V8ランタイムのメリット！！
  </div>
  
  <ul class="wp-block-list">
    <li>
      <span class="keyboard-key"><strong>let&nbsp;</strong></span>と<span class="keyboard-key"><strong>&nbsp;const</strong></span>&nbsp;の使い分けで、変数を間違ってしまう可能性を減らすことできます。
    </li>
    <li>
      <strong>アロー関数</strong>で無名関数を短く表現することができます。
    </li>
    <li>
      <strong>Class構文</strong>を使うことで、同じモノの設計を繰り返し使う時に便利！
    </li>
    <li>
      <strong>Class構文</strong>でコードが見やすくなる！
    </li>
    <li>
      <strong>Class構文</strong>は見た目がかっこいい！
    </li>
    <li>
      <strong>分割代入</strong>で、複数の変数に代入する時に1行で書けるようになる！
    </li>
    <li>
      <strong>テンプレート文字列</strong>で、ダブルクォーテーションやシングルクォーテーションを打つ量が減ります！
    </li>
    <li>
      <strong>テンプレート文字列</strong>で、『\n』を使わずに、改行を表すことができます！
    </li>
    <li>
      <strong>デフォルト引数</strong>で、デフォルト値を指定することで、処理を簡略化することができます！
    </li>
    <li>
    </li>
  </ul>
</div>
