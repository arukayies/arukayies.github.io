---
title: GASでスプレッドシートのデータを柔軟にコピー＆貼り付けする方法
author: arukayies
date: 2020-04-11T10:15:48+00:00
excerpt: GASでスプレッドシートの指定範囲をコピーする方法を紹介します！
toc: true
the_review_rate:
  - 5
snap_isAutoPosted:
  - 1586600149
snapEdIT:
  - 1
snapTW:
  - |
    s:393:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE% 
    %URL% 
    
    %HTAGS%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1248917675494920193";s:7:"postURL";s:56:"https://twitter.com/arukayies/status/1248917675494920193";s:5:"pDate";s:19:"2020-04-11 10:15:52";}}";
tags:
  - "GAS"
tags:
  - copyTo(destination)
  - GAS
  - Google Apps Script
  - スプレッドシート

archives: ["2020年4月"]
---
Google Apps Script（GAS）を使って、Google スプレッドシートを操作する際に便利なメソッドの一つが`copyTo(destination)`メソッドだよ。このメソッドをうまく活用すれば、スプレッドシート間でデータのコピーやシートの複製が簡単にできるけん、業務の効率化にもつながるばい。

今回は、この`copyTo(destination)`メソッドの使い方を基本から応用まで、いろんなパターンを紹介していくけ、ぜひ試してみてほしいな！


## copyTo(destination)メソッドの基本構造

まずは、`copyTo(destination)`メソッドがどんな風に使われるかを見てみよう。構文はこんな感じだよ。

<pre class="wp-block-code"><code>Sheet.copyTo(spreadsheet)
</code></pre>

このメソッドを使うと、指定したシート（`Sheet`オブジェクト）をコピー先のスプレッドシート（`spreadsheet`）に複製できるんだ。ちなみに、コピー先のシートは新しく作られるんだけど、元のシートのセルデータや書式設定もそのまま引き継がれるけん、非常に便利なんだよ。

### 基本的な使い方

例えば、同じスプレッドシート内でシートを複製したい場合は、こんな風に書けるばい。

<pre class="wp-block-code"><code>function duplicateSheet() {
  const ss = SpreadsheetApp.getActive();
  const templateSheet = ss.getSheetByName('テンプレート');
  const newSheet = templateSheet.copyTo(ss);
  newSheet.setName(`データ_${Utilities.formatDate(new Date(), 'JST', 'yyyyMMdd')}`);
}
</code></pre>

これで、テンプレートシートを日付付きで新しいシートとして複製できるんよ。

## 複数シートを一度にコピーする方法

もし複数のシートを一度にコピーしたい場合、ちょっとした工夫がいるけど、以下のようなコードで対応できるんだ。

<pre class="wp-block-code"><code>function batchCopySheets(sheetNames, destSS) {
  const sourceSS = SpreadsheetApp.getActive();
  
  sheetNames.forEach((name, index) =&gt; {
    const sourceSheet = sourceSS.getSheetByName(name);
    if (sourceSheet) {
      const newSheet = sourceSheet.copyTo(destSS);
      newSheet.setName(`${name}_COPY_${index + 1}`);
      
      // パフォーマンス改善のため適宜休止
      if (index % 5 === 0) Utilities.sleep(1000);
    }
  });
}
</code></pre>

これで、複数のシートを一度にコピーできて、さらにコピー処理の効率も良くなるんだよ。

## 高度な使い方：エラーハンドリングと最適化

もちろん、大規模なシートを扱う際にはエラー処理やパフォーマンスチューニングも重要なポイントだよね。例えば、コピー先のスプレッドシートに適切な権限がない場合や、大量のデータをコピーする際に発生しやすいタイムアウトエラーなどをしっかり処理しておくことが大事なんだよ。

<pre class="wp-block-code"><code>function safeCopy() {
  try {
    const ss = SpreadsheetApp.getActive();
    const template = ss.getSheetByName('テンプレート');
    
    if (!template) throw new Error('テンプレートシートが見つかりません');
    
    const newSheet = template.copyTo(ss);
    
    let sheetName = 'コピーシート';
    let counter = 1;
    while (ss.getSheetByName(sheetName)) {
      sheetName = `コピーシート_${counter++}`;
    }
    newSheet.setName(sheetName);
    
  } catch (e) {
    console.error(`エラー発生: ${e.message}`);
    SpreadsheetApp.getUi().alert(`処理に失敗しました: ${e.message}`);
    throw e;
  }
}
</code></pre>

