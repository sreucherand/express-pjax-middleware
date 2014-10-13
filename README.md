#express-pjax-middleware
Express middleware for PJAX partial rendering with X-PJAX-CONTAINER.

##Usage
Use `renderPjax` method instead of `render` in your route to handle pjax request automatically.

```
var express = require('express');
var pjax = require('express-pjax-middleware');
var app = express();

app.use(pjax());

app.get('/', function(req, res) {
  res.renderPjax('index');
});
```