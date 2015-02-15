var express = require('express');
var router = express.Router();
var sass = require('node-sass');
var _ = require('underscore');
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('index', { title: 'Podlovestyler' });
});

router.post('/c', function(req, res) {
  
  var scss = fs.readFileSync("./public/css/pod.scss", "utf8");

  for (var k in req.body) {
    // Only use those keys, who are actually supported
    if (_.contains(["baseColor", "textColor", "iconColor", "iconColorHover", "borderRadius", "progressbarColor"], k)) {
      reg = new RegExp("^\\$" + k + ":.+?;$", "m");
      rep = "$" + k + ": " + req.body[k] + ";";
      scss = scss.replace(reg, rep);
    }
  }
  
  var r = sass.renderSync({
    data: scss,
    outputStyle: 'compressed'
  });
  
  res.send(r);
});

module.exports = router;