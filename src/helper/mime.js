// 根据不同的文件后缀设置不同的文件格式
// 可用类似的方法设置icon等其他水泥杆
const path = require('path')
const contentType = {
	'html': 'text/html',
	'xml': 'text/xml',
	'txt': 'text/plain',
	'css': 'text/css',
	'js': 'text/javascript',
	'gift': 'image/gift',
	'ico': 'image/x-icon',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpg',
	'tiff': 'image/tiff',
	'json': 'application/json',
	'pdf': 'application/pad'
}

module.exports = (filepath) => {
	const extname = path.extname(filepath).split('.').pop().toLocaleLowerCase()
	return contentType[extname] || contentType['txt']
}
