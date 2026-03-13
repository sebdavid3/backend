"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = 'https://rickandmortyapi.com/api/character';
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json);
var port = '3000';
app.get('/health', function (req, res) {
    res.json({ status: 'ok', message: 'servidor chambeando' });
});
app.listen(port, function () { console.log("runing on ".concat(port)); });
