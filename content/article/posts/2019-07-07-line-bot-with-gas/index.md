---
title: GASで作る簡単なLINE BOTの作り方
author: arukayies
type: post
date: 2019-07-07T05:51:39+00:00
excerpt: GASで作るLINE BOTの簡単な作り方を紹介します！
url: /gas/line_bot/line-bot-with-gas
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
snap_isRpstd579:
  - 1577445888
snap_isAutoPosted:
  - 1
snap_isRpstd2493:
  - 1586688326
last_modified:
  - 2024-11-19 09:51:30
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249287505007923201";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249287505007923201";s:5:"pDate";s:19:"2020-04-12 10:45:26";}}";
categories:
  - LINE BOT
tags:
  - GAS
  - Google Apps Script
  - LINE BOT

archives: ["2019年7月"]
---
こんにちは「くら」です！

今回は<strong>Google Apps Script（通称GAS）</strong>で作成するLINE BOTの
</p>
<p>
<span class="fz-24px"><span class="bold-red">簡単な作り方</span></span>を紹介します。
</p>
<p>
<strong>無料のGoogleアカウント</strong>さえあれば作成可能なので、ぜひチャレンジしてみてください！

『 <strong>サンプル</strong> 』と発言すると、『 <strong>サンプルサンプルサンプル</strong> 』と返してくれるLINE BOTを作る手順を紹介します！<figure class="wp-block-image aligncenter">

