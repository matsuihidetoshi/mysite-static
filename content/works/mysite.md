---
title: このサイト
id: mysite
image: /works/mysite.png
description: このサイトの作成の経緯や構成についての説明
url: /works/mysite/
date: 2020-10-24 00:00:00
---

***

<img src="/works/mysite.png" width="100%">

***

<br>

## 3行で言うと

***

<br>

- **Nuxt.js** で自分のサイトを作り直した
- **Amplify** , **Nuxt.js** , **TypeScript** の組み合わせの勘所がちょっと掴めた
- **CMS** の類の代替になりそう

<br>

## 制作経緯

***

<br>

### もともと **vue-cli** で作成し、 **Amplify** でデプロイしたサイトがあったが、不満が

<img src="/works/old_site.png" width="100%">

- とりあえず **サーバーレス** やってみたいと言うところから始まったので、動的コンテンツを **DynamoDB** に格納し、 **Lambda** でCRUD操作する様な構成になっており、ブログの様な更新頻度の低いデータには適切とは言えなかった
- **Amplify** や **Vue.js** に関する知見があまり溜まっていない時点で作ったので、不便な点が多い
  - 静的データの更新にリアルタイム性がない
  - 下層ページにダイレクトリンクできない
- デザインフレームワークを使用しておらず、手間がかかっている割にあまり見栄えも良くない

<br>

### **Amplify** も **Vue.js** も散々触って知見が溜まり、 **Nuxt.js** との出会いもあり、サイトを刷新したい衝動に駆られる

- 必要な各機能の特性をちゃんと考えて、最適な構成にしたい
- ビルド後のデータ更新や下層ページへのダイレクトリンクの問題は、どうやらフレームワーク側と **Amplify** 側でよろしくやれば解決できそう
- **Vuetify** がWebでよくあるパターンのUIコンポーネントを網羅しているので、 **がんばらず** にそれなりな見た目にできそう
- **Nuxt.js** が色々イケてる気がする **知らんけど**

<br>

## 構成

***

<br>

<img src="/works/mysite_architecture.png" width="100%">

### 詳細解説

- フロントエンドは **Amplify console** から **CloudFront** と **S3** を構成、 **Nuxt.js** で作成したアプリケーション（PWA）をデプロイ
- ブログ等、更新頻度の低いコンテンツは **Nuxt Content** を使って **Markdown** として記述、**GitHub** へのpushベースで自動ビルドし、記事を更新
- **Amplify** は **Previews** の機能を有効にしているので、ブランチを切って変更を加え、mainブランチプルリクエストを作成することでプレビュー用URLが生成され、そのままマージすれば本番環境にも反映される
- このサイクルは **GitHub** のWebサイト側から全て操作可能なので、オペレーターは **Git** コマンドなど **CUI** を使用した操作を必要とせず、 **Markdown** さえ記述できれば、コンテンツ更新の全ての操作を **GUI** ベースで実施することができる
- ユーザーからのお問い合わせページでは、 **Lambda** 関数を呼び出し **SES** を使って管理者（自分）にメールを送信する
- メール送信の際におまけ程度に **Comprehend** でテキスト解析し、ユーザーの感情（肯定、否定、中立、混在）を判定し、メールの件名に追記する

<br>

### 使用技術

- **TypeScript**
  - **TypeScript** 自体の学習の意味で導入
  - この程度の構成ではさほどメリットを感じられないが、さらに高度なAPI連携など、複雑なロジックが必要になってきた場合は効果がありそう
- **Nuxt.js**
  - フォルダ階層だけで自動生成されるルーティングが凄まじい
  - **SSR** , **SSG** , **SPA** に対応しており、今回は **SPA** を選択
  - **Nuxt Content** を使用することで、 **Markdown** から簡単に **HTML** コンテンツを生成可能
  - **CLI** によるプロジェクト作成フローが優れており、 **TypeScript** や **PWA** 、主要なプラグイン類の導入が非常に容易
- **Amplify**
  - フロントエンドアプリケーションを非常に簡単にデプロイできる
  - **CI/CD** パイプラインが自動で構築され、 **Previews** を使用すればプレビュー用サイトもプルリクエストベースで作成できる
  - それだけだったら **Netlify** と大差ないが、その他の **AWS** 各種サービスと非常に容易に連携でき、バックエンドも構築できる
- **Lambda**
  - **API Gateway** と接続すれば、プログラムコードを記述するだけで簡単にAPIを作成できる
  - **AWS** 上の各種リソースをプログラムから簡単に操作でき、今回の構成では使用しないが **Amplify Auth** で追加した **Cognito** ユーザープールをオーソライザとして設定することもできる
