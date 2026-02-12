import { menuItems } from "../scripts/menuItems.js";

 
const listaPlatos = document.querySelector("#plato-select");
const pedidoForm = document.querySelector("#form-pedido");
const tablaPedidos = document.querySelector("#tabla-pedidos");

const platos = menuItems;

console.table(platos)




function datosPedido(nombre, plato, cantidad) {
    this.nombre = nombre;
    this.plato = plato;
    this.cantidad = cantidad;
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

let numeroPedido = 0;

function formPedido () {
    pedidoForm.addEventListener("submit", (e) => {

        e.preventDefault();

        numeroPedido++;

        let nomPlato;

        const nombre = pedidoForm.elements['codigo'].value; 
        const plato = form.elements['plato-select'].value; 
        const cantidad= form.elements['cantidad'].value;
        let datos = new datosPedido(nombre, plato, cantidad);
        let precioTotal = 0;
         platos.entradas.forEach((ent) => {
        if (datos.plato === ent.codigo) {
            precioTotal = ent.precio * parseInt(datos.cantidad);
        }
        });
        platos.fuertes.forEach((ent) => {
            if (datos.plato === ent.codigo) {
                precioTotal = ent.precio * parseInt(datos.cantidad);
                nomPlato = ent.plato;
            }
        });
        platos.bebidas.forEach((ent) => {
            if (datos.plato === ent.codigo) {
                precioTotal = ent.precio * parseInt(datos.cantidad);
                nomPlato = ent.plato;
            }
        });
        platos.postres.forEach((ent) => {
            if (datos.plato === ent.codigo) {
                precioTotal = ent.precio * parseInt(datos.cantidad);
                nomPlato = ent.plato;
            }
        });
        console.log(`El precio total del pedido es: $${precioTotal}`);
        mandarPedido(datos, precioTotal, nomPlato);
        });
}

function mandarPedido(datos, precioTotal, nomPlato) {
    console.log(datos);
    console.log(precioTotal);
    console.log(numeroPedido);
    console.log(nomPlato);
    const fila = `
    <tr>
        <td>${numeroPedido}</td>
        <td>${datos.nombre}</td>
        <td>${nomPlato}</td>
        <td>${datos.cantidad}</td>
        <td>$${precioTotal}</td>
        <td>En preparación</td>
    </tr>
    `;
    tablaPedidos.insertAdjacentHTML("beforeend", fila);
}


document.addEventListener("DOMContentLoaded", ()=>{
    listaPedidos(), formPedido();
});
