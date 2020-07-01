"use strict";
let locStorage = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5ODUxIiwiY29ycmVvIjoiaXM3MDk4NTFAdGVzdC5jb20iLCJpaWQiOjE3LCJpYXQiOjE1OTM1ODE1ODcsImV4cCI6MTU5MzU4NTE4N30.H8DDxE9Lx58iNuCaI9XyT6pRA7CrNyWDuYqkEwR3DLY"

//Mapeo de usuarios a HTML
function show(){
    fetch('https://users-dasw.herokuapp.com/api/users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': localStorage.token,
                'x-user-token': locStorage
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => response.json()
            .then(a => users(Array.from(a)))
        );
}
show();
function users(arr){
    document.querySelector('#users').innerHTML=arr.map(p => /*html*/`   
        <div class="media border rounded p-3 m-3 align-self-center col-5">
        <div class="media-left col-0">
            <img src="${p.url}" alt="" class="mr-3 mt-3 rounded-circle">
        </div>
        <div class="media-body">
            <h4 class="name">${p.nombre}  ${p.apellido}</h4>
            <p>Correo: ${p.correo}</p>
        </div>
        <div class="media-right d-flex align-item-start flex-column">
            <a name="" id="" class="btn btn-primary mt-2" href="#" onclick="detalle('${p.correo}')" role="button" data-toggle="modal" data-target="#info">
                <i class="fa fa-search" aria-hidden="true"></i>
            </a>
            <a name="" id="" onclick="editar('${p.correo}')" data-toggle="modal" data-target="#modelEditar" class="btn btn-primary mt-2" href="#" role="button">
                <i class="fa fa-pen" aria-hidden="true"></i>
            </a>
            <a name="borrar" id="" onclick="eliminar('${p.correo}')" data-toggle="modal" data-target="#modelDelete"  class="btn btn-primary mt-2" href="#" role="button">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </div>
        </div>
    `).join('');

    let size;
    let sizeBtn = document.querySelector('#paginas').querySelectorAll('li').length -2;
    if(arr.length%2 != 0) size = parseInt(arr.length/2)+1;
    else size = parseInt(arr.length/2);
    document.querySelector('#paginas').querySelectorAll('li')[0].classList.add('disabled');
    for(let i = sizeBtn; i > size; i--) {
        document.querySelector('#paginas').querySelectorAll('li')[i].classList.add('disabled');
    }
}