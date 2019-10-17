const bookurl = '/book/1279/19606884.html';
const baseUrl = 'http://www.abcxs.com';
const spiderChapterInfo = require('../src/utils/spiderChapterInfo');

/**生成爬取小说地址 */
function packBookChaptersUrl(bookurl) {
    return baseUrl + bookurl;
}

spiderChapterInfo(packBookChaptersUrl(bookurl)).then(ChapterInfo=>{
    console.log(ChapterInfo);
})


