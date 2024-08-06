// Copyright 2016 Eyevinn Technology. All rights reserved
// Use of this source code is governed by a MIT License
// license that can be found in the LICENSE file.
// Author: Jonas Birme (Eyevinn Technology)
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

function initiateDefaultConf() {
  return {
    "row0": [],
    "row1": [],
    "row2": []
  };
}

/* GET home page. */
router.get('/', function(req, res) {
  conf = req.query.config;
  var confobj = initiateDefaultConf();
  if(conf) {
    var basefolder = path.normalize(path.join(__dirname, ".."));

    var confpath = path.join(basefolder, "config", path.normalize(conf));
    console.log("Constructed config path: " + confpath)

    if (confpath.startsWith(basefolder) && fs.existsSync(confpath)) {
      console.log("Loading config " + confpath);
      var confobj = JSON.parse(fs.readFileSync(confpath), 'utf8');
    }
  }
  res.render('index', { title: 'OTT Multiview', conf: JSON.stringify(confobj) });
});

module.exports = router;
