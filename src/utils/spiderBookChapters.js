const spider = require("./index");

function createBookInfo({name, author, url, description}) {
    return {
        name,
        author,
        url,
        description
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

          $('.bookinfo').each((index, item)=>{
              const el = $(item);
              const url = el.find('.bookname a').attr('href');
            

              bookChapterList.push(url);
          })
         

return bookChapterList
    })
}

module.exports = spiderBookChapters;