このように、エラーハンドリングをしっかり実装しておけば、実際の業務でエラーが発生しても焦らずに対処できるけ。

## 実務での応用例

### テンプレートシートの動的生成

「テンプレートシートを複数回使いたいけど、都度データを変えたい！」なんて場面にも対応できる方法があるんだよ。動的にプレースホルダーを置き換えながら新しいシートを作成できるようなシステムを作ることもできるんだ。

<pre class="wp-block-code"><code>function createInstance(destSS, params) {
  const templateSheet = this.templateSS.getSheetByName(params.templateName);
  const newSheet = templateSheet.copyTo(destSS);
  
  // プレースホルダーの適用
  this.applyPlaceholders(newSheet, params.placeholders);
  
  return newSheet;
}
</code></pre>

この方法を使えば、指定したパラメータに基づいて新しいシートを自動で作成できるけ、業務の手間を省けるんよ。

## 結論

`copyTo(destination)`メソッドは、GASを使ってスプレッドシートを扱う上で非常に便利なツールだよ。基本的な使い方から、複数シートのコピーや大規模なデータの最適化方法まで幅広く応用できるけ、うまく使いこなすことで業務の効率化や自動化がぐんと進むんじゃ。

もし今回紹介した方法を使って、業務の改善ができたら嬉しいな！これからもどんどん活用してみてほしいばい。


