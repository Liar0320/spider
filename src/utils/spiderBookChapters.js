const spider = require("./index");

function createChapterInfo({chapterName, url, index }) {
    return {
        chapterName,
        url,
        index
    }
}


/**爬取所有的目录 */
function spiderBookChapters(url) {
    
    return spider(url).then(
        /** 
         * @param {CheerioStatic} $ 
         */
        function($) {
          
          let bookChapterList = []

          $('.listmain a').each((index, item)=>{
              const el = $(item);
              const chapterName = el.text();
              const url = el.attr('href')

              bookChapterList.push( createChapterInfo({chapterName, url, index}));
          })
         

return bookChapterList
    })
}

module.exports = spiderBookChapters;