---
title: GASを使ってスプレッドシートの内容をSlackに通知させる方法
author: arukayies
type: post
date: 2020-04-18T08:10:29+00:00
excerpt: |
  スプレッドシートのURLをSlackに貼り付けて中身の共有を行っていませんか？
  そんな作業はGASとSlackを連携させれば解決です！方法を紹介します！！！
url: /gas/sheet-postcontent-slack
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
  - 1587197430
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1251422895009488896";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1251422895009488896";s:5:"pDate";s:19:"2020-04-18 08:10:43";}}";
categories:
  - GAS
tags:
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年4月"]
---
<figure class="wp-block-embed-twitter aligncenter wp-block-embed is-type-rich is-provider-twitter">

<div class="wp-block-embed__wrapper">
  <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
    <p lang="ja" dir="ltr">
      仕事でGASを使ってよく使っている処理4つ！<br />・入力したら勝手に日付入る＆名前入る<br />・スプレッドシートの指定された情報をSlackへ通知<br />・特定メールが来たら、Slackへ通知<br />・定期的に送るメール内容の自動生成<br />結構ネタがあるから、GASで作れるツールについても記事書いていく
    </p>&mdash; arukayies (@arukayies) 
    
    <a href="https://twitter.com/arukayies/status/1248928918297407491?ref_src=twsrc%5Etfw">April 11, 2020</a>
  </blockquote>
</div></figure> 

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    <figure class="speech-icon"><img decoding="async" src="https://arukayies.com/wp-content/uploads/2019/12/icon-1.png" alt="くら" class="speech-icon-image" /></figure>
    

  </div>
  
  <div class="speech-balloon">
    <p>
      以前こんなツイートしたので、2個目のスプレッドシートの内容をSlackへ通知させる方法を紹介します！
    </p>
  </div>
</div>

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    <figure class="speech-icon"><img decoding="async" src="https://arukayies.com/wp-content/uploads/2019/12/icon-1.png" alt="くら" class="speech-icon-image" /></figure>
    

  </div>
  
  <div class="speech-balloon">
    <p>
      こんな感じで動作します。
    </p>
  </div>
</div>

ステータスを **<span class="fz-20px">新規</span>** に変更すると、

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/実行前-1024x197.png" alt="" class="wp-image-2847" width="714" height="137" srcset="https://arukayies.com/wp-content/uploads/2020/04/実行前-1024x197.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/実行前-300x58.png 300w, https://arukayies.com/wp-content/uploads/2020/04/実行前-768x148.png 768w, https://arukayies.com/wp-content/uploads/2020/04/実行前-1536x295.png 1536w, https://arukayies.com/wp-content/uploads/2020/04/実行前-2048x394.png 2048w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>ステータスを新規にする</figcaption></figure>
</div>

Slackの指定チャンネルに **<span class="fz-20px">通知</span>** が飛びます！<figure class="wp-block-image size-large is-resized">

