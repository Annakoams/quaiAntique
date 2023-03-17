var express = require('express');
var app = express();
var db = require('./db');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const bcrypt = require("bcrypt");
const secretKey = "qsfszdgzrgdvssdvderfgertg";
var jwt = require('jsonwebtoken');



const userToken = (user)=>{
   var token = jwt.sign({ user }, secretKey, {
      expiresIn: 86400 * 365 // 24 hours
  });

console.log(token);

  return token;
};

const headerToken= ( req )=>{

   try {
   if( req.headers &&  (  "Authorization" in req.headers  ))
   {
     var token = req.headers["Authorization"].split(" ").pop();  
     var  { user } = jwt.verify(token, secretKey);
     return user;
   }
   else
   {
      return null;
   }
   }
   catch(err){
      console.log(err);
      return null;
   }
}





async function hashPassword(plaintextPassword) {
       const hash = await bcrypt.hash(plaintextPassword, 10);
       // Store hash in the database
   return hash;
   }
    
   // compare password
   async function comparePassword(plaintextPassword, hash) {
       const result = await bcrypt.compare(plaintextPassword, hash);
       return result;
   }


app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
   origin: '*'
}));

app.use('/images/',express.static(path.join(__dirname,'/images/')))


app.get('/api', function (req, res) {
   res.send('Hello World,');
});

app.get('/api/articles', async function (req, res) {
   const result = await db.getTable('articles');
   res.json(result);
});

app.get('/api/illustrations', async function (req, res) {
   const result = await db.getTable('illustrations');
   res.json(result);
});
app.get('/api/schedules', async function (req, res) {
   const result = await db.getTable('schedules');
  
   res.json(result);
});

app.get('/api/menus', async function (req, res) {
   const result = await db.getTable('menus');
   res.json(result);
});

app.get('/api/plats', async function (req, res) {
   const result = await db.getTable('plats');
   console.log('plats')

   res.json(result);
});
app.get('/api/categories', async function (req, res) {
   const result = await db.getTable('categories');
   
   res.json(result);
});

app.get('/api/article/:value', async function (req, res) {
   const result = await db.getRow('articles', 'target', req.params.value );
   res.json(result);
});



const uploadImage = async(req, table,field_picture,field_id,id )=>{


   let form = new formidable.IncomingForm();

   //Process the file upload in Node
   form.parse(req, function (error, fields, file) {
     console.log(file);
     console.log(error);
     if(!file || !file.picture ) return;
 
     let filepath = file.picture.filepath;
     let newpath = 'images/';
      let filename= "f" +  Date.now() +"-" + file.picture.originalFilename;
     newpath +=filename ;
     console.log(filepath,newpath)
 
     //Copy the uploaded file to a custom folder
     fs.rename(filepath, newpath,  async function () {
    var obj = {};
     obj [field_picture] =filename;
     var resultUpload = await db.updateRow(table, obj , field_id, id);
     });
   });
 

} 

app.put('/api/article/:value', async function (req, res) {


console.log("put article", req.params.value, req.body );

// UPLOAD 

await uploadImage(  req,'articles','url_picture','target',req.params.value);
//
   const result = await db.updateRow('articles', {  title : req.body.title } , "target", req.params.value);
   res.json(result);

});




app.post('/api/signup', async function (req, res) {
   const body = req.body
   const hash =  await  hashPassword(body.password);
   body.password = hash
   const result= await db.insertRow('users',body);
   res.json('OK');
   
});


app.post('/api/signin', async function (req, res) {

   const body = req.body;


   // Récupère l'utilisateur depuis la base de données
   const user = await db.getRow('users', 'email', body.email);
   if (!user) {
      return res.status(401).json({
         message: 'Authentification échouée',
      });
   }

   // Vérifie si le mot de passe correspond
   const isPasswordValid = await comparePassword(body.password, user.password);
   if (!isPasswordValid) {
      return res.status(401).json({
         message: 'Authentification échouée',
      });
   }

   res.status(200).json({
      success : true,
      token : userToken(user),
      user : user,
      message: 'Authentification réussie',
   });

});


app.use('/', express.static('../frontend/build/'));

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});