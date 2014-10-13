'use strict';

var htmlparser = require('htmlparser2');

module.exports = function() {
  return function(req, res, next) {
    if (req.header('X-PJAX')) {
      req.pjax = true;
    }
    
    res.renderPjax = function(view, options, fn) {
      if (req.pjax) {
        var container = req.header('X-PJAX-CONTAINER') || "";
        
        if (container.charAt(0) === '#') {
          container = container.substring(1);
        }
        
        if (!options) {
          options = {};
        }
        options.layout = null;
        
        res.render(view, options, function (err, html) {
          var dom = htmlparser.parseDOM(html);
          var domutils = htmlparser.DomUtils;
          var fragment = domutils.getElementById(container, dom) || "";
          
          res.send(domutils.getInnerHTML(fragment) || html);
          
          if('function' === typeof fn){
            fn(err, html);
          }
        });
      } else {
        res.render(view, options, fn);
      }
    };

    next();
  };
};
