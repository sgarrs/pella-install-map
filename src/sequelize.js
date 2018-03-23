const Sequelize = require('sequelize');
const fs = require('fs');

const username = 'access';
const password = '082p3lla$$';
const hostName = '192.168.0.8';
const dbName = 'PSIImport';

const sequelize = new Sequelize(dbName, username, password, {
  dialect: 'mssql',
  host: hostName,
  port: 1433,
  logging: false,
  dialectOptions: {
    requestTimeout: 30000
  }
});

const data = sequelize.query("SELECT * FROM dbo.ActiveInstall", { type: sequelize.QueryTypes.SELECT })
  .then(function (installs) {
    fs.writeFile('./src/data.json', JSON.stringify(installs), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
