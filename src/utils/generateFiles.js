/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 16:17:28
 * @LastEditTime: 2021-02-27 16:38:54
 * @Description: *
 */
const {appendFile} = require("fs");
const {join} = require("path");
const { downloadDirector } = require("../../project.config"); 

module.exports = function ({bookName='龙王传说', chapterInfo = {}, path = join(downloadDirector, bookName)}) {
    var chapterName = chapterInfo.chapterName, content = chapterInfo.content, index = chapterInfo.index

    const chapterAddress = join(path, index + '.' + chapterName + '.txt');

    content = content.replace('https://www.71du.com/book/4341/7816119.html　　天才一秒记住本站地址：www.71du.com。71读小说网手机版阅读网址：m.71du.com', '');
    appendFile(chapterAddress, content, function (error) {
        
    })
}