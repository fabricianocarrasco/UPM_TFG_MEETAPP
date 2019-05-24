/* globals Erizo */

/* eslint-env browser */
/* eslint-disable no-param-reassign, no-console */
const serverUrl = '/';
let localStream;
let room;
let recording;
let recordingId;
let lastMessage;


const getParameterByName = (name) => {
  // eslint-disable-next-line
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const createToken = (roomData, callback) => {
  const req = new XMLHttpRequest();
  const url = `${serverUrl}createToken/`;

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      callback(req.responseText);
    }
  };

  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(roomData));
};
//envia una petición GET al servidor que nos devuelve un JSON de rooms
const getRooms = (callback) => {
  const req = new XMLHttpRequest();
  const url = `${serverUrl}getRooms/`;

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      callback(req.responseText);
    }
  };

  req.open('GET', url, true);
  req.send();
};
//envia una petición GET al servidor que nos devuelve la información de los usuarios de una sala concreta
const getUsers = (callback,roomID) => {
  console.log(roomID);
  const req = new XMLHttpRequest();
  const url = `${serverUrl}getUsers/${roomID}`;
  console.log(url);
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      callback(req.responseText);
    }
  };

  req.open('GET', url, true);
  req.send();
};

const subscribeToStreams = (streams, localStream, room) => {
  const cb = (evt) => {
    console.log('Bandwidth Alert', evt.msg, evt.bandwidth);
  };

  streams.forEach((stream) => {
    if (localStream.getID() !== stream.getID()) {
      room.subscribe(stream, { metadata: { type: 'subscriber' } });
      stream.addEventListener('bandwidth-alert', cb);
    }
  });
};
const subscribeToStream = (stream, localStream, room) => {
  const cb = (evt) => {
    console.log('Bandwidth Alert', evt.msg, evt.bandwidth);
  };

  if (localStream.getID() !== stream.getID()) {
    room.subscribe(stream, { metadata: { type: 'subscriber' } });
    stream.addEventListener('bandwidth-alert', cb);

  }

};
//comprueba que el nombre de una sala no está cogido
function testEmptyName(callback, name){
  const req = new XMLHttpRequest();
  const url = `${serverUrl}testRoom/${name}`;
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
    callback(req.responseText);
    }
  };

  req.open('GET', url, true);
  req.send();
}
//saca por consola la informacion de los usuarios suscritos a la sala escrita en el recuadro
function usersInRoom(){
  getRooms((response) => {
    //convierte el JSON en un array de objetos para poder buscar
    const rooms = JSON.parse(response);
    //realiza un bucle forEach en el array de salas para buscar la que nos interesa 
    rooms.forEach(function(room){
      //compara el nombre de las salas con el escrito en el cuadro de texto para ver si coinciden
      if(room.name === document.getElementById('roomName').value){
        //si coinciden los nombres saca el id de esa sala
        const token = room._id;
        console.log(token);
        //con el id de la sala pide el servidor que envie los datos de los usuarios
        getUsers((response)=>{
          //imprime por consola la información recibida
          console.log(response);
        },token);
      }
    });
  });
  

}
function createRoom(roomName){
  //TODO getRooms y si ya existe no se crea y salta un aviso en la pagina
  /*
  testEmptyName((response) => {
    console.log(response);
    if(response){
      alert('ya existe una sala con ese nombre')
    }
  }, roomName);
  */

  //si se le ha puesto nombre a la sala comienza la retrasmision
  if(roomName !== ""){
      const urlString = window.location.href;
      const url = new URL(urlString);
      //crea una sala con el nombre de la sala, en un futuro username será el correo
    const roomData = { username: url.searchParams.get('user'),
    role: 'presenter',
    room: roomName,
    type: 'erizo'
    };
    //pide un token al servidor para que contacte con nuve y cree la sala y el usuario
    createToken(roomData,(response) => {
      const token = response;
      console.log(token);
      //room = Erizo.Room({ token });
      room = Erizo.Room({token:token});
       //conexión a la sala
      room.connect();
      room.addEventListener('room-connected',function(event){
        console.log('conectado');
        //el nombre del stream debe coincidir con el nombre del usuario
        localStream = Erizo.Stream({video:true, audio:true, data:true, videoSize: [320, 240, 640, 480], attributes:{name:url.searchParams.get('user')}});
        //se inicia el stream
        localStream.init();
        //si se acepta la cámara se inicia la reproduccion de video
        localStream.addEventListener('access-accepted', function(event){
            //se configura el container para almacenar los stream
            document.getElementById('videoContainer').setAttribute('style', 'width: 320px; height: 240px; float:left');
            //se publica el video en la sala
          room.publish(localStream);
          room.addEventListener('stream-added', function(addedEvent){

            if(localStream.getID() === addedEvent.stream.getID()){

              console.log('Create: own stream added +--------------+');

            }else  {

              console.log(`Create: ${addedEvent.stream.getID()} stream added +--------------------+`);
              subscribeToStream(addedEvent.stream,localStream,room);
            }

          });
          //cuando se elimina un stream de la conversación se activa
          room.addEventListener('stream-removed', (addedEvent) => {
            // Remove stream from DOM
            const stream = addedEvent.stream;
            if (document.getElementById(stream.elementID) !== undefined) {
              
              const element = document.getElementById(stream.elementID);
              document.getElementById('videoContainer').removeChild(element);

              console.log(`Create: stream ${addedEvent.stream.getID()} deleted +-----------------+`);
            }
          });
          //cuando se produce el evento de suscripción a un stream se activa
          room.addEventListener('stream-subscribed', function(subscribedEvent){

            console.log(`Create: subscribed to ${subscribedEvent.stream.getID()}`);
            const div = document.createElement('div');
            div.setAttribute('style', 'width: 320px; height: 240px;float:left;');
            div.setAttribute('id', `test${subscribedEvent.stream.getID()}`);
            document.getElementById('videoContainer').appendChild(div);
            subscribedEvent.stream.show(`test${subscribedEvent.stream.getID()}`);
            console.log(`Create: playing test${subscribedEvent.stream.getID()} +----------+`);
            //Se añade un evento de escucha para cada stream que ya estaba conectado a la sala para cuando envíe un mensaje
            subscribedEvent.stream.addEventListener('stream-data', function(event){
                //Creamos un elemento div para que se muestre el texto del chat
                const div = document.createElement('div');
                div.innerHTML = event.msg.text;
                div.setAttribute('id', `chat${Date.now()}`);
                //cambia el orden de los mensajes del chat para que se vaya llenando de arriba a abajo y deplazen lo antiguo
                //contempla el caso de que no haya ningún mensaje en el chat y que ya haya alguno
                if(lastMessage){

                    document.getElementById('chatMessages').insertBefore(div,document.getElementById(lastMessage));

                }else{

                    document.getElementById('chatMessages').appendChild(div);

                }
                lastMessage = div.id;

            });

          });
          
          room.addEventListener('stream-failed', () => {
            console.log('Stream Failed, act accordingly');
          });

          console.log(`Create: show localStream +-------------------+`);
          const div = document.createElement('div');
          div.setAttribute('style', 'width: 320px; height: 240px;float:left;');
          div.setAttribute('id', `test${localStream.getID()}`);
          document.getElementById('videoContainer').appendChild(div);
          localStream.show(`test${localStream.getID()}`);

        });
        //en caso de no aceptar no se hace nada
        localStream.addEventListener('access-denied', function(event){
          console.log('Create: video no aceptado +------------+')
        });  
                
      });

    });  
       
  }else{
    console.log('Create: debes introducir un nombre a la sala para crearla +------------+');
  }
  

}

