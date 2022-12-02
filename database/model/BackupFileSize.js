const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const BackupFileSize = sequelize.define('BackupFileSize', {
  ID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  HostID: {
    type: DataTypes.STRING,
  },
  FileSizeMb: {
    type: DataTypes.DECIMAL,
  },
  CreateDate: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'tblbackupfilesize',
  timestamps: false,
});

module.exports = {
  BackupFileSize
}