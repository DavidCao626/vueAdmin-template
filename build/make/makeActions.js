const fs = require("fs");
const AdmZip = require("adm-zip"); //引入查看zip文件的包
const filePath = "/Users/davidcao/chifen.docx";

const basePath ="stuPunish"

const OUTPUT_PATH = "./src/views/zongceV2/_store/actions/" + basePath+".js";


var render = require("json-templater/string");
var endOfLine = require("os").EOL;
const zip = new AdmZip(filePath); //filePath为文件路径

let contentXml = zip.readAsText("word/document.xml"); //将document.xml读取为text内容；
let str = "";
contentXml.match(/<w:t>[\s\S]*?<\/w:t>/gi).forEach(item => {
  str += item.slice(5, -6);
});
let newstr = "";

var IMPORT_TEMPLATE = `
const {{apiname}} = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.{{apiname}}(params).then(response => {
      resolve(response);
    });
  });`;

var includeComponentTemplate = [];
var varname1 = [];

str.match(/接口地址[\s\S]*?接口需求描述/gi).forEach(item => {
  let temp = item.match(/\/[\s\S]*?\.do/gi)[0].slice(11, -3);
  includeComponentTemplate.push(
    render(IMPORT_TEMPLATE, {
      apiname: temp,
      apiurl: item.slice(5, -6)
    })
  );
  varname1.push(temp);
  //newstr += item.slice(5, -6);
});

var MAIN_TEMPLATE = `
/* Automatically generated by './build/make/*.js' */

import api from "../../_api/`+ basePath+`.js";

{{include}}
export default {
  {{varname}}
};
`;

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  varname: varname1.toString()
});

fs.writeFile(OUTPUT_PATH, template, err => {
  //将./2.txt替换为你要输出的文件路径
  if (err) throw err;
});
// fs.writeFile("./src/views/zongceV2/stuPunish/index.vue", template, err => {
//   //将./2.txt替换为你要输出的文件路径
//   if (err) throw err;
// });

console.log("[build entry] DONE:", OUTPUT_PATH);
//接口地址/stuPunish/queryPunishList.do接口