<div class="wp-block-cocoon-blocks-blogcard blogcard-type bct-reference">
  <a rel="noopener" href="https://kuronn.com/article/sheetcopy-gas/" title="【GAS】スプレッドシートのシートをコピーする|copyTo() | くろんの部屋" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://kuronn.com/wp-content/uploads/2023/09/16.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://kuronn.com/wp-content/uploads/2023/09/16.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】スプレッドシートのシートをコピーする|copyTo() | くろんの部屋
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GAS（Google Apps Script）を用いて、スプレッドシートのシートをコピーしたい方向けに、『copyToメソッド』を紹介していきたいと思います。業務効率化・自動化で、シートをコピーするのは多用するので、活用していただけると嬉し
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/sheetcopy-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://kuronn.com/article/sheetcopy-gas/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          kuronn.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/423/" title="【GAS】別のスプレッドシートにコピー、値のみ、シート毎などまとめ【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/01-6.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/01-6.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】別のスプレッドシートにコピー、値のみ、シート毎などまとめ【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートを別のシートにコピーするには、CopyToメソッドやgetValueとsetValueを使用して値をコピー&ペーストするなど様々な方法があります。この記事ではGASでスプレッドシートを別のスプレッドシートにコピーする
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/423/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/423/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://coporilife.com/379/" title="【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://coporilife.com/wp-content/uploads/2022/05/5b3b5b436fa1110245caa5a9039c2924.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【GAS】CopyTo、行列コピー、スプレッドシートで自動コピーまとめ【Google Apps Script】
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        スプレッドシートのGASでCopyToを使用して行列コピーしたり、自動で別シートにコピーや値のみコピーなど、CopyToでできることをまとめて解説しています。複数行にコピーする時の範囲指定など、なるべくわかりやすく解説してみたいと思います。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://coporilife.com/379/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          coporilife.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://auto-worker.com/blog/?p=2401" title="GASでスプレッドシートのシートをコピーする方法(copyToメソッド) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://auto-worker.com/blog/wp-content/uploads/2020/12/20201226_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://auto-worker.com/blog/wp-content/uploads/2020/12/20201226_auto_001.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        GASでスプレッドシートのシートをコピーする方法(copyToメソッド) | AutoWorker〜Google Apps Script(GAS)とSikuliで始める業務改善入門
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script(GAS)でスプレッドシートにあるシートをコピーする方法を解説します。 GASに用意されているcopyToメソッドを使い、スプレッドシート上のシ...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=2401" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://auto-worker.com/blog/?p=2401" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          auto-worker.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://for-dummies.net/gas-noobs/how-to-make-a-copy-of-files/" title="【コピペで使える】GASで任意のファイルをコピーしてみる" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://i1.wp.com/for-dummies.net/gas-noobs/wp-content/uploads/2022/06/how-to-make-a-copy-of-files.png?fit=1200%2C675&#038;ssl=1" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://i1.wp.com/for-dummies.net/gas-noobs/wp-content/uploads/2022/06/how-to-make-a-copy-of-files.png?fit=1200%2C675&#038;ssl=1" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        【コピペで使える】GASで任意のファイルをコピーしてみる
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GASで任意のファイルをコピーしてみる 今回の投稿では、GASを使って任意のファイルをコピーするメソッドをご紹…
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://for-dummies.net/gas-noobs/how-to-make-a-copy-of-files/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://for-dummies.net/gas-noobs/how-to-make-a-copy-of-files/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          for-dummies.net
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://blog.take-it-easy.site/gas/gas-copyto/" title="Google Apps Scriptでスプレッドシートのシートをコピーする方法" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://blog.take-it-easy.site/images/eye-catch-1499.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://blog.take-it-easy.site/images/eye-catch-1499.jpg" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Google Apps Scriptでスプレッドシートのシートをコピーする方法
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        概要Google Apps Scriptでスプレッドシートのシートをコピー（複製）する方法です。使用するメソッド構文Sheetオブジェクト.copyTo(spreadsheet)引数パラメーター必須型説明spreadsheet○Spread...
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-copyto/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://blog.take-it-easy.site/gas/gas-copyto/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          blog.take-it-easy.site
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://strong-engineer.com/gas/google-drive-folder-copy/" title="Googleドライブのフォルダを一括コピー！GASで実現する自動化手順 – 俺が最強エンジニア" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://strong-engineer.com/wp-content/uploads/2024/08/goodle_drive_file.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://strong-engineer.com/wp-content/uploads/2024/08/goodle_drive_file.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        Googleドライブのフォルダを一括コピー！GASで実現する自動化手順 – 俺が最強エンジニア
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        GoogleDrive内のフォルダはドラッグ・アンド・ドロップや切り取り＋貼り付けで簡単に移動できますが、コピーは制限がかかっているため、まとめて複製を行うことができません。
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://strong-engineer.com/gas/google-drive-folder-copy/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://strong-engineer.com/gas/google-drive-folder-copy/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          strong-engineer.com
        </div>
      </div>
    </div>
  </div></a> 
  
  <br /> <a rel="noopener" href="https://techuplife.tech/gas-ss-rmovecopyclear/" title="[GAS]このセル範囲の移動・コピー・削除を行う方法 -Rangeクラス-｜テックアップライフ" class="blogcard-wrap external-blogcard-wrap a-wrap cf" target="_blank">
  
  <div class="blogcard external-blogcard eb-left cf">
    <div class="blogcard-label external-blogcard-label">
      <span class="fa"></span>
    </div><figure class="blogcard-thumbnail external-blogcard-thumbnail">
    
    <img data-src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image lozad lozad-img" loading="lazy" width="160" height="90" />
    
    <noscript>
      <img loading="lazy" decoding="async" src="https://techuplife.tech/wp-content/uploads/2023/06/techuplife.tech_-1.png" alt="" class="blogcard-thumb-image external-blogcard-thumb-image" width="160" height="90" />
    </noscript></figure>
    
    <div class="blogcard-content external-blogcard-content">
      <div class="blogcard-title external-blogcard-title">
        [GAS]このセル範囲の移動・コピー・削除を行う方法 -Rangeクラス-｜テックアップライフ
      </div>
      
      <div class="blogcard-snippet external-blogcard-snippet">
        Google Apps Script (GAS) でこのセル範囲の移動・コピー・削除を行う方法を説明します。 Range
      </div>
    </div>
    
    <div class="blogcard-footer external-blogcard-footer cf">
      <div class="blogcard-site external-blogcard-site">
        <div class="blogcard-favicon external-blogcard-favicon">
          <img data-src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmovecopyclear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image lozad lozad-img" loading="lazy" width="16" height="16" />
          
          <noscript>
            <img loading="lazy" decoding="async" src="https://www.google.com/s2/favicons?domain=https://techuplife.tech/gas-ss-rmovecopyclear/" alt="" class="blogcard-favicon-image external-blogcard-favicon-image" width="16" height="16" />
          </noscript>
        </div>
        
        <div class="blogcard-domain external-blogcard-domain">
          techuplife.tech
        </div>
      </div>
    </div>
  </div></a>
</div>
