const {createPool} = require('mysql2')
const {Sequelize, Op, Model, DataTypes} = require('sequelize')

const {host, port, user, password, database} = require('./config')

const pool = createPool({host, port, user, password, database})

// const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'})
// const orders = sequelize.define(
//     'orders',
//     {   
//         state: {type: DataTypes.STRING(60)},
//         order_id: {
//             type: DataTypes.INTEGER, 
//             allowNull: false,
//             autoIncrement: true, 
//             primaryKey: true
//         },
//         username: {type: DataTypes.STRING(60), allowNull: false},
//         dishes: {type: DataTypes.JSON}
//     },
//     {
//         tableName: 'orders',
//         // freezeTableName: true
//     }
// )


// pool.query(`select * from account`, (er, rs, fields ) => {
//     if(er){
//         return console.error('pool.query err:', er);
//     }
//     return console.log(rs, fields);
// })

const defaultUser = {
    usn: "def",
    pw: "1",
};

const defSql = `INSERT INTO account (username, password) VALUES ("${defaultUser.usn}", "${defaultUser.pw}")`;

function insertData(sql, values = null) {
    const results =  pool.query(
      sql,
      [...values],
      // `INSERT INTO account (username, password)`, 
      (er, rs, fields) => {
        if(er){return console.error('pool.query err:', er);}
        else { 
            // process.exit()
        }
    });
}

function getData(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rs, fields) => {
            if (err) {
                reject(err); // Reject the promise with the error
            } else {
                resolve(rs); // Resolve the promise with the data
            }
        });
    });
}

function updateData(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rs, fields) => {
            if (err) {
                reject(err); // Reject the promise with the error
            } else {
                resolve(rs); // Resolve the promise with the data
            }
        });
    });
}

function deleteData(sql, values = null) {
    const results =  pool.query(
      sql,
      [...values],
      // `INSERT INTO account (username, password)`, 
      (er, rs, fields) => {
        if(er){return console.error('pool.query err:', er);}
        else { 
            // process.exit()
        }
    });
}

  
// insertData(`INSERT INTO account (username, password) VALUES ("test1", "1")`);
// insertData(defSql);

module.exports = {insertData, getData, updateData, deleteData}