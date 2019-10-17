const baseUrl = 'http://www.abcxs.com';

const spiderLikeBook = require("./spiderLikeBook");

const spiderBookChapters = require("./spiderBookChapters");

/**生成搜索地址 */
function packLikeBookUrl(fileName) {
    return baseUrl + '/s.php?q=' + encodeURIComponent(fileName);
}

/**生成爬取小说地址 */
function packBookChaptersUrl(bookurl) {
    return baseUrl + bookurl;
}

/**模糊查找小说 */
module.exports.spiderLikeBook = function (fileName) {
    return spiderLikeBook(packLikeBookUrl(fileName))
}
/**爬取小说所有章节 */
module.exports.spiderBookChapters = function (bookurl) {
    return spiderBookChapters(packBookChaptersUrl(bookurl))
}

/**爬取小说章节内容 */
module.exports.spiderBookInfo = function (bookurl) {
    return spiderBookInfo(packBookInfoUrl(bookurl))
}