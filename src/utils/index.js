const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require('http');
const https = require('https');
///请求网页

/**
 * @param {string} url
 */
function spiderMain(url) {
    return new Promise((resolve, resject)=>{
        var server = url.match(/^https:\/\//) ? https:http;

        console.info("正在发起请求，请求地址：" +url);
        server.get(url, (res)=>{
            const arrBuf = [];
            var BufLength = 0;
    
            res.on('data', (chunk)=>{
              arrBuf.push(chunk);
              BufLength +=chunk.length;
            });
            res.on('end', ()=>{    
                console.info("请求数据完毕：" +url);
                var chunkAll = Buffer.concat(arrBuf, BufLength);
                var $ = cheerio.load(chunkAll, {decodeEntities: false});
                var html = '';
        
                console.log('success');
               $('meta').each((index, ele)=>{
                   if ($(ele).attr().content.indexOf('gbk')>-1||$(ele).attr().content.indexOf('gb2312')) {
                     html = iconv.decode(chunkAll, 'gbk'); //用gbk解码
                     $ = cheerio.load(html, {decodeEntities: false});
    
    return false;
                   } else if (index === $('meta').length-1) {
                     $ = cheerio.load(html); ///默认utf-8
    
    return false;
                   }   
                });

                resolve($);
            })
        })
    })
}
//export default reciveContent;
module.exports = spiderMain;