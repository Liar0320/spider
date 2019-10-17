const spider = require("./index");

const test = [
    {
        name: "琴帝",
        value: {
            name: "琴帝",
            url: "1/14"
        }
    },
    {
        name: "琴酒",
        value: {
            name: "琴酒",
            url: "1/1412"
        }
    },
    {
        name: "琴仙",
        value: {
            name: "琴仙",
            url: "1/142"
        }
    },
]

function createBookInfo({name, author, url, description}) {
    return {
        name,
        author,
        url,
        description
    }
}


/**爬取所有的目录 */
function spiderCatalog(url) {
    
    return spider(url).then(
        /** 
         * @param {CheerioStatic} $ 
         */
        function($) {
          
          let bookInfoList = []

          $('.bookinfo').each((index, item)=>{
              const el = $(item);
              const url = el.find('.bookname a').attr('href');
              const author = el.find('.author').text();
              const description = el.find('p').text();
              const update = el.find('.update').text();

              const name = el.find('.bookname').text() +`[${author}]  [${update}]`;

              bookInfoList.push({
                  name: name,
                  value: createBookInfo({name, author, url, description})
              });
          })
         

return bookInfoList
    })
}

module.exports = spiderCatalog;