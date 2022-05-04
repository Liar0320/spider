/**
 * @link https://www.xbiquge.so
 */

const { Book, Chapter } = require("../../downloadInfo/createBook");

const website = `https://www.xbiquge.so`;
const search = () =>
  `https://www.xbiquge.so/modules/article/search.php?searchkey=%C5%CC%C1%FA`;

/**
 * @param {CheerioStatic} $
 */
const spiderCatalog = ($) => {
  let result = [];
  $(".novelslistss > li").each((index, item) => {
    const el = $(item);
    const url = el.find(".s2 a").attr("href");
    const author = el.find(".s4").text();
    const description = el.find("s1").text();
    const update = el.find(".s5").text();

    const name = el.find(".s2").text() + `[${author}]  [${update}]`;

    return result.push({ name, author, url, description });
  });

  return result;
};

const spiderBookChapters = ($, bookUrl) => {
  let book = new Book();
  book.imgUrl = $("#maininfo #fmimg img").attr("src");
  book.name = $("#maininfo #info h1").text();
  book.src = bookUrl;
  book.brief = $("#intro").text();
  book.lastUpdateTime = $("#maininfo #info p").eq(2).text();
  book.lastUpdateChapter = $("#maininfo #info p").eq(3).text();

  let bookChapterList = [];
  let isStart = false;
  $("#list a").each((index, item) => {
    const el = $(item);
    const chapterName = el.text();
    const url = bookUrl + el.attr("href");

    if (!isStart) {
      if (chapterName.includes("第一章")) {
        isStart = true;
      } else {
        return true;
      }
    }

    index = bookChapterList.length;

    bookChapterList.push({ chapterName, url, index });
    let chapter = new Chapter();
    chapter.name = chapterName;
    chapter.sortId = index + 1;
    chapter.src = index + "." + chapterName + ".txt";
    book.insertChapter(chapter);
  });

  return {
    book,
    bookChapterList,
  };
};

/**
 * @param {CheerioStatic} $
 */
const spiderChapterInfo = ($) => {
  let content = "";
  // content = $("#content").text();
  content = $.load($("#content").html().replaceAll(`<br>`, `\n`)).text();
  content = content.replaceAll(`笔趣阁 www.xbiquge.so，最快更新盘龙 ！`, "");
  // 移除      （这是的新书，今天就先更新九千字番茄，明天起一天更新两次，分别是中午和晚上。呵呵，希望大家收藏、砸几张推荐票，这对新书比较重要，谢谢~~~）
  content = content.replaceAll(
    `天才一秒记住本站地址：www.71du.com。71读小说网手机版阅读网址：m.71du.com`,
    ""
  );

  return content;
};

module.exports = {
  website,
  search,
  spiderCatalog,
  spiderBookChapters,
  spiderChapterInfo,
};
