const http = require('http')
const path = require('path')
const chalk = require('chalk')
const config = require('./config/defaultConfig')
const route = require('./helper/route')


const server = http.createServer((req, res) => {
	const filepath = path.join(config.root, req.url)
	route(req, res, filepath)
	// fs.stat(filepath, (error, stats) => {
	// 	if (error) {
	// 		res.statusCode = 404
	// 		res.setHeader('Content-Type', 'text/plain')
	// 		res.end(`${filepath} is not a directory or a file`)
	// 		return
	// 	}
	// 	if (stats.isFile()) {
	// 		res.writeHead(200, {
	// 			'Content-Type': 'text/plain'
	// 		})
	// 		fs.createReadStream(filepath).pipe(res)
	// 	} else if (stats.isDirectory()) {
	// 		 fs.readdir(filepath, (err, files) => {
	// 			res.statusCode = 200
	// 			res.setHeader('Content-Type', 'text/plain')
	// 			res.end(files.join(','))
	// 		 })
	// 	}
  	// })
})

server.listen(config.port, config.hostname, () => {
	const addr = `http://${config.hostname}:${config.port}`
	console.info(`Server started at ${chalk.green(addr)}`);

})
