const db = require("memcached");

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getUserId(req) {
    return req.url.split("/").splice(2).shift();
}

let memcached = new db("127.0.0.1:11211");

module.exports = {

    getpurchases :function (req,res) {
        let userId = getUserId(req);
        if(userId) {
                    memcached.get(userId, function (err,data) {
                        if (!data){
                            console.log("Cannot give from dataBase");
                            res.end("Cannot give from dataBase");
                        }
                        else {
                            res.end(data);
                        }
                    });

        } else {
            console.log("Invalid userId");
            res.end("Invalid userId");
        }
    },
    
    postpurchases : function (req,res) {
        let userId = getUserId(req);
        if(userId) {
            try {
                let body = '';
                req.on("data", function (chunk) {
                    body += chunk.toString();
                    body = JSON.parse(body).count.toString();
                });
                req.on("end", function () {
                    memcached.add(userId, body, 10, function (err) {
                        if (err){
                            console.log('Cannot write in dataBase');
                            res.end('Cannot write in dataBase');
                        }
                        else {
                            console.log('Ok');
                            res.end('Ok');
                        }
                    })
                })
            } catch (e) {
                console.log('Cannot write in dataBase');
                res.end('Cannot write in dataBase');
            }

        } else {
            console.log("Invalid userId");
            res.end("Invalid userId");
        }
    },
    
    deletepurchases : function (req,res) {
        let userId = getUserId(req);
        if(userId) {
                    memcached.del(userId, function (err) {
                        if (err){
                            console.log('Cannot delete from dataBase');
                            res.end('Cannot delete from dataBase');
                        }
                        else {
                            console.log('Ok');
                            res.end('Ok');
                        }
                    })
        } else {
            console.log("Invalid userId");
            res.end("Invalid userId");
        }
    }
}