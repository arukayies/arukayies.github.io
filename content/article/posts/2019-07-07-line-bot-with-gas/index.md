---
title: GASで作る簡単なLINE BOTの作り方
author: arukayies
date: 2019-07-07T05:51:39+00:00
excerpt: GASで作るLINE BOTの簡単な作り方を紹介します！
toc: true
the_review_rate:
  - 5
snap_isRpstd579:
  - 1577445888
snap_isAutoPosted:
  - 1
snap_isRpstd2493:
  - 1586688326
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249287505007923201";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249287505007923201";s:5:"pDate";s:19:"2020-04-12 10:45:26";}}";
tags:
  - "LINE BOT"
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2019年7月"]
---
こんにちは「くら」です！

今回は<strong>Google Apps Script（通称GAS）</strong>で作成するLINE BOTの


<span class="fz-24px"><span class="bold-red">簡単な作り方</span></span>を紹介します。


<strong>無料のGoogleアカウント</strong>さえあれば作成可能なので、ぜひチャレンジしてみてください！

『 <strong>サンプル</strong> 』と発言すると、『 <strong>サンプルサンプルサンプル</strong> 』と返してくれるLINE BOTを作る手順を紹介します！<figure class="wp-block-image aligncenter">

![![](img_5dfa326c0486c.gif)](img_5dfa326c0486c.gif) <figcaption class="wp-element-caption">LINEBOTが動作している様子</figcaption></figure> 



## 必要なもの

<ul class="wp-block-list">
  <li>
    LINEアカウント
  </li>
  <li>
    LINEBOTのチャンネルアクセストークン
  </li>
</ul>

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](gettoken-1-160x90.png)](gettoken-1-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        LINE Messaging APIアクセストークンの取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINEBOTに必要なトークンの取得方法を画像付きで解説します。
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
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div>

<ul class="wp-block-list">
  <li>
    Googleアカウント
  </li>
</ul>

## GASのコードを追加する

<span class="number">1　</span>最初に『 **Googleドライブ** 』へアクセスします。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference-link">
  <a rel="noopener" href="https://drive.google.com/drive/my-drive" title="Google Drive: Sign-in" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdrive.google.com%2Fdrive%2Fmy-drive?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Drive: Sign-in
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Access Google Drive with a Google account (for personal use) or Google Workspace account (for business use).
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://drive.google.com/drive/my-drive" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://drive.google.com/drive/my-drive" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          drive.google.com
        </div>
      </div>
    </div>
  </div></a>
</div>

2　『 **新規** 』>『 **その他** 』>『 **Google Apps Script** 』の順で押下します。

<div class="wp-block-cocoon-blocks-column-3 column-wrap column-3 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](【Google】新規を押下する.png)](【Google】新規を押下する.png)<figcaption class="wp-element-caption"><strong>新規</strong> を押下する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large">![![](【Google】その他を押下する.png)](【Google】その他を押下する.png)<figcaption class="wp-element-caption"><strong>その他</strong> を押下する</figcaption></figure> 
    
        
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](【Google】Google-Apps-Scriptを押下する.png)](【Google】Google-Apps-Scriptを押下する.png)<figcaption class="wp-element-caption"><strong>Google Apps Script</strong> を押下する</figcaption></figure>
  
<span class="number">3　</span>プロジェクト名を設定します。好きな名前を入力し、『 **名前を変更** 』を押下してください。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](スクリーンショット_2021-02-27_12_57_21.png)](スクリーンショット_2021-02-27_12_57_21.png)<figcaption class="wp-element-caption"><strong>無題のプロジェクト</strong> を選択する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](スクリーンショット_2021-02-27_13_00_59.png)](スクリーンショット_2021-02-27_13_00_59.png)<figcaption class="wp-element-caption">プロジェクト名を入力し、<strong>名前を変更</strong> を押下する</figcaption></figure> 
    
        
  
<span class="number">4　</span>『 **コード.gs** 』に以下のコードを貼り付け、名前を『 **main** 』に変更します、

1行目のトークンは事前に取得したLINEのチャンネルアクセストークンを入力してください。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.03.16-1024x424.png)](スクリーンショット-2021-02-27-13.03.16-1024x424.png)<figcaption class="wp-element-caption"><strong>main</strong> のコードを貼り付ける</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.04.08.png)](スクリーンショット-2021-02-27-13.04.08.png)<figcaption class="wp-element-caption"><strong>main</strong> に名前を変える</figcaption></figure>
  
### main処理の説明

