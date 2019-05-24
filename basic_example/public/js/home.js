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
   /* const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');
  window.location = `/room.html?status=join&room=${document.getElementById('roomName').value}`
  */
    const urlString = window.location.href;
    const url = new URL(urlString);
    $.get('/room', { status:"join", room: document.getElementById('roomName').value,user: url.searchParams.get('user')});
 
}

function createWebinar(){
   /* const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');
  window.location = `/webinar.html?status=create&room=${document.getElementById('roomName').value}`
  */
    const urlString = window.location.href;
    const url = new URL(urlString);
    $.get('/webinar', { status:"create", room: document.getElementById('roomName').value,user: url.searchParams.get('user')});
  
}

function joinWebinar(){
  //entra en la sala
/*
  window.location = `/webinar.html?status=join&room=${document.getElementById('roomName').value}`
 */
    const urlString = window.location.href;
    const url = new URL(urlString);
    $.get('/webinar', { status:"join", room: document.getElementById('roomName').value,user: url.searchParams.get('user')});
}
setInterval(() => {
    checkRooms();
}, 1000);

function checkRooms(){
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const res = this.responseText;
            let rooms = JSON.parse(res);
            rooms.forEach(function (room) {
                if (document.getElementById( 'roomName').value.length > 0 && document.getElementById('roomName').value === room.name){
                    document.getElementById('roomName').classList.remove('no-room');
                    document.getElementById('roomName').classList.add('existing-room');
                }else if(document.getElementById( 'roomName').value.length > 0){
                    document.getElementById('roomName').classList.add('no-room');
                    document.getElementById('roomName').classList.remove('existing-room');
                }else{
                    document.getElementById('roomName').classList.remove('no-room');
                    document.getElementById('roomName').classList.remove('existing-room');
                }
            });
        }
    };
    xhttp.open("GET", "/getRooms", true);
    xhttp.send();
}
function selectRoom(){
    document.getElementById('createRoomButton').removeAttribute('disabled');
    document.getElementById('joinRoomButton').removeAttribute('disabled');
    document.getElementById('createWebinarButton').setAttribute("disabled", "disabled");
    document.getElementById('joinWebinarButton').setAttribute("disabled", "disabled");
    document.getElementById('createWebinarButton').setAttribute("hidden", "hidden");
    document.getElementById('joinWebinarButton').setAttribute("hidden", "hidden");
    document.getElementById('createRoomButton').removeAttribute('hidden');
    document.getElementById('joinRoomButton').removeAttribute('hidden');

    document.getElementById("homeForm").classList.remove("webinar-selected");
    document.getElementById("homeForm").classList.add("room-selected");

    document.getElementById("selectWebinarButton").classList.add("btn-secondary");
    document.getElementById("selectRoomButton").classList.add("btn-primary");
    document.getElementById("selectWebinarButton").classList.remove("btn-primary");
    document.getElementById("selectRoomButton").classList.remove("btn-secondary");
}
function selectWebinar(){
    document.getElementById('createRoomButton').setAttribute("disabled", "disabled");
    document.getElementById('joinRoomButton').setAttribute("disabled", "disabled");
    document.getElementById('createWebinarButton').removeAttribute('disabled');
    document.getElementById('joinWebinarButton').removeAttribute('disabled');
    document.getElementById('createRoomButton').setAttribute("hidden", "hidden");
    document.getElementById('joinRoomButton').setAttribute("hidden", "hidden");
    document.getElementById('createWebinarButton').removeAttribute('hidden');
    document.getElementById('joinWebinarButton').removeAttribute('hidden');

    document.getElementById("homeForm").classList.remove("room-selected");
    document.getElementById("homeForm").classList.add("webinar-selected");

    document.getElementById("selectWebinarButton").classList.add("btn-primary");
    document.getElementById("selectRoomButton").classList.add("btn-secondary");
    document.getElementById("selectWebinarButton").classList.remove("btn-secondary");
    document.getElementById("selectRoomButton").classList.remove("btn-primary");
}
window.onload = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    document.getElementById('username').innerHTML = 'Bienvenido! ' + url.searchParams.get('user');


};