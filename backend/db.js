var mysql = require('mysql');

// Configuration de la base de données
const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER ,
  password:  process.env.MYSQL_PASSWORD,
  database:  process.env.MYSQL_DATABASE
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

// Function pour recupere plouseurs ligne de table
const getRows = async (table, fields, value) => {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection(config);
    con.connect(async function (err) {
      if (err) throw err;
      // Requête pour récupérer les lignes souhaitées
      const sql = "SELECT * FROM " + table + " WHERE " + fields + "= '" + value + "'";
      console.log(sql);
      con.query(sql, async function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        con.destroy();
        // Renvoie le résultat de la requête sous forme de tableau d'objets
        resolve(result);
      });
    });
  });
};
 
// Fonction pour récupérer toutes les lignes d'une table
const getTable = async(table) => {
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête pour récupérer toutes les lignes de la table souhaitée
      const sql = "SELECT * FROM " + table 
      con.query(sql, function (err, result, fields) {
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
// permet de mettre à jour une ligne dans une table spécifiée de la base de données en utilisant les informations suivantes
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

const deleteRow = async(table,field_id,id)=>{
  let select = new Promise((resolve, reject) => {
    var con = mysql.createConnection(config);
    con.connect(function(err) {
      if (err) throw err;
      // Requête SQL pour mettre à jour une ligne dans la table spécifiée
      const sql = "DELETE FROM "+table+ "  WHERE  " + field_id + " = " + "'" + id + "'";
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



exports.deleteRow = deleteRow
exports.getTable = getTable
exports.getRow = getRow
exports.getRows = getRows
exports.insertRow = insertRow
exports.updateRow = updateRow

// INSERT INTO `articles` (`article_id`, `url_picture`, `title`, `content`, `target`) VALUES (NULL, 'x', ' Une  cuisine Gastronomique savoyarde\r\nmoderne et généreuse.', NULL, 'acceuil');

// UPDATE `articles` SET `url_picture` = 'images/image_acceuil.jpg' WHERE `articles`.`article_id` = 1;

// Le code est écrit en JavaScript et utilise la bibliothèque MySQL pour se connecter et interagir avec une base de données MySQL. Il exporte quatre fonctions: getRow, getTable, insertRow et updateRow.

// getRow : prend en entrée un nom de table, un nom de champ et une valeur de champ et renvoie la première ligne correspondante sous forme d'objet.
// getTable : prend en entrée un nom de table et renvoie toutes les lignes correspondantes sous forme d'un tableau d'objets.
// insertRow : prend en entrée un nom de table et un objet et insère une nouvelle ligne dans la table correspondante.
// updateRow : prend en entrée un nom de table, un objet, un nom de champ id et une valeur d'id et met à jour la ligne correspondante.
// La configuration de la base de données est stockée dans un objet nommé "config" qui contient les informations nécessaires pour établir une connexion avec la base de données. Les fonctions utilisent une promesse pour encapsuler les requêtes SQL et attendent la résolution de la promesse avant de renvoyer le résultat.

// La méthode map() est utilisée pour formater les valeurs des champs de la requête SQL. La méthode replaceAll() est utilisée pour remplacer tous les caractères apostrophes simples par des apostrophes doubles dans les valeurs de champ pour éviter les erreurs de syntaxe SQL.



// const setvalues = Object.entries(obj).map(keyvalue => keyvalue[0]+ "='" + (keyvalue[1] +"").replaceAll("'","''") + "'"); : transforme les valeurs de l'objet obj en chaînes de caractères formatées pour la requête SQL en utilisant la méthode map() qui applique la fonction keyvalue => ... sur chaque élément du tableau renvoyé par Object.entries(obj). La fonction retourne une chaîne de caractères sous la forme "nom_du_champ='valeur_du_champ'" qui sera utilisée dans la requête SQL.
// let select = new Promise((resolve, reject) => {...}) : crée une promesse qui encapsule la requête SQL pour mettre à jour une ligne dans la table spécifiée.
// var con = mysql.createConnection(config); : crée une connexion avec la base de données MySQL en utilisant la configuration config.
// con.connect(function(err) {...}) : essaie de se connecter à la base de données MySQL. Si une erreur se produit, elle est levée et le programme s'arrête. Sinon, la requête SQL est exécutée.
// const sql = "UPDATE "+table+" SET "+setvalues.join(",")+ " WHERE "+field_id+"='"+id+"'"; : requête SQL pour mettre à jour une ligne dans la table spécifiée. Les valeurs sont récupérées à partir des paramètres de la fonction table, setvalues, field_id et id.