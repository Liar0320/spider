const { init } = require("./init");

// 调用events模块，获取events.EventEmitter对象
var EventEmitter = require("events").EventEmitter;

const hooksCenter = new EventEmitter();

module.exports.hooksCenter = hooksCenter;

/**
 *
 * @param {'spiderBook' | 'spiderChapter'} type
 */
module.exports.callHook = (type, ...args) => {
  hooksCenter.emit(type, ...args);
};


init(hooksCenter)