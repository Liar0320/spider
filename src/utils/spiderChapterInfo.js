const spider = require("./index");

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
        function($) {
          let content = '';

          content = $('#content').text()
          
          return content
    })
}

module.exports = spiderChapterInfo;