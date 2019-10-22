const {appendFile} = require("fs");
const {join} = require("path");
const { downloadDirector } = require("../../project.config"); 

module.exports = function ({bookName='龙王传说', chapterInfo = {}, path = join(downloadDirector, bookName)}) {
    var chapterName = chapterInfo.chapterName, content = chapterInfo.content, index = chapterInfo.index

    const chapterAddress = join(path, index + '.' + chapterName + '.txt');

    content = content.replace('https://www.abcxs.com/book/1279/19579469.html　　天才一秒记住本站地址：www.abcxs.com。ABC小说网手机版阅读网址：m.abcxs.com', '');
    appendFile(chapterAddress, content, function (error) {
        
    })
}