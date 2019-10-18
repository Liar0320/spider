const bookurl = '/book/1279/';
const baseUrl = 'http://www.abcxs.com';
const spiderBookChapters = require('../src/utils/spiderBookChapters');

/**生成爬取小说地址 */
function packBookChaptersUrl(bookurl) {
    return baseUrl + bookurl;
}


// spiderBookChapters(packBookChaptersUrl(bookurl)).then(chapters=>{
//     console.log(chapters);
// })


module.exports = spiderBookChapters(packBookChaptersUrl(bookurl)).then(chapters=>{
    console.log(chapters);
    
    return chapters
})

