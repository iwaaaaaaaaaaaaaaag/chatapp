var express = require('express');
var router = express.Router();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const config = require("../config/mongodb.config.js");

/* GET home page. */
router.post('/', function (req, res, next) {

    // コネクションの用意
    MongoClient.connect(config.CONNECTION_URL, null, (error, client) => {
        const db = client.db(config.DATABASE)
        
        db.collection("user_informations").findOne({
            $and: [{ user_id: req.body.userId },
                   { password: req.body.password }]
            }
        ).then(
            (result) => {
                if (result) {
                    res.send('OK');
                } else
                {
                    res.send('NG');
                }
                client.close()
            }
        ).catch(
            error => console.log(error)
            )
    })
});

module.exports = router;