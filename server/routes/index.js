//路由文件
var path = require('path');
var express = require('express');

var db = require('../db.js');
var UserInfo = require('../controller/userinfo');

var router = express.Router();
router.get('/login/:data', UserInfo.login);

router.get('*', function(req, res, next) {
	return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
