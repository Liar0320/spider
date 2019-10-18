const {appendFile, exists, mkdir} = require("fs");
const {join} = require("path");

module.exports = function ({path='./download', bookName='龙王传说', chapterName='', content = '空内容', index}) {
    // console.log('generateFiles');
    const pathName = join(__dirname, path)

    exists(pathName, function (isexists) {
        if (!isexists) {
            mkdir(pathName, function () {});
        } 
        const nextPath = join(pathName, bookName);

        exists(nextPath, function (isexists) {
            if (!isexists) {
                mkdir(nextPath, function () {});
                // console.log(join(pathName, index + '.'+ chapterName));
            } 
            const thridPath = join(nextPath, index + '.' + chapterName + '.txt');

            content = content.replace('https://www.abcxs.com/book/1279/19579469.html　　天才一秒记住本站地址：www.abcxs.com。ABC小说网手机版阅读网址：m.abcxs.com', '');
            appendFile(thridPath, content, function () {
                console.log(`${thridPath} 添加成功`);
            })
        })
    })
   
   
    // appendFile(pathName, function () {
    //     console.log(`${pathName} 添加成功`);
    // })
}