const http = require('http')
const path = require('path')
const chalk = require('chalk')
const config = require('./config/defaultConfig')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {

	constructor (configS) {
		// 两个配置项合并
		this.config = Object.assign({}, config, configS)
	}

	start () {
		const server = http.createServer((req, res) => {
			const filepath = path.join(this.config.root, req.url)
			route(req, res, filepath, this.config)
		})

		server.listen(this.config.port, this.config.hostname, () => {
			const addr = `http://${this.config.hostname}:${this.config.port}`
			console.info(`Server started at ${chalk.green(addr)}`);
			openUrl(addr)
		})
	}
}

module.exports = Server
