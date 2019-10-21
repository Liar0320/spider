const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('request');
const ora = require('ora');
// const http = require('http');
// const https = require('https');
///请求网页
const spinner = ora('加载数据')
/**
 * @param {string} url
 */

function spiderMain(url, config = {isLoading: true}) {
    return new Promise((resolve, reject)=>{
        // var server = url.match(/^https:\/\//) ? https:http;

        // console.info("正在发起请求，请求地址：" +url);
        if (config.isLoading) {
            spinner.start();
        }

        request(({
            url,
            /**https://blog.csdn.net/weixin_33859844/article/details/86275783 */
            encoding: null,
            timeout: 5000
        }), (error, response, body)=>{
            if (config.isLoading) {
                spinner.stop();
            }
            
            if (response && response.statusCode === 200) {
                var html = iconv.decode(body, 'gb2312'); //用gbk解码
                var $ = cheerio.load(html, {decodeEntities: false});

                resolve($);
            } else {
                reject(error, response);
            }
        })
    })
}
//export default reciveContent;
module.exports = spiderMain;