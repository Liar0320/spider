/*
 * @Author: lich 
 * @Date: 2019-10-17 10:52:42 
 * @Last Modified by: lich
 * @Last Modified time: 2019-10-23 23:47:00
 * @TODO:
 * question1:"请输入你要下载的小说",
 * question2:"如果novels.length>1,请选择你要下载的小说"
 * quesiont3:"请输入下载的目录""
 */
const { prompt } = require("inquirer")

const { spiderLikeBook, spiderBookChapters } = require("./utils/spider");

const generateFiles = require('./utils/generateFiles');

const ConnectionPool = require('../src/utils/ConnectionPool')


const { downloadDirector } = require("../project.config"); 
const { ensureDirSync, pathExistsSync } = require('fs-extra');
const { join } = require('path');

/**@type {Array<import("inquirer").Question>} */
const question = [
    {
        type: "input",
        name: "filterName",
        message: "请输入你需要下载的小说<模糊查找>",
        default: "唐家三少",
    },
    {
        type: "checkbox",
        name: "selectedNovelList",
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
        default: function () {
            return join(downloadDirector) 
        }
    }
]

module.exports = prompt(question).then(({filterName, selectedNovelList, fileAddress})=>{
    if (!pathExistsSync(fileAddress)) {
        ensureDirSync(fileAddress);
    }
    
     let doneAsync = selectedNovelList.map((selectedNovel)=>{
        return new Promise((resolve, reject)=>{
            let resultAddress = join(fileAddress, selectedNovel.name);

            if (!pathExistsSync(resultAddress)) {
                ensureDirSync(resultAddress);
            }
            const connectionPool = new ConnectionPool(selectedNovel.name);

            spiderBookChapters(selectedNovel.url).then(bookChapters=>{
                // bookChapters.length = 10;
                function callback(allChapterInfo) {
                    // console.log(allChapterInfo);
                    allChapterInfo.forEach((chapterInfo)=>{
                        generateFiles({chapterInfo, bookName: selectedNovel.name, path: resultAddress})
                    })
                }
                
                connectionPool.register(bookChapters, callback)
               
                // connectionPool.start();
        
                resolve(connectionPool);
            }).catch(error=>{
                resolve(null)
            })
        })
    })

    Promise.all(doneAsync)
    .then(connectionPoolList=>{
        function end() {
            let connectionPool = connectionPoolList.shift();

                if (connectionPool instanceof ConnectionPool) {
                    connectionPool.start();
                    connectionPool.end = end
                } else {
                    process.exit(0)
                }
        }
        end()
    }).catch(error=>{
        console.log(error)
    })

   
})