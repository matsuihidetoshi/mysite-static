---
title: S3 + CloudFrontをAmplify CLIから構成してNuxt.js製SPAを最低限動かす
tags: ["技術"]
id: s3-cloudfront-cli-hosting
image: /articles/s3-cloudfront-cli-hosting.png
description: Amplify CLI の方から add hosting でデプロイしようとしたら結構ハマった
url: /articles/s3-cloudfront-cli-hosting/
date: 2020-11-13
---

<img src="/articles/s3-cloudfront-cli-hosting.png" style="height:250px;width:100%;object-fit:cover">

## まとめると

***

- **subdomain.example.com** の、 **subdomain** の部分に何が来ても同じページを表示したかったが、 **Amplify Console** では無理っぽいけど、 **Amplify CLI** の `add hosting` を使えば普通の **S3 + CloudFront** 構成が作れるので、できそう
- CLIの `amplify add hosting` だけじゃ実は完結しない（っぽい）という地雷があったので記録
- 結論として、特に事情がなければ **CI/CD** とかいい感じでついてくるし、 **Amplify Console** でいいんじゃね？と思うが、事前にやろうとしている仕様を整理して、よく検討すればいいと思う

<br>

## 詳しく

***

<br>

### 経緯

Amplifyでデプロイした **Nuxt.js** の **SPA** を、**backlog** みたいな感じにプロジェクトごとにサブドメインを変える必要があったんだけど、Amplifyコンソールだと手動 or API経由でCNAMEレコードを追加してくしか方法がなく、なおかつ50個しかサブドメインついかできないということが判明した。  
  
なので、普通の **S3 + CloudFront** 構成を作る必要があった。
そこで整理しておくと、実は  

- **Amplify Console** でデプロイしたフロントエンドのアプリケーションは、 **S3 + CloudFront** 構成の様でいて（裏では同等のリソースが動いてるんだろうけど）、個別のリソースとしては表示されなかったりして、 **Amplify** 固有のリソースになっていて、細かい設定も融通が効かない
- **Amplify CLI** の `add hosting` サブコマンドから作るタイプのフロントエンドアプリケーションのデプロイ先は、正真正銘、個別のリソースとしても存在する **S3 + CloudFront** が作成される

<br>

という、若干面倒な差異が存在したのであった。  
  
そのため、DNSの設定とかをいじって無理やりワイルドカード（\*）のサブドメインを設定したりしても、 **Amplify Console** でデプロイしたアプリケーションには反映されなかったりして、上記の様な動作が実現できなかった。  
  
色々抵抗を試みたものの、[ここ](https://forums.aws.amazon.com/thread.jspa?threadID=307758)とかにはっきり無理と書かれていたし、APIで動的にサブドメインのCNAMEレコード増やしていく方向性も、数に限界があったりしたので諦めた。  
  
そこで、今までめんどくさくてやらなかった **Amplify CLI** の `amplify add hosting` をやることに。

***

### 実際の作業

作ろうとしていたのは、下記の様な構成。

<img src="/articles/s3-cloudfront-cli-hosting.png" width="100%">

***

もうほんとにこれだけ。超簡単。  

普通に **Amplify CLI** の初期設定（`configure`）と、 **Amplify** プロジェクトとして `init` する部分は特筆すべき点はないので割愛。まずは静的ホスティング機能を追加するコマンドから。


```
amplify add hosting
```

続いて、実際にデプロイ

```
amplify publish
```

はい、以上！  
こんだけです。非常に簡単・優秀ですね。  
ただ、ここからが地雷原だった。  
  
上記手順が終わったら、

```
***.cloudfront.net.
```

みたいなのが表示されるんだけど、それを表示しても、 `AccessDenied` に。はい、出ました。  

これを解決するのに

- バケットのポリシーがおかしい？
- オブジェクトの公開設定がおかしい？でも公開しちゃうとバケットアドレス直打ちでも見えちゃうし、毎回publishするたびに公開しなきゃなんなくて、サービス断じゃん
- `amplify init` でなんか間違った？
- バケットの静的ホスティングの設定？
- **CloudFront** の向き先のバケットのアドレスがおかしい？  
... など、色々彷徨った。

<br>

***

### 結論

結果的に、 **CloudFront** 側で下記の2点の追加の変更が必要があった

- 向き先の **S3 バケット** のアドレスをリージョン込みにする（か、めちゃくちゃ待つ）
  - 出来上がった **CloudFront** ディストリビューションのページで、**Origins and Origin Groups** タブの **Origins** から、設定済みの **S3 バケット** のアドレスを編集
  - `hoge-1234-hostingbucket-fuga.s3.amazonaws.com` を `hoge-1234-hostingbucket-fuga.s3-ap-northeast-1.amazonaws.com` の様に **リージョン込み** の表記に書き換える
  - 最後に **Yes, Edit**
  - これやらなくても、待てるんだったら24時間くらい待ってれば反映されるらしい
- バケットのアクセスを **CloudFront** のみに制限する
  - 同じく出来上がった **CloudFront** ディストリビューションのページで、**Origins and Origin Groups** タブの **Origins** から、設定済みの **S3 バケット** のアドレスを編集
  - **Restrict Bucket Access** を **yes** にする
  - **Origin Access Identity** という項目が出るので、 **Create a New Identity** にする（多分自動生成されているので、 **Use an Existing Identity**　の方でも大丈夫そう）
  - **Your Identities** から、出来上がったIdentityを選択
  - **Grant Read Permissions on Bucket** を、 **Yes, Update Bucket Policy** にする
  - 最後に **Yes, Edit**
  - これをやんないと、Identityが生成されてバケット側のポリシーにも記述されるにもかかわらず、そのIdentityが **CloudFront ディストリビューション** に紐づかないみたい

<br>

これでうまいことSPAで動いた。

***

### 感想

- CLIでコマンドだけ打てば動いてくれると思っていたので盲点だった（もしかしてなんか設定間違ってるだけ？）
- **S3 + CloudFront** 構成について色々勉強になったのでヨシッ！🐱