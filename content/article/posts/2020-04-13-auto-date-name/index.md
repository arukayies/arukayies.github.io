---
title: GASを使って表の記入者＆日付を自動入力させる方法
author: arukayies
type: post
date: 2020-04-13T13:24:40+00:00
excerpt: IT系の仕事でよく目にする課題管理票・確認事項一覧の日付と記入者をGASを使って自動入力させる方法を紹介します！
url: /gas/auto-date-name
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
  - 1586784281
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249690212856295424";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249690212856295424";s:5:"pDate";s:19:"2020-04-13 13:25:39";}}";
categories:
  - GAS
tags:
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年4月"]
---
<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      案件を管理する際にこのような表を見かけたことはないでしょうか？
    </p>
  </div>
</div><figure class="wp-block-image size-large">

{{< custom-figure src="スクリーンショット-2020-04-13-19.36.42-1024x200.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>課題管理票の例</figcaption></figure> 

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      課題管理票・確認事項一覧など呼び方は様々ですが、
    </p>
    
    <p>
      IT系の仕事をしていると見たことあると思います！
    </p>
  </div>
</div>

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      この表の入力を<span class="bold-red"><span class="fz-22px">GASを使って少しでも楽にする<strong>！</strong></span></span>
    </p>
    
    <p>
      <span class="red"><span class="fz-20px"><span class="bold-blue">記入者＆日付を自動入力させる方法</span></span></span>を紹介します！
    </p>
    
    <p>
      汎用性あるので、いろんな表で使ってみてください！
    </p>
    
    <p>
      こんな感じで自動入力されます！↓
    </p>
  </div>
</div><figure class="wp-block-image size-large">

{{< custom-figure src="スクリーンショット-2020-04-13-19.36.42-1-1024x200.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>入力前</figcaption></figure> <figure class="wp-block-image size-large">{{< custom-figure src="でも-1024x231.png" title="" Fit="1280x1280 webp q90" >}}<figcaption>入力後</figcaption></figure> 

## 表にスクリプトを追加する

### スクリプト エディタを起動する

{{< custom-figure src="スクリプトエディタを起動-1024x334.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>スクリプト エディタを起動</figcaption></figure> 

### 赤枠の部分にコードを貼り付ける

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized">{{< custom-figure src="コードを追加する.png" title="" Fit="1280x1280 webp q90" >}}<figcaption>コードを追加</figcaption></figure>
</div>

貼り付けるコードはこちら↓

## 追加するコードについて

行・列の位置を表の内容によって合わせる必要があります。

<div class="wp-block-cocoon-blocks-caption-box-1 caption-box block-box has-border-color has-key-color-border-color">
  <div class="caption-box-label block-box-label box-label fab-info-circle">
    <span class="caption-box-label-text block-box-label-text box-label-text">コード変更箇所</span>
  </div>
  
  <div class="caption-box-content block-box-content box-content">
    <ul class="wp-block-list">
      <li>
        ヘッダーの行番号・・・・15行目
      </li>
      <li>
        トリガーとなる列番号・・17行目
      </li>
      <li>
        日付を書き込む列番号・・19行目
      </li>
      <li>
        記入者を書き込む列番号・21行目
      </li>
    </ul>
  </div>
</div>

## スクリプトを保存する

コードを貼り付けたら、<span class="keyboard-key">ファイル</span> > <span class="keyboard-key">保存</span> でコードを保存します。

好きな名前で保存してください。<figure class="wp-block-image size-large is-resized">

{{< custom-figure src="プロジェクト名を保存する.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>プロジェクト名の保存</figcaption></figure> 

## スクリプトを実行する

<span class="keyboard-key">Session.getActiveUser().getEmail()</span>でメールアドレスを取得するためには承認を通す必要があります。<figure class="wp-block-image size-large is-resized">

{{< custom-figure src="実行-1024x454.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>スクリプトを実行</figcaption></figure> 

実行すると、承認画面が表示されるので、以下の順番で許可してあげます。

<ol class="wp-block-list">
  <li>
    「承認が必要です」の画面で<span class="keyboard-key">許可を確認</span>ボタンを押す。
  </li>
  <li>
    「Googleにログイン」画面で自分のアカウントを選択する。
  </li>
  <li>
    「このアプリは確認されていません」画面で<span class="keyboard-key">詳細</span>リンクを押す。
  </li>
  <li>
    <span class="keyboard-key">〇〇〇（安全ではないページ）に移動</span>リンクを押す。
  </li>
  <li>
    「Googleにログイン」画面で<span class="keyboard-key">許可</span>ボタンを押す。
  </li>
</ol>

<span class="red">失敗します</span>が、最初だけでこの作業をすればOKです！

## 表の記入者＆日付を自動入力させてみた結果

ためしに「テスト」と内容に入力してみます。<figure class="wp-block-image size-large">

{{< custom-figure src="スクリーンショット-2020-04-13-19.36.42-1024x200.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>実行前</figcaption></figure> <figure class="wp-block-image size-large">{{< custom-figure src="でも-1024x231.png" title="" Fit="1280x1280 webp q90" >}}<figcaption>実行後</figcaption></figure> 

実行のログはダッシュボードで確認することが出来ます。<figure class="wp-block-image size-large">

{{< custom-figure src="スクリーンショット-2020-04-13-21.23.37-1024x220.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>実行時のログ</figcaption></figure> 

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-check">
  <a rel="noopener" href="https://script.google.com/home/executions" title="Apps Script  |  Google for Developers" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://www.gstatic.com/devrel-devsite/prod/vfe17804c88ef6022fad1ddf837c323ee30f747a71d900f69699aa6fc2a2a7546/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://www.gstatic.com/devrel-devsite/prod/vfe17804c88ef6022fad1ddf837c323ee30f747a71d900f69699aa6fc2a2a7546/developers/images/opengraph/white.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Apps Script  |  Google for Developers
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Develop high-quality, cloud-based solutions with ease.
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://developers.google.com/apps-script" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          developers.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>

## まとめ

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    {{< custom-figure src="icon-1.png" title="" Fit="1280x1280 webp q90" >}}
    

  </div>
  
  <div class="speech-balloon">
    <p>
      日付と記入者が自動入力される方法でした！
    </p>
    
    <p>
      スプレッドシートが編集された時に動作するトリガーは
    </p>
    
    <p>
      <span class="bold-green"><span class="fz-22px">onEdit(e)</span></span>と関数に書くとシンプルなトリガーとして自動的に動作します。
    </p>
    
    <p>
      今回のように毎回決まった入力規則がある場合は、GASを活用してどんどん効率化していきたいですね！
    </p>
  </div>
</div>
