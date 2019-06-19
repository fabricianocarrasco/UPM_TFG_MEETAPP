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

function nUsersInRoom(){
    let nUsers = 0;
    getRooms((response) => {
        //convierte el JSON en un array de objetos para poder buscar
        const rooms = JSON.parse(response);
        //realiza un bucle forEach en el array de salas para buscar la que nos interesa
        rooms.forEach(function(room){
            //compara el nombre de las salas con el escrito en el cuadro de texto para ver si coinciden
            if(room.name === document.getElementById('roomName').innerText){
                //si coinciden los nombres saca el id de esa sala
                const token = room._id;
                console.log(token);
                //con el id de la sala pide el servidor que envie los datos de los usuarios
                getUsers((response)=>{
                    //muestra el numero de usuarios en el chat de texto
                    nUsers = JSON.parse(response).length;

                    if (nUsers === 1) {
                        document.getElementById("nUsers").innerText = nUsers +" user";
                    }else{
                        document.getElementById("nUsers").innerText = nUsers +" users";
                    }

                },token);
            }
        });

    });

    //return nUsers;
}


function createRoom(roomName){

    const urlString = window.location.href;
    const url = new URL(urlString);
    //crea una sala con el nombre de la sala
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
      //el nombre del stream debe coincidir con el nombre del usuario
      localStream = Erizo.Stream({video:true, audio:true, data:true, videoSize: [320, 240, 1920, 1080], attributes:{name:url.searchParams.get('user')}});
      //conexión a la sala
      room.connect();
      room.addEventListener('room-connected',function(event){
        console.log('Create: room connected +------------------------------+');
        //se inicia el stream
        localStream.init();
        //muestra el numero de usuarios en el chat
        nUsersInRoom();
      });
      //si se acepta la cámara se inicia la reproduccion de video
      localStream.addEventListener('access-accepted', function(event){
        //se configura el container para almacenar los stream
        document.getElementById('videoLocal').setAttribute('style', 'width: 100%; float:left');
        //se publica el video en la sala
        room.publish(localStream);

        console.log(`Create: show localStream +-------------------+`);
        const div = document.createElement('div');
        div.setAttribute('style', 'width: 100%; float:left;');
        div.setAttribute('id', `test${localStream.getID()}`);
        document.getElementById('videoLocal').appendChild(div);
        localStream.show(`test${localStream.getID()}`);

        document.getElementById("player_local").style.height = "300px";

      });
      //en caso de no aceptar no se hace nada
      localStream.addEventListener('access-denied', function(event){
        console.log('Create: video no aceptado +------------+')
      });
      room.addEventListener('stream-added', function(addedEvent){

          if(localStream.getID() === addedEvent.stream.getID()){

              console.log('Create: own stream added +--------------+');
              nUsersInRoom();

          }else  {

              console.log(`Create: ${addedEvent.stream.getID()} stream added +--------------------+`);
              subscribeToStream(addedEvent.stream,localStream,room);
              nUsersInRoom();
          }

      });
      //cuando se elimina un stream de la conversación se activa
      room.addEventListener('stream-removed', (addedEvent) => {
        // Remove stream
        const stream = addedEvent.stream;
        //Muestra en el chat quien se ha ido de la sala
        const div = document.createElement('div');
        div.setAttribute('class', "d-flex justify-content-first mb-4");
        div.innerHTML = "<b>" + safe_tags_replace(stream.getAttributes().name) + " has left the room </b>";
        document.getElementById('chatMessages').appendChild(div);
        lastMessage = div.id;
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        if (document.getElementById(`test${stream.getID()}`) !== undefined) {

          const element = document.getElementById(`test${stream.getID()}`);
          if(document.getElementById("videoContainer").contains(element)){
            document.getElementById('videoContainer').removeChild(element);
          }else if(document.getElementById('videoFocused').contains(element)){
            document.getElementById('videoFocused').removeChild(element);
            document.getElementById("videoFocused").appendChild(document.getElementById("videoContainer"));
            document.getElementById("videoFooter").childNodes = null;
            document.getElementById("videoContainer").style.maxHeight = "100%";
          }

          console.log(`Create: stream ${addedEvent.stream.getID()} deleted +-----------------+`);

        }
        nUsersInRoom();

      });

      //cuando se produce el evento de suscripción a un stream se activa
      room.addEventListener('stream-subscribed', function(subscribedEvent){

        console.log(`Create: subscribed to ${subscribedEvent.stream.getID()}`);
        const div = document.createElement('div');
        div.setAttribute('class', 'video_stream');
        div.setAttribute("onclick",`centerFocus(test${subscribedEvent.stream.getID()})`);
        div.setAttribute('id', `test${subscribedEvent.stream.getID()}`);
        document.getElementById('videoContainer').appendChild(div);
        subscribedEvent.stream.show(`test${subscribedEvent.stream.getID()}`);
        console.log(`Create: playing test${subscribedEvent.stream.getID()} +----------+`);

        //Muestra en el chat quien se ha unido a la sala
        const div2 = document.createElement('div');
        div2.setAttribute('class', "d-flex justify-content-first mb-4");
        div2.innerHTML = "<b>" + safe_tags_replace(subscribedEvent.stream.getAttributes().name) + " has join the room </b>";
        document.getElementById('chatMessages').appendChild(div2);
        lastMessage = div2.id;
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

        //Se añade un evento de escucha para cada stream que ya estaba conectado a la sala para cuando envíe un mensaje
        subscribedEvent.stream.addEventListener('stream-data', function(event){
          //Creamos un elemento div para que se muestre el texto del chat
          const div1 = document.createElement('div');
          const date = new Date(event.msg.timestamp);
          div1.setAttribute('id', `chat${date.getTime()}`);
          div1.setAttribute('class', "d-flex justify-content-first mb-4");
          const div2 =document.createElement('div');
          div2.setAttribute('class',"img_cont_msg");
          div1.appendChild(div2);
          const div3 = document.createElement('div');
          div3.setAttribute('class','msg_container');
          div3.innerHTML = "<b>" + safe_tags_replace(event.stream.getAttributes().name) + " </b>: " + safe_tags_replace(event.msg.text);
          const span = document.createElement('span');
          span.setAttribute('class','msg_time');
          span.innerText= `${date.getHours()}:${date.getMinutes()}`;
          div3.appendChild(span);
          div1.appendChild(div3);

          document.getElementById('chatMessages').appendChild(div1);
          lastMessage = div1.id;
          document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

          console.log("Data from: " + event.stream.getAttributes().name);
        });

      });

      room.addEventListener('stream-failed', () => {
        console.log('Stream Failed, act accordingly');
      });

    });

}

