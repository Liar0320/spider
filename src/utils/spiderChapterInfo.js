const spider = require("./index");
const website = require("../config/website");
// function spiderChapterInfo({chapterName, url, index }) {
//     return {
//         chapterName,
//         url,
//         index
//     }
// }

/**爬取章节的 */
function spiderChapterInfo(url, config) {
  return spider(url, config).then(
    /**
     * @param {CheerioStatic} $
     */
    function ($) {
      let content = "";

      content = website.spiderChapterInfo($);

      return content;
    }
  );
}

module.exports = spiderChapterInfo;
