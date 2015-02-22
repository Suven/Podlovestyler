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
    if (_.contains(["baseColor", "textColor", "iconColor", "iconColorHover", "borderRadius", "progressbarColor", "showContribs", "compactHeader"], k)) {
      reg = new RegExp("^\\$" + k + ":.+?;$", "m");
      rep = "$" + k + ": " + req.body[k] + ";";
      scss = scss.replace(reg, rep);
    }
  }
  
  sass.render({
    data: scss,
    outputStyle: 'compressed',
    includePaths: [ './public/css/' ],
    success: function (newScss) {
      res.send(newScss);
    },
    error: function(error) {
  		res.sendStatus(500);
  	}
  });
  
});

module.exports = router;