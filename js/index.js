function calcularCosto() {
    const origenEnvio = document.getElementById("origenEnvio").value;
    const destinoEnvio = document.getElementById("destinoEnvio").value;
    const dimensionesPaquete = document.getElementById("dimensionesPaquete").value;
    const pesoPaquete = parseFloat(document.getElementById("pesoPaquete").value);
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const dniUsuario = document.getElementById("dniUsuario").value;
    const tipoEnvio = document.getElementById("tipoEnvio").value;
    const valorDeclarado = parseFloat(document.getElementById("valorDeclarado").value);

    const costosEnvio = {
        expreso: 30,
        urgente: 60,
        normal: 7
    };

    let costoBase = costosEnvio[tipoEnvio] + (pesoPaquete * 0.5) + (valorDeclarado * 0.02);

    const dimensionesArray = dimensionesPaquete.split("x").map(Number);

    if (dimensionesArray.length === 3) {
        let volumen = 1;
        for (let dimension of dimensionesArray) {
            volumen *= dimension;
        }
        costoBase += volumen * 0.001;
    } else {
        alert("Las dimensiones deben ser en el formato Largo x Ancho x Alto en cm, por ejemplo, 30x20x15.");
        return;
    }

    setTimeout(() => {
        const resultadoDiv = document.getElementById("resultadoCosto");
        resultadoDiv.innerHTML = `
            <p><strong>Origen:</strong> ${origenEnvio}</p>
            <p><strong>Destino:</strong> ${destinoEnvio}</p>
            <p><strong>Dimensiones:</strong> ${dimensionesPaquete}</p>
            <p><strong>Peso:</strong> ${pesoPaquete} kg</p>
            <p><strong>Usuario:</strong> ${nombreUsuario}</p>
            <p><strong>DNI:</strong> ${dniUsuario}</p>
            <p><strong>Tipo de Envío:</strong> ${tipoEnvio}</p>
            <p><strong>Valor Declarado:</strong> $${valorDeclarado}</p>
            <p><strong>Costo Total:</strong> $${costoBase.toFixed(2)}</p>
        `;
        almacenarDatos({
            origenEnvio,
            destinoEnvio,
            dimensionesPaquete,
            pesoPaquete,
            nombreUsuario,
            dniUsuario,
            tipoEnvio,
            valorDeclarado,
            costoBase
        });
    }, 3000);
}

function almacenarDatos(datos) {
    let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    cotizaciones.push(datos);
    localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
}

function mostrarCotizaciones() {
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    const cotizacionesDiv = document.getElementById('cotizacionesAnteriores');

    if (cotizaciones.length === 0) {
        cotizacionesDiv.innerHTML = '<p>No hay cotizaciones anteriores.</p>';
    } else {
        cotizacionesDiv.innerHTML = cotizaciones.map(cotizacion => `
            <div class="cotizacion">
                <p><strong>Origen:</strong> ${cotizacion.origenEnvio}</p>
                <p><strong>Destino:</strong> ${cotizacion.destinoEnvio}</p>
                <p><strong>Dimensiones:</strong> ${cotizacion.dimensionesPaquete}</p>
                <p><strong>Peso:</strong> ${cotizacion.pesoPaquete} kg</p>
                <p><strong>Usuario:</strong> ${cotizacion.nombreUsuario}</p>
                <p><strong>DNI:</strong> ${cotizacion.dniUsuario}</p>
                <p><strong>Tipo de Envío:</strong> ${cotizacion.tipoEnvio}</p>
                <p><strong>Valor Declarado:</strong> $${cotizacion.valorDeclarado}</p>
                <p><strong>Costo Total:</strong> $${cotizacion.costoBase.toFixed(2)}</p>
            </div>
        `).join('');
    }
}

window.addEventListener('load', () => {
    const formulario = document.getElementById('formularioEnvio');
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        calcularCosto();
    });
});