function joinRoom(roomName){

      const urlString = window.location.href;
      const url = new URL(urlString);
      //crea una sala con el nombre de la sala
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
        //el nombre del stream debe coincidir con el nombre del usuario
        localStream = Erizo.Stream({video:true, audio:true, data:true, videoSize: [320, 240, 1920, 1080], attributes:{name:url.searchParams.get('user')}});
        //conexión a la sala
        room.connect();
        room.addEventListener('room-connected',function(event){
          console.log('Join: room connected +------------------------------+');
          //se inicia el stream
          localStream.init();
          //muestra el numero de usuarios en el chat
          nUsersInRoom();
        });
        //si se acepta la cámara se inicia la reproduccion de video
        localStream.addEventListener('access-accepted', function(event){
          //se configura el container para almacenar los stream
          document.getElementById('videoLocal').setAttribute('style', 'width: 100%; float:left');
          //se publica el video en la sala
          room.publish(localStream);

          console.log(`Join: show localStream +-------------------+`);
          const div = document.createElement('div');
          div.setAttribute('style', 'width: 100%;float:left;');
          div.setAttribute('id', `test${localStream.getID()}`);
          document.getElementById('videoLocal').appendChild(div);
          localStream.show(`test${localStream.getID()}`);

          document.getElementById("player_local").style.height = "300px";

          //se conecta y muestra los streams que ya estén en la sala
          room.remoteStreams.forEach((stream)=>{
            subscribeToStream(stream, localStream, room);
          });

        });
        //en caso de no aceptar no se hace nada
        localStream.addEventListener('access-denied', function(event){
          console.log('Join: video no aceptado +------------+')
        });
        room.addEventListener('stream-added', function(addedEvent){

          if(localStream.getID() === addedEvent.stream.getID()){

            console.log('Join: own stream added +--------------+');
            nUsersInRoom();

          }else  {

            console.log(`Join: ${addedEvent.stream.getID()} stream added +--------------------+`);
            subscribeToStream(addedEvent.stream,localStream,room);
            nUsersInRoom();
          }

        });
        //cuando se elimina un stream de la conversación se activa
        room.addEventListener('stream-removed', (addedEvent) => {
          // Remove stream
          const stream = addedEvent.stream;
          //Muestra en el chat quien se ha ido de la sala
          const div = document.createElement('div');
          div.setAttribute('class', "d-flex justify-content-first mb-4");
          div.innerHTML = "<b>" + safe_tags_replace(stream.getAttributes().name) + " has left the room </b>";
          document.getElementById('chatMessages').appendChild(div);
          lastMessage = div.id;
          document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
          if (document.getElementById(`test${stream.getID()}`) !== undefined) {

            const element = document.getElementById(`test${stream.getID()}`);
            if(document.getElementById("videoContainer").contains(element)){
              document.getElementById('videoContainer').removeChild(element);
            }else if(document.getElementById('videoFocused').contains(element)){
              document.getElementById('videoFocused').removeChild(element);
              document.getElementById("videoFocused").appendChild(document.getElementById("videoContainer"));
              document.getElementById("videoFooter").childNodes = null;
              document.getElementById("videoContainer").style.maxHeight = "100%";
            }
            console.log(`Create: stream ${addedEvent.stream.getID()} deleted +-----------------+`);

          }
          nUsersInRoom();

        });

        //cuando se produce el evento de suscripción a un stream se activa
        room.addEventListener('stream-subscribed', function(subscribedEvent){

          console.log(`Join: subscribed to ${subscribedEvent.stream.getID()}`);
          const div = document.createElement('div');
          div.setAttribute('class', 'video_stream');
          div.setAttribute("onclick",`centerFocus(test${subscribedEvent.stream.getID()})`);
          div.setAttribute('id', `test${subscribedEvent.stream.getID()}`);
          document.getElementById('videoContainer').appendChild(div);
          subscribedEvent.stream.show(`test${subscribedEvent.stream.getID()}`);
          console.log(`Join: playing test${subscribedEvent.stream.getID()} +----------+`);

          //Muestra en el chat quien se ha unido a la sala
          const div2 = document.createElement('div');
          div2.setAttribute('class', "d-flex justify-content-first mb-4");
          div2.innerHTML = "<b>" + safe_tags_replace(subscribedEvent.stream.getAttributes().name) + " has join the room </b>";
          document.getElementById('chatMessages').appendChild(div2);
          lastMessage = div2.id;
          document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

          //Se añade un evento de escucha para cada stream que ya estaba conectado a la sala para cuando envíe un mensaje
          subscribedEvent.stream.addEventListener('stream-data', function(event){
            //Creamos un elemento div para que se muestre el texto del chat
            const div1 = document.createElement('div');
            const date = new Date(event.msg.timestamp);
            div1.setAttribute('id', `chat${date.getTime()}`);
            div1.setAttribute('class', "d-flex justify-content-first mb-4");
            const div2 =document.createElement('div');
            div2.setAttribute('class',"img_cont_msg");
            div1.appendChild(div2);
            const div3 = document.createElement('div');
            div3.setAttribute('class','msg_container');
            div3.innerHTML = "<b>" + safe_tags_replace(event.stream.getAttributes().name) + " </b>: " + safe_tags_replace(event.msg.text);
            const span = document.createElement('span');
            span.setAttribute('class','msg_time');
            span.innerText= `${date.getHours()}:${date.getMinutes()}`;
            div3.appendChild(span);
            div1.appendChild(div3);

            document.getElementById('chatMessages').appendChild(div1);
            lastMessage = div1.id;
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

            console.log("Data from: " + event.stream.getAttributes().name);
          });

        });

        room.addEventListener('stream-failed', () => {
          console.log('Stream Failed, act accordingly');
        });

      });


}
function sendMessage(){
    if(document.getElementById('inputChat').value !== ""){
        const div = document.createElement('div');

        const date = new Date();
        div.setAttribute('id', `chat${date.getTime()}`);
        div.setAttribute('class', "d-flex justify-content-end mb-4");
        const div3 = document.createElement('div');
        div3.setAttribute('class','msg_container_send');
        div3.innerHTML = safe_tags_replace(document.getElementById('inputChat').value);
        const span = document.createElement('span');
        span.setAttribute('class','msg_time_send');
        span.innerText= `${date.getHours()}:${date.getMinutes()}`;
        div3.appendChild(span);
        const div2 =document.createElement('div');
        div2.setAttribute('class',"img_cont_msg");
        div.appendChild(div3);
        div.appendChild(div2);

        document.getElementById('chatMessages').appendChild(div);

        const msg = document.getElementById('inputChat').value;

        localStream.sendData({text:`${msg}`, timestamp:`${date}`});
        document.getElementById('inputChat').value = "";
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }
}
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

