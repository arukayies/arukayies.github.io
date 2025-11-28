---
title: "【初心者向け】LINE Messaging APIのアクセストークンを取得する方法を解説"
description: "LINE BOT開発に不可欠なMessaging APIのチャンネルアクセストークンを取得する手順を、実際の画面キャリプチャを交えて詳しく解説します。LINE Developersへの登録からプロバイダー、チャンネル作成、トークン発行までを網羅。"
tags: ["GAS","Google Apps Script","LINE BOT", "LINE Messaging API", "アクセストークン"]
date: "2019-07-02T13:52:19.000Z"
url: "/gas/line_bot/gettoken"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年7月"]
lastmod: "2025-11-27T17:52:00+09:00"
---
LINE BOTを開発するには、まずLINEのMessaging APIを利用するための「**チャンネルアクセストークン**」を取得する必要があります。この記事では、LINE Developersへの登録からアクセストークンを発行するまでの手順を、初心者の方にも分かりやすく解説します。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## はじめに：必要なもの

アクセストークンの取得には、個人のLINEアカウントが必要です。もしまだお持ちでない場合は、先に作成しておきましょう。

*   **LINEアカウント**

## 1. LINE Developersにログインする

最初に、LINEの開発者向けポータルサイト『**LINE Developers**』にアクセスし、ご自身のLINEアカウントでログインします。

1.  まずはこちらの公式サイトにアクセスしてください。

    {{< blog-card "https://developers.line.biz/ja/" >}}

2.  画面右上の『**ログイン**』ボタンを押します。
    {{< custom-figure src="gettoken-01.jpg" title="" Fit="1280x1280 webp q90" >}}

3.  『**LINEアカウントでログイン**』を選択します。
    {{< custom-figure src="gettoken-02.png" title="" Fit="1280x1280 webp q90" >}}

4.  登録したメールアドレスとパスワードを入力してログインします。スマートフォンアプリでQRコードを読み取ってログインすることも可能です。
    {{< custom-figure src="gettoken-03.png" title="" Fit="1280x1280 webp q90" >}}

## 2. プロバイダーを作成する

ログイン後、BOTやサービスを提供する組織として「プロバイダー」を作成します。

1.  プロバイダーリスト画面で『**作成**』ボタンを押します。
    {{< custom-figure src="gettoken-05.png" title="" Fit="1280x1280 webp q90" >}}

2.  任意のプロバイダー名（個人名やチーム名など）を入力し、『**作成**』を押します。
    {{< custom-figure src="gettoken-06.png" title="" Fit="1280x1280 webp q90" >}}

## 3. Messaging APIのチャンネルを作成する

次に、作成したプロバイダーの中に、LINE BOTの本体となる「チャンネル」を作成します。

1.  プロバイダーを選択し、『**Messaging API**』のタイルをクリックします。
    {{< custom-figure src="gettoken-07.png" title="" Fit="1280x1280 webp q90" >}}

2.  チャンネル作成画面で、以下の情報を入力・選択します。
    *   **チャンネルアイコン**: BOTのプロフィール画像です。
    *   **チャンネル名**: BOTの名前になります。
    *   **チャンネル説明**: BOTの簡単な説明文です。
    *   **大業種 / 小業種**: BOTが関連する業種を選択します。
    *   **メールアドレス**: 連絡用のメールアドレスです。
    *   **プライバシーポリシーURL / サービス利用規約URL** (任意)
    {{< custom-figure src="gettoken-09.png" title="" Fit="1280x1280 webp q90" >}}

3.  LINE公式アカウント利用規約などを確認し、同意のチェックを入れて『**作成**』ボタンを押します。
    {{< custom-figure src="gettoken-16.png" title="" Fit="1280x1280 webp q90" >}}

## 4. チャンネルアクセストークンを発行する

最後に、作成したチャンネルでAPIを操作するための「チャンネルアクセストークン」を発行します。

1.  チャンネル管理画面の上部にある『**Messaging API設定**』タブをクリックします。
    {{< custom-figure src="gettoken-17.png" title="" Fit="1280x1280 webp q90" >}}

2.  ページの一番下までスクロールし、「**チャンネルアクセストークン**」の項目にある『**発行**』ボタンを押します。
    {{< custom-figure src="gettoken-18.png" title="" Fit="1280x1280 webp q90" >}}

## まとめ：アクセストークンを保管しよう

{{< custom-figure src="gettoken-19.png" title="" Fit="1280x1280 webp q90" >}}

ボタンを押すと、英数字の長い文字列で構成されたアクセストークンが発行されます。**このトークンは外部に漏れないよう、メモ帳などにコピーして大切に保管してください。**

これでLINE BOT開発の第一歩は完了です。このアクセストークンを使って、さっそくBOTを作成してみましょう！

{{< self-blog-card "article/posts/2019-07-07-line-bot-with-gas" >}}

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