**main** の処理ではLINEから **Webhock** を受け取り、送られてきたイベントを処理します。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      <strong>Webhockとは？</strong>
  
  
  <ul class="wp-block-list">
    <li>
      アプリケーションの更新情報を<strong>他のアプリケーションへリアルタイム提供する</strong>仕組みのことを言います。
    </li>
    <li>
      ここではLINEの更新をGASに通知するという意味になります。
    </li>
  </ul>
</div>

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      <strong>main処理の概要</strong>
  
  
  <ol class="wp-block-list">
    <li>
      LINEから送られてきたデータをdoPost(e)の<strong>e</strong>で受け取ります。
    </li>
    <li>
      受け取ったデータから、イベントタイプと返信するための宛先を取得します。
    </li>
    <li>
      イベントタイプが <strong>message</strong> の場合、<strong>messageController</strong> に送られてきたデータ、返信するための宛先を渡します。
    </li>
  </ol>
</div>

<span class="number">5　</span>『 **ファイル** 』>『 **＋** 』 > 『 **スクリプト** 』で新規にスクリプトを追加します。

名前を**messageController** に設定し、以下のコードを貼り付けます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.06.41.png)](スクリーンショット-2021-02-27-13.06.41.png)<figcaption class="wp-element-caption"><strong>スクリプト</strong> を追加する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.08.38.png)](スクリーンショット-2021-02-27-13.08.38.png)<figcaption class="wp-element-caption"><strong>messageController</strong> を貼り付ける</figcaption></figure>
  
### messageController処理の説明

特定文字列が含まれていた場合に、返信メッセージを組み立てる処理を行います。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      <strong>messageController処理の概要</strong>
  
  
  <ol class="wp-block-list">
    <li>
      LINEから送られてきたメッセージを取得します。
    </li>
    <li>
      メッセージに <strong>サンプル</strong> という文字列が含まれていた場合、<strong>サンプルサンプルサンプル</strong> という返信メッセージを組み立てます。
    </li>
    <li>
      組み立てられた返信メッセージは <strong>replyLine</strong> に渡されます。その時に返信メッセージ、返信するための宛先を引数として渡します。
    </li>
  </ol>
</div>

<span class="number">6　</span>最後に **replyLine** 処理を追加します。以下のコードを貼り付けます。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.06.41.png)](スクリーンショット-2021-02-27-13.06.41.png)<figcaption class="wp-element-caption"><strong>スクリプト</strong> を追加する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](スクリーンショット-2021-02-27-13.11.35-1024x471.png)](スクリーンショット-2021-02-27-13.11.35-1024x471.png)<figcaption class="wp-element-caption"><strong>replyLine</strong> を貼り付ける</figcaption></figure>
  
### replyLine処理の説明

LINEで返信する処理を行います。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      <strong>replyLine処理の概要</strong>
  
  
  <ol class="wp-block-list">
    <li>
      LINE返信URLに <strong>POSTリクエスト</strong> を送るためのパラメータを組み立てます。
    </li>
    <li>
      組み立てたパラメータをLINE返信URLに送信します。
    </li>
  </ol>
</div>

## ウェブアプリをデプロイする

1　『 **デプロイ** 』>『 **新しいデプロイ** 』を押下します。<figure class="wp-block-image aligncenter size-large">

![![](スクリーンショット_2021-02-27_13_13_58-1024x282.png)](スクリーンショット_2021-02-27_13_13_58-1024x282.png) <figcaption class="wp-element-caption">『 **デプロイ** 』>『 **新しいデプロイ** 』を押下する</figcaption></figure> 

<span class="number">2　『 <strong>デプロイ</strong> 』>『 <strong>新しいデプロイ </strong>』を押下します。</span><figure class="wp-block-image aligncenter size-large">

![![](スクリーンショット_2021-02-27_13_16_16-2.png)](スクリーンショット_2021-02-27_13_16_16-2.png) <figcaption class="wp-element-caption">『 **デプロイ** 』>『 **新しいデプロイ** 』を押下する</figcaption></figure> 

<span class="number">3　アクセス出来るユーザーを『 <strong>全員 </strong>』に変更し、</span>『 **デプロイ** 』を押下します。<figure class="wp-block-image aligncenter size-large">

![![](スクリーンショット_2021-02-27_13_21_06-2.png)](スクリーンショット_2021-02-27_13_21_06-2.png) <figcaption class="wp-element-caption">アクセス出来るユーザーを『 **全員** 』に変更し、**デプロイ** を押下する</figcaption></figure> 

