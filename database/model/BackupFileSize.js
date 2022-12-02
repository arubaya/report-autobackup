const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const BackupFileSize = sequelize.define('BackupFileSize', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  HostID: {
    type: DataTypes.STRING,
  },
  FileSizeByte: {
    type: DataTypes.INTEGER,
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