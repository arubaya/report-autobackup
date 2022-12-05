const fs = require('fs-extra');
const moment = require('moment/moment');
const CONFIG = require('./config.json');
const { getBackupFileSizeByClientID, postBackupReport, putBackupFileSize } = require('./database');

const ROOT_FOLDER = '../';
const IGNORE_FOLDER = CONFIG.IGNORE_FOLDER;


/**
 * Check each file in folder and validate backup status
 * @param {string} folderPath folder name, not included "/"
 */
const checkFileInFolder = async (folderPath) => {
  const folderName = `${folderPath}`;
  const ClientID = folderName.toUpperCase();

  const resultDatabase = await getBackupFileSizeByClientID(ClientID)
  fs.readdir(`${ROOT_FOLDER}${folderPath}`, (err, files) => {
    files.map(file => {
      const stats = fs.statSync(`${ROOT_FOLDER}${folderPath}/${file}`)
      if (stats.isFile()) {
        const fileSizeByte = stats.size;
        const fileSizeOnMegabyte = stats.size / (1024 * 1024);
        const fileSizeOnKilobyte = stats.size / 1024;
        const fileSizeKb = fileSizeOnKilobyte.toFixed(2);
        const fileSizeMb = fileSizeOnMegabyte.toFixed(2);
        // console.log(file, stats.size, fileSizeOnMegabyte, fileSize)
        const createDt = moment(stats.mtime).format('x');
        return {
          fileName: file,
          fileSizeByte,
          fileSizeKb,
          fileSizeMb,
          createDate: parseInt(createDt)
        }
      }
    }).sort((a, b) => b.createDate - a.createDate).forEach(async (file, index) => {
      if (index === 0) {
        const isSuccessBackup = parseFloat(file.fileSizeByte) >= parseFloat(resultDatabase.FileSizeByte);
        if (isSuccessBackup) {
          await postBackupReport({
            date: moment(file.createDate, 'x').format('YYYYMMDD'),
            time: moment(file.createDate, 'x').format('HH:mm:ss'),
            clientId: ClientID,
            fileName: file.fileName,
            fileSizeByte: file.fileSizeByte,
            fileSizeKb: file.fileSizeKb,
            fileSizeMb: file.fileSizeMb,
            status: 'S',
          });
          // await postBackupReport({
          //   fileName: file.fileName,
          //   fileSizeByte: parseFloat(file.fileSizeByte),
          //   fileSizeMb: parseFloat(file.fileSizeMb),
          //   date: moment(file.createDate, 'x').format('YYYYMMDDHHmm'),
          //   status: 'S'
          // });
          await putBackupFileSize(ClientID, {
            date: moment(file.createDate, 'x').format('YYYYMMDD'),
            fileSizeByte: parseFloat(file.fileSizeByte),
            fileSizeMb: parseFloat(file.fileSizeMb),
          })
        } else {
          await postBackupReport({
            date: moment(file.createDate, 'x').format('YYYYMMDD'),
            time: moment(file.createDate, 'x').format('HH:mm:ss'),
            clientId: ClientID,
            fileName: file.fileName,
            fileSizeByte: file.fileSizeByte,
            fileSizeKb: file.fileSizeKb,
            fileSizeMb: file.fileSizeMb,
            status: 'F',
          });
          // await postBackupReport({
          //   fileName: file.fileName,
          //   fileSizeByte: parseFloat(file.fileSizeByte),
          //   fileSizeMb: parseFloat(file.fileSizeMb),
          //   date: moment(file.createDate, 'x').format('YYYYMMDDHHmm'),
          //   status: 'F'
          // })
        }
      }
    })
  });
}


/**
 * Main funtion for looping folder in root folder
 * @param
 */
const checkFolderInRootFolder = () => {
  // Read all client backup folder
  fs.readdir(`${ROOT_FOLDER}`, (err, items) => {
    items.forEach(item => {
      const stats = fs.statSync(`${ROOT_FOLDER}${item}`)
      // if directory not in ignored folders than proccess it
      if (!IGNORE_FOLDER.includes(item) && stats.isDirectory()) {
        const folderName = item;
        checkFileInFolder(folderName);
      }
    });
  });
}


/**
 * Start Main Function
 */
checkFolderInRootFolder()