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

document.addEventListener("DOMContentLoaded", ()=>{
    mandarPedido();
});