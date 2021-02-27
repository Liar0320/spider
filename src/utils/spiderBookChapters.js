/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 16:17:28
 * @LastEditTime: 2021-02-27 20:03:39
 * @Description: *
 */
const { Book, Chapter } = require("../downloadInfo/createBook");
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
            let book =  new Book();
         book.imgUrl = $('#maininfo #fmimg img').attr('src');
         book.name = $('#maininfo #info h1').text();
         book.src = url;
         book.brief = $('#intro p').eq(0).text();
         book.lastUpdateTime = $('#maininfo #info p').eq(3).text();
         book.lastUpdateChapter = $('#maininfo #info p').eq(4).text();

         
          let bookChapterList = []
          $('.listmain a').each((index, item)=>{
              const el = $(item);
              const chapterName = el.text();
              const url = el.attr('href')

              bookChapterList.push( createChapterInfo({chapterName, url, index}));
             let chapter =    new Chapter();
             chapter.name = chapterName;
             chapter.sortId = index + 1;
             chapter.src =  index + '.' + chapterName + '.txt';
             book.insertChapter(chapter);
            })
         
          
          return {
            book,
            bookChapterList
        }
    })
}

module.exports = spiderBookChapters;