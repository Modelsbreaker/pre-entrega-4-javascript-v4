const RACIONES_POR_DIA = 3;

let provisionesExpedicion = ["agua", "pan", "carne seca", "queso", "frutas secas"];


function calcularRaciones(cantidadViajeros, diasViaje, racionesPorDia) {
    return cantidadViajeros * diasViaje * racionesPorDia + cantidadViajeros;
}

let calcularCosto = (totalRaciones, precioRacion) => totalRaciones * precioRacion;

let mostrarResultado = function (nombre, cantidadViajeros, diasViaje, totalRaciones, costoTotal, listaProvisiones) => {
    let evaluacionCosto = "";

    if (costoTotal <= 500) {
        evaluacionCosto = "La expedición tiene un costo bajo.";
    } else if (costoTotal <= 1000) {
        evaluacionCosto = "La expedición tiene un costo moderado.";
    } else {
        evaluacionCosto = "La expedición tiene un costo elevado.";
    }

    alert(
        "Expedición de " + nombre + ":\n" +
        "Viajeros: " + cantidadViajeros + "\n" +
        "Duración: " + diasViaje + " días\n" +
        "Raciones necesarias: " + totalRaciones + "\n" +
        "Costo total: " + costoTotal + " coronas.\n" +
        "Provisiones en la lista: " + listaProvisiones.length + "\n" +
        evaluacionCosto
    );
};

function listarProvisiones(lista){
    console.log("--- Provisiones de la expedicion ---");
    let indice = 0;

    for (let provision of lista){
        console.log("indice " + indice + " | Provision: " + provision);
        indice++;
    }
    console.log("total: " + lista.length + " provisiones.")
}

function gestionarProvisiones(lista) {

    let opcion = "";
    listarProvisiones(lista);

    while (opcion !== null && opcion !== "0"){
        opcion = prompt(
            "preparacion de provisiones:\n" +
            "1 - Agregar una provision al final\n" +
            "2 - Retirar la ultima provision\n" +
            "3 - Buscar una provision\n" +
            "4 - Reemplazar una provision por indice\n" +
            "5 - Listar provisiones en la consola \n" +
            "0 - Terminar la preparacion y calcular\n\n" +
            "Los Indices comienzan en 0. Abri la consola con F12 para ver la lista"
        );

        if (opcion !== null){
            opcion = opcion.trim();
            switch (opcion) {
                case "1": {
                    let nuevaProvision = prompt ("¿Que provision queres agregar?");

                    if (nuevaProvision !== null){
                        nuevaProvision = nuevaProvision.trim().toLowerCase();

                        if (nuevaProvision === ""){
                            alert("ingresa el nombre de una provision.");
                        } else if (lista.includes(nuevaProvision)) {
                            alert("esa provision ya esta en la lista.");
                        } else {
                            lista.push(nuevaProvision);
                            alert("se agrego al final: " + nuevaProvision);
                        }
                    }
                    break;
                }
                case "2": {
                    if (lista.length > 0) {
                        let provisionRetirada = lista.pop();
                        alert("se ha eliminado el elemento: " + provisionRetirada);
                    } else {
                        alert("la lista esta vacia. No hay provisiones para retirar.");
                    }
                    break;
                }
                case "3": {
                    let provisionBuscada = prompt("¿Que provision queres buscar?");

                    if (provisionBuscada !== null) {
                        provisionBuscada = provisionBuscada.trim().toLowerCase();
                        if (provisionBuscada === ""){
                            alert("Ingresa el nombre de una provision.");
                        } else if (lista.includes(provisionBuscada)){
                            let posicion = lista.indexOf(provisionBuscada);
                            alert("La provision " + provisionBuscada + " esta en el indice" + posicion + ".");
                        } else {
                            alert("La provision " + provisionBuscada + " no esta en la lista.");
                        }
                    }
                    break;
                }

                case "4": {
                    if (lista.length === 0) {
                        alert("La lista esta vacia. Agrega una provision antes de reemplazar.");
                        break;
                    }

                    listarProvisiones(lista);
                    let indiceIngresado = prompt("ingresa el indice de la provision que queres reemplazar:");

                    if (indiceIngresado !== null) {
                        let indice = Number(indiceIngresado);

                        if (
                            indiceIngresado.trim() === "" ||
                            isNaN(indice) ||
                            indice % 1  !== 0 ||
                            indice < 0 ||
                            indice >= lista.length
                        ) {
                            alert("indice no es valido. elegi uno que exista en la lista.");
                        } else {
                            let nuevaProvision = prompt("¿Cual es la nueva provision?");

                            if (nuevaProvision !== null) {
                                nuevaProvision = nuevaProvision.trim().toLowerCase();

                                if (nuevaProvision !== null) {
                                    alert("Ingresa el nombre de una provision.");
                                } else if (lista.includes(nuevaProvision) && lista.indexOf(nuevaProvision) !== indice) {
                                    alert("Esa provision ya existe en otra posicion.");
                                } else {
                                    let provisionAnterior = lista[indice];
                                    lista.splice(indice, 1, nuevaProvision);
                                    alert("Se reemplazo " + provisionAnterior + " por " + nuevaProvision  + ".");
                                }
                            }
                        }
                    }
                    break;
                }
                case "5":
                    listarProvisiones(lista);
                    break;

                    case "0":
                        break;

                    default:
                        alert("Opcion no valida. elegi un numero del 0 al 5.");
            }
        }
    }
}


let expedicionesCalculadas = 0;
let nombre = prompt(
    "Ingresá el nombre del líder de la expedición o escribí ESC para salir:"
);

while (nombre !== null && nombre.trim().toUpperCase() !== "ESC") {
    if (nombre.trim() === "") {
        alert("Ingresá un nombre para el líder de la expedición.");
    } else {
        let cantidadViajeros = Number(
            prompt("¿Cuántos viajeros forman el grupo? Ingresá un número entero positivo.")
        );

        let diasViaje = Number(
            prompt("¿Cuántos días durará la expedición? Ingresá un número entero positivo.")
        );

        let precioRacion = Number(
            prompt("¿Cuánto cuesta cada ración? Usá punto para los decimales.")
        );

        if (
            isNaN(cantidadViajeros) ||
            isNaN(diasViaje) ||
            isNaN(precioRacion) ||
            cantidadViajeros % 1 !== 0 ||
            diasViaje % 1 !== 0 ||
            cantidadViajeros <= 0 ||
            diasViaje <= 0 ||
            precioRacion <= 0
        ) {
            alert("Los datos no son válidos. Viajeros y días deben ser enteros positivos; el precio debe ser un número positivo.");
        } else {
            gestionarProvisiones(provisionesExpedicion);
            
            let totalRaciones = calcularRaciones(
                cantidadViajeros,
                diasViaje,
                RACIONES_POR_DIA
            );

            let costoTotal = calcularCosto(totalRaciones, precioRacion);

            console.log("Reporte de provisiones para " + nombre.trim() + ":");
            listarProvisiones(provisionesExpedicion);

            mostrarResultado(nombre.trim(), cantidadViajeros, diasViaje, totalRaciones, costoTotal, provisionesExpedicion);
            expedicionesCalculadas++;
        }
    }

    nombre = prompt(
        "Ingresá otro líder para realizar una nueva simulación o escribí ESC para salir:"
    );
}

console.log("Expediciones calculadas correctamente: " + expedicionesCalculadas);
alert("Simulador finalizado.");