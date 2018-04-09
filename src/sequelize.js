const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const username = 'access';
const password = '082p3lla$$';
const hostName = '082SYS';
const dbName = 'PSIImport';

const sequelize = new Sequelize(dbName, username, password, {
  dialect: 'mssql',
  host: hostName,
  port: 62457,
  logging: false,
  dialectOptions: {
    requestTimeout: 30000
  }
});

const data = sequelize.query("SELECT * FROM dbo.ActiveInstall", { type: sequelize.QueryTypes.SELECT })
  .then(function (installs) {
    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(installs), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  })
  .then(() => sequelize.close());
