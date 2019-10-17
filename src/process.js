/*
 * @Author: lich 
 * @Date: 2019-10-17 10:52:42 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-17 23:10:14
 * @TODO:
 * question1:"请输入你要下载的小说",
 * question2:"如果novels.length>1,请选择你要下载的小说"
 * quesiont3:"请输入下载的目录""
 */
const { prompt } = require("inquirer")

const { spiderLikeBook, spiderBookChapters, spiderChapterInfo } = require("./utils/spider");

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
        default: "./"
    }
]

module.exports = prompt(question).then(({filterName, selectedNovel, fileAddress})=>{
    spiderBookChapters(selectedNovel.url).then(bookChapters=>{
        bookChapters.forEach(chapterInfo=>{
            spiderChapterInfo(chapterInfo.url).then(content=>{
                console.log(content);
            })
        })
    })
    // console.log(filterName, selectedNovel, fileAddress);
})