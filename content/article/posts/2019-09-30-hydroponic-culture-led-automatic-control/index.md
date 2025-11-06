---
title: 【IoT】Raspberry Piで日没・日の出時刻に植物育成LEDライトを自動ON・OFFしてみた
author: arukayies
date: 2019-09-30T11:09:59+00:00
toc: true
snap_isAutoPosted:
  - 1
the_review_rate:
  - 5
snapEdIT:
  - 1
snapTW:
  - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:32:"「%TITLE%」 %SITENAME% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1212963074879062016";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1212963074879062016";s:5:"pDate";s:19:"2020-01-03 05:05:07";}}";'
snap_isRpstd579:
  - 1578027907
tags:
  - "Raspberry Pi"
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

実際にライトがON・OFFしている様子です↓![![](img_5dfa27ec5a0c9.gif)](img_5dfa27ec5a0c9.gif) 


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

