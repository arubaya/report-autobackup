const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const BackupResult = sequelize.define('BackupResult', {
  IdBackup: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  FileCreateDate: {
    type: DataTypes.STRING,
  },
  FileName: {
    type: DataTypes.STRING,
  },
  SizeFileByte: {
    type: DataTypes.INTEGER,
  },
  SizeFileMb: {
    type: DataTypes.DECIMAL,
  },
  Status: {
    type: DataTypes.STRING,
  },
  ReportDate: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'tblbackupresult',
  timestamps: false,
});

module.exports = {
  BackupResult
}