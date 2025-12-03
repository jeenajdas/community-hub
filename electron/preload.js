const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  
  login: (username, password) => 
    ipcRenderer.invoke('auth:login', username, password),
  changePassword: (username, oldPassword, newPassword) =>
    ipcRenderer.invoke('auth:changePassword', username, oldPassword, newPassword),
  
  
  getMembers: () => ipcRenderer.invoke('members:getAll'),
  addMember: (memberData) => ipcRenderer.invoke('members:add', memberData),
  
  
  createBackup: () => ipcRenderer.invoke('backup:create'),
  restoreBackup: (filePath) => ipcRenderer.invoke('backup:restore', filePath)
});