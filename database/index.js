const moment = require("moment/moment");
const { BackupFileSize } = require("./model/BackupFileSize");
const { BackupResult } = require("./model/BackupResult");

/**
 * Get all data from table tblbackupfilesize
 * @returns {Promise<{ID: string, HostID: string, FileSizeMb: string, FileSizeByte: string, CreateDate: string}[]>} array of tblbackupfilesize data object
 */
const getAllBackupFileSize = async () => {
  const rows = await BackupFileSize.findAll();
  const resultJson = JSON.parse(JSON.stringify(rows, null, 2))
  return resultJson
}

/**
 * Get data from table tblbackupfilesize by client/host ID
 * @param {string} id Host/Client ID
 * @returns {Promise<{ID: string, HostID: string, FileSizeMb: string, FileSizeByte: string, CreateDate: string}>} tblbackupfilesize data object
 */
const getBackupFileSizeByClientID = async (id) => {
  const rows = await BackupFileSize.findOne({
    where: {
      HostId: id
    }
  })
  const resultJson = JSON.parse(JSON.stringify(rows, null, 2))
  return resultJson
}


/**
 * Update data in table tblbackupfilesize
 * @param {string} id Client/Host ID
 * @param {{fileSizeMb: number, fileSizeByte: number, date: string}} data New Data
 * @returns 
 */
const putBackupFileSize = async (id, data) => {
  const rows = await BackupFileSize.update({
    FileSizeMb: data.fileSizeMb,
    FileSizeByte: data.fileSizeByte,
    CreateDate: data.date,
  }, {
    where: {
      HostId: id
    }
  })
  const resultJson = JSON.parse(JSON.stringify(rows, null, 2))
  return resultJson
}

/**
 * Insert new row in table tblbackupresult
 * @param {{date: string, time: string, clientId: string, fileName: string, fileSizeByte: number, fileSizeKb: number, fileSizeMb: number, status: "S" | "F"}} data Data to be inserted 
 * @returns 
 */
const postBackupReport = async (data) => {
  const rows = await BackupResult.create({
    Dt: data.date,
    Tm: data.time,
    ReportDt: moment().format('YYYYMMDDHHmm'),
    CtName: data.clientId,
    FileName: data.fileName,
    ZipByte: data.fileSizeByte,
    ZipKB: data.fileSizeKb,
    ZipMB: data.fileSizeMb,
    StatusBackupAuto: data.status,
  })
  // const rows = await BackupResult.create({
  //   FileCreateDate: data.date,
  //   FileName: data.fileName,
  //   SizeFileByte: data.fileSizeByte,
  //   SizeFileMb: data.fileSizeMb,
  //   Status: data.status,
  //   ReportDate: moment().format('YYYYMMDDHHmm')
  // })
  const resultJson = JSON.parse(JSON.stringify(rows, null, 2))
  return resultJson
}

module.exports = {
  getAllBackupFileSize,
  getBackupFileSizeByClientID,
  putBackupFileSize,
  postBackupReport,
}