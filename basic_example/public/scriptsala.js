/* globals Erizo */

/* eslint-env browser */
/* eslint-disable no-param-reassign, no-console */

const serverUrl = '/';


function createRoom(){
  window.location = `/room.html?status=create&room=${document.getElementById('roomName').value}`
  
}

function joinRoom(){
  //entra en la sala
  window.location = `/room.html?status=join&room=${document.getElementById('roomName').value}`
 
}

function createWebinar(){
  window.location = `/webinar.html?status=create&room=${document.getElementById('roomName').value}`
  
}

function joinWebinar(){
  //entra en la sala
  window.location = `/webinar.html?status=join&room=${document.getElementById('roomName').value}`
 
}
