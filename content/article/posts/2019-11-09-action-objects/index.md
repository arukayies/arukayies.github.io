---
title: "【LINE BOT】GASで使える7種類のアクションオブジェクトまとめと比較"
description: "LINE BOT開発で必須のアクションオブジェクト7種類（ポストバック、メッセージ、URI、日時選択、カメラ、カメラロール、位置情報）の機能と使い方をGoogle Apps Script (GAS) のサンプルを交えて徹底解説。それぞれの違いや最適な使い分けがわかります。"
tags: ["GAS", "Google Apps Script", "LINE BOT", "Messaging API", "アクションオブジェクト", "ポストバックアクション", "メッセージアクション", "URIアクション", "日時選択アクション", "カメラアクション", "位置情報アクション"]
date: "2019-11-09T06:37:18.000Z"
url: "/gas/line_bot/action-objects"
share: true
toc: true
categories: ["LINE BOT"]
archives: ["2019年11月"]
lastmod: "2025-11-27T14:44:22+09:00"
---

この記事では、LINE BOT開発でユーザーとの対話を豊かにするために不可欠な「**アクションオブジェクト**」について、Google Apps Script (GAS) で利用できる7種類をまとめて解説します。

アクションオブジェクトは、リッチメニューやテンプレートメッセージのボタンがタップされたときに、BOTがどのような動作をするかを定義するものです。それぞれの特徴を理解し、目的に応じて使い分けることで、ユーザーにとってより便利で直感的なBOTを作成できます。

公式ドキュメント：[アクションオブジェクト - LINE Developers](https://developers.line.biz/ja/reference/messaging-api/#action-objects)

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}

## 1. ポストバックアクション (Postback Action)

ポストバックアクションは、ユーザーがボタンをタップした際に、**ユーザーには見えない特定のデータ（ポストバックデータ）をサーバー（GAS）に送信する**機能です。ユーザーの選択に応じて処理を分岐させたい場合に最適です。

**主な用途**
*   アンケートの回答
*   メニュー選択
*   ゲームのコマンド実行

{{< self-blog-card "article/posts/2019-11-09-postback-action" >}}

{{< custom-figure src="img_5dfa23a0b71e8.jpg" title="ポストバックアクションの実行例" Fit="1280x1280 webp q90" >}} 

## 2. メッセージアクション (Message Action)

メッセージアクションは、ユーザーがボタンをタップすると、**ユーザーに代わってあらかじめ設定されたテキストメッセージをBOTとのトークに送信**します。ユーザーが文字を入力する手間を省き、定型的な応答を促すのに役立ちます。

**主な用途**
*   「はい」「いいえ」の応答
*   よくある質問の選択
*   キーワードの送信

{{< self-blog-card "article/posts/2019-11-09-message-action" >}}

{{< custom-figure src="img_5dfa23a1031e6.jpg" title="メッセージアクションの実行例" Fit="1280x1280 webp q90" >}} 

## 3. URIアクション (URI Action)

URIアクションは、ボタンにURLリンクを設定し、**ユーザーを外部のウェブサイトやLINE内の特定のページに遷移させる**機能です。`https://`, `http://`, `line://` などのURIスキームが利用できます。

**主な用途**
*   自社サイトやキャンペーンページへの誘導
*   詳細情報の提示
*   LINE公式アカウントの友だち追加ページの表示

{{< self-blog-card "article/posts/2019-11-09-uri-action" >}}

{{< custom-figure src="img_5dfa23a13fdf0.jpg" title="URIアクションの実行例" Fit="1280x1280 webp q90" >}} 

## 4. 日時選択アクション (Datetime Picker Action)

日時選択アクションは、ユーザーにカレンダーUIを表示し、**日付や時刻、またはその両方を選択させる**機能です。選択された日時はポストバックイベントとしてサーバーに送信されます。

**主な用途**
*   店舗やサービスの予約受付
*   リマインダーの設定
*   スケジュールの調整

{{< self-blog-card "article/posts/2019-11-09-datetime-picker-action" >}}

{{< custom-figure src="img_5dfa23a17f87b.jpg" title="日時選択アクションの実行例" Fit="1280x1280 webp q90" >}} 

## 5. カメラアクション (Camera Action)

カメラアクションは、**LINEアプリ内でカメラを起動し、ユーザーに写真を撮影・送信させる**機能です。その場で撮影したリアルタイムな画像が必要な場面で役立ちます。

**主な用途**
*   イベントでの写真投稿
*   商品の不具合報告
*   身分証明書の撮影

{{< self-blog-card "article/posts/2019-11-09-camera-action" >}}

{{< custom-figure src="img_5dfa23a1d9d9c.jpg" title="カメラアクションの実行例" Fit="1280x1280 webp q90" >}} 

## 6. カメラロールアクション (Camera Roll Action)

カメラロールアクションは、**スマートフォンの写真ライブラリ（カメラロール）を起動し、ユーザーに既存の画像を選択・送信させる**機能です。

**主な用途**
*   プロフィール画像の変更
*   保存済みの写真の共有
*   アルバムからの写真応募

{{< self-blog-card "article/posts/2019-11-09-camera-roll-action" >}}

{{< custom-figure src="img_5dfa23a2249d8.jpg" title="カメラロールアクションの実行例" Fit="1280x1280 webp q90" >}} 

## 7. 位置情報アクション (Location Action)

位置情報アクションは、**位置情報の送信を促す画面を開き、ユーザーに現在地や任意の場所を送信させる**機能です。

**主な用途**
*   現在地に基づいた店舗検索
*   待ち合わせ場所の共有
*   災害時の安否確認

{{< self-blog-card "article/posts/2019-11-09-location-action" >}}

{{< custom-figure src="img_5dfa23a25eaa4.jpg" title="位置情報アクションの実行例" Fit="1280x1280 webp q90" >}} 

## まとめ

今回は、LINE BOT開発で使える7種類のアクションオブジェクトを紹介しました。それぞれの特性を理解し、目的に合わせて組み合わせることで、ユーザー体験を大幅に向上させることができます。

ぜひこの記事を参考に、インタラクティブで便利なLINE BOTを開発してみてください。

{{< affsearch keyword="Google Apps Script 始め方 スプレッドシート 活用例" img="/gas.jpg">}}
{{< affsearch keyword="LINE BOT チャットボット 作り方" img="/line.jpg">}}
