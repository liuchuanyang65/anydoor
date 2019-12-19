const { cache } = require('../config/defaultConfig')

function refreshRes (stats, res) {
	const { maxAge, expires, cacheControl, lastModified, etag } = cache

	if (expires) {
		res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
	}

	if (cacheControl) {
		res.setHeader('Cache-Control', `pubilc, max-age=${maxAge}`)
	}

	if (lastModified) {
		res.setHeader('Last-Modidied', stats.mtime.toUTCString())
	}

	if (etag) {
		res.setHeader('Etag', `${stats.size}-${stats.mtime}`)
	}
}

module.exports = function isRefresh(stats, req, res) {
	refreshRes(stats, res)

	const lastModified = req.headers['if-modified-since']
	const etag = req.headers['if-none-match']

	if (!lastModified && !etag) {
		return false
	}

	 if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
		 return false
	 }

	 if (etag && etag !== res.getHeader('Etag')) {
		 return false
	 }

	 return true
}
