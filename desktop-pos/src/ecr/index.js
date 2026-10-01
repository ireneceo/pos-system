'use strict';
// 카드단말기 ECR 브릿지 IPC — preload 의 window.__NATIVE_ECR.exchange 가 부른다.
const { ipcMain } = require('electron');
const { exchange } = require('./exchange');

function register() {
  ipcMain.handle('native:ecrExchange', (_e, job) => exchange(job));
}

module.exports = { register };
