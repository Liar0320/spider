const bookChapters = require("./spiderBookChapters.test");
const ConnectionPool = require('../src/utils/ConnectionPool')
const connectionPool = new ConnectionPool();

bookChapters.then(res=>{
    let chapters = res;

    chapters.length = 10;
    connectionPool.register(chapters, function (list) {
        console.log(list);
    });
    connectionPool.start();
})