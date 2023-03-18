var mysql = require('mysql');

// Configuration de la base de données
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "db_quai_antique"
}

// Fonction pour récupérer une seule ligne
const getRow = async(table, field, value) => {
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête pour récupérer la ligne souhaitée
      var sql = "SELECT * FROM " + table + " WHERE " + field + "= '" + value + "'" ;
      console.log(sql);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        con.destroy();
        // Renvoie le résultat de la requête sous forme d'objet
        resolve(result[0]);
      });
    });
  });
  var result = await select;
  return result;
}

// Fonction pour récupérer toutes les lignes d'une table
const getTable = async(table) => {
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête pour récupérer toutes les lignes de la table souhaitée
      con.query("SELECT * FROM " + table , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        con.destroy();
        // Renvoie le résultat de la requête sous forme de tableau d'objets
        resolve(result);
      });
    });
  });
  var result = await select;
  return result;
}

// Fonction pour insérer une nouvelle ligne dans une table
const insertRow = async(table,obj) =>{
  // récupère les noms des champs de l'objet obj pour les utiliser plus tard dans la requête SQL
  let fields = Object.keys(obj);
  // Transformation des valeurs de l'objet en chaînes de caractères formatées pour la requête SQL
  const values = Object.values(obj).map(value => "'" + (value +"").replaceAll("'","''") + "'");
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête pour insérer la nouvelle ligne dans la table souhaitée
      const sql = "INSERT INTO `"+table+"` ("+fields.join(",")+ ") VALUES (" + values.join(",") + ") ";
      console.log(sql);
      con.query( sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        con.destroy();
        // Renvoie le résultat de la requête sous forme d'objet
        resolve(result);
      });
    });
  });
  var result = await select;
  return result;
}

const updateRow = async(table,obj,field_id,id) =>{
  let fields = Object.keys(obj);
  // Transformation des valeurs de l'objet en chaînes de caractères formatées pour la requête SQL
  const setvalues = Object.entries(obj).map(keyvalue =>   keyvalue[0]+   "='" + (keyvalue[1] +"").replaceAll("'","''") + "'");
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête SQL pour mettre à jour une ligne dans la table spécifiée
      const sql = "UPDATE `"+table+"` SET  "+setvalues.join(",")+ "  WHERE  " + field_id + " = " + "'" + id + "'";
      console.log(sql);
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
exports.updateRow = updateRow

// INSERT INTO `articles` (`article_id`, `url_picture`, `title`, `content`, `target`) VALUES (NULL, 'x', ' Une  cuisine Gastronomique savoyarde\r\nmoderne et généreuse.', NULL, 'acceuil');

// UPDATE `articles` SET `url_picture` = 'images/image_acceuil.jpg' WHERE `articles`.`article_id` = 1;


// const setvalues = Object.entries(obj).map(keyvalue => keyvalue[0]+ "='" + (keyvalue[1] +"").replaceAll("'","''") + "'"); : transforme les valeurs de l'objet obj en chaînes de caractères formatées pour la requête SQL en utilisant la méthode map() qui applique la fonction keyvalue => ... sur chaque élément du tableau renvoyé par Object.entries(obj). La fonction retourne une chaîne de caractères sous la forme "nom_du_champ='valeur_du_champ'" qui sera utilisée dans la requête SQL.
// let select = new Promise((resolve, reject) => {...}) : crée une promesse qui encapsule la requête SQL pour mettre à jour une ligne dans la table spécifiée.
// var con = mysql.createConnection(config); : crée une connexion avec la base de données MySQL en utilisant la configuration config.
// con.connect(function(err) {...}) : essaie de se connecter à la base de données MySQL. Si une erreur se produit, elle est levée et le programme s'arrête. Sinon, la requête SQL est exécutée.
// const sql = "UPDATE "+table+" SET "+setvalues.join(",")+ " WHERE "+field_id+"='"+id+"'"; : requête SQL pour mettre à jour une ligne dans la table spécifiée. Les valeurs sont récupérées à partir des paramètres de la fonction table, setvalues, field_id et id.