{{< custom-figure src="img_5dfa326c0486c.gif" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">LINEBOTが動作している様子</figcaption></figure> 

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798150734_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎｇ　ＡＰＩを使ったチャットボットの/翔泳社/立花翔</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DLINE%2520bot%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DLINE%2520bot" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

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
    </div>{{< custom-figure src="gettoken-1-160x90.png" title="" Fit="1280x1280 webp q90" >}}
    
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
    <figure class="wp-block-image size-large">{{< custom-figure src="【Google】新規を押下する.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>新規</strong> を押下する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large">{{< custom-figure src="【Google】その他を押下する.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>その他</strong> を押下する</figcaption></figure> 
    
    <p>
    </p>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="【Google】Google-Apps-Scriptを押下する.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>Google Apps Script</strong> を押下する</figcaption></figure>
  </div>
</div>

<span class="number">3　</span>プロジェクト名を設定します。好きな名前を入力し、『 **名前を変更** 』を押下してください。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット_2021-02-27_12_57_21.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>無題のプロジェクト</strong> を選択する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット_2021-02-27_13_00_59.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">プロジェクト名を入力し、<strong>名前を変更</strong> を押下する</figcaption></figure> 
    
    <p>
    </p>
  </div>
</div>

<span class="number">4　</span>『 **コード.gs** 』に以下のコードを貼り付け、名前を『 **main** 』に変更します、

1行目のトークンは事前に取得したLINEのチャンネルアクセストークンを入力してください。

<div class="wp-block-cocoon-blocks-column-2 column-wrap column-2 column-2-2-1-1 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.03.16-1024x424.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>main</strong> のコードを貼り付ける</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.04.08.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>main</strong> に名前を変える</figcaption></figure>
  </div>
</div>

### main処理の説明

**main** の処理ではLINEから **Webhock** を受け取り、送られてきたイベントを処理します。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
  <p>
    <strong>Webhockとは？</strong>
  </p>
  
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
  <p>
    <strong>main処理の概要</strong>
  </p>
  
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
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.06.41.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>スクリプト</strong> を追加する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.08.38.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>messageController</strong> を貼り付ける</figcaption></figure>
  </div>
</div>

### messageController処理の説明

特定文字列が含まれていた場合に、返信メッセージを組み立てる処理を行います。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
  <p>
    <strong>messageController処理の概要</strong>
  </p>
  
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
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.06.41.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>スクリプト</strong> を追加する</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット-2021-02-27-13.11.35-1024x471.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption"><strong>replyLine</strong> を貼り付ける</figcaption></figure>
  </div>
</div>

### replyLine処理の説明

LINEで返信する処理を行います。

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
  <p>
    <strong>replyLine処理の概要</strong>
  </p>
  
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

{{< custom-figure src="スクリーンショット_2021-02-27_13_13_58-1024x282.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">『 **デプロイ** 』>『 **新しいデプロイ** 』を押下する</figcaption></figure> 

<span class="number">2　『 <strong>デプロイ</strong> 』>『 <strong>新しいデプロイ </strong>』を押下します。</span><figure class="wp-block-image aligncenter size-large">

{{< custom-figure src="スクリーンショット_2021-02-27_13_16_16-2.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">『 **デプロイ** 』>『 **新しいデプロイ** 』を押下する</figcaption></figure> 

<span class="number">3　アクセス出来るユーザーを『 <strong>全員 </strong>』に変更し、</span>『 **デプロイ** 』を押下します。<figure class="wp-block-image aligncenter size-large">

{{< custom-figure src="スクリーンショット_2021-02-27_13_21_06-2.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">アクセス出来るユーザーを『 **全員** 』に変更し、**デプロイ** を押下する</figcaption></figure> 

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
    
    {{< custom-figure src="スクリーンショット_2021-02-27_13_24_02.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認1</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large">{{< custom-figure src="【Google】承認2.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認2</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="【Google】承認3.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認3</figcaption></figure>
  </div>
</div>

<div class="wp-block-cocoon-blocks-column-3 column-wrap column-3 layout-box">
  <div class="wp-block-cocoon-blocks-column-left column-left">
    <figure class="wp-block-image size-large is-resized">{{< custom-figure src="【Google】承認4.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認4</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-center column-center">
    <figure class="wp-block-image size-large is-resized">{{< custom-figure src="【Google】承認5.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認5</figcaption></figure>
  </div>
  
  <div class="wp-block-cocoon-blocks-column-right column-right">
    <figure class="wp-block-image size-large">{{< custom-figure src="スクリーンショット_2021-02-27_13_25_17.png" title="" Fit="1280x1280 webp q90" >}}<figcaption class="wp-element-caption">承認6</figcaption></figure>
  </div>
</div>

<span class="number">最後に表示される</span> **ウェブアプリのURL** が次の **Webhook URL** です！

<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box information-box">
  <p>
    コードを変更した場合は再度デプロイをすることで変更が反映されます！
  </p>
</div>

## LINE DevelopersにWebhook URLを設定する

1　LINE チャンネル基本設定のページに遷移し、『**Webhook設定**』の『**編集**』を押下します。

LINEチャンネル基本設定の遷移先は過去の記事を参考にしてください。

<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a href="https://arukayies.com/gas/line_bot/gettoken#toc5" title="LINE Messaging APIアクセストークンの取得方法" class="blogcard-wrap internal-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard internal-blogcard ib-left cf">
    <div class="blogcard-label internal-blogcard-label">
      <span class="fa"></span>
    </div>{{< custom-figure src="gettoken-1-160x90.png" title="" Fit="1280x1280 webp q90" >}}
    
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

{{< custom-figure src="【LINE】Webhook設定-1024x196.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">【LINE】Webhook設定</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<span class="number">2　</span>GASの**ウェブアプリケーションのURL**を入力し、『**更新**』を押下します。<figure class="wp-block-image aligncenter size-large">

{{< custom-figure src="【LINE】WebhookURLの入力-1024x199.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">【LINE】WebhookURLの入力</figcaption></figure> 

<div style="height:20px" aria-hidden="true" class="wp-block-spacer">
</div>

<span class="number">3　</span>『**検証**』を押下し、『**成功**』と表示されたらOKです。Webhookの利用を『**ON**』にします。<figure class="wp-block-image aligncenter size-large">

{{< custom-figure src="【LINE】WebhookURLの検証-1024x313.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">【LINE】WebhookURLの検証</figcaption></figure> 

## LINEBOTが動作している様子

設定したBOTを友だち登録します。チャンネル基本設定のQRコードから友達登録してください。<figure class="wp-block-image aligncenter size-large">

{{< custom-figure src="【LINE】友達登録.png" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">【LINE】友達登録</figcaption></figure> 



<div class="wp-block-cocoon-blocks-icon-box common-icon-box block-box good-box">
  <p>
    <strong>サンプル機能</strong>
  </p>
  
  <ul class="wp-block-list">
    <li>
      『<strong>サンプル</strong>』としゃべると、『<strong>サンプルサンプルサンプル</strong>』と発言します。
    </li>
  </ul>
</div><figure class="wp-block-image aligncenter">

{{< custom-figure src="img_5dfa326c0486c.gif" title="" Fit="1280x1280 webp q90" >}} <figcaption class="wp-element-caption">LINEBOTが動作している様子</figcaption></figure> 

## まとめ

なるべく<strong>シンプルな</strong>作りになるようにコードを書いてみました。
</p>
<p>
コードにはコメントを多く入れているので、理解の助けになれば嬉しいです。

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798150734_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >ＬＩＮＥ　ＢＯＴを作ろう！ Ｍｅｓｓａｇｉｎｇ　ＡＰＩを使ったチャットボットの/翔泳社/立花翔</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2Fe4320d2f4429571200cf25919da31353%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DLINE%2520bot%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DLINE%2520bot" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="20010009784798064741_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >詳解！Ｇｏｏｇｌｅ　Ａｐｐｓ　Ｓｃｒｉｐｔ完全入門 ＧｏｏｇｌｅアプリケーションとＧｏｏｇｌｅ　Ｗｏｒ 第３版/秀和システム/高橋宣成</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F2735ffa9683d4fe24bd8643fa95fab2a%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3Dgoogle%2520apps%2520script%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3Dgoogle%2520apps%2520script" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>
