import { menuItems } from "../scripts/menuItems.js";

 
const listaPlatos = document.querySelector("#plato-select");
const pedidoForm = document.querySelector("#form-pedido");
//const tablaPedidos = document.querySelector("#tabla-pedidos tbody");

const platos = menuItems;

console.table(platos)


function datosPedido(nombre, plato, cantidad) {
    this.nombre = nombre;
    this.plato = plato;
    this.cantidad = cantidad;
}


function listaPedidos() {
    if (!listaPlatos) {
        return;
    }
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
    if (!pedidoForm) {
        return;
    }
    pedidoForm.addEventListener("submit", (e) => {

        e.preventDefault();

        numeroPedido++;

        let nomPlato;

        const nombre = pedidoForm.elements['codigo'].value; 
        const plato = pedidoForm.elements['plato-select'].value; 
        const cantidad= pedidoForm.elements['cantidad'].value;
        let datos = new datosPedido(nombre, plato, cantidad);
        let precioTotal = 0;
        platos.entradas.forEach((ent) => {
        if (datos.plato === ent.codigo) {
            precioTotal = ent.precio * parseInt(datos.cantidad);
            nomPlato = ent.plato;
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
        //console.log(nomPlato);

        let pedidoJson = JSON.parse(localStorage.getItem("pedidos")) || [];
        pedidoJson.push({  
            numeroPedido: numeroPedido,
            nombre: datos.nombre,
            plato: nomPlato,
            cantidad: datos.cantidad,
            precioTotal: precioTotal,
            estado: "En preparación" // ver si cambiar este a que varie como random o no se
        });
        localStorage.setItem("pedidos", JSON.stringify(pedidoJson));
        });
}

document.addEventListener("DOMContentLoaded", ()=>{
    listaPedidos(), formPedido();
});
