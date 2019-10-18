/*
 * @Author: lich 
 * @Date: 2019-10-17 10:52:42 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-18 15:47:55
 * @TODO:
 * question1:"请输入你要下载的小说",
 * question2:"如果novels.length>1,请选择你要下载的小说"
 * quesiont3:"请输入下载的目录""
 */
const { prompt } = require("inquirer")

const { spiderLikeBook, spiderBookChapters } = require("./utils/spider");

const generateFiles = require('./utils/generateFiles');

const ConnectionPool = require('../src/utils/ConnectionPool')
const connectionPool = new ConnectionPool();

/**@type {Array<import("inquirer").Question>} */
const question = [
    {
        type: "input",
        name: "filterName",
        message: "请输入你需要下载的小说<模糊查找>",
        default: "龙王传说",
    },
    {
        type: "list",
        name: "selectedNovel",
        choices: function (answer) {
                const filterName = answer.filterName;           

            
return new Promise((resolve, reject)=>{
    spiderLikeBook(filterName).then(catalogs=>{
                    resolve(catalogs);
                }).catch(err=>{
                    reject(err);
                })
            })
        },
//         filter(selectedNovel) {
// return {
//                 name: selectedNovel.name,
//                 url: selectedNovel.url
//             }
//         }
    },
    {
        type: "input",
        name: "fileAddress",
        default: "./download"
    }
]

module.exports = prompt(question).then(({filterName, selectedNovel, fileAddress})=>{
    spiderBookChapters(selectedNovel.url).then(bookChapters=>{
        // bookChapters.length = 10;
        connectionPool.register(bookChapters, function (allChapterInfo) {
            // console.log(allChapterInfo);
            allChapterInfo.forEach((chapterInfo, index)=>{
                generateFiles({chapterName: chapterInfo.chapterName, bookName: selectedNovel.name, path: fileAddress, index, content: chapterInfo.content})
            })
        })
        connectionPool.start();
    })
})