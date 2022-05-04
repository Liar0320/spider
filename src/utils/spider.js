/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 16:17:28
 * @LastEditTime: 2021-02-27 16:28:19
 * @Description: *
 */

const spiderLikeBook = require("./spiderLikeBook");

const spiderBookChapters = require("./spiderBookChapters");

const spiderChapterInfo = require("./spiderChapterInfo");

const { website, search } = require("../config/website");

const baseUrl = website; //'http://www.abcxs.com';

/**生成搜索地址 */
function packLikeBookUrl(fileName) {
  if (typeof search === "function") {
    return search(fileName);
  }
  return baseUrl + search + encodeURIComponent(fileName);
}

/**生成爬取小说地址 */
function packBookChaptersUrl(bookurl) {
  return bookurl;
}

/**模糊查找小说 */
module.exports.spiderLikeBook = function (fileName) {
  return spiderLikeBook(packLikeBookUrl(fileName));
};
/**爬取小说所有章节 */
module.exports.spiderBookChapters = function (bookurl) {
  return spiderBookChapters(packBookChaptersUrl(bookurl));
};

/**爬取小说章节内容 */
module.exports.spiderChapterInfo = function (bookurl, config) {
  return spiderChapterInfo(packBookChaptersUrl(bookurl), config);
};
