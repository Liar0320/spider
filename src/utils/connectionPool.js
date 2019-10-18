/*
 * @Author: lich 
 * @Date: 2019-10-18 10:19:23 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-18 13:52:32
 * @TODO:
 * register：注册所有的待链接
 * next：如果对象池中存在可用实例，则执行下一个链接
 * start：开始启动下载链接
 */

const Pool = require("./Pool");
const poolInstance = new Pool();

const {spiderChapterInfo} = require('./spider');

// class SpiderChapterInfo {
//     start(chapterInfoUrl) {
//         return spiderChapterInfo(chapterInfoUrl)
//     }
// }
new Array(poolInstance.maxConnection).fill(null).forEach(()=>{
    // let instance = poolInstance.instantiate(SpiderChapterInfo);
    poolInstance.put(spiderChapterInfo);
});

const store = [];

function noop() {
    return void 0;
}

class ConnectionPool {
    register(waitConnection, callback ) {
        this.waitConnection = waitConnection || [];
        this.queryConnectionDoneId = null;
        this.callback = callback || noop ;
    }
    next() {
        console.log(poolInstance.size());
        if (this.waitConnection.length > 0 && poolInstance.size() > 0) {
           let instance = poolInstance.get();
           let params = this.waitConnection.shift();

           instance(params.url).then(content=>{
            poolInstance.put(instance);
            store.push(Object.assign(params, {content: content}));
           })
        } else {
            console.log("对象池被占用完，等待......................");
        }
    }
    start() {
        this.next();
        this.queryConnectionDoneId = this.queryConnectionDone();
    }
    close() {
        this.callback(store);
        this.waitConnection = null;
        this.queryConnectionDone = null;
        this.callback = null;
    }
    queryConnectionDone() {
       let queryConnectionDoneId = setInterval(() => {
            if (this.waitConnection.length === 0) {
                if (poolInstance.size() === poolInstance.maxConnection) {
                    clearInterval(queryConnectionDoneId);
                    this.close();
                }
            } else {
                this.next();
            }
        }, 100);
        
        return queryConnectionDoneId
    }
}

module.exports = ConnectionPool;