<span class="number">4　</span>承認画面が表示されるので、下の赤枠の順に押下します。

<div class="wp-block-cocoon-blocks-column-3 column-wrap column-3 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <div class="wp-block-cocoon-blocks-column-3 column-wrap column-3 layout-box">
      <div class="wp-block-cocoon-blocks-column-left column-left">
      </div>
      
      <div class="wp-block-cocoon-blocks-column-center column-center">
      </div>
      
      <div class="wp-block-cocoon-blocks-column-right column-right">
      </div>
    </div><figure class="wp-block-image size-large">
    
    ![![](スクリーンショット_2021-02-27_13_24_02.png)](スクリーンショット_2021-02-27_13_24_02.png)<figcaption class="wp-element-caption">承認1</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large">![![](【Google】承認2.png)](【Google】承認2.png)<figcaption class="wp-element-caption">承認2</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](【Google】承認3.png)](【Google】承認3.png)<figcaption class="wp-element-caption">承認3</figcaption></figure>
  
<div class="wp-block-cocoon-blocks-column-3 column-wrap column-3 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large is-resized">![![](【Google】承認4.png)](【Google】承認4.png)<figcaption class="wp-element-caption">承認4</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large is-resized">![![](【Google】承認5.png)](【Google】承認5.png)<figcaption class="wp-element-caption">承認5</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">![![](スクリーンショット_2021-02-27_13_25_17.png)](スクリーンショット_2021-02-27_13_25_17.png)<figcaption class="wp-element-caption">承認6</figcaption></figure>
  
<span class="number">最後に表示される</span> **ウェブアプリのURL** が次の **Webhook URL** です！

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
      コードを変更した場合は再度デプロイをすることで変更が反映されます！
  
</div>

## LINE DevelopersにWebhook URLを設定する

1　LINE チャンネル基本設定のページに遷移し、『**Webhook設定**』の『**編集**』を押下します。

LINEチャンネル基本設定の遷移先は過去の記事を参考にしてください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken#toc5" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>![![](gettoken-1-160x90.png)](gettoken-1-160x90.png)
    
    <div class="blogcard-content internal-blogcard-content">
      <div class="blogcard-title internal-blogcard-title">
        LINE Messaging APIアクセストークンの取得方法
      </div>
      
      <div class="blogcard-snippet internal-blogcard-snippet">
        LINEBOTに必要なトークンの取得方法を画像付きで解説します。
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
          2024.11.19
        </div>
      </div>
    </div>
  </div></a>
</div><figure class="wp-block-image aligncenter size-large">

![![](【LINE】Webhook設定-1024x196.png)](【LINE】Webhook設定-1024x196.png) <figcaption class="wp-element-caption">【LINE】Webhook設定</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<span class="number">2　</span>GASの**ウェブアプリケーションのURL**を入力し、『**更新**』を押下します。<figure class="wp-block-image aligncenter size-large">

![![](【LINE】WebhookURLの入力-1024x199.png)](【LINE】WebhookURLの入力-1024x199.png) <figcaption class="wp-element-caption">【LINE】WebhookURLの入力</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<span class="number">3　</span>『**検証**』を押下し、『**成功**』と表示されたらOKです。Webhookの利用を『**ON**』にします。<figure class="wp-block-image aligncenter size-large">

![![](【LINE】WebhookURLの検証-1024x313.png)](【LINE】WebhookURLの検証-1024x313.png) <figcaption class="wp-element-caption">【LINE】WebhookURLの検証</figcaption></figure> 

## LINEBOTが動作している様子

設定したBOTを友だち登録します。チャンネル基本設定のQRコードから友達登録してください。<figure class="wp-block-image aligncenter size-large">

![![](【LINE】友達登録.png)](【LINE】友達登録.png) <figcaption class="wp-element-caption">【LINE】友達登録</figcaption></figure> 



<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box good-box">
      <strong>サンプル機能</strong>
  
  
  <ul class="wp-block-list">
    <li>
      『<strong>サンプル</strong>』としゃべると、『<strong>サンプルサンプルサンプル</strong>』と発言します。
    </li>
  </ul>
</div><figure class="wp-block-image aligncenter">

![![](img_5dfa326c0486c.gif)](img_5dfa326c0486c.gif) <figcaption class="wp-element-caption">LINEBOTが動作している様子</figcaption></figure> 

## まとめ

なるべく<strong>シンプルな</strong>作りになるようにコードを書いてみました。


コードにはコメントを多く入れているので、理解の助けになれば嬉しいです。


