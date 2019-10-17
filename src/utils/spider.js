function spiderCatalog() {
    
}

module.exports.spiderCatalog = function () {
    return new Promise((resolve, reject)=>{
        resolve([
            {
                name: "琴帝",
                value: {
                    name: "琴帝",
                    url: "1/14"
                }
            },
            {
                name: "琴酒",
                value: {
                    name: "琴酒",
                    url: "1/1412"
                }
            },
            {
                name: "琴仙",
                value: {
                    name: "琴仙",
                    url: "1/142"
                }
            },
        ])
    })
}