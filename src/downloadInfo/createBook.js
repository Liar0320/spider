/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 19:16:13
 * @LastEditTime: 2021-02-27 19:47:56
 * @Description: *
 */
const { v4: uuidv4 } = require('uuid');
const  { ensureFile, readFile, writeFile } = require ("fs-extra");

module.exports.Book = class Book {
    id=uuidv4();
    name;
    imgUrl;
    author;
    src;
    lastUpdateChapter;
    lastUpdateTime;
    brief;
    remark;
    chapterList = [];

    /**
     * @param {Chapter} chapter 
     */
    insertChapter(chapter) {
        chapter.bookId = this.id;
        this.chapterList.push(chapter);
    }

}

module.exports.Chapter =  class Chapter {
    id=uuidv4();
    bookId;
    name;
    src;
    sortId;
    remark;
}

let jsonBookPath = './download/book.json';
let jsonChapterPath = './download/chapterList.json';

/**
 * @param { Book } book 
 */
module.exports.updateFileJson = (book)=>{
   let chapterList = book.chapterList;
   delete book.chapterList;
   let bookInfo  = book;
   ensureFile(jsonBookPath).then(v=>{
       readFile(jsonBookPath,"utf-8").then(v=>{
           if(!v) v = JSON.stringify([]);
           let bookJson = JSON.parse(v);
           bookJson.push(bookInfo);
           writeFile(jsonBookPath,JSON.stringify(bookJson)).then(()=>{
               console.log("更新BookInfo成功");
           })
       })
   })

   ensureFile(jsonChapterPath).then(v=>{
    readFile(jsonChapterPath,"utf-8").then(v=>{
        if(!v) v = JSON.stringify([]);
        let chapterJson = JSON.parse(v);
        chapterJson.push(...chapterList);
        writeFile(jsonChapterPath,JSON.stringify(chapterJson)).then(()=>{
            console.log("更新chapterJson成功");
        })
    })
})
}