"use strict";

let array = [];
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
    .then(a => Array.from(a).forEach((id)=>{
        array.push(id)
    }))
);


//Editar usuario
function editar(correo){
    fetch('https://users-dasw.herokuapp.com/api/users/'+correo,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token,
            'x-user-token': locStorage 
          }
        })
        .then(response => response.json().then(a => edit(a))
    );
}

let correo, us
function edit(a){
    document.querySelector('#modelEditar').innerHTML =  
    `<form action="" onsubmit="guardarEdicion(event)">
            <div class="modal-header">
                <h5 class="modal-title"> Edición de usuario </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <input type="text" class="form-control" pattern="[A-Za-z]+" id="nombre" title="Solo texto" placeholder="Nombre o nombres" minlength="3" value="${a.nombre}" required>
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" name="" id="apellido" pattern="[A-Za-z]+" title="Solo texto" placeholder="Apellidos" minlength="3" value="${a.apellido}"required>
                    </div>
                </div>
                <div class="mt-3">
                    <input type="email" class="form-control" name="" id="email" placeholder="Tu correo" minlength="14" value="${a.correo}" disabled>
                </div >
                <div class="mt-3">
                    <input type="password" class="form-control" value="${a.password}" name="" id="password" placeholder="Contraseña" minlength="6" required>
                </div>
                <div class="mt-3">
                    <input type="password" class="form-control" value="" name="" id="" placeholder="Confirmar contraseña" minlength="6" required>
                </div>
                <div class="mt-3">
                    <input type="date" class="form-control" max="2030-01-01" name="" id="fecha" placeholder="" value="${a.fecha}" required>
                </div>
                <div class="mt-3 form-control bg-light" id="inputs">
                        <input type="radio" name="radio-choice" id="Mujer" value="M" disabled>
                        <label for="">Mujer</label>
                        <br>
                        <input type="radio" name="radio-choice" id="Hombre" value="H" disabled>
                        <label for="">Hombre</label>
                    
                </div>
                <div class="mt-3">
                    <input type="text" id="foto" class="form-control" placeholder="Url de imagen de perfil" title="Ej. http://www.google.com" value="${a.url}" required>
                </div>
            </div>
            <div class="modal-footer">
                <div class="w-100 d-flex justify-content-end"> 
                    <button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary m-1">Actualizar</button> 
                </div>
            </div>
        </form>`
        correo = document.querySelector('#modelEditar').querySelector("input[type='email']").value
        us = a
}
class actualizado{
    constructor(nombre, apellido, correo, password, fecha, sexo, image){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.password = password;
        this.fecha = fecha;
        this.sexo = sexo;
        this.image = image;
    }
}

function guardarEdicion(evt){
    evt.preventDefault();
    let nmbre = document.querySelector('#modelEditar').querySelector('#nombre').value;
    let aplld = document.querySelector('#modelEditar').querySelector('#apellido').value;
    let email = document.querySelector('#modelEditar').querySelector('#email').value;
    let psswrd = document.querySelector('#modelEditar').querySelector('#password').value;
    let fcha = document.querySelector('#modelEditar').querySelector('#fecha').value;
    let gnro = document.querySelector('#modelEditar').querySelector("input[type='radio']:checked").value;
    let img = document.querySelector('#modelEditar').querySelector('#foto').value;
    let act = new actualizado(nmbre, aplld, email, psswrd, fcha, gnro, img);
    let datos = JSON.stringify(act)
    fetch('https://users-dasw.herokuapp.com/api/users/'+correo,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token,
            'x-user-token': locStorage 
   },
        body: datos,
        })
        .then(response => alert('Usuario actualizado')
    );
    show()
}

//Eliminar usuario
let mail
function eliminar(correo) {
    document.querySelector('#modelDelete').querySelector('#name').innerHTML = `<b>`+ correo +`</b>`
    mail = correo;
}
function confirm(){
    fetch('https://users-dasw.herokuapp.com/api/users/'+mail,{
    method: 'DELETE',
    headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token,
            'x-user-token': locStorage 
        }
    })
    .then(res => console.log(res));
    show()
}

//Detalles
function detalle(correo){
    fetch('https://users-dasw.herokuapp.com/api/users/'+correo,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token,
            'x-user-token': locStorage 
        }
        })
        .then(response => response.json().then(a => detalles(a))
    );
}

function detalles(a){
    document.querySelector('#info').innerHTML = `<div class="modal-header">
    <h5 class="modal-title"> Detalle de usuario </h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <div class="media-left text-center mb-4">
        <img src="${a.url}" alt="" class="mr-3 mt-3 mb-3 rounded-circle">
        <div class="justify-content-end m-3">
            <a name="" id="" data-toggle="modal" data-target="#modelImage" title="Cambia tu imagen" class="btn btn-primary " href="#" role="button">
                <i class="fa fa-image" aria-hidden="true"></i>
            </a>
            <a name="" id="" data-toggle="modal" data-target="#modelDelete" title="Elimina tu perfil" class="btn btn-danger " href="#" role="button">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div style="text-align: center;" >
        <h4 >${a.nombre} </h4>
        <p>Correo: ${a.correo}</p>
        <p>Fecha de nacimiento: ${a.fecha}</p>
        <p>Sexo: ${a.sexo}</p>
        <p>Image: ${a.url}</p>
    </div>
</div>`;

}

//Busqueda de usuario
function buscar(evt){
    evt.preventDefault();
    let nmUs = document.querySelector('#busqueda').value;

    fetch('https://users-dasw.herokuapp.com/api/users?nombre='+nmUs,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token,
            'x-user-token': locStorage 
        }
        })
        .then(response => response.json()
            .then(a => users(Array.from(a)))
            )
        .catch(error => console.log('error: ' + error)
    );
}

