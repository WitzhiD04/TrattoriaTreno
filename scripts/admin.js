const tablaPedidos = document.querySelector("#tabla-pedidos tbody");


function mandarPedido() {
    let pedidosJson = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidosJson.forEach(pedido => {
        const fila = `
    <tr>
        <td>${pedido.numeroPedido}</td>
        <td>${pedido.nombre}</td>
        <td>${pedido.plato}</td>
        <td>${pedido.cantidad}</td>
        <td>${pedido.precioTotal}</td>
        <td>${pedido.estado}</td>
    </tr>
    `;
    tablaPedidos.insertAdjacentHTML("beforeend", fila);
    });

    //localStorage.removeItem('pedidos');
}

/**
 * Carga y muestra las reservas en la tabla de reservas
 */
function mandarReservas() {
    const tablaReservas = document.querySelector("#tabla-reservas tbody");
    
    if (!tablaReservas) {
        return;
    }

    let reservasJson = JSON.parse(localStorage.getItem("reservas")) || [];

    reservasJson.forEach(reserva => {
        const fila = `
    <tr>
        <td>${reserva.numeroReserva}</td>
        <td>${reserva.nombre}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.personas}</td>
        <td>${reserva.mesa}</td>
        <td>${reserva.evento}</td>
        <td>${reserva.estado}</td>
    </tr>
    `;
        tablaReservas.insertAdjacentHTML("beforeend", fila);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    mandarPedido();
    mandarReservas();
});