/*
 * @Author: lich 
 * @Date: 2019-10-18 10:19:23 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-19 21:38:07
 * @TODO:
 * register：注册所有的待链接
 * next：如果对象池中存在可用实例，则执行下一个链接
 * start：开始启动下载链接
 */

const Pool = require("./Pool");
const {spiderChapterInfo} = require('./spider');

// class SpiderChapterInfo {
//     start(chapterInfoUrl) {
//         return spiderChapterInfo(chapterInfoUrl)
//     }
// }


function noop() {
    return void 0;
}

class ConnectionPool {
    register(waitConnection, callback, seekDone ) {
        this.poolInstance = new Pool();

        new Array(this.poolInstance.maxConnection).fill(null).forEach(()=>{
            this.poolInstance.put(spiderChapterInfo);
        })


        this.seekDone = seekDone || null;
        this.waitConnection = waitConnection || [];
        this.queryConnectionDoneId = null;
        this.callback = callback || noop ;
        this.store = [];
    }
    next() {
        console.log(this.poolInstance.size());
        if (this.waitConnection.length > 0 && this.poolInstance.size() > 0) {
           let instance = this.poolInstance.get();
           let params = this.waitConnection.shift();

           instance(params.url).then(content=>{
            this.poolInstance.put(instance);
            this.setStore(Object.assign(params, {content: content}));
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
        this.callback(store, 'done');
        this.waitConnection = null;
        this.queryConnectionDone = null;
        this.callback = null;
    }
    setStore(resultItem) {
        if (this.store.length > 20) {
            if (typeof this.seekDone === "function") { 
                this.seekDone(this.store);
                this.store = [];
            }
        }
        this.store.push(resultItem);
    }
    queryConnectionDone() {

        
       let queryConnectionDoneId = setInterval(() => {
            if (this.waitConnection.length === 0) {
                if (this.poolInstance.size() === this.poolInstance.maxConnection) {
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