{{< custom-figure src="実行後.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>こんな感じに飛ぶ</figcaption></figure> 

ちなみに1個目の『入力したら勝手に日付入る＆名前入る』はこちらです。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-related">
  <a href="https://arukayies.com/gas/auto-date-name" title="GASを使って表の記入者＆日付を自動入力させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-160x90.png 160w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-320x180.png 320w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使って表の記入者＆日付を自動入力させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        IT系の仕事でよく目にする課題管理票・確認事項一覧の日付と記入者をGASを使って自動入力させる方法を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.13
        </div>
      </div>
    </div>
  </div></a>
</div>

## 【Slack】Slackのトークンを取得する

スプレッドシートの内容をSlackへ通知させるために、Slackのトークンを取得します。

### Slackのアプリを作成します

下のURLにアクセスします。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-official">
  <a rel="noopener" href="https://api.slack.com/apps" title="Slack API: Applications | Slack" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fapi.slack.com%2Fapps?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fapi.slack.com%2Fapps?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Slack API: Applications | Slack
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://api.slack.com/apps" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://api.slack.com/apps" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          api.slack.com
        </div>
      </div>
    </div>
  </div></a>
</div>

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/Slackにアプリ情報を入力する-1024x852.png" alt="" class="wp-image-2834" width="714" height="594" srcset="https://arukayies.com/wp-content/uploads/2020/04/Slackにアプリ情報を入力する-1024x852.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/Slackにアプリ情報を入力する-300x250.png 300w, https://arukayies.com/wp-content/uploads/2020/04/Slackにアプリ情報を入力する-768x639.png 768w, https://arukayies.com/wp-content/uploads/2020/04/Slackにアプリ情報を入力する.png 1154w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>アプリ情報を入力</figcaption></figure>
</div>

### 取得するトークンの権限を選択する

「OAuth & Permissions」を選択します。

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" decoding="async" width="1024" height="733" src="https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions-1024x733.jpg" alt="" class="wp-image-2835" srcset="https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions-1024x733.jpg 1024w, https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions-300x215.jpg 300w, https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions-768x550.jpg 768w, https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions-1536x1099.jpg 1536w, https://arukayies.com/wp-content/uploads/2020/04/OAuth-Permissions.jpg 1962w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption>「OAuth & Permissions」を選択</figcaption></figure>
</div>

Scopesエリアの「chat:write」を選択します。

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/chat-writeを選択-1024x942.png" alt="" class="wp-image-2836" width="714" height="656" srcset="https://arukayies.com/wp-content/uploads/2020/04/chat-writeを選択-1024x942.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/chat-writeを選択-300x276.png 300w, https://arukayies.com/wp-content/uploads/2020/04/chat-writeを選択-768x706.png 768w, https://arukayies.com/wp-content/uploads/2020/04/chat-writeを選択.png 1466w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>Scopesエリアの「chat:write」を選択</figcaption></figure>
</div>

### 作成したアプリをワークスペースにインストールする

作成したアプリをワークスペースにインストールします。

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/ワークスペースにアプリをインストールする-1024x946.png" alt="" class="wp-image-2837" width="714" height="659" srcset="https://arukayies.com/wp-content/uploads/2020/04/ワークスペースにアプリをインストールする-1024x946.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/ワークスペースにアプリをインストールする-300x277.png 300w, https://arukayies.com/wp-content/uploads/2020/04/ワークスペースにアプリをインストールする-768x709.png 768w, https://arukayies.com/wp-content/uploads/2020/04/ワークスペースにアプリをインストールする.png 1444w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>作成したアプリをワークスペースにインストール</figcaption></figure>
</div>

ワークスペースへのインストールを許可します。

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/許可する-1024x855.png" alt="" class="wp-image-2838" width="714" height="596" srcset="https://arukayies.com/wp-content/uploads/2020/04/許可する-1024x855.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/許可する-300x250.png 300w, https://arukayies.com/wp-content/uploads/2020/04/許可する-768x641.png 768w, https://arukayies.com/wp-content/uploads/2020/04/許可する.png 1186w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>アクセスを許可する</figcaption></figure>
</div>

### 生成されたトークンをコピーする

これでトークンが生成されます！

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" decoding="async" width="1024" height="624" src="https://arukayies.com/wp-content/uploads/2020/04/トークン生成-1024x624.png" alt="" class="wp-image-2839" srcset="https://arukayies.com/wp-content/uploads/2020/04/トークン生成-1024x624.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/トークン生成-300x183.png 300w, https://arukayies.com/wp-content/uploads/2020/04/トークン生成-768x468.png 768w, https://arukayies.com/wp-content/uploads/2020/04/トークン生成.png 1478w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure>
</div>

## 【スプレッドシート】Slackに通知させるコードを追加する

ステータスが **<span class="fz-20px">新規</span>** となったら、スプレッドシートの **<span class="fz-20px">内容</span>** をSlack通知させるコードを追加します。

追加方法はこちらを参考してください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-none">
  <a href="https://arukayies.com/gas/auto-date-name#toc2" title="GASを使って表の記入者＆日付を自動入力させる方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail internal-blogcard-thumbnail">
    
    <img loading="lazy" decoding="async" width="160" height="90" src="https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-160x90.png" class="blogcard-thumb-image internal-blogcard-thumb-image wp-post-image" alt="" srcset="https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-160x90.png 160w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-120x68.png 120w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-320x180.png 320w, https://arukayies.com/wp-content/uploads/2020/04/auto-date-name-376x212.png 376w" sizes="(max-width: 160px) 100vw, 160px" /></figure>
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        GASを使って表の記入者＆日付を自動入力させる方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        IT系の仕事でよく目にする課題管理票・確認事項一覧の日付と記入者をGASを使って自動入力させる方法を紹介します！
      </div>
    </div>
    
    <div class="blogcard-footer internal-blogcard-footer cf">
      <div class="blogcard-site internal-blogcard-site">
        <div class="blogcard-favicon internal-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://arukayies.com" alt="" class="blogcard-favicon-image internal-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain internal-blogcard-domain">
          arukayies.com
        </div>
      </div>
      
      <div class="blogcard-date internal-blogcard-date">
        <div class="blogcard-post-date internal-blogcard-post-date">
          2020.04.13
        </div>
      </div>
    </div>
  </div></a>
</div>

追加するコードはこちらです。

## 【スプレッドシート】トリガーを設定する

<span class="keyboard-key">編集</span> > <span class="keyboard-key">現在のプロジェクトのトリガー</span> を選択する。<figure class="wp-block-image size-large is-resized">

<img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/トリガー1-1024x904.png" alt="" class="wp-image-2843" width="714" height="630" srcset="https://arukayies.com/wp-content/uploads/2020/04/トリガー1-1024x904.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/トリガー1-300x265.png 300w, https://arukayies.com/wp-content/uploads/2020/04/トリガー1-768x678.png 768w, https://arukayies.com/wp-content/uploads/2020/04/トリガー1.png 1180w" sizes="(max-width: 714px) 100vw, 714px" /> <figcaption>編集 > 現在のプロジェクトのトリガー を選択</figcaption></figure> 

新しいトリガーを作成する。

<div class="wp-block-image">
  <figure class="aligncenter size-large"><img loading="lazy" decoding="async" width="1024" height="536" src="https://arukayies.com/wp-content/uploads/2020/04/トリガー2-1024x536.png" alt="" class="wp-image-2844" srcset="https://arukayies.com/wp-content/uploads/2020/04/トリガー2-1024x536.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/トリガー2-300x157.png 300w, https://arukayies.com/wp-content/uploads/2020/04/トリガー2-768x402.png 768w, https://arukayies.com/wp-content/uploads/2020/04/トリガー2-1536x804.png 1536w, https://arukayies.com/wp-content/uploads/2020/04/トリガー2-2048x1073.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption>新しいトリガーを作成</figcaption></figure>
</div>

以下のようなトリガーを保存します。<figure class="wp-block-image size-large">

<img loading="lazy" decoding="async" width="1024" height="984" src="https://arukayies.com/wp-content/uploads/2020/04/トリガーの内容-1024x984.png" alt="" class="wp-image-2845" srcset="https://arukayies.com/wp-content/uploads/2020/04/トリガーの内容-1024x984.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/トリガーの内容-300x288.png 300w, https://arukayies.com/wp-content/uploads/2020/04/トリガーの内容-768x738.png 768w, https://arukayies.com/wp-content/uploads/2020/04/トリガーの内容.png 1368w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption>トリガー情報</figcaption></figure> 

## 【実行結果】Slackへ通知させてみた

実際に動かしてみます。

ステータスを **<span class="fz-20px">新規</span>** に変更すると、

<div class="wp-block-image">
  <figure class="aligncenter size-large is-resized"><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2020/04/実行前-1024x197.png" alt="" class="wp-image-2847" width="714" height="137" srcset="https://arukayies.com/wp-content/uploads/2020/04/実行前-1024x197.png 1024w, https://arukayies.com/wp-content/uploads/2020/04/実行前-300x58.png 300w, https://arukayies.com/wp-content/uploads/2020/04/実行前-768x148.png 768w, https://arukayies.com/wp-content/uploads/2020/04/実行前-1536x295.png 1536w, https://arukayies.com/wp-content/uploads/2020/04/実行前-2048x394.png 2048w" sizes="(max-width: 714px) 100vw, 714px" /><figcaption>ステータスを新規にする</figcaption></figure>
</div>

Slackの指定チャンネルに **<span class="fz-20px">通知</span>** が飛びます！<figure class="wp-block-image size-large is-resized">

{{< custom-figure src="実行後.png" title="" Fit="1280x1280 webp q90" >}} <figcaption>こんな感じに飛ぶ</figcaption></figure> 

## まとめ

<div class="wp-block-cocoon-blocks-balloon-ex-box-1 speech-wrap sb-id-1 sbs-stn sbp-l sbis-cb cf block-box">
  <div class="speech-person">
    <figure class="speech-icon"><img decoding="async" src="https://arukayies.com/wp-content/uploads/2019/12/icon-1.png" alt="くら" class="speech-icon-image" /></figure>
    

  </div>
  
  <div class="speech-balloon">
    <p>
      今まではスプレッドシートに書かれている連絡事項をコピーして、それをSlackに貼ってメンバーへ伝達するような場面がありましたが、
    </p>
    
    <p>
    </p>
    
    <p>
      このスクリプトを応用して、スプレッドシートに書かれている連絡事項をSlackに通知させることで、
    </p>
    
    <p>
      <strong><span class="fz-22px"><span class="marker-red">わずかな</span>作業がなくなりました</span>。</strong>（大事と思う）
    </p>
    
    <p>
    </p>
    
    <p>
      他にもいろいろ応用が効きそうなので、活用してみてください！
    </p>
  </div>
</div>
