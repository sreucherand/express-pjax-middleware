'use strict';

var htmlparser = require('htmlparser2');

module.exports = function () {
  return function (req, res, next) {
    if (req.header('X-PJAX')) {
      req.pjax = true;
    }
    
    res.renderPjax = function (view, options, fn) {
      fn = fn || function (err, str) {
        if (err) return req.next(err);
        res.send(str);
      };

      if (req.pjax === true) {
        var container = req.header('X-PJAX-CONTAINER') || '';
        var id = /^#?([\w:.-]+)$/.exec(container) || [];

        if ('string' === typeof id[1]) {
          try {
            res.render(view, options, function (err, html) {
              if (err) {
                throw err;
              }

              var dom = htmlparser.parseDOM(html);
              var element = htmlparser.DomUtils.getElementById(id[1], dom) || '';
              var fragment = htmlparser.DomUtils.getInnerHTML(element) || html;

              fn(err, fragment);
            });
          } catch (err) {
            fn(err);
          }
        }
      } else {
        res.render(view, options, fn);
      }
    };

    next();
  };
};
