---
title: "【DIY】100均グッズで植物育成LEDライトを自作する方法と効果を解説"
description: "100円ショップの材料だけで、本格的な植物育成LEDライトを自作する手順を紹介します。Raspberry Piと連携させた自動制御や、ランプシェードによる光量アップ効果も検証。コストを抑えて水耕栽培を楽しみたい方におすすめです。"
tags: ["DIY","水耕栽培", "LEDライト", "100均", "Raspberry Pi"]
date: "2019-09-30T11:09:55.000Z"
url: "/diy/hydroponic-culture-led"
share: true
toc: true
categories: ["DIY"]
archives: ["2019年9月"]
lastmod: "2025-11-27T22:11:18+09:00"
---

## はじめに

室内で水耕栽培を行う際、太陽光の代わりとなる「植物育成LEDライト」は欠かせません。しかし、市販品は高価なものが多く、導入をためらう方もいるのではないでしょうか。

そこでこの記事では、**100円ショップで手に入る材料だけを使って、安価で高性能な植物育成LEDライトを自作する方法**を詳しく解説します。

{{< custom-figure src="img_5dfa2817134a9.gif" title="自作したLEDライトの点灯の様子" >}} 

さらに、Raspberry Piを活用して日の出・日の入りと連動させる**自動制御システム**の構築方法や、ランプシェードによる**光量アップ効果**についても検証しています。

{{< affsearch keyword="植物育成ライト" img="/light.jpg">}}

過去に作成した水耕栽培装置についても、こちらの記事で紹介しています。

{{< self-blog-card "article/posts/2019-09-30-hydroponic-culture-second-machine" >}}

{{< self-blog-card "article/posts/2019-09-17-hydroponic-culture-first-machine" >}}

## 1. 材料は100均で揃えよう

今回のDIYで使う材料は、すべて100円ショップで調達しました。

- **LEDライト（USBタイプ）**
{{< custom-figure src="img_5dfa28175aea4.jpg" title="100円ショップで購入したUSB接続のLEDライト" Fit="1280x1280 webp q90" >}}

- **ランプシェード（ステンレス製のゴミ受け）**
{{< custom-figure src="img_5dfa281790e65.jpg" title="光を反射させるランプシェードとして活用" Fit="1280x1280 webp q90" >}}
ステンレス製で光を効率よく反射できそうな、キッチンのゴミ受けを選びました。

## 2. 植物育成LEDライトの作り方

それでは、具体的な作成手順を見ていきましょう。

### STEP1: LEDライトの分解と配線加工

まず、ステンレス製のゴミ受け（ランプシェード）にLEDライトを通すための穴を開けようと試みましたが、ホールソーでは歯が立ちませんでした。

{{< custom-figure src="img_5dfa2818ac2e5.jpg" title="ホールソーでの穴あけは断念" Fit="1280x1280 webp q90" >}} 

そこで作戦を変更し、**LEDライト自体を一度分解し、配線をシェードに通してから再接続する**方法を取りました。

{{< custom-figure src="img_5dfa28194d142.jpg" title="LEDライトを分解" Fit="1280x1280 webp q90" >}} 

はんだごてを使ってUSBケーブルを一度取り外し、シェードの網目に通してから、再度配線をはんだ付けします。

{{< affsearch keyword="はんだごて" img="/handa.jpg">}}

{{< custom-figure src="img_5dfa28199761c.jpg" title="はんだごてで配線を再接続" Fit="1280x1280 webp q90" >}} 

### STEP2: 必要な数だけ量産する

今回は、栽培エリア全体をカバーするために、同じものを6個作成しました。
{{< custom-figure src="img_5dfa2819d6b12.jpg" title="6個のLEDライトが完成" Fit="1280x1280 webp q90" >}} 

### STEP3: Raspberry Piと接続して自動化

完成したLEDライトを、Raspberry Piに接続します。USBポートが足りない場合は、USBハブを使用すると便利です。
{{< custom-figure src="img_5dfa281a748d5.jpg" title="Raspberry Piに接続" Fit="1280x1280 webp q90" >}} 

{{< custom-figure src="img_5dfa281acf8b4.jpg" title="USBハブでポートを増設" Fit="1280x1280 webp q90" >}} 

最後に、植物に効率よく光が当たるように配置すれば、DIY植物育成LEDライトシステムの完成です。

ライトのON/OFFを自動制御する方法については、こちらの記事で詳しく解説しています。

{{< self-blog-card "article/posts/2019-09-30-hydroponic-culture-led-automatic-control" >}}

## 3. ランプシェードの効果を検証！明るさを比較

ランプシェードの有無で、どれくらい明るさが変わるのかを比較してみました。

{{< custom-figure src="img_5dfa281b7a5b7.png" title="ランプシェードあり（右）となし（左）の比較" Fit="1280x1280 webp q90" >}}

見た目では、ランプシェードがあった方が少し明るく見えます。

さらに、スマートフォンの照度計アプリで数値を計測したところ、驚きの結果が出ました。

- **ランプシェードなし：423 lx**
- **ランプシェードあり：642 lx**

{{< custom-figure src="img_5dfa281ca6ebe.png" title="照度計アプリでの計測結果" Fit="1280x1280 webp q90" >}} 

**ランプシェードを取り付けることで、光量が約1.5倍に向上する**ことが分かりました。100均のゴミ受け、恐るべしです。

## まとめ

今回は、100均のアイテムだけで植物育成LEDライトを自作する方法をご紹介しました。

{{< custom-figure src="img_5dfa281d6dda7.jpg" title="完成したライトを設置した様子" Fit="1280x1280 webp q90" >}} 

市販の植物育成ライトは、青や赤の特定の波長の光を出すものが主流ですが、100均の白色LEDライトでも、ランプシェードを工夫することで十分な光量を得られることが分かりました。

この自作ライトが植物の成長にどの程度貢献するのか、今後の経過が楽しみです。低コストで水耕栽培を始めたい方は、ぜひ挑戦してみてください。
{{< affsearch keyword="植物育成ライト" img="/light.jpg">}}
