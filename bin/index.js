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
	.action(function(page, options) {
		addPage(page, options.index)
	})

commander.parse(process.argv)

function scaffold(name){
	mkdirp.sync(name + '/pages')
	fs.open(name + '/app.js', 'w', closeFile)
	fs.open(name + '/app.wxss', 'w', closeFile)
	let file = fs.openSync(name + '/app.json', 'w')
	writeJsonFile(file, {pages:[]})
}

function closeFile(err, fd) {
	if (err) throw err;
		fs.close(fd, ()=>{})
}

function addPage(page, isIndex=false) {
	let paths = page.split('/');
	let name = paths.splice(-1);
	let path = 'pages/' + paths.join('/');

	fs.exists(path, (exist) => {
		if (!exist) {
			mkdirp.sync(path)
		} 
		fs.open(`${path}/${name}.js`, 'w', closeFile)
		fs.open(`${path}/${name}.json`, 'w', closeFile)
		fs.open(`${path}/${name}.wxml`, 'w', closeFile)
		fs.open(`${path}/${name}.wxss`, 'w', closeFile)

		let content = fs.readFileSync('./app.json', 'utf-8')
		content = JSON.parse(content);
		if(isIndex) {
			content.pages.unshift(`pages/${page}`)
		} else {
			content.pages.push(`pages/${page}`)
		}
		writeJsonFile('../app/app.json', content)
	})

}

function writeJsonFile(file, data) {
	fs.writeFileSync(file, JSON.stringify(data, null, 2))
}
