const bookChapters = require("./spiderBookChapters.test");
const ConnectionPool = require('../src/utils/ConnectionPool')
const connectionPool = new ConnectionPool();

function test(callback) {
    return new Promise((resolve, reject)=>{
        bookChapters.then(res=>{
            let chapters = res;
        
            chapters.length = 1000;
            // connectionPool.register(chapters, function (list) {
            //     resolve(list);
            // });
          
            connectionPool.register(chapters, callback || function (list) {
                console.log(list);
            })
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