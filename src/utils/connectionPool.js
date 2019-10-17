/*
 * @Author: lich 
 * @Date: 2019-10-17 22:58:07 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-17 23:09:43
 * @TODO:
 * open:开启一个新的连接
 * close:关闭当前连接
 * isFull:连接池是否全部占用
 * improve设计
 * 当超时时自动关闭连接，防止长时间占用连接
 */
/**最大连接池为20 */
const maxConnection = 20;

const connectionCollection = [];

class ConnectionPool {
    /**
     * 
     * @param { Promise } __connection 
     */
    open(__connection) {
       let connection = new Connection(__connection);

        
return connection
    }
    close() {

    }
    isFull() {
       return connectionCollection.length >= maxConnection;
    }
}

class Connection {

}

