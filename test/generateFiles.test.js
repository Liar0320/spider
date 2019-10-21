const connectionPool = require('./ConnectionPool.test');
const generateFiles = require('../src/utils/generateFiles');

connectionPool(
    function callback(allChapterInfo) {
        // console.log(allChapterInfo);
        allChapterInfo.forEach((chapterInfo)=>{
            generateFiles({chapterInfo, bookName: selectedNovel.name, path: fileAddress})
        })
    }
    )
