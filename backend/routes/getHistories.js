var express = require('express');
var router = express.Router();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const config = require("../config/mongodb.config.js");

// 画面が表示された際に実行される処理
router.post('/', (req, res, next) => {
    // コネクションの用意
    MongoClient.connect(config.CONNECTION_URL, null, (error, client) => {
      const db = client.db(config.DATABASE)
      
      db.collection("chat_histories").find({}) //Promise型ではなくCursor型を返す
      .toArray()
      .then((results) => {
          res.send(results)
          client.close()
      })
      .catch(
        error => console.log(error)
        )
  })
});

module.exports = router;    