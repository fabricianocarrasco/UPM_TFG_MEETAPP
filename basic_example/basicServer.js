/* global require, __dirname, console */

/* eslint-disable import/no-extraneous-dependencies, no-console */

const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
//Añadido para crear el Hash en el login/sign up ( tras muchos intentos no se puede usar bcrypt)
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
//Añadido por mi para el login
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');

//var cookie = require('cookie-session');
var path = require('path');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'licodearaceli',
    database:'mydb'
});

// eslint-disable-next-line import/no-unresolved
const N = require('./nuve');
const fs = require('fs');
const https = require('https');
// eslint-disable-next-line import/no-unresolved
const config = require('./../../licode_config');

const options = {
  key: fs.readFileSync('../../cert/key.pem').toString(),
  cert: fs.readFileSync('../../cert/cert.pem').toString(),
};

if (config.erizoController.sslCaCerts) {
  options.ca = [];
  config.erizoController.sslCaCerts.forEach((cert) => {
    options.ca.push(fs.readFileSync(cert).toString());
  });
}

const app = express();

// app.configure ya no existe
app.use(errorhandler({
  dumpExceptions: true,
  showStack: true,
}));
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
//app.use(express.static(`${__dirname}/public/js`));

//Para la identificación del usuario
/*app.use(cookieSession({
  name: 'cookieSession',
  keys: [],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));*/
