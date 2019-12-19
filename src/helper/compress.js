// 根据浏览器可以处理的压缩格式对文件进行相对应的压缩
const { createGzip,  createDeflate } = require('zlib')

module.exports = (rs, req, res) => {
	const accepetEncoding = req.headers['accept-encoding']

	if (!accepetEncoding || !accepetEncoding.match(/\b(gzip|deflate)\b/)) {
		return rs
	} else if (accepetEncoding.match(/\bgzip\b/)) {
		// 优先使用gzip 的压缩方式
		res.setHeader('Content-Encoding', 'gzip')
		return rs.pipe(createGzip())
	} else if (accepetEncoding.match(/\bdeflate\b/)) {
		// 优先使用gzip 的压缩方式
		res.setHeader('Content-Encoding', 'deflate')
		return rs.pipe(createDeflate())
	}
}
