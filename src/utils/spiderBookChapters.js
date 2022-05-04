/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 16:17:28
 * @LastEditTime: 2021-02-27 20:03:39
 * @Description: *
 */
const spider = require("./index");

const website = require("../config/website");

function createChapterInfo({ chapterName, url, index }) {
  return {
    chapterName,
    url,
    index,
  };
}

/**爬取所有的目录 */
function spiderBookChapters(url) {
  return spider(url).then(
    /**
     * @param {CheerioStatic} $
     */
    function ($) {
      let { book, bookChapterList } = website.spiderBookChapters($,url);

      return {
        book,
        bookChapterList,
      };
    }
  );
}

module.exports = spiderBookChapters;