//Para el login
app.use(session({
    secret:'licode',
    resave:true,
    saveUninitialazed:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// app.set('views', __dirname + '/../views/');
// disable layout
// app.set("view options", {layout: false});

N.API.init(config.nuve.superserviceID, config.nuve.superserviceKey, 'http://localhost:3000/');

let defaultRoom;
const defaultRoomName = 'basicExampleRoom';
let webinarNames = [];
let roomNames = [];


const getOrCreateRoom = (name, type = 'erizo', mediaConfiguration = 'default',
  callback = () => {}) => {
  if (name === defaultRoomName && defaultRoom) {
    callback(defaultRoom);
    return;
  }

  N.API.getRooms((roomlist) => {
    let theRoom = '';
    const rooms = JSON.parse(roomlist);
    for (let i = 0; i < rooms.length; i += 1) {
      const room = rooms[i];
      if (room.name === name &&
                room.data &&
                room.data.basicExampleRoom) {
        theRoom = room._id;
        callback(theRoom);
        return;
      }
    }
    const extra = { data: { basicExampleRoom: true }, mediaConfiguration };
    if (type === 'p2p') extra.p2p = true;

    N.API.createRoom(name, (roomID) => {
      theRoom = roomID._id;
      callback(theRoom);
    }, () => {}, extra);
  });
};

//Con el array de las salas theRooms va comprobando las salas 1 a 1, saca el id de la sala y saca esa sala del array,
//y cuando comprueba la sala vuelve a llamarse a si mismo con el array sin esa sala como parámetro.
const deleteRoomsIfEmpty = (theRooms, callback) => {

  console.log('entrando en deleteRoomsIfEmpty');
  if (theRooms.length === 0) {
    callback(true);
    return;
  }
  //const theRoomId = theRooms.pop()._id;
  //Saca la sala del array
  const theRoomId = theRooms.pop();
  N.API.getUsers(theRoomId._id, (userlist) => {
    const users = JSON.parse(userlist);
    if (Object.keys(users).length === 0) {
      N.API.deleteRoom(theRoomId._id, () => {
        //hace un bucle por los nombres de los webinars para borrar la que se ha eliminado
        for( let i = 0; i < webinarNames.length; i++){
          if ( webinarNames[i] === theRoomId.name) {
            connection.query("DELETE FROM rooms WHERE name = ?",[theRoomId.name],(error,result,fields)=>{
              if(error) throw error;
              if (result) {
                console.log(webinarNames.splice(i, 1));
                console.log("Webinar: " +theRoomId.name + " deleted");
                console.log(webinarNames);
              } else {
              }
            });
          }
        }
        //hace un bucle por los nombres de las salas para borrar la que se ha eliminado
        for( let n = 0; n < roomNames.length; n++){
          if ( roomNames[n] === theRoomId.name) {
            console.log("RoomName found");
            connection.query("DELETE FROM rooms WHERE name = ?",[theRoomId.name],(error,result,fields)=>{
              if(error) throw error;
              if (result) {
                console.log(roomNames.splice(n, 1));
                console.log("Room: " + theRoomId.name + " deleted");
                console.log(roomNames);
              } else {

              }
            });

          }
        }
        deleteRoomsIfEmpty(theRooms, callback);
      });
    } else {
      deleteRoomsIfEmpty(theRooms, callback);
    }
  }, (error, status) => {
    console.log('Error getting user list for room ', theRoomId._id, 'reason: ', error);
    switch (status) {
      case 404:
        deleteRoomsIfEmpty(theRooms, callback);
        break;
      case 503:
        N.API.deleteRoom(theRoomId, () => {
          deleteRoomsIfEmpty(theRooms, callback);
        });
        break;
      default:
        break;
    }
  });
};


const cleanExampleRooms = (callback) => {
  console.log('Cleaning basic example rooms');
  N.API.getRooms((roomlist) => {
    const rooms = JSON.parse(roomlist);
    const roomsToCheck = [];
    rooms.forEach((aRoom) => {
      if (aRoom.data &&
                aRoom.data.basicExampleRoom &&
                aRoom.name !== defaultRoomName) {
        roomsToCheck.push(aRoom);
      }
    });
    deleteRoomsIfEmpty(roomsToCheck, () => {
      callback('done');
    });
  });
};

app.get('/getRooms/', (req, res) => {
  N.API.getRooms((rooms) => {
    res.send(rooms);
  });
});
//Se encarga de devolver la pagina de login
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname + '/public/login.html'));
});
//Comprueba las credenciales de los usuarios y si son correctas crea una sesion y reenvia a la pagina principal en case de error vuelve a la pagina de login.
app.post('/auth',(req,res)=>{
  let email = req.body.inputEmail;
  let password = req.body.inputPassword;
  const hash = crypto.createHash('sha256');
  hash.update(password);
  if (email && password){
    connection.query("SELECT username FROM users WHERE email = ? and password = ?",[email,hash.digest('hex')],(error,result,fields)=>{
      if(error) throw error;
      if (result && result.length > 0) {
        req.session.loggedin = true;
        req.session.username = result[0].username;
        res.redirect('/home?user='+ result[0].username);
      } else {
        res.redirect('/?error=auth');
      }
      res.end();
    });
  } else {
    res.redirect('/?error=auth');
    res.end();
  }
});
//Se encarga de devolver la pagina principal
app.get('/home',(req,res)=>{
  res.sendFile(path.join(__dirname + '/public/home.html'));
});
//Se encarga de las llamadas a createRoom, mira a ver si el nombre de la sala esta cogido, si es asi devuelve a la creacion de salas
//en caso de que no exista comprueba si se ha introducido valor de contraseña y si es asi lo añade a la BBDD, si el usuario esta loggeado.
app.post('/createRoom',(req,res)=>{
  let roomName = req.body.roomName;
  let roomPassword = req.body.roomPassword;
  let username = req.session.username;
  if(roomNames.includes(roomName) || webinarNames.includes(roomName)){

    if(!req.session.loggedin || username === undefined){
      console.log("Error 1");
      res.redirect("/?error=timeout");
      res.end();
    }else{
      console.log("Error 10");
      res.redirect("/home?user=" + username);
      res.end();
    }

  }else if(req.session.loggedin && username !== undefined){
    if(roomPassword === "" || roomPassword === undefined){
      console.log("previo sentencia SQL");
      connection.query("INSERT INTO rooms (name,type) values (?,?)",[roomName,'room'],(error,result,fields)=>{
        if(error) {
          console.log("Error 2");
          res.redirect("/home?user=" + username);
          res.end();
        }else if (result) {
          console.log("SQL funciona bien");
          roomNames.push(roomName);
          console.log("Error 3");
          res.redirect('/room?status=create&room='+ roomName +'&user=' + username);
          res.end();
        } else {
          console.log("Error 4");
          res.redirect("/home?user=" + username);
          res.end();
        }
      });
    }else if(roomPassword !== "" && roomPassword){
      const hash = crypto.createHash('sha256');
      hash.update(roomPassword);
      connection.query("INSERT INTO rooms (name,type,password) values (?,?,?)",[roomName,'room',hash.digest('hex')],(error,result,fields)=>{
        if(error) {
          console.log("Error 5");
          res.redirect("/home?user=" + username);
          res.end();
        }else if (result) {
          roomNames.push(roomName);
          console.log("Error 6");
          res.redirect('/room?status=create&room='+ roomName +'&user=' + username);
          res.end();
        } else {
          console.log("Error 7");
          res.redirect("/home?user=" + username);
          res.end();
        }
      });
    }else{
      console.log("Error 8");
      res.redirect("/home?user=" + username);
      res.end();
    }

  }else{
    console.log("Error 9");
    res.redirect("/?error=timeout");
    res.end();
  }

});
//Se encarga de manejar la llamada a joinRoom. Comprueba si existe la sala y sus credenciales.
app.post('/joinRoom',(req,res)=>{
  let roomName = req.body.roomName;
  let roomPassword = req.body.roomPassword;
  let username = req.session.username;
  if(!roomNames.includes(roomName)){
    console.log("Error 1");
    if(!req.session.loggedin || username === undefined){
      res.redirect("/?error=timeout");
      res.end();
    }else{
      res.redirect("/home?user=" + username);
      res.end();
    }
  }else if(req.session.loggedin && username !== undefined){
    console.log("Error 2");
    connection.query("SELECT * FROM rooms WHERE name = ? ",[roomName],(error,result,fields)=>{
      console.log("Error 3");
      if(error) {
        res.redirect("/home?user=" + username);
        res.end();
      }else if (result && result.length > 0) {
        console.log("Error 4");
        const hash = crypto.createHash('sha256');
        hash.update(roomPassword);
        let password = hash.digest('hex');
        if(result[0].password !== null && result[0].password === password){
          console.log("Error 5");
          res.redirect('/room?status=join&room='+ roomName +'&user=' + username);
          res.end();
        }else if(result[0].password === null){
          console.log("Error 6");
          res.redirect('/room?status=join&room='+ roomName +'&user=' + username);
          res.end();
        }else{
          console.log("Error 7");
          res.redirect("/home?user=" + username + "&error=password");
          res.end();
        }

      } else {
        console.log("Error 8");
        res.redirect("/home?user=" + username);
        res.end();
      }
    });
  }else{
    console.log("Error 10");
    res.redirect("/?error=timeout");
    res.end()
  }
});
//Se encarga de enviar el archivo de la sala
app.get('/room', (req,res)=>{
    res.sendFile(path.join(__dirname + '/public/room.html'));
});

