---
title: Wix CodeとGASを使ってホームページの更新を自動化する方法
author: arukayies
type: post
date: 2019-12-06T17:00:00+00:00
url: /gas/wixlinkage-gas
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
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1244838109851684864";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1244838109851684864";s:5:"pDate";s:19:"2020-03-31 04:05:08";}}";
categories:
  - GAS
tags:
  - Google Apps Script
  - スプレッドシート

archives: ["2019年12月"]
---
この記事は[Apps Script Advent Calendar 2019][1]の7日目の記事です。

今年からRaspberryPiでサーバーを構築し、ブログを書き始めた「くら(<a rel="noopener" href="http://www.twitter.com/arukayies" target="_blank"><i class="fa fa-twitter" aria-hidden="true" style="color: #55ACEE;font-size:1.2em;"></i>@arukayies</a>)」です。

仕事で資料を作るってことはありますが、アドベントカレンダー等は今年が初投稿です。

よろしくおねがいします！

## 概要

私はツーリングクラブに所属しており、そこのホームページを管理しています。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-detail">
  <a rel="noopener" href="https://touringclubmilkyway.wixsite.com/touringclubmilkyway" title="ツーリングクラブ | Touringclubmilkyway" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://static.wixstatic.com/media/9e694e_38c2a6624908446d9d36a42b5408cad7%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9e694e_38c2a6624908446d9d36a42b5408cad7%7Emv2.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://static.wixstatic.com/media/9e694e_38c2a6624908446d9d36a42b5408cad7%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9e694e_38c2a6624908446d9d36a42b5408cad7%7Emv2.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        ツーリングクラブ | Touringclubmilkyway
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        ツーリングクラブ | Touringclubmilkywayに訪問ありがとうございます。 関東を拠点に活動するツーリングクラブのMilky wayです バイクをきっかけに知り合った個性豊かな仲間と旨い飯、きれいな景色、そして行ったことがない...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://touringclubmilkyway.wixsite.com/touringclubmilkyway" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://touringclubmilkyway.wixsite.com/touringclubmilkyway" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          touringclubmilkyway.wixsite.com
        </div>
      </div>
    </div>
  </div></a>
</div>

ホームページTOPには今後のツーリング予定が書かれており、頻繁に更新が必要でした。

そんな作業をGASを使って、自動化しているので紹介します。

<div class="wp-block-cocoon-blocks-icon-box bad-box common-icon-box block-box">
  <p>
    ツーリング予定をホームページに反映させるのが<span class="marker-under-red">めんどくさかった</span>。
  </p>
</div>

<div class="wp-block-cocoon-blocks-icon-box good-box common-icon-box block-box">
  <p>
    ホームページ更新作業で<span class="marker-under">パターン化した部分をGASを使って自動化</span>します！
  </p>
</div>

## 動作の流れ

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222d3b788.png" title="" Fit="1280x1280 webp q90" >}}
</div>

<div class="wp-block-cocoon-blocks-caption-box-1 caption-box block-box has-border-color has-key-color-border-color">
  <div class="caption-box-label block-box-label box-label fab-pencil">
    <span class="caption-box-label-text block-box-label-text box-label-text">処理の概要</span>
  </div>
  
  <div class="caption-box-content block-box-content box-content">
    <ol class="wp-block-list">
      <li>
        スプレッドシートには伝助の情報が書き込まれています。
      </li>
      <li>
        GASを使ってスプレッドシートの情報を取得します。
      </li>
      <li>
        Wixのデータベースにスプレッドシートの情報を反映させます。
      </li>
      <li>
        Wixでは動的ページとデータベースを連動させます。
      </li>
    </ol>
  </div>
</div>

## IMPORTHTMLでスケジュールをスプレッドシートに書き込む

私のクラブでは伝助というスケジュール調整サービスでツーリングの参加有無を管理しています。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-detail">
  <a rel="noopener" href="https://www.densuke.biz/" title="スケジュール調整サービス「伝助」" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://densuke.biz/images/og.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://densuke.biz/images/og.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        スケジュール調整サービス「伝助」
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        「伝助」は打ち合わせや飲み会を開くとき、みんなの予定を入力して、どの日程が一番都合がよいかを確認するスケジュール調整サービスです。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://densuke.biz/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://densuke.biz/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          densuke.biz
        </div>
      </div>
    </div>
  </div></a>
</div>

スプレッドシートで伝助の情報を取得するのに<span class="marker-under"><strong>IMPORTHTML関数</strong></span>を使います。

<div class="wp-block-cocoon-blocks-icon-box information-box common-icon-box block-box">
  <p>
    <span class="marker-red"><strong>=IMPORTHTML(&#8220;伝助のURL&#8221;,&#8221;table&#8221;)</strong></span>
  </p>
  
  <p>
    これでスプレッドシートに伝助の情報が反映されます！
  </p>
</div>

スプレッドシートで取得するとこんな感じになります。

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222d7a2f7.png" title="" Fit="1280x1280 webp q90" >}}
</div>

## GASを使ってWixのデータベースに書き込む

## Wixの設定

### Backend処理の作成

<div class="wp-block-cocoon-blocks-icon-box information-box common-icon-box block-box">
  <p>
    Wixでホームページが作成されている前提で説明します。
  </p>
</div>

#### ホームページ編集画面からサイドバーを開く

<div class="wp-block-image is-style-default">
  {{< custom-figure src="img_5dfa222de4ed2.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### Backendを開く

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222e3e583.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### jsファイルを作成する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222edf55f.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### http-function.jsを作成する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222f2ec9d.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### http-function.jsの中身

#### Wixにhttp-function.jsを登録する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa222fae577.png" title="" Fit="1280x1280 webp q90" >}}
</div>

### データベースの作成

#### 新規コレクションを作成する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa2232bca34.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### 必要なフィールドを作成する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa223315543.png" title="" Fit="1280x1280 webp q90" >}}
</div>

### データベースとの連携

#### 連携させたい箇所にデータベースをリンクさせる

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa2235e8c28.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### データセットを設定する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa2237eb097.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### テキストとデータベースを接続する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa2238b1c74.png" title="" Fit="1280x1280 webp q90" >}}
</div>

#### テキストを接続する

<div class="wp-block-image">
  {{< custom-figure src="img_5dfa223a60200.png" title="" Fit="1280x1280 webp q90" >}}
</div>

## 運用方法

LINE BOTで特定キーワードの発言があったら、今回の処理を動かすようにしています。

僕以外のメンバーでも<span class="marker-under"><strong>同じように更新</strong></span>することができ、常に**<span class="marker-under">ホームページの情報が最新</span>**に保たれるようになりました。

LINE で発言するだけなら<span class="marker-under"><strong>とても楽</strong></span>です。

ちなみにトリガーワードは「**連動更新**」です。<span class="badge-grey">他にも同様の考え方で更新処理を自動化しています。</span>

## これを作って良かったこと！

<div class="wp-block-cocoon-blocks-icon-box good-box common-icon-box block-box">
  <ul class="wp-block-list">
    <li>
      ホームページの更新が<span class="marker-under">自動化</span>できた！
    </li>
    <li>
      情報が最新に保たれていることで、<span class="marker-under">クラブ加入の問い合わせが増えた</span>！
    </li>
    <li>
      <span class="marker-under">属人化</span>していた作業が減った！
    </li>
  </ul>
  
  <p>
  </p>
</div>

 [1]: https://qiita.com/advent-calendar/2019/gas
