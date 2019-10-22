const { join } = require('path');

module.exports = {
    /**每一次请求的超时时间 */
    timeout: 15000,
    /**一次性存在的最大线程数，即同时开启异步下载的数量 */
    maxThreadExist: 20,
    /**如果存在请求失败，重新发起请求的次数 */
    rePullCount: 4,
    /**下载目录的根目录 */
    downloadDirector: join(__dirname, './download') 
}