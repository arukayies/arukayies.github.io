---
title: 【GAS】JRAのレース成績データをスクレイピングして天皇賞秋2019の着順を予想してみた
author: arukayies
date: 2019-10-26T12:36:19+00:00
toc: true
snap_isAutoPosted:
  - 1
the_review_rate:
  - 5
snap_isRpstd579:
  - 1578110542
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1249653780716503046";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1249653780716503046";s:5:"pDate";s:19:"2020-04-13 11:00:53";}}";
snap_isRpstd2493:
  - 1586775653
tags:
  - "GAS"
tags:
  - Google Apps Script
  - スプレッドシート

---
見出しにそれっぽく書いていますが、  
私は<span class="marker"><strong>競馬の知識・データ分析の知識もありません。</strong></span>

もしこのデータを参考にする場合は<span style="color: red;"><strong>自己責任</strong></span>でお願いします。

明日１０月２７日(日)に東京競馬場で天皇賞を見に行くので、  
思い付きでやってみたものです。

## 予想する方法

JRAのサイトから過去のレース結果が閲覧出来ます。

<div class="blogcard-type bct-reference">
  <div class="blogcard-shortcode-wrap paragraph">
    <a rel="noopener" href="http://www.jra.go.jp/datafile/seiseki/" title="&#12524;&#12540;&#12473;&#25104;&#32318;&#12487;&#12540;&#12479;&#12288;JRA" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
    
    <div class="blogcard external-blogcard eb-left cf">
      <div class="blogcard-label external-blogcard-label">
        <span class="fa"></span>
      </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
      
      <img data-src="https://s.wordpress.com/mshots/v1/http%3A%2F%2Fwww.jra.go.jp%2Fdatafile%2Fseiseki%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
      
      <noscript>
        <img loading="lazy" decoding="async" src="https://s.wordpress.com/mshots/v1/http%3A%2F%2Fwww.jra.go.jp%2Fdatafile%2Fseiseki%2F?w=160&#038;h=90" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
      </noscript></figure>
      
      <div class="blogcard-content external-blogcard-content">
        <div class="blogcard-title external-blogcard-title">
          &#12524;&#12540;&#12473;&#25104;&#32318;&#12487;&#12540;&#12479;&#12288;JRA
        </div>
        
        <div class="blogcard-snippet external-blogcard-snippet">
        </div>
      </div>
      
      <div class="blogcard-footer external-blogcard-footer cf">
        <div class="blogcard-site external-blogcard-site">
          <div class="blogcard-favicon external-blogcard-favicon">
            <img data-src="https://www.google.com/s2/favicons?domain=http://www.jra.go.jp/datafile/seiseki/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
            
            <noscript>
              <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=http://www.jra.go.jp/datafile/seiseki/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
            </noscript>
          </div>
          
          <div class="blogcard-domain external-blogcard-domain">
            www.jra.go.jp
          </div>
        </div>
      </div>
    </div></a>
  
ここから以下のデータを取得してきます。

  * レース場所
  * コース種類
  * 天気
  * 着順
  * 馬名
  * 騎手名

取得したデータから、

この馬は東京で走った時は、12匹中1位だったから**スコア100**  
この騎手は芝コースで走った時は、12人中3位だったから**スコア25**

こんな感じで馬・騎手のスコアを算出し、明日の買う馬券を選びます。

## UrlFetchApp.fetch()で年毎のレース情報を取得します。



## それぞれのレース結果から詳細情報を取得します。



## スプレッドシートに書き込みます。



## 取得した結果はおよそ９０００件のデータが集まりました！！！

データは２００２年から閲覧可能でしたが、今の画面表示は２０１６年からのようだったので、

  * ２０１６年からの重賞レース
  * ２０１６年からのG1レース

を取得してきました。

![![](img_5dfa27abaa37b.png)](img_5dfa27abaa37b.png)  
<span style="color: gray;"><strong>アレ・・・カタカナ名の人がうまく取得できてない</strong></span>

## スコアの算出方法は？

難しいことは考えず、<span class="marker"><strong>順位</strong></span>が１番の指標だと思うので、  
こんな計算方法で算出します。

  * 東京開催の場合 
      * ある馬は12匹中４位だったら、100×(12匹中÷4位)= **300**
  * 芝コースの場合 
      * ある騎手は12人中12位だったら、100×(12人中÷12位)= **100**
  * 曇りの場合 
      * ある馬は12匹中1位だったら、100×(12匹中÷1位)= **1200**

このような感じで  
明日の天皇賞は**誰が一番スコアが高い**か計算します。

## スコアを算出します。



## スコアの算出結果です！！！

オッズの人気順では・・・  
<span style="color: red;"><strong>１位</strong></span>　アーモンドアイ  
<span style="color: blue;"><strong>２位</strong></span>　サートゥルナーリア  
<span style="color: orange;"><strong>３位</strong></span>　ダノンプレミアム

**東京**競馬場、**芝**コース、**曇**でスコアを算出した結果です↓  
![![](img_5dfa27ac1e238.png)](img_5dfa27ac1e238.png)  
<span style="color: gray;"><strong>カタカナ名の人だけ「Mデムーロ」→「デムーロ」のように算出</strong></span>

<span style="color: red;"><strong>１位</strong></span>　アーモンドアイ  
<span style="color: blue;"><strong>２位</strong></span>　ランフォザローゼス  
<span style="color: orange;"><strong>３位</strong></span>　アエロリット

<span style="color: red;"><strong>１位</strong></span>のみオッズと一致し、2位、3位は別馬となりました。  
オッズでは3位人気となっていたスミヨン騎手は海外レースが多いため  
スコア上は15位人気となりました。

## 果たして結果は・・・？

明日このスコア結果を元に**馬券を買います！！！**

## 天皇賞行ってきました！

![![](img_5dfa27ac9f3d7.jpg)](img_5dfa27ac9f3d7.jpg) 

![![](img_5dfa27ad3ca88.jpg)](img_5dfa27ad3ca88.jpg)  
事前に予想した馬番は <span style="color: red;"><strong>2-13-5</strong></span>  
3連単と3連複で500円ずつ購入しました！

## 結果は・・・？？？

![![](img_5dfa27adc8e09.jpg)](img_5dfa27adc8e09.jpg)  
結果は <span style="color: red;"><strong>2-9-5</strong></span>

**2位だけ、2位だけが・・・・！！！！**惜しくも外れてしまいました。。。

## 予想してみて

外れてしまいましたが、  
競馬のことを全く知らないで、2位だけ外れたと考えると

**この予想は結構いい線行っていたのかな？** と思います。
