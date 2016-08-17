# express-min-view

Minify and cache static views using express middleware. For node 6+.

`npm install express-min-view`

## Usage

Register the middleware:

```js
const minView = require('express-min-view');

// place after registering the view engine
app.use(minView());
```

Use `res.render` as normal!

## API

Configuring the middleware:

```js
minView({
	// whether to minify the html
	// defaults to true
	min: true,
	// whether to cache the results using the view as the key
	// defaults to true
	cache: true
})
```

Configuring an views individually:

```js
router.get('view', (req, res) => {
	res.render('view', {
		min: false,
		cache: false
	});
});
```

## Benefits

Thanks to [html-minifier](https://www.npmjs.com/package/html-minifier), you can expect savings of:

* 1-5ms in rendering time
* ~150ms in gzip time
* ~35% in page size over the wire

with both `cache` and `min` enabled.

## Note

Passing a function as a third parameter to `res.render` will not work if `min` or `cache` is enabled.

## License

MIT License

Copyright (c) 2016 Joseph Clay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

