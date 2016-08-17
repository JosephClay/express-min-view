// A high-efficiency, html-minifying, caching render
// helper...savings per render:
// * 1-5ms in rendering
// * ~150ms in gzip
// * ~35% in page size over the wire
// ...and super simple to integrate

const minify = require('html-minifier').minify;
const cache = Object.create(null);
const options = {
	removeComments:                true,
	collapseWhitespace:            true,
	removeAttributeQuotes:         true,
	removeScriptTypeAttributes:    true,
	removeStyleLinkTypeAttributes: true,
	minifyURLs:                    true
};

module.exports = function(config = {}) {
	const opts = Object.assign({}, options, config.options);

	return function(req, res, next) {
		const renderer = res.render;

		res.render = (view, data = {}, fn) => {
			if (config.cache === false || data.cache === false) {
				if (config.min === false || data.min === false) {
					// don't minify or cache...just use the previous renderer
					if (fn) { return renderer.call(res, view, data, fn); }
					return renderer.call(res, view, data);
				}

				// minify and don't cache
				renderer.call(res, view, data, function(err, html) {
					if (err) { return next(err); }

					res.send(minify(html, opts));
				});
			}

			// if cached, send back the result
			if (cache[view]) {
				return res.send(cache[view]);
			}

			// cached, but not minified
			if (config.min === false || data.min === false) {
				renderer.call(res, view, data, function(err, html) {
					if (err) { return next(err); }

					cache[view] = html;
					res.send(html);
				});
			}

			// the whole shabang
			renderer.call(res, view, data, function(err, html) {
				if (err) { return next(err); }

				const minHtml = minify(html, opts);
				cache[view] = minHtml;
				res.send(minHtml);
			});
		};

		next();
	};
};