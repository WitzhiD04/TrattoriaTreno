import { menuItems } from "../scripts/menuItems.js";

 
const listaPlatos = document.querySelector("#plato-select");


const platos = menuItems;

console.table(platos)




function datosPedido(nombre, plato, precio) {
    this.nombre = nombre;
    this.plato = plato;
    this.precio = precio;
}


function listaPedidos() {
    let fila = '';
    platos.entradas.forEach((ent) => {
         fila += `
            <option value="${ent.codigo}">
                ${ent.plato} - $${ent.precio}
            </option>`;
        listaPlatos.innerHTML = fila;
    });
    platos.fuertes.forEach((ent) => {
         fila += `
            <option value="${ent.codigo}">
                ${ent.plato} - $${ent.precio}
            </option>`;
            
        //listaPlatos.insertAdjacentHTML("beforeend", fila);
        console.log(fila);
        listaPlatos.innerHTML = fila;
    });
    platos.bebidas.forEach((ent) => {
         fila += `
            <option value="${ent.codigo}">
                ${ent.plato} - $${ent.precio}
            </option>`;
            
        listaPlatos.innerHTML = fila;
    });
    platos.postres.forEach((ent) => {
         fila += `
            <option value="${ent.codigo}">
                ${ent.plato} - $${ent.precio}
            </option>`;
        listaPlatos.innerHTML = fila;
    });
}



function formPedido () {
    const nombre = document.querySelector('res-nombre');
    console.log(nombre);
    const plato = document.querySelector('res-plato');
    const precio = document.querySelector('res-precio');   
    const form = document.querySelector("#pedido-form");
    let datos = new datos(nombre,plato, precio);

    form.addEventListener("enviar", (e) => {
        e.preventDefault();
        console.log(datos);
    }
    )
}


document.addEventListener("DOMContentLoaded", ()=>{
    listaPedidos(), formPedido();
});