- **Comprehend**
  - **AWS** が提供する文章解析サービスで、今回の様な感情の判定や、キーフレーズの抽出などが利用できるが、まだ一部日本語には対応していない機能がある

<br>

### ハマりどころ

<br>

- ビルドの設定
  - **Nuxt.js** は **Amplify console** のデフォルトのビルド設定ではデプロイできないので、 `npm run export` の実行と、 `baseDirectory: dist`の設定が必要
  - さらに、今回使用した **TypeScript** を導入した **Nuxt.ts** では `export` と言うスクリプトが存在せず、代わりに `generate` を指定する必要がある。
  - 最終的なビルド設定は下記の通り

  <br>

  **amplify.yml**

  ```
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - npm install
      build:
        commands:
          - npm run build
          - npm run generate
    artifacts:
      # IMPORTANT - Please verify your build output directory
      baseDirectory: dist
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*
  ```

<br>

- 書き換えて、リダイレクト
  - **Amplify console** でアプリケーションをデプロイすると、Webサーバーのレイヤーは抽象化されるので、直接設定ファイルを作成することはないが、Redirect/Rewriteの設定を追加することができる
  - この設定を適切に行わなければ、SPAで下層ページにダイレクトアクセスしたらNot Foundになるなど、思った様な動作にならない
  - 最終的な設定は下記の通り

  ```
  [
    {
        "source": "</^((?!.(json|css|gif|ico|jpg|js|png|txt|svg|woff|ttf|webp)$).)*$/>",
        "target": "/",
        "status": "200",
        "condition": null
    }
  ]
  ```

<br>

- **SSR** ? **SSG** ? **SPA** ?
  - **SSR** は最近 **Amplify** に対応したばかりでドキュメントも少ない
  - ~~**SSG** は、上記の **書き換えて、リダイレクト** を設定してもどうもうまく動かなかった（下層ページから他のページへのリンクが機能しない、ただ、下記の **trailing slash** 問題さえ解決しておけば良かったかも？）~~ 解決: [こちら](/articles/mysite-staticization)を参照
  - **Netlify** などならまた結論が違うかと思うが、 **Amplify** では現状はどうも **SPA** が色々と相性が良さそうで、~~最終的に **SPA** 実装にした~~現在は **SSG** 化

<br>

- **trailing slash** をどうするか
  - ~~どうも **Nuxt.js** 側の問題っぽいが、 **trailing slash（URL末尾のスラッシュ）** がある状態でルーティングされたページは、他のページへのリンクがうまく生成されない模様~~
  - ~~今回は **Nuxt.js** 側で **middleware** を記述することで **trailing slash** を削除したURLにリダイレクトする処理を実装~~
  - ~~なおかつ、相対パスでリダイレクト先を指定すると、ルーティングの重複的なエラーが発生するので、絶対パス向けにリダイレクトする様に実装~~
  - ~~コードの変更箇所は下記の通り~~

  <br>

  **redirect.ts**

  ```
  import { RouteConfig } from "@nuxt/types/config/router";

  export default function ({ route, redirect }: { route: RouteConfig, redirect: Function }) {
    if (route.path !== '/' && route.path.slice(-1) === '/') {
      redirect(200, process.env.baseUrl + route.path.slice(0, -1))
    }
  }

  ```

  <br>

  - ~~**nuxt.config.ts** には、上記 **middleware** の呼び出しの記述を追記~~

  ** nuxt.config.ts**

  ```
  router: {
    middleware: 'redirect'
  },
  ```

  <br>

  - と、ここまで言ったものの、実は壮大に勘違いをしていた
  - 結局原因は、あらゆるルーティングの頭に`'/'`をつけていなかったため、**trailing slash** 付きのパスをリクエストすると生成されるURLが、例えば`/works/work-1`の場合、`/works/works/work-1`などとなってしまい、Not Foundになっていた
  - 結論は、上記コードの追記は必要なく、リンクや`.md`ファイルで指定するページや画像のパスの先頭には忘れず`'/'`をつける（`works`ではなく`/works`）ことで対応ができた
  - **Nuxt.js** 思ってたより全然良くできてるすごい

<br>

## まとめ

***

<br>

- **GUI** からの **Markdown** の編集だけでコンテンツ更新が可能な仕組みを作ることができたので、 **WordPress** などの **CMS** の代替にできそう
- 通常の **CMS** と比べ、データベースもWebサーバーも必要としない点が非常に強力
- **Amplify console** により **CloudFront** + **S3** のスケーラブルなフロントエンドアプリケーションが非常に簡単に構成できるのは凄まじい
- 今後はもう少し **Amplify** を活用した例を、 **Nuxt.js** と **TypeScript** を使ったパターンで試してみたい
