const { ipcMain } = require('electron');
const { get, run } = require('../database/db');

module.exports = function registerAuthHandlers(ipcMain) {

  ipcMain.handle('auth:login', async (event, username, password) => {
    try {
      const user = await get(
        'SELECT id, username, email FROM admins WHERE username = ? AND password = ?',
        [username, password]
      );

      if (user) {
        return {
          success: true,
          message: 'Login successful',
          user: user
        };
      } else {
        return {
          success: false,
          message: 'Invalid username or password'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Database error: ' + error.message
      };
    }
  });

  ipcMain.handle('auth:changePassword', async (event, username, oldPassword, newPassword) => {
    try {
   
      const user = await get(
        'SELECT id FROM admins WHERE username = ? AND password = ?',
        [username, oldPassword]
      );

      if (!user) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      
      await run(
        'UPDATE admins SET password = ? WHERE username = ?',
        [newPassword, username]
      );

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error: ' + error.message
      };
    }
  });
};