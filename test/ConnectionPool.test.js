const bookChapters = require("./spiderBookChapters.test");
const ConnectionPool = require('../src/utils/ConnectionPool')
const connectionPool = new ConnectionPool();

function test() {
    return new Promise((resolve, reject)=>{
        bookChapters.then(res=>{
            let chapters = res;
        
            chapters.length = 10;
            // connectionPool.register(chapters, function (list) {
            //     resolve(list);
            // });
            function callback(list) {
                resolve(list);
            }
            connectionPool.register(chapters, callback, callback)
            connectionPool.start();
        })
    })
}
 test().then(res=>{ 
console.log(res) 
})
module.exports = test; 