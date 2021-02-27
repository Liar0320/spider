/*
 * @Author: Lich
 * @LastEditors: Lich
 * @Date: 2021-02-27 19:30:54
 * @LastEditTime: 2021-02-27 19:33:14
 * @Description: *
 */

const { Book,Chapter,updateFileJson } = require('../src/downloadInfo/createBook');

let book = new Book();
book.name = '龙王';
book.imgUrl = '../';
let chapter = new Chapter();
chapter.name = 'asda'
book.insertChapter(chapter);
book.insertChapter(chapter);

updateFileJson(book);