//Se encarga de las llamadas a createWebinar, mira a ver si el nombre de la sala esta cogido, si es asi devuelve a la creacion de salas
//en caso de que no exista comprueba si se ha introducido valor de contraseña y si es asi lo añade a la BBDD, si el usuario esta loggeado.
app.post('/createWebinar',(req,res)=>{
  let roomName = req.body.roomName;
  let roomPassword = req.body.roomPassword;
  let username = req.session.username;
  if(webinarNames.includes(roomName) || roomNames.includes(roomName)){
    if(!req.session.loggedin || username === undefined){
      console.log("Error 1");
      res.redirect("/?error=timeout");
      res.end();
    }else{
      console.log("Error 2");
      res.redirect("/home?user=" + username);
      res.end();
    }
  }else if(req.session.loggedin && username !== undefined){
    if(roomPassword === "" || roomName === undefined){
      connection.query("INSERT INTO rooms (name,type) values (?,?)",[roomName,'webinar'],(error,result,fields)=>{
        if(error) {
          console.log("Error 3");
          res.redirect("/home?user=" + username);
          res.end();
        }else if (result) {
          console.log("Error 4");
          webinarNames.push(roomName);
          res.redirect('/webinar?status=create&room='+ roomName +'&user=' + username);
          res.end();
        } else {
          console.log("Error 5");
          res.redirect("/home?user=" + username);
          res.end();
        }
      });

    }else if(roomPassword !== "" && roomPassword){
      const hash = crypto.createHash('sha256');
      hash.update(roomPassword);
      connection.query("INSERT INTO rooms (name,type,password) values (?,?,?)",[roomName,'webinar',hash.digest('hex')],(error,result,fields)=>{
        if(error) {
          console.log("Error 6");
          res.redirect("/home?user=" + username);
          res.end();
        }else if (result) {
          console.log("Error 7");
          webinarNames.push(roomName);
          res.redirect('/room?status=create&room='+ roomName +'&user=' + username);
          res.end();
        } else {
          console.log("Error 8");
          res.redirect("/home?user=" + username);
          res.end();
        }
      });
    }else{
      console.log("Error 9");
      res.redirect("/home?user=" + username);
      res.end();
    }

  }else{
    console.log("Error 10");
    res.redirect("/?error=timeout");
    res.end();
  }
});

