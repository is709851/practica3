"use strict";
localStorage.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5ODUxIiwiaWF0IjoxNTkzMzkxNTQwfQ.-oW8HPZISGuvJ-FjVatGcEnpCu7hHEg9Jyfs724pJx8';

//DESBLOQUEAR BOTON SUBMIT
let registro = document.querySelector('#registro');
let btn = document.querySelector('#registro').querySelector("button[type='submit']");
btn.setAttribute('disabled', '');
registro.addEventListener("change", function(e){
    let invalidos = document.querySelector('#registro').querySelectorAll('input:invalid');
    if(invalidos.length == 0) btn.removeAttribute('disabled');
})

class registros{
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

async function registrar(evt){
    evt.preventDefault();

    let nmbre = document.querySelector('#registro').querySelector('#nombre').value;
    let aplld = document.querySelector('#registro').querySelector('#apellido').value;
    let correo = document.querySelector('#registro').querySelector('#email').value;
    let psswrd = document.querySelector('#registro').querySelector('#password').value;
    let fcha = document.querySelector('#registro').querySelector('#fecha').value;
    let gnro = document.querySelector('#registro').querySelector("input[type='radio']:checked").value;
    let img = document.querySelector('#registro').querySelector('#foto').value;
    let rgs = new registros(nmbre, aplld, correo, psswrd, fcha, gnro, img);
    let datos = JSON.stringify(rgs)

    fetch('https://users-dasw.herokuapp.com/api/users',{
        method: 'POST',
        body: datos,
        headers: {
            'Content-Type': 'application/json',
            'x-auth': locStorage.token 
        }
    })
    .then(res => console.log("Usuario registrado", nmbre))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}


//LOGIN
let token;
class login{
    constructor(correo, password){
        this.correo = correo;
        this.password = password;
    }
}
async function sesion(evt){
    evt.preventDefault();
    let correo = document.querySelector('#sesion').querySelector('#correo').value;
    let psswrd = document.querySelector('#sesion').querySelector('#password').value;
    let sesion = new login(correo, psswrd);
    let datos = JSON.stringify(sesion);

    await fetch('https://users-dasw.herokuapp.com/api/login', {
        method: 'POST',
        body: datos,
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.token 
        }
    })
    .then((response) => response.json().then(tken => console.log(tken.token)))
    .then(function(){
        window.location.href = "./consultas.html"
    })
    .catch(error => console.error('Error:', error))
}