function joinRoom(roomName){
    //TODO getRooms y si ya existe no se crea y salta un aviso en la pagina
    /*
    testEmptyName((response) => {
      console.log(response);
      if(response){
        alert('ya existe una sala con ese nombre')
      }
    }, roomName);
    */

    //si se le ha puesto nombre a la sala comienza la retrasmision
    if(roomName !== ""){
        //crea una sala con el nombre de la sala, en un futuro username será el correo
        const urlString = window.location.href;
        const url = new URL(urlString);

        const roomData = { username: url.searchParams.get('user'),
            role: 'presenter',
            room: roomName,
            type: 'erizo'
        };
        //pide un token al servidor para que contacte con nuve y cree la sala y el usuario
        createToken(roomData,(response) => {
            const token = response;
            console.log(token);
            //room = Erizo.Room({ token });
            room = Erizo.Room({token:token});
            //conexión a la sala
            room.connect();
            room.addEventListener('room-connected',function(event){
                console.log('Join: room connected');
                //el nombre del stream debe coincidir con el nombre del usuario
                localStream = Erizo.Stream({video:true, audio:true, data:true, videoSize: [320, 240, 640, 480], attributes:{name:url.searchParams.get('user')}});
                //se inicia el stream
                localStream.init();
                //si se acepta la cámara se inicia la reproduccion de video
                localStream.addEventListener('access-accepted', function(event){
                    //se configura el container para almacenar los stream
                    document.getElementById('videoContainer').setAttribute('style', 'width: 320px; height: 240px; float:left');
                    //se publica el video en la sala
                    room.publish(localStream);
                    //se conecta y muestra los streams que ya estén en la sala
                    room.remoteStreams.forEach((stream)=>{
                        subscribeToStream(stream, localStream, room);
                    });
                    room.addEventListener('stream-added', function(addedEvent){

                        if(localStream.getID() === addedEvent.stream.getID()){

                            console.log('Join: own stream added +--------------+');

                        }else  {

                            console.log(`Join: ${addedEvent.stream.getID()} stream added +--------------------+`);
                            subscribeToStream(addedEvent.stream,localStream,room);
                        }

                    });
                    //cuando se elimina un stream de la conversación se activa
                    room.addEventListener('stream-removed', (addedEvent) => {
                        // Remove stream from DOM
                        const stream = addedEvent.stream;
                        if (document.getElementById(stream.elementID) !== undefined) {

                            const element = document.getElementById(stream.elementID);
                            document.getElementById('videoContainer').removeChild(element);

                            console.log(`Join: stream ${addedEvent.stream.getID()} deleted +-----------------+`);
                        }
                    });
                    //cuando se produce el evento de suscripción a un stream se activa
                    room.addEventListener('stream-subscribed', function(subscribedEvent){

                        console.log(`Join: subscribed to ${subscribedEvent.stream.getID()}`);
                        const div = document.createElement('div');
                        div.setAttribute('style', 'width: 320px; height: 240px;float:left;');
                        div.setAttribute('id', `test${subscribedEvent.stream.getID()}`);
                        document.getElementById('videoContainer').appendChild(div);
                        subscribedEvent.stream.show(`test${subscribedEvent.stream.getID()}`);
                        console.log(`Join: playing test${subscribedEvent.stream.getID()} +----------+`);
                        //Se añade un evento de escucha para cada stream que ya estaba conectado a la sala para cuando envíe un mensaje
                        subscribedEvent.stream.addEventListener('stream-data', function(event){
                            //Creamos un elemento div para que se muestre el texto del chat
                            const div = document.createElement('div');
                            div.innerHTML = event.msg.text;
                            div.setAttribute('id', `chat${Date.now()}`);
                            //cambia el orden de los mensajes del chat para que vyana llenando de arriba a abajo y deplazen lo antiguo
                            //contempla el caso de que no haya ningún mensaje en el chat y que ya haya alguno
                            if(lastMessage){

                                document.getElementById('chatMessages').insertBefore(div,document.getElementById(lastMessage));

                            }else{

                                document.getElementById('chatMessages').appendChild(div);

                            }
                            lastMessage = div.id;

                        });

                    });

                    room.addEventListener('stream-failed', () => {
                        console.log('Stream Failed, act accordingly');
                    });

                    console.log(`Create: show localStream +-------------------+`);
                    const div = document.createElement('div');
                    div.setAttribute('style', 'width: 320px; height: 240px;float:left;');
                    div.setAttribute('id', `test${localStream.getID()}`);
                    document.getElementById('videoContainer').appendChild(div);
                    localStream.show(`test${localStream.getID()}`);

                });
                //en caso de no aceptar no se hace nada
                localStream.addEventListener('access-denied', function(event){
                    console.log('Create: video no aceptado +------------+')
                });

            });

        });

    }else{
        console.log('Create: debes introducir un nombre a la sala para crearla +------------+');
    }


}

function sendMessage(){
  if(document.getElementById('inputChat').value !== ""){
    const div = document.createElement('div');
    
    div.innerHTML = document.getElementById('inputChat').value;
    const date = Date.now();
    div.setAttribute('id', `chat${date}`);
    
    if(lastMessage){
      document.getElementById('chatMessages').insertBefore(div,document.getElementById(lastMessage));  
    }else{
      document.getElementById('chatMessages').appendChild(div);  
    }

    lastMessage = div.id;
    const msg = document.getElementById('inputChat').value;

    localStream.sendData({text:`${msg}`, timestamp:`${date}`});
  }
}

window.onload = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const roomName = url.searchParams.get('room');
  const status = url.searchParams.get('status');

  document.getElementById('roomName').innerHTML = roomName;

  if(status === 'create'){
    createRoom(roomName);
  }else if(status === 'join'){
    joinRoom(roomName);
  }else{
    window.location = '/home.html'
  }

};