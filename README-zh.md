参考文档(https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/README)

## Build Setup

``` bash

# Clone project
git clone https://gitee.com/Davidcao/vueAdmin-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# vscode 插件
vscode-element-helper  vue-snippets  theme-oceanicnext   prettier-vscode  path-intellisense  auto-rename-tag   auto-close-tag

# vs ide设置
{



    "workbench.colorCustomizations": {
      "statusBar.background": "#333333",
      "statusBar.noFolderBackground": "#333333",
      "statusBar.debuggingBackground": "#263238"
    },
"workbench.colorTheme": "Oceanic Next (dimmed bg)",
 
"files.autoSave":"off",

"eslint.validate": [
  "javascript",
  {
    "language": "vue",
    "autoFix": true
  },
  "html",
  "vue"
],
"eslint.autoFixOnSave": true,
"editor.fontSize": 14,
"editor.quickSuggestions": {
  "strings": true
},

"editor.formatOnPaste": true,
"vetur.format.defaultFormatter.html": "js-beautify-html",
"editor.formatOnType": true,
}




    
}
    