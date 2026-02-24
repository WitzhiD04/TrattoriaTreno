import { menuItems } from "../scripts/menuItems.js";

const listaPlatos = document.querySelector("#plato-select");
const pedidoForm = document.querySelector("#form-pedido");
const numPlatosInput = document.querySelector("#num-platos");
const platosContainer = document.querySelector("#platos-container");
const precioTotalElement = document.querySelector("#precio");

const platos = menuItems;

console.table(platos)

/**
 * Constructor para objetos de pedido
 */
function Pedido(nombre, platos, precioTotal) {
    this.numeroPedido = this.generarNumeroPedido();
    this.nombre = nombre;
    this.platos = platos; // Array de {codigo, cantidad, precioUnitario, nombre}
    this.precioTotal = precioTotal;
    this.estado = "En preparación";
    this.fechaRegistro = new Date().toLocaleDateString('es-CO');
}

/**
 * Genera un número de pedido único
 */
Pedido.prototype.generarNumeroPedido = function() {
    return `PED-${Date.now()}`;
};

/**
 * Crea opciones para el select de platos
 */
function crearOpcionesPlato() {
    let opciones = '<option value="">-- Seleccione --</option>';
    [...platos.entradas, ...platos.fuertes, ...platos.bebidas, ...platos.postres].forEach(plato => {
        opciones += `<option value="${plato.codigo}">${plato.plato} - $${plato.precio}</option>`;
    });
    return opciones;
}

/**
 * Crea un elemento de plato (select y cantidad)
 */
function crearElementoPlato(index) {
    const div = document.createElement('div');
    div.className = 'plato-item';
    div.innerHTML = `
        <div class="grupo-form">
            <label for="plato-${index}">Plato ${index + 1}</label>
            <select id="plato-${index}" name="plato-${index}" required>
                ${crearOpcionesPlato()}
            </select>
        </div>
        <div class="grupo-form">
            <label for="cantidad-${index}">Cantidad</label>
            <input type="number" id="cantidad-${index}" name="cantidad-${index}" min="1" value="1" required/>
        </div>
    `;
    return div;
}

/**
 * Actualiza los platos dinámicos basados en el número
 */
function actualizarPlatos() {
    const numPlatos = parseInt(numPlatosInput.value) || 0;
    platosContainer.innerHTML = ''; // Limpiar
    for (let i = 0; i < numPlatos; i++) {
        const elementoPlato = crearElementoPlato(i);
        platosContainer.appendChild(elementoPlato);
    }
    calcularTotal(); // Recalcular total
}

/**
 * Calcula el precio total del pedido
 */
function calcularTotal() {
    let total = 0;
    const numPlatos = parseInt(numPlatosInput.value) || 0;
    for (let i = 0; i < numPlatos; i++) {
        const selectPlato = document.querySelector(`#plato-${i}`);
        const inputCantidad = document.querySelector(`#cantidad-${i}`);
        if (selectPlato && inputCantidad) {
            const codigo = selectPlato.value;
            const cantidad = parseInt(inputCantidad.value) || 0;
            if (codigo && cantidad > 0) {
                const plato = [...platos.entradas, ...platos.fuertes, ...platos.bebidas, ...platos.postres].find(p => p.codigo === codigo);
                if (plato) {
                    total += plato.precio * cantidad;
                }
            }
        }
    }
    precioTotalElement.textContent = `Precio total: $ ${total}`;
}

/**
 * Valida el formulario
 */
function validarPedido() {
    const numPlatos = parseInt(numPlatosInput.value) || 0;
    if (numPlatos < 1) {
        alert("⚠️ Debe seleccionar al menos 1 plato");
        return false;
    }
    let alMenosUno = false;
    for (let i = 0; i < numPlatos; i++) {
        const selectPlato = document.querySelector(`#plato-${i}`);
        const inputCantidad = document.querySelector(`#cantidad-${i}`);
        if (selectPlato.value && (parseInt(inputCantidad.value) || 0) > 0) {
            alMenosUno = true;
        }
    }
    if (!alMenosUno) {
        alert("⚠️ Debe seleccionar al menos un plato con cantidad mayor a 0");
        return false;
    }
    return true;
}

/**
 * Maneja el envío del formulario de pedido
 */
function procesarPedido() {
    if (!pedidoForm) {
        return;
    }

    pedidoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validarPedido()) {
            return;
        }

        const nombre = pedidoForm.elements['codigo'].value.trim();
        const numPlatos = parseInt(numPlatosInput.value);
        const platosSeleccionados = [];

        for (let i = 0; i < numPlatos; i++) {
            const selectPlato = document.querySelector(`#plato-${i}`);
            const inputCantidad = document.querySelector(`#cantidad-${i}`);
            const codigo = selectPlato.value;
            const cantidad = parseInt(inputCantidad.value);
            if (codigo && cantidad > 0) {
                const plato = [...platos.entradas, ...platos.fuertes, ...platos.bebidas, ...platos.postres].find(p => p.codigo === codigo);
                if (plato) {
                    platosSeleccionados.push({
                        codigo: plato.codigo,
                        nombre: plato.plato,
                        cantidad: cantidad,
                        precioUnitario: plato.precio,
                        subtotal: plato.precio * cantidad
                    });
                }
            }
        }

        const precioTotal = platosSeleccionados.reduce((sum, p) => sum + p.subtotal, 0);
        const nuevoPedido = new Pedido(nombre, platosSeleccionados, precioTotal);

        // Guardar en localStorage
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        pedidos.push(nuevoPedido);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        alert(`Pedido confirmado!\nNúmero: ${nuevoPedido.numeroPedido}\nTotal: $${precioTotal}`);

        // Limpiar formulario
        pedidoForm.reset();
        actualizarPlatos(); // Resetear platos dinámicos
    });
}

// Eventos
numPlatosInput.addEventListener('input', actualizarPlatos);
platosContainer.addEventListener('change', calcularTotal); // Para selects y cantidades

document.addEventListener("DOMContentLoaded", () => {
    actualizarPlatos(); // Inicializar con 1 plato
    procesarPedido();
});
