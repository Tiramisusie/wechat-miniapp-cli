# wechat-miniapp-cli

a command line tool for building a wechat mini app

## install

```bash
npm install -g wechat-miniapp-cli
```

## how to use

### initializing your project

```bash
wxmini init <your_project_name>

// example
wxmini init app
```

this command will create something like

```
app
 |-app.js
 |-app.json
 |-app.wxss
 |-pages/
```

### adding a page

```bash
wxmini add [option] <page_name>

// example
wxmini add index
```

this command will add **4** files in `pages/`, including `index.js`, `index.json`, `index.wxml` and `index.wxss`, and add `pages/index` into your `pages` array in `app.json`.

if you want to add your page `index` under a directory like `pages/user/`, you can type 

```bash
wxmini add user/index
```

