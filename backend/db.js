var mysql = require('mysql');

const config = {
host: "localhost",
user: "root",
password: "",
database: "db_quai_antique"
}




const getRow = async(table, field, value) => {
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);

        con.connect(function(err) {
          if (err) throw err;
          var sql = "SELECT * FROM " + table + " WHERE " + field + "= '" + value + "'" ;
          console.log(sql)
          con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            con.destroy();
            resolve(result[0]);
        
          });
        });
  })
  var result = await select;
  return result;
}
const getTable = async(table) => {
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);

        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM " + table , function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            con.destroy();
            resolve(result);
        
          });
        });
  })
  var result = await select;
  return result;
}


const insertRow = async(table,obj) =>{
  let fields = Object.keys(obj)
  const values = Object.values(obj).map(value => "'" + (value +"").replaceAll("'","''") + "'")
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);

        con.connect(function(err) {
          if (err) throw err;
          const sql = "INSERT INTO `"+table+"` ("+fields.join(",")+ ") VALUES (" + values.join(",") + ") "
          console.log(sql)
          con.query( sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            con.destroy();
            resolve(result);
        
          });
        });
  })
  var result = await select;
  return result;
}

exports.getTable = getTable
exports.getRow = getRow
exports.insertRow = insertRow

// INSERT INTO `articles` (`article_id`, `url_picture`, `title`, `content`, `target`) VALUES (NULL, 'x', ' Une  cuisine Gastronomique savoyarde\r\nmoderne et généreuse.', NULL, 'acceuil');

// UPDATE `articles` SET `url_picture` = 'images/image_acceuil.jpg' WHERE `articles`.`article_id` = 1;