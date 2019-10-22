/*
 * @Author: lich 
 * @Date: 2019-10-18 10:19:23 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-22 09:37:28
 * @TODO:
 * register：注册所有的待链接
 * next：如果对象池中存在可用实例，则执行下一个链接
 * start：开始启动下载链接
 */
const ProgressBar = require("progress");
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
    constructor() {
        this.createFileCount = 20;
    }

    register(waitConnection, seekDone) {
        /**创建对象池 */
        this.poolInstance = new Pool();

        /**向对象池中添加原始数据 */
        new Array(this.poolInstance.maxConnection).fill(null).forEach(()=>{
            this.poolInstance.put(spiderChapterInfo);
        })
        /**需要处理等待的链接 */
        this.waitConnection = waitConnection || [];
        /**所有连接处理的结果 */
        this.waitConnectionStatus = [];
        /**控制 开启链接查询 和 链接结束的 定时器id */
        this.queryConnectionDoneId = null;

        /**当当前链接全部完成触发的回调函数 */
        // this.callback = callback || noop ;

        /**当缓存溢出时抛给seekDone */
        this.seekDone = seekDone || null;
        
        this.store = [];

        this.bar = new ProgressBar('  downloading [:bar] :rate/chapter :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: this.waitConnection.length
        });
    }

    /**开启链接，如果当前等待连接存在， 并且 对象池中有可用的对象， 
     * 则使用对象来开启一个新的连接 
     * 当连接结束后 将对象返回给对象池给其他需要的待连接使用。
     * */
    next() {
        // console.log(this.poolInstance.size());
        if (this.waitConnection.length > 0 && this.poolInstance.size() > 0) {
           let instance = this.poolInstance.get();
           let params = this.waitConnection.shift();

           instance(params.url, {isLoading: false}).then(content=>{
            this.bar.tick({rate: params.chapterName});
            params.$code = 200;
            this.waitConnectionStatus.push(params);
            this.poolInstance.put(instance);
            
            this.setStore(Object.assign(params, {content: content}));
            // this.everyConnectionDone({code: 1, params: Object.assign(params, {content: content})});
           }).catch(error=>{
            this.bar.tick();
            // console.log(error);
            params.$code = 0;
            params.$error = error;
            this.waitConnectionStatus.push(params);
            this.poolInstance.put(instance);
           })
        } else {
            // console.log("对象池被占用完，等待......................");
        }
    }

    // /**任何一个连接执行结束后回调的函数 */
    // everyConnectionDone({code, params}) {
    //     if(code === 1){
    //         generateFiles({chapterInfo:params, bookName: selectedNovel.name, path: fileAddress})
    //     }
    // }

    start() {
        this.next();
        this.queryConnectionDoneId = this.queryConnectionDone();
    }
    
    /**当当前链接全部完成触发的回调函数
     * 结束
     * @interface
     */
    end() {
        process.exit();
    }

    beforeEndMessage() {
        let length = this.waitConnectionStatus.length;
        let success = this.waitConnectionStatus.filter(res=>{
            return res.$code === 200;
        })
        let error = this.waitConnectionStatus.filter(res=>{
            return res.$code === 0;
        })

        console.log('总共请求 '+length+' 章');
        console.log("成功请求 "+success.length + ' 章' );
        console.log("请求失败 "+error.length + ' 章');
     
        /**如果有失败的章节 */
        if (error.length>0) {
            console.log("分别为：");
            error.forEach(res=>{
                console.log(res.chapterName +' :' + res.$error.message);
            })

            console.log("重新请求失败的章节：");
            this.waitConnection = error;
            
            return false;
        }
            
            return true;
    }

    close() {
        // this.callback(this.store, 'done');
        this.waitConnection = null;
        this.waitConnectionStatus = null;
        this.queryConnectionDone = null;
        // this.callback = null;
        this.clearStore();
    }

    /**设置每缓存多少个文件生成，本地对应的文件
     * @param { number } num 
     */
    setFileCreateCount(num) {
        this.createFileCount = num;
    }

    /**缓存当前请求的结果，如果有需要则抛出 */
    setStore(resultItem) {
        if (this.store.length >= this.createFileCount) {
            if (typeof this.seekDone === "function") { 
                this.seekDone(this.store);
                this.store = [];
            }
        }
        this.store.push(resultItem);
    }

    clearStore() {
        if (typeof this.seekDone === "function") { 
            this.seekDone(this.store);
            this.store = [];
        }
    }

    /**查询是否还有等待的链接，如果有则继续开启下一个链接，如果没有关闭销毁当前实例 */
    queryConnectionDone() {
       let queryConnectionDoneId = setInterval(() => {
            if (this.waitConnection.length === 0) {
                if (this.poolInstance.size() === this.poolInstance.maxConnection) {
                    if (this.beforeEndMessage()) {
                        clearInterval(queryConnectionDoneId);
                        this.close();
                        this.end();
                    }
                } 
                // else if (this.createFileCount > this.poolInstance.size()) {
                //     this.close();
                // }
            } else {
                this.next();
            }
        }, 100);
        
        return queryConnectionDoneId
    }
}

module.exports = ConnectionPool;

