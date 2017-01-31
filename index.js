"use strict";

const http = require("http");

let server = http.createServer(function (req, res) {
    let checkPurcases = req.url.split("/").splice(3).shift();
    let checkUsers = req.url.split("/").splice(1).shift();

    if (checkPurcases === 'purchases' && checkUsers === 'users') {
        try {
            console.log(checkPurcases);
            require(`./controllers/purchasesController`)[`${req.method.toLocaleLowerCase()}purchases`](req, res);
        } catch (e) {
            console.log(e);
            res.end("Error");
        }
    } else if (checkUsers === 'users') {
        try {
            require(`./controllers/${checkUsers}Controller`)[`${req.method.toLocaleLowerCase()}Action`](req, res);
        } catch (e) {
            console.log(e);
            res.end("Error");
        }
    }else res.end("Error");

});

server.listen(3000);