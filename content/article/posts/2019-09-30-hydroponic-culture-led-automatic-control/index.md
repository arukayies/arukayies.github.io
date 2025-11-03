---
title: 【IoT】Raspberry Piで日没・日の出時刻に植物育成LEDライトを自動ON・OFFしてみた
author: arukayies
type: post
date: 2019-09-30T11:09:59+00:00
url: /raspberrypi/hydroponic-culture-led-automatic-control
share: true
toc: true
comment: true
page_type:
  - default
snap_isAutoPosted:
  - 1
update_level:
  - high
the_review_type:
  - Product
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:32:"「%TITLE%」 %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1212963074879062016";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1212963074879062016";s:5:"pDate";s:19:"2020-01-03 05:05:07";}}";'
snap_isRpstd579:
  - 1578027907
last_modified:
  - 2024-11-19 13:36:51
categories:
  - Raspberry Pi
tags:
  - IOT
  - Raspberry Pi
  - 水耕栽培

archives: ["2019年9月"]
---
こんにちは！

水耕栽培装置を自作し、いろんな野菜を育成している「くら」です！

自作した水耕栽培装置はこちらです。

{{< self-blog-card "article/posts/2019-09-30-hydroponic-culture-second-machine.md" >}}

さらなる栽培の効率化を求めて、植物育成LEDライトを導入しました！

{{< self-blog-card "article/posts/2019-09-30-hydroponic-culture-led.md" >}}

この植物育成LEDライトをRaspberry Piを使って、<span class="marker"><strong>日没・日の出時刻に自動ON・OFF</strong></span>させてみたので、そのコードを紹介します！

実際にライトがON・OFFしている様子です↓{{< custom-figure src="img_5dfa27ec5a0c9.gif" title="" Fit="1280x1280 webp q90" >}} 

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="40010000765756931199_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >Raspberry Pi 4 Model B 8GB UK 182-2098</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DRaspberry%2520Pi%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DRaspberry%2520Pi" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>

## 参考

こちらの記事のコードを参考にしました！

{{< blog-card "https://qiita.com/mitazet/items/00754f62ba089ea29353" >}}
{{< blog-card "https://bcn.xsrv.jp/post-1929/" >}}
{{< blog-card "http://kinokotimes.com/2017/03/07/usb-control-method-by-raspberry-pi/" >}}
{{< blog-card "https://qiita.com/tadasuke/items/fcf563bbce33aa93c4c7" >}}

## コードの内容

**日没の30分前の時刻**を取得し、その時刻に『hydroponic\_culture\_light_on.sh』を実行するようにATコマンドでスケジューリングする処理です。

<div class="blank-box">
  ライトをONする処理です。<br />echo &quot;【suユーザーのパスワードを指定】&quot; | sudo -S /usr/local/bin/hub-ctrl -h 0 -P 2 -p 1
</div>

**日の出の30分後の時刻**を取得し、その時刻に『hydroponic\_culture\_light_off.sh』を実行するようにATコマンドでスケジューリングする処理です。

<div class="blank-box">
  <strong>ライトをOFF</strong>する処理です。<br />echo &quot;【suユーザーのパスワードを指定】&quot; | sudo -S /usr/local/bin/hub-ctrl -h 0 -P 2 -p 0
</div>

## 処理のながれ

<span class="number">1　</span>午後12時に『hydroponic\_culture\_light_on.py』の処理をcronで走らせます。

<div class="blank-box">
  00 12 * * * python3 【保存先のディレクトリを指定】hydroponic_culture_light_on.py 1> /dev/null
</div>

『hydroponic\_culture\_light_on.py』では**日没の30分前の時刻**を取得し、その時刻に『hydroponic\_culture\_light_on.sh』を実行するようにATコマンドでスケジューリングします。

<span class="number">2　</span>午前4時に『hydroponic\_culture\_light_off.py』の処理をcronで走らせます。

<div class="blank-box">
  00 04 * * * python3 【保存先のディレクトリを指定】hydroponic_culture_light_off.py 1> /dev/null
</div>

『hydroponic\_culture\_light_off.py』では**日の出の30分後の時刻**を取得し、その時刻に『hydroponic\_culture\_light_off.sh』を実行するようにATコマンドでスケジューリングします。

<div class="cstmreba">
  <div class="kaerebalink-box">
    <div class="kaerebalink-image">
      <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >{{< custom-figure src="40010000765756931199_1.jpg" title="" Fit="1280x1280 webp q90" >}}</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
    </div>
    
    <div class="kaerebalink-info">
      <div class="kaerebalink-name">
        <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >Raspberry Pi 4 Model B 8GB UK 182-2098</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        
        <div class="kaerebalink-powered-date">
          posted with <a rel="nofollow noopener" href="https://kaereba.com" target="_blank">カエレバ</a>
        </div>
      </div>
      
      <div class="kaerebalink-detail">
      </div>
      
      <div class="kaerebalink-link1">
        <div class="shoplinkrakuten">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612575&#038;p_id=54&#038;pc_id=54&#038;pl_id=616&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fproduct.rakuten.co.jp%2Fproduct%2F-%2F3c5b8db21532c86a6bb15a0276d31467%2F%3Frafcid%3Dwsc_i_ps_1087413314923222742" target="_blank" >楽天市場</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612575p_id54pc_id54pl_id616.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkamazon">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1612578&#038;p_id=170&#038;pc_id=185&#038;pl_id=4062&#038;s_v=b5Rz2P0601xu&#038;url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3DRaspberry%2520Pi%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A" target="_blank" >Amazon</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1612578p_id170pc_id185pl_id4062.gif" width="1" height="1" style="border:none;" />
        </div>
        
        <div class="shoplinkyahoo">
          <a rel="noopener" href="//af.moshimo.com/af/c/click?a_id=1615240&#038;p_id=1225&#038;pc_id=1925&#038;pl_id=18502&#038;s_v=b5Rz2P0601xu&#038;url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DRaspberry%2520Pi" target="_blank" >Yahooショッピング</a><img loading="lazy" decoding="async" src="https://arukayies.com/wp-content/uploads/2024/11/impressiona_id1615240p_id1225pc_id1925pl_id18502.gif" width="1" height="1" style="border:none;" />
        </div>
      </div>
    </div>
    
    <div class="booklink-footer">
    </div>
  </div>
</div>
