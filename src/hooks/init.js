// import { hooksCenter } from "./instance";
const request = require("request");

module.exports.init = (hooksCenter) => {
  hooksCenter.addListener(
    "spiderBook",
    /**
     * @param { Book } book
     */
    async (book) => {
      console.log(
        "🚀 -> file: init.js -> line 4 -> hooksCenter.addListener -> book",
        book
      );

      request(
        {
          url: "http://localhost:3000/book",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: book.name,
            picUrl: book.imgUrl,
            author: book.author,
            originUrl: book.src,
            lastUpdateChapter: book.lastUpdateChapter,
            lastUpdateTime: book.lastUpdateTime,
            brief: book.brief,
            remark: book.remark,
          }),
        },
        (error, response, body) => {
          console.log(
            "🚀 -> file: init.js -> line 33 -> error, response, body",
            error,
            response,
            body
          );
        }
      );
      console.log("🚀 -> file: init.js -> line 29 -> data", data);
    }
  );

  // hooksCenter.addListener(
  //   "spiderChapter",
  //   /**
  //    * @param { Book } book
  //    */
  //   (book) => {
  //     request({
  //       url: "http://localhost:3000/book",
  //       method: "POST",
  //       body: {
  //         name: book.name,
  //         picUrl: book.imgUrl,
  //         author: book.author,
  //         originUrl: book.src,
  //         lastUpdateChapter: book.lastUpdateChapter,
  //         lastUpdateTime: book.lastUpdateTime,
  //         brief: book.brief,
  //         remark: book.remark,
  //       },
  //     });
  //   }
  // );
};
