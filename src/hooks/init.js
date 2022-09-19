// import { hooksCenter } from "./instance";
const { readFileSync, createFile, createReadStream } = require("fs-extra");
const request = require("request");

module.exports.init = (hooksCenter) => {
  hooksCenter.addListener(
    "spiderBook",
    /**
     * @param { Book } book
     */
    async (book) => {
      request(
        {
          url: "http://localhost:3000/book/withchapters",
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
            chapters: book.chapterList,
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
    }
  );

  hooksCenter.addListener(
    "spiderChapter",
    /**
     * @param { Book } book
     */
    ({ bookName, chapterName, path }) => {
      // var FormData = require("form-data");
      request({
        url: "http://localhost:3000/oss/upload/book",
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        formData: {
          path: `${bookName}/${chapterName}`,
          file: createReadStream(path, { encoding: "utf8" }),
        },
      });
    }
  );
};
