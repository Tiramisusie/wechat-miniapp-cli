#!/usr/bin/env node
const fs = require('fs')
const commander = require('commander')
const mkdirp = require('mkdirp')

commander
	.version(require('../package.json').version)
	.command('init <name>')
	.description('create the root path of your project')
	.action((name) => {
		scaffold(name)
	});

commander
	.command('add <page>')
	.description('add a page')
	.option('-i, --index', 'adding this param to specify the new page is the index')
	.action(function(page) {
		addPage(page)
	})

commander.parse(process.argv)

function scaffold(name){
	mkdirp.sync(name + '/pages')
	fs.closeSync(fs.openSync(name + '/app.js', 'w'))
	fs.closeSync(fs.openSync(name + '/app.wxss', 'w'))
	let file = fs.openSync(name + '/app.json', 'w')
	let content = {pages:[]};
	writeJsonFile(file, content)
}


function addPage(page) {
	let paths = page.split('/');
	let name = paths.splice(-1);
	let path = 'pages/' + paths.join('/');

	fs.exists(path, (exist) => {
		if (!exist) {
			mkdirp.sync(path)
		} 
		fs.closeSync(fs.openSync(`${path}/${name}.js`, 'w'))
		fs.closeSync(fs.openSync(`${path}/${name}.wxml`, 'w'))
		fs.closeSync(fs.openSync(`${path}/${name}.wxss`, 'w'))
		fs.closeSync(fs.openSync(`${path}/${name}.json`, 'w'))

		let content = fs.readFileSync('./app.json', 'utf-8')
		content = JSON.parse(content);
		content.pages.push(`pages/${page}`)
		writeJsonFile('../app/app.json', content)
	})

}

function writeJsonFile(file, data) {
	fs.writeFile(file, JSON.stringify(data, null, 2))
}