app.post('/joinWebinar',(req,res)=>{
  let roomName = req.body.roomName;
  let roomPassword = req.body.roomPassword;
  let username = req.session.username;
  if(!webinarNames.includes(req.body.roomName)){
    if(!req.session.loggedin || username === undefined){
      res.redirect("/?error=timeout");
      res.end();
    }else{
      res.redirect("/home?user=" + username);
      res.end();
    }
  }else if(req.session.loggedin && req.session.username !== undefined){
    connection.query("SELECT * FROM rooms WHERE name = ? ",[roomName],(error,result,fields)=>{
      console.log("Error 3");
      if(error) {
        res.redirect("/home?user=" + username);
        res.end();
      }else if (result && result.length > 0) {
        console.log("Error 4");
        const hash = crypto.createHash('sha256');
        hash.update(roomPassword);
        let password = hash.digest('hex');
        if(result[0].password !== null && result[0].password === password){
          console.log("Error 5");
          res.redirect('/webinar?status=join&room='+ roomName +'&user=' + username);
          res.end();
        }else if(result[0].password === null){
          console.log("Error 6");
          res.redirect('/webinar?status=join&room='+ roomName +'&user=' + username);
          res.end();
        }else{
          console.log("Error 7");
          res.redirect("/home?user=" + username + "&error=password");
          res.end();
        }

      } else {
        console.log("Error 8");
        res.redirect("/home?user=" + username);
        res.end();
      }
    });
  }else{
    res.redirect("/?error=timeout");
  }
});
app.get('/webinar', (req,res)=>{
  res.sendFile(path.join(__dirname + '/public/webinar.html'));
});

app.get('/getUsers/:room', (req, res) => {
  const room = req.params.room;
  N.API.getUsers(room, (users) => {
    res.send(users);
  });
});


app.post('/createToken/', (req, res) => {
  console.log('Creating token. Request body: ', req.body);

  const username = req.body.username;
  const role = req.body.role;

  let room = defaultRoomName;
  let type;
  let roomId;
  let mediaConfiguration;

  if (req.body.room) room = req.body.room;
  if (req.body.type) type = req.body.type;
  if (req.body.roomId) roomId = req.body.roomId;
  if (req.body.mediaConfiguration) mediaConfiguration = req.body.mediaConfiguration;

  const createToken = (tokenRoomId) => {
    N.API.createToken(tokenRoomId, username, role, (token) => {
      console.log('Token created', token);
      res.send(token);
    }, (error) => {
      console.log('Error creating token', error);
      res.status(401).send('No Erizo Controller found');
    });
  };

  if (roomId) {
    createToken(roomId);
  } else {
    getOrCreateRoom(room, type, mediaConfiguration, createToken);
  }
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'origin, content-type');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

cleanExampleRooms(() => {

  app.listen(3001);
  const server = https.createServer(options, app);
  console.log('BasicExample started');
  server.listen(3004);
  connection.query("TRUNCATE TABLE rooms",(error,result,fields)=>{
    if(error) throw error;
    if (result) {
      console.log("TABLAS BORRADAS");
    } else {
      console.log("TABLAS NO BORRADAS");
    }
  });

  setInterval(function(){
    cleanExampleRooms(()=>{console.log("Salas borradas")});
  },3000);
});
