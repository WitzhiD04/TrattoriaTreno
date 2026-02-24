const tablaPedidos = document.querySelector("#tabla-pedidos tbody");

/**
 * Actualiza las tarjetas de métricas
 */
function actualizarMetricas() {
    const pedidosJson = JSON.parse(localStorage.getItem("pedidos")) || [];
    const reservasJson = JSON.parse(localStorage.getItem("reservas")) || [];

    // Pedidos hoy (simplificado: contar todos)
    const numPedidos = pedidosJson.length;
    document.querySelector('.tarjeta-admin:nth-child(1) .num-admin').textContent = numPedidos;

    // Reservas
    const numReservas = reservasJson.length;
    document.querySelector('.tarjeta-admin:nth-child(2) .num-admin').textContent = numReservas;

    // Ingresos estimados (suma de precioTotal de pedidos)
    const ingresos = pedidosJson.reduce((sum, pedido) => sum + pedido.precioTotal, 0);
    document.querySelector('.tarjeta-admin:nth-child(3) .num-admin').textContent = `$${ingresos.toLocaleString()}`;

    // Platos activos (contar total de platos en menuItems)
    // Para simplificar, hardcodeado o calcular de menuItems
    // Asumiendo que son fijos, pero podríamos importarlos
    const totalPlatos = 5 + 5 + 3 + 5; // entradas + fuertes + postres + bebidas
    document.querySelector('.tarjeta-admin:nth-child(4) .num-admin').textContent = totalPlatos;
}

/**
 * Carga y muestra los pedidos en la tabla de pedidos
 */
function mandarPedido() {
    if (!tablaPedidos) {
        return;
    }

    // Limpiar tabla antes de cargar
    tablaPedidos.innerHTML = '';

    let pedidosJson = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidosJson.forEach(pedido => {
        // Para cada plato en el pedido, crear una fila
        pedido.platos.forEach(plato => {
            const fila = `
            <tr>
                <td>${pedido.numeroPedido}</td>
                <td>${pedido.nombre}</td>
                <td>${plato.nombre}</td>
                <td>${plato.cantidad}</td>
                <td>$${plato.subtotal}</td>
                <td>${pedido.estado}</td>
            </tr>
            `;
            tablaPedidos.insertAdjacentHTML("beforeend", fila);
        });
    });
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
        <td>${reserva.edades.join(", ")}</td>
        <td>${reserva.estado}</td>
    </tr>
    `;
        tablaReservas.insertAdjacentHTML("beforeend", fila);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    actualizarMetricas();
    mandarPedido();
    mandarReservas();
});