function toggleChat(){
  if (document.getElementById("chatMessages").hasAttribute("hidden")) {
    document.getElementById("cardFooter").removeAttribute("hidden");
    document.getElementById('chatMessages').removeAttribute('hidden');
  } else{
    document.getElementById("cardFooter").setAttribute("hidden","hidden");
    document.getElementById('chatMessages').setAttribute('hidden',"hidden");
  }
}

function centerFocus(videoDiv){
  console.log("Entra a la funcion");
  if(videoDiv.classList.contains("stream_focused")){
    videoDiv.classList.remove("stream_focused");
    document.getElementById("videoContainer").appendChild(videoDiv);
    document.getElementById("videoFocused").appendChild(document.getElementById("videoContainer"));
    document.getElementById("videoFooter").childNodes = null;
    document.getElementById("videoContainer").style.maxHeight = "100%";
    videoDiv.style.height = null;
    videoDiv.style.width = null;
  }else{
    const videos = document.getElementById("videoFocused").childNodes;
    videos.forEach(function (video) {
      if (video.classList !== undefined){
        video.classList.remove("stream_focused");
        if(document.getElementById("videoFooter").childElementCount >0){
          document.getElementById("videoContainer").appendChild(video);
        }
      }
    });
    videoDiv.classList.add("stream_focused");
    document.getElementById("videoFocused").childNodes = null;
    document.getElementById("videoFooter").appendChild(document.getElementById("videoContainer"));
    document.getElementById("videoFocused").appendChild(videoDiv);
    document.getElementById("videoContainer").style.maxHeight = "245px";
    console.log(document.getElementById("videoContainer").childElementCount);
    if(document.getElementById("videoContainer").childElementCount === 0){
      videoDiv.style.height = "100%";
      videoDiv.style.width = "calc((100vh) / 0.75)";
    }else{
      videoDiv.style.height = null;
      videoDiv.style.width = null;
    }
  }

}
window.onload = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const roomName = url.searchParams.get('room');
    const status = url.searchParams.get('status');

    document.getElementById('roomName').innerHTML = safe_tags_replace(roomName);

    if(status === 'create'){
        createRoom(roomName);
    }else if(status === 'join'){
        joinRoom(roomName);
    }else{
        window.location = '/home.html'
    }

};