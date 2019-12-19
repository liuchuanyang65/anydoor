// process.argv 可以获取命令行参数列表
const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
	.usage('anywhere [options]')
	.option('p', {
		alias: 'port',
		descrbibe: '端口号',
		default: 9527
	})
	.option('h', {
		alias: 'hostname',
		descrbibe: 'host',
		default: '127.0.0.1'
	})
	.option('d', {
		alias: 'root',
		descrbibe: 'root path',
	})
	.version()
	.alias('v', 'version')
	.help()
	.argv;

	const server = new Server(argv)
	server.start()
