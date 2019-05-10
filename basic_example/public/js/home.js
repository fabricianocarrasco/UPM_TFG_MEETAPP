/* globals Erizo */

/* eslint-env browser */
/* eslint-disable no-param-reassign, no-console */

//const serverUrl = '/';


function createRoom(){
    //window.location = `/room.html?status=create&room=${document.getElementById('roomName').value}`;

    const urlString = window.location.href;
    const url = new URL(urlString);
    $.get('/room', { status:"create", room: document.getElementById('roomName').value,user: url.searchParams.get('user')});
    /*
    const req = new XMLHttpRequest();
    const urlServer = `/room?status=join&room=${document.getElementById('roomName').value}&user=${url.searchParams.get('user')}`;
    const roomData = { username: url.searchParams.get('user'),
        status: 'join',
        room: document.getElementById('roomName').value
    };
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            callback(req.responseText);
        }
    };
    req.open('GET', urlServer, true);
    req.send();
    /*
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(roomData));
    */

}

function joinRoom(){
  //entra en la sala
    const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');
  window.location = `/room.html?status=join&room=${document.getElementById('roomName').value}`
 
}

function createWebinar(){
    const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');
  window.location = `/webinar.html?status=create&room=${document.getElementById('roomName').value}`
  
}

function joinWebinar(){
  //entra en la sala

  window.location = `/webinar.html?status=join&room=${document.getElementById('roomName').value}`
 
}
window.onload = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');


};