/**
 * reserva.js
 * Gestión de reservas de mesas en Trattoria Treno
 * Funcionalidades: validación, almacenamiento en localStorage y confirmación
 */

const reservaForm = document.querySelector("#form-reserva");
const confirmacionReserva = document.querySelector("#confirmacion-reserva");

/**
 * Constructor para objetos de reserva
 */
function Reserva(nombre, fecha, personas, edades, evento) {
    this.numeroReserva = this.generarNumeroReserva();
    this.nombre = nombre;
    this.fecha = fecha;
    this.personas = personas;
    this.edades = edades;
    this.evento = evento;
    this.estado = "Confirmada";
    this.fechaRegistro = new Date().toLocaleDateString('es-CO');
}

/**
 * Genera un número de reserva único
 */
Reserva.prototype.generarNumeroReserva = function() {
    return `RES-${Date.now()}`;
};

/**
 * Valida que la fecha sea futura
 */
function validarFecha(fecha) {
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    return fechaIngresada >= hoy;
}

/**
 * Obtiene los valores seleccionados del select múltiple
 */
function obtenerEdadesSeleccionadas() {
    const selectEdades = document.querySelector("#res-edades");
    const opcionesSeleccionadas = Array.from(selectEdades.selectedOptions);
    return opcionesSeleccionadas.map(option => option.textContent);
}

/**
 * Obtiene la mesa disponible (simulado)
 */
function obtenerMesaDisponible() {
    const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return mesas[Math.floor(Math.random() * mesas.length)];
}

/**
 * Maneja el envío del formulario de reserva
 */
function procesarReserva() {
    if (!reservaForm) {
        return;
    }

    reservaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = reservaForm.elements['nombre'].value.trim();
        const fecha = reservaForm.elements['fecha'].value;
        const personas = parseInt(reservaForm.elements['personas'].value);
        const edades = obtenerEdadesSeleccionadas();
        const evento = reservaForm.elements['evento'].value;
        console.log(`Datos ingresados: ${nombre}, ${fecha}, ${personas} personas, edades: ${edades.join(", ")}, evento: ${evento}`);

        // Validar que se hayan seleccionado edades
        if (edades.length === 0) {
            alert("⚠️ Por favor selecciona al menos una categoría de edad");
            return;
        }

        // Validar fecha futura
        if (!validarFecha(fecha)) {
            alert("⚠️ La fecha debe ser a partir de hoy");
            return;
        }

        // Crear objeto de reserva
        const nuevaReserva = new Reserva(nombre, fecha, personas, edades, evento);
        nuevaReserva.mesa = obtenerMesaDisponible();

        // Guardar en localStorage
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push(nuevaReserva);
        localStorage.setItem("reservas", JSON.stringify(reservas));

        // Mostrar confirmación
        mostrarConfirmacion(nuevaReserva);

        // Limpiar formulario
        reservaForm.reset();
    });
}

/**
 * Muestra un mensaje de confirmación de reserva
 */
function mostrarConfirmacion(reserva) {
    const fechaFormato = new Date(reserva.fecha).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const mensaje = `
         ¡Reserva confirmada!\n
         Número: ${reserva.numeroReserva}\n
         Cliente: ${reserva.nombre}\n
         Fecha: ${fechaFormato}\n
         Mesa: ${reserva.mesa}\n
         Personas: ${reserva.personas}\n
         Evento: ${reserva.evento}
    `;

    // Mostrar en la página
    confirmacionReserva.style.color = "#29b846";
    confirmacionReserva.style.fontWeight = "bold";
    confirmacionReserva.style.marginTop = "20px";
    confirmacionReserva.style.padding = "15px";
    confirmacionReserva.style.backgroundColor = "#e8f5e9";
    confirmacionReserva.style.borderRadius = "8px";
    confirmacionReserva.style.whiteSpace = "pre-line";
    confirmacionReserva.textContent = mensaje;

    // Mostrar alerta
    alert(mensaje);

    console.log("Reserva guardada:", reserva);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    procesarReserva();
});
