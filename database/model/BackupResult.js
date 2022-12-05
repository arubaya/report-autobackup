const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const BackupResult = sequelize.define('BackupResult', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Dt: {
    type: DataTypes.STRING,
    key: true,
  },
  Tm: {
    type: DataTypes.STRING,
    key: true
  },
  ReportDt: {
    type: DataTypes.STRING,
  },
  CtName: {
    type: DataTypes.STRING,
    key: true
  },
  FileName: {
    type: DataTypes.STRING,
  },
  DumpingTm: {
    type: DataTypes.STRING,
  },
  ArchiveTm: {
    type: DataTypes.STRING,
  },
  UploadTm: {
    type: DataTypes.STRING,
  },
  SqlKB: {
    type: DataTypes.DECIMAL,
  },
  SqlMB: {
    type: DataTypes.DECIMAL,
  },
  ZipByte: {
    type: DataTypes.INTEGER,
  },
  ZipKB: {
    type: DataTypes.DECIMAL,
  },
  ZipMB: {
    type: DataTypes.DECIMAL,
  },
  Password: {
    type: DataTypes.STRING,
  },
  Location: {
    type: DataTypes.STRING,
  },
  ErrorMessage: {
    type: DataTypes.STRING,
  },
  StatusBackupAuto: {
    type: DataTypes.STRING,
  },
  StatusBackupManual: {
    type: DataTypes.STRING,
  },
  ManualBackupDt: {
    type: DataTypes.STRING,
  },

}, {
  tableName: 'tblbackupresults',
  timestamps: false,
});

module.exports = {
  BackupResult
}