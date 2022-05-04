const { Book, Chapter } = require("../downloadInfo/createBook");
const xbiquge = require("./modules/xbiquge");
const du71 = {
  website: "https://www.71du.com",
  search: "/s.php?q=", //  https://www.71du.com/s.php?q=
  spiderCatalog($) {
    let result = [];
    $(".bookinfo").each((index, item) => {
      const el = $(item);
      const url = du71.website + el.find(".bookname a").attr("href");
      const author = el.find(".author").text();
      const description = el.find("p").text();
      const update = el.find(".update").text();

      const name = el.find(".bookname").text() + `[${author}]  [${update}]`;

      result.push({ name, author, url, description });
    });

    return result;
  },
  /**
   * @param {CheerioStatic} $
   */
  spiderBookChapters($, bookUrl) {
    let book = new Book();
    book.imgUrl = $("#maininfo #fmimg img").attr("src");
    book.name = $("#maininfo #info h1").text();
    book.src = bookUrl;
    book.brief = $("#intro p").eq(0).text();
    book.lastUpdateTime = $("#maininfo #info p").eq(3).text();
    book.lastUpdateChapter = $("#maininfo #info p").eq(4).text();

    let bookChapterList = [];
    $(".listmain a").each((index, item) => {
      const el = $(item);
      const chapterName = el.text();
      const url = du71.website + el.attr("href");

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
  },
  spiderChapterInfo($) {
    let content = "";
    // content = $("#content").text();
    content = $.load($("#content").html().replaceAll(`<br>`, `\n`)).text();
    // content = content.replaceAll(`https://www.71du.com/book/4341/9712633.html\n\n　　天才一秒记住本站地址：www.71du.com。71读小说网手机版阅读网址：m.71du.com`, "");
    // 移除      （这是的新书，今天就先更新九千字番茄，明天起一天更新两次，分别是中午和晚上。呵呵，希望大家收藏、砸几张推荐票，这对新书比较重要，谢谢~~~）
    // content = content.replace(`https://www.71du.com/book/4341/2300342.html`, "");

    return content;
  },
};

module.exports = xbiquge;
