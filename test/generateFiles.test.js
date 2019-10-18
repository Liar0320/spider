const connectionPool = require('./ConnectionPool.test');
const generateFiles = require('../src/utils/generateFiles');

connectionPool().then(allChapterInfo=>{
    allChapterInfo.forEach((chapterInfo, index)=>{
        generateFiles({chapterName: chapterInfo.chapterName, index, content: chapterInfo.content})
    })
})
