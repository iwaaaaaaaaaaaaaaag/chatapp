# mongodbの起動
## イメージの作成
docker build -t mongodb .

## dockerコンテナ作成
docker run --name mongodb -p 27017:27017 -itd mongodb  
※docker run [オプション] イメージ [コマンド] [引数...] なので、オプションを先に記載すること

## dockerコンテナの中に入る
docker exec -it mongodb bash

## 不要なdockerコンテナの削除
docker system prune -a

# mongodb GUI
## mongodb compass
https://www.mongodb.com/try/download/compass

```
mongodb://root:root@localhost:27017
```
で接続
