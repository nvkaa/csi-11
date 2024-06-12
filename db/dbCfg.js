const {createPool} = require('mysql2')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'nvka',
    database: 'user_data',
    port: 3001,
    connectionLimit: 5
})

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

function insertData(sql) {
    const results =  pool.query(sql, (er, rs, fields) => {
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
  

  
// insertData(`INSERT INTO account (username, password) VALUES ("test1", "1")`);
// insertData(defSql);

module.exports = {insertData, getData}