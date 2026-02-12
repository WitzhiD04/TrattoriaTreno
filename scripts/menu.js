import { menuItems } from "./menuItems.js"

const tablaEntradas = document.querySelector("#tbl-entradas table tbody");
const tablaFuertes = document.querySelector("#tbl-fuertes table tbody");
const tablaPostres = document.querySelector("#tbl-postres table tbody");
const tablaBebidas = document.querySelector("#tbl-bebidas table tbody");


const catEntradas = menuItems.entradas; 
const catFuertes = menuItems.fuertes; 
const catPostres = menuItems.postres; 
const catBebidas = menuItems.bebidas; 

const searchBar = document.querySelector("#searchBar");
const categorySelect = document.querySelector("#categorySelect");
const byName = document.querySelector("#byName");
const byCat = document.querySelector("#byCat");

function renderResults(results){

    results.entradas.forEach(ent => {
        const fila = `
        <tr>
            <td>${ent.codigo}</td>
            <td>${ent.plato}</td>
            <td>${ent.descripcion}</td>
            <td>$ ${ent.precio}</td>
            <td>${ent.alergenos.join(", ")}</td>
        </tr>`;
        tablaEntradas.insertAdjacentHTML("beforeend", fila);
    });

    results.fuertes.forEach(ent => {
        const fila = `
        <tr>
            <td>${ent.codigo}</td>
            <td>${ent.plato}</td>
            <td>${ent.descripcion}</td>
            <td>$ ${ent.precio}</td>
            <td>${ent.alergenos.join(", ")}</td>
        </tr>`;
        tablaFuertes.insertAdjacentHTML("beforeend", fila);
    });

    results.postres.forEach(ent => {
        const fila = `
        <tr>
            <td>${ent.codigo}</td>
            <td>${ent.plato}</td>
            <td>${ent.descripcion}</td>
            <td>$ ${ent.precio}</td>
            <td>${ent.alergenos.join(", ")}</td>
        </tr>`;
        tablaPostres.insertAdjacentHTML("beforeend", fila);
    });

    results.bebidas.forEach(ent => {
        const fila = `
        <tr>
            <td>${ent.codigo}</td>
            <td>${ent.plato}</td>
            <td>${ent.descripcion}</td>
            <td>$ ${ent.precio}</td>
            <td>${ent.observaciones}</td>
        </tr>`;
        tablaBebidas.insertAdjacentHTML("beforeend", fila);
    });
}


function loadAll(){
    catEntradas.forEach(
        (ent)=>{
            const fila = `
            <tr>
                <td>${ent.codigo}</td>
                <td>${ent.plato}</td>
                <td>${ent.descripcion}</td>
                <td>$ ${ent.precio}</td>
                <td>${
                    ent.alergenos.join(", ")
                }</td>
            </tr>
            `;
            tablaEntradas.insertAdjacentHTML("beforeend", fila);
        }
    )
    catFuertes.forEach(
        (ent)=>{
            const fila = `
            <tr>
                <td>${ent.codigo}</td>
                <td>${ent.plato}</td>
                <td>${ent.descripcion}</td>
                <td>$ ${ent.precio}</td>
                <td>${
                    ent.alergenos.join(", ")
                }</td>
            </tr>
            `;
            tablaFuertes.insertAdjacentHTML("beforeend", fila);
        }
    )
    catPostres.forEach(
        (ent)=>{
            const fila = `
            <tr>
                <td>${ent.codigo}</td>
                <td>${ent.plato}</td>
                <td>${ent.descripcion}</td>
                <td>$ ${ent.precio}</td>
                <td>${
                    ent.alergenos.join(", ")
                }</td>
            </tr>
            `;
            tablaPostres.insertAdjacentHTML("beforeend", fila);
        }
    )
    catBebidas.forEach(
        (ent)=>{
            const fila = `
            <tr>
                <td>${ent.codigo}</td>
                <td>${ent.plato}</td>
                <td>${ent.descripcion}</td>
                <td>$ ${ent.precio}</td>
                <td>${
                    ent.observaciones
                }</td>
            </tr>
            `;
            tablaBebidas.insertAdjacentHTML("beforeend", fila);
        }
    )
    
}

function emptyTables(){
    tablaBebidas.innerHTML = "";
    tablaEntradas.innerHTML = "";
    tablaFuertes.innerHTML = "";
    tablaPostres.innerHTML = "";
}

function queryByName(query){
    return {
        entradas: catEntradas.filter(
            e => e.plato.toLocaleLowerCase().includes(query)
        ),
        fuertes: catFuertes.filter(
            e => e.plato.toLocaleLowerCase().includes(query)
        ),
        postres: catPostres.filter(
            e => e.plato.toLocaleLowerCase().includes(query)
        ),
        bebidas: catBebidas.filter(
            e => e.plato.toLocaleLowerCase().includes(query)
        )
    }
}

function queryByCategory(category){
    switch(category){
        case "entradas":
            return { entradas: catEntradas, fuertes: [], postres: [], bebidas: [] };
        case "fuertes":
            return { entradas: [], fuertes: catFuertes, postres: [], bebidas: [] };
        case "postres":
            return { entradas: [], fuertes: [], postres: catPostres, bebidas: [] };
        case "bebidas":
            return { entradas: [], fuertes: [], postres: [], bebidas: catBebidas };
        default:
            return { entradas: [], fuertes: [], postres: [], bebidas: [] };
    }
}

function nameSearch(query){
    const found = queryByName(query.trim()) || `No encontrado`;
    
}



document.addEventListener("DOMContentLoaded", ()=>{
    loadAll();
})

searchBar.addEventListener('input', (e)=>{
    if(!byName.checked) return;
    const query = e.target.value.trim().toLocaleLowerCase();
    emptyTables();
    if(query === ""){
        loadAll();
        return;
    }
    const res = queryByName(query);
    renderResults(res);
})

categorySelect.addEventListener("change", e =>{
    if(!byCat.checked) return;
    const category = e.target.value;
    emptyTables();
    if(category === "Todo"){
        loadAll();
        return;
    }
    const res = queryByCategory(category);
    renderResults(res);
})

byName.addEventListener("change", e =>{
    searchBar.disabled = false;
    categorySelect.disabled = true;
    searchBar.value = "";
    emptyTables();
    loadAll();
})

byCat.addEventListener("change", e =>{
    searchBar.disabled = true;
    categorySelect.disabled = false;
    categorySelect.value = "Todo";
    emptyTables();
    loadAll();
})