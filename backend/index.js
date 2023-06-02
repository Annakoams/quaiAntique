require('dotenv').config();
const fs = require('fs')
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const bcrypt = require("bcrypt");
const secretKey = "qsfszdgzrgdvssdvderfgertg";
const jwt = require('jsonwebtoken');



const userToken = (user) => {
   var token = jwt.sign({ user }, secretKey, {
      expiresIn: 86400 * 365 // 24 hours
   });
   console.log(token);
   return token;
};

const headerToken = (req) => {
   try {
      if (req.headers && ("Authorization" in req.headers)) {
         var token = req.headers["Authorization"].split(" ").pop();
         var { user } = jwt.verify(token, secretKey);
         return user;
      }
      else {
         return null;
      }
   }
   catch (err) {
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


app.use('/images/', express.static(path.join(__dirname, '/images/')))


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
   

   res.json(result);
});
app.get('/api/categories', async function (req, res) {
   const result = await db.getTable('categories');

   res.json(result);
});

app.get('/api/article/:value', async function (req, res) {
   const result = await db.getRow('articles', 'target', req.params.value);
   res.json(result);
});

// //////////////////////////////////////delate
app.delete('/api/illustrations/:id', async function (req, res) {
   try {
     const result = await db.deleteRow('illustrations', 'illustration_id', req.params.id);
     res.json(result);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Internal server error' });
   }
 });

// //////////////////////////////////////delate




app.post('/api/article/:value', upload.single('picture'), async function (req, res) {

   console.log("put article", req.params.value, req.file, req.body);
   try {
      var article = JSON.parse(req.body.article);
      if (req.file) {
         const ext = req.file.originalname.split('.').pop();
         article.url_picture = "images/" +  req.file.filename +"." + ext;
        fs.renameSync(req.file.path, "./" + article.url_picture);
      }
       await db.updateRow('articles', article, "target", req.params.value);
      var article = await db.getRow('articles', 'target', req.params.value)
      res.json({article});
 }
   catch (err) {
      //
      res.json({ err })
   }
});


app.post('/api/menus/:id', async function (req, res) {
   console.log('mise a jour menus', req.body)
   try {
       var menu = req.body;
       console.log(menu)
       await db.updateRow('menus', menu, "menu_id", req.params.id);
       var menu = await db.getRow('menus', 'menu_id', req.params.id)
       res.json({menu});
   }
   catch (err) {
       res.json({ err })
   }
});

app.post('/api/plats/:id', async function (req, res) {
   console.log('mise a jour plats', req.body)
   try {
       var plat = req.body;
       console.log(plat)
       await db.updateRow('plats', plat, "plat_id", req.params.id);
       var plat = await db.getRow('plats', 'plat_id', req.params.id)
       res.json({plat});
   }
   catch (err) {
       res.json({ err })
   }
});

app.post('/api/schedules/:id', async function (req, res) {
   console.log('mise a jour schedules', req.body)
   try {
       var schedule = req.body;
       
       await db.updateRow('schedules', schedule, "schedule_id", req.params.id);
       var schedule = await db.getRow('schedules', 'schedule_id', req.params.id)
       res.json({schedule});
   }
   catch (err) {
       res.json({ err })
   }
});
app.get('/api/plats/swap/:position1/:position2', async function (req, res){

   const position1 = req.params.position1;
   const position2 = req.params.position2;
   
   console.log(position1,position2)
   
   res.json({})
   
   } )

app.get('/api/illustrations/swap/:position1/:position2', async function (req, res){

const position1 = req.params.position1;
const position2 = req.params.position2;

console.log(position1,position2)

res.json({})

} )

app.post('/api/illustrations/:id', upload.single('picture'), async function (req, res) {
   console.log("put illustration", req.params.id, req.file, req.body);
   try {
      var illustration = JSON.parse(req.body.illustration);
      if (req.file) {
         const ext = req.file.originalname.split('.').pop();
         illustration.url_picture = "images/" +  req.file.filename +"." + ext;
        fs.renameSync(req.file.path, "./" + illustration.url_picture);
      }

       await db.updateRow('illustrations', illustration, "illustration_id", req.params.id);
      var illustration = await db.getRow('illustrations', 'illustration_id', req.params.id)
      res.json({illustration});
 }
   catch (err) {
      res.json({ err })
   }
});

app.post('/api/illustrations/', upload.single('picture'), async function (req, res) {
   console.log("put illustration", req.params.id, req.file, req.body);
   try {
      var illustration = JSON.parse(req.body.illustration);
      if (req.file) {
         const ext = req.file.originalname.split('.').pop();
         illustration.url_picture = "images/" +  req.file.filename +"." + ext;
        fs.renameSync(req.file.path, "./" + illustration.url_picture);
      }
      await db.insertRow('illustrations', illustration);
      const result = await db.getTable('illustrations');
      res.json(result);
 }
   catch (err) {
      res.json({ err })
   }
});

app.post('/api/resa', async function (req, res) {
   const body = req.body
  
   const result = await db.insertRow('reservations', body);
   res.json('OK');

});  


app.post('/api/signup', async function (req, res) {
   const body = req.body
   const hash = await hashPassword(body.password);
   body.password = hash
   const result = await db.insertRow('users', body);
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
      success: true,
      token: userToken(user),
      user: user,
      message: 'Authentification réussie',
   });

});



app.use('/images/', express.static(path.join(__dirname, '/images/')));
//app.use(['/','/menu','/connection'], express.static('../frontend/build/'));
app.get(['/','/menu','/carte','/reservation', '/connection','/admin/HomeAdmin','/admin/CarteAdmin','/admin/MenuAdmin'], function (request, reponse) {
   console.log(request.originalUrl);
   reponse.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
   app.use(express.static(path.join(__dirname, '/../frontend/build/')));
 
 });


var server = app.listen(process.env.SERVER_PORT , function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});

// Ce code est un exemple de serveur Express en JavaScript. Il utilise des bibliothèques telles que dotenv, fs, multer, bcrypt, jsonwebtoken, cors et body-parser.

// Le serveur expose des points d'accès API pour récupérer des données à partir d'une base de données et effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces données. Les points d'accès incluent /api/articles, /api/illustrations, /api/schedules, /api/menus, /api/plats, /api/categories, et /api/article/:value.

// Le serveur offre également des fonctionnalités d'authentification et d'inscription pour les utilisateurs. Les points d'accès /api/signup et /api/signin permettent à un utilisateur de créer un compte et de se connecter, respectivement.

// Le serveur utilise également multer pour gérer le téléchargement de fichiers (images). Lorsqu'un utilisateur télécharge une image, le serveur la stocke localement et met à jour la base de données avec l'emplacement de l'image.

// Enfin, le serveur sert des fichiers statiques tels que des images et des pages HTML via des points d'accès tels que /images/ et /,/menu,/carte,/reservation,/connection,/admin/HomeAdmin,/admin/CarteAdmin,/admin/MenuAdmin.







