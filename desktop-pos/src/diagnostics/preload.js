'use strict';

// Preload for the local diagnostics page. Exposes the same native bridge IPC so
// the page can exercise printing without the remote web app.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('diag', {
  listPrinters: () => ipcRenderer.invoke('native:listPrinters'),
  getDefaultPrinter: () => ipcRenderer.invoke('native:getDefaultPrinter'),
  diagnostics: () => ipcRenderer.invoke('native:diagnostics'),
  printHtml: (job) => ipcRenderer.invoke('native:printHtml', job),
  renderCheck: (job) => ipcRenderer.invoke('native:renderCheck', job),
  printRaw: (job) => ipcRenderer.invoke('native:printRaw', job),
  openDrawer: (target) => ipcRenderer.invoke('native:openDrawer', target)
});
