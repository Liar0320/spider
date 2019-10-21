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
            function callback(list, status) {
                console.log(list);
                if (status === 'done') {
                    resolve();
                }
            }
            connectionPool.register(chapters, callback, callback)
            connectionPool.start();
        })
    })
}
 test().then(res=>{ 
console.log('done'); 
})
module.exports = test; 