const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const { promisify } = require('util')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConfig')
const conType = require('../helper/mime')
const compress = require('../helper/compress')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(source)

module.exports =  async function (req, res, filepath) {
	try {
		const stats = await stat(filepath)
		if (stats.isFile()) {
			const type = conType(filepath)
			res.statusCode = 200
			res.setHeader('Content-Type', type)
			// stream 文件流
			let rs = fs.createReadStream(filepath)
			if (filepath.match(config.compress)) {
				rs = compress(rs, req, res)
			}
			rs.pipe(res)
		} else if (stats.isDirectory()) {
			//  fs.readdir(filepath, (err, files) => {
			// 	res.statusCode = 200
			// 	res.setHeader('Content-Type', 'text/plain')
			// 	res.end(files.join(','))
			//  })
			const files = await readdir(filepath)
			res.statusCode = 200
			res.setHeader('Content-Type', 'text/html')
			const dir = path.relative(config.root, filepath)
			const data = {
				title: path.basename(filepath),
				dir: dir ? `/${dir}` : '',
				files
			}
			res.end(template(data))
		}
	} catch (ex) {
		res.statusCode = 404
		res.setHeader('Content-Type', 'text/plain')
		res.end(`${filepath} is not a directory or a file`)
	}
}
