const spider = require("./index");
const website = require("../config/website");
const test = [
  {
    name: "琴帝",
    value: {
      name: "琴帝",
      url: "1/14",
    },
  },
  {
    name: "琴酒",
    value: {
      name: "琴酒",
      url: "1/1412",
    },
  },
  {
    name: "琴仙",
    value: {
      name: "琴仙",
      url: "1/142",
    },
  },
];

function createBookInfo({ name, author, url, description }) {
  return {
    name,
    author,
    url,
    description,
  };
}

/**爬取所有的目录 */
function spiderCatalog(url) {
  return spider(url).then(
    /**
     * @param {CheerioStatic} $
     */
    function ($) {
      let bookInfoList = [];

      website.spiderCatalog($).forEach(({ name, author, url, description }) => {
        bookInfoList.push({
          name: name,
          value: createBookInfo({ name, author, url, description }),
        });
      });

      return bookInfoList;
    }
  );
}

module.exports = spiderCatalog;
