const { ensureDirSync } = require('fs-extra');
const {downloadDirector} = require('../project.config');
const {join} = require('path');

ensureDirSync(join(downloadDirector, '斗罗大陆III龙王传说[作者：唐家三少]  [最新章节：第一千九百八十一章 永冻冰封！（大结局附后记）]'));