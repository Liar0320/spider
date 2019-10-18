/*
 * @Author: lich 
 * @Date: 2019-10-17 22:58:07 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-18 14:25:44
 * @TODO:
 * open:开启一个新的连接
 * close:关闭当前连接
 * isFull:连接池是否全部占用
 * improve设计
 * 当超时时自动关闭连接，防止长时间占用连接
 * @TODO:
 * instantiate:实例化
 * get:获取当前实例化的参数
 * put:将从对象池中取出的实例放回对象池中
 */
// const maxConnection = 20;

class Pool {
    constructor(maxConnection = 20) {
        this.maxConnection = maxConnection;
        this.currentConnection = 0;
        this.connectionCollection = [];
    }

    /**实例化一个对象
     * @param {  } instance 
     */ 
    instantiate(__constructor) {
        let current = new __constructor()
        
        return current;
    }
    
    /**从对象池中获取一个实例 */
    get() {
        return this.connectionCollection.shift();
    }

    /**将实例归还给对象池 */
    put(current) {
        this.connectionCollection.push(current);
    }

    /**对象池中剩余的容量 */
    size() {
      return this.connectionCollection.length;
    }
}

module.exports = Pool;

