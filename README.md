# express-pjax-middleware

Express middleware for PJAX partial rendering with X-PJAX-CONTAINER.

## Usage

- Attach the middleware to your express application by adding `app.use(pjax())`.
- Use `renderPjax` method instead of `render` in your route to handle pjax request automatically.
- Perfom a request to the page you want by passing the following headers and get the corresponding partial content:
    - X-PJAX: *1*
    - X-PJAX-CONTAINER: *the id, with an optional hash of the fragment to return*

## Example

index.jade
```jade
h1 Application

#wrapper
    h2 Headline
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam adipisci hic dolore nemo tenetur iste saepe, sapiente placeat provident. Obcaecati accusamus itaque rerum, sed nemo eligendi voluptas vel sit!
```

server.js
```javascript
var express = require('express');
var pjax = require('express-pjax-middleware');
var app = express();

app.set('view engine', 'jade');

app.use(pjax());

app.get('/', function(req, res) {
  res.renderPjax('index');
});

app.listen(3000);
```

```bash
curl http://localhost:3000 -H "X-PJAX-CONTAINER: #wrapper" -H "X-PJAX: 1"

// return
<h2>Headline</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam adipisci hic dolore nemo tenetur iste saepe, sapiente placeat provident. Obcaecati accusamus itaque rerum, sed nemo eligendi voluptas vel sit!</p>

curl http://localhost:3000

// return
<h1>Application</h1>
<div id="wrapper">
    <h2>Headline</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ullam adipisci hic dolore nemo tenetur iste saepe, sapiente placeat provident. Obcaecati accusamus itaque rerum, sed nemo eligendi voluptas vel sit!</p>
</div>

```

## Licence

Copyright (c) 2014-2018 Sylvain Reucherand

MIT (http://opensource.org/licenses/mit-license.php)
