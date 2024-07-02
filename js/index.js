function calcularCosto() {
    // Aca obtenemos los valores de los campos de entrada del formulario usando el DOM
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const dimensiones = document.getElementById("dimensiones").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const usuario = document.getElementById("usuario").value;
    const dni = document.getElementById("dni").value;
    const tipoEnvio = document.getElementById("tipoEnvio").value;
    const valorDeclarado = parseFloat(document.getElementById("valorDeclarado").value);

    // Aca tenemos un Objeto que almacena los costos base según el tipo de envío
    const costosEnvio = {
        expreso: 30,
        urgente: 60,
        normal: 7
    };

    // Calculamos el costo de base sumando varios factores
    let costoBase = costosEnvio[tipoEnvio] + (peso * 0.5) + (valorDeclarado * 0.02);

    // Convertimos los valores de una cadena de texto a numero
    const dimensionesArray = dimensiones.split("x").map(Number);

    // Verificamos que el array de dimensiones tenga las tres medidas (Largo, Ancho, Alto)
    if (dimensionesArray.length === 3) {
        let volumen = 1;
        // Bucle para calcular el volumen multiplicando las dimensiones
        for (let dimension of dimensionesArray) {
            volumen *= dimension;
        }
        // Añadimos un costo adicional basandonos en el volumen
        costoBase += volumen * 0.001;
    } else {
        // Muestramos una alerta si las dimensiones no están en el formato correcto
        alert("Las dimensiones deben ser en el formato Largo x Ancho x Alto en cm, por ejemplo, 30x20x15.");
        return; // Termina la función si las dimensiones no son correctas
    }

    // Usamos setTimeout para mostrar el resultado después de 3 segundos (3000 ms). con esto vamos a simular como si se tardara analizando los datos. XD
    setTimeout(() => {
        //  div donde se mostrará el resultado
        const resultadoDiv = document.getElementById("resultado");
        // Insertamos el resultado en el div usando innerHTML
        resultadoDiv.innerHTML = `
            <p><strong>Origen:</strong> ${origen}</p>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Dimensiones:</strong> ${dimensiones}</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Usuario:</strong> ${usuario}</p>
            <p><strong>DNI:</strong> ${dni}</p>
            <p><strong>Tipo de Envío:</strong> ${tipoEnvio}</p>
            <p><strong>Valor Declarado:</strong> $${valorDeclarado}</p>
            <p><strong>Costo Total:</strong> $${costoBase.toFixed(2)}</p>
        `;
    }, 3000);
}


// termina el codigo y solo queda rogar que el profe me apruebe con optimo.