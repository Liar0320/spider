const bookChapters = require("./spiderBookChapters.test");
const ConnectionPool = require('../src/utils/ConnectionPool')
const connectionPool = new ConnectionPool();

function test() {
    return new Promise((resolve, reject)=>{
        bookChapters.then(res=>{
            let chapters = res;
        
            chapters.length = 26;
            // connectionPool.register(chapters, function (list) {
            //     resolve(list);
            // });
            function callback(list) {
                console.log(list);
            }
            connectionPool.register(chapters, callback)
            connectionPool.start();

            connectionPool.end = function () {
                resolve('end');
            }
        })
    })
}
 test().then(res=>{ 
console.log(res); 
})
module.exports = test; 