$(() => {
    const desplegable = $('.desplegable select'),
        btnConversion = $('#convertir'),
        monedaInicial = $('.inicial select'),
        monedaFinal = $('.final select'),
        tipoCambio = $('.tipoCambio p'),
        equivalencia = $('.equivalencia p'),
        iconoCambio = $('form .icono')


//Asignando la moneda predeterminada para cada selector al iniciar el simulador
    desplegable.each((index, element) => {

        for (const codMoneda in codPais) {
            let predet;

            if (index == 0) {
                predet = codMoneda == 'ARS' ? 'selected' : '';
            } else if (index == 1) {
                predet = codMoneda == 'USD' ? 'selected' : '';
            }

            let optionHTML = `<option value="${codMoneda}" ${predet}>${codMoneda}</option>`;
            $(element).append(optionHTML);
        }

    })

    //Asignando la funcion de convertir al boton
    btnConversion.on('click', function (event) {
        event.preventDefault();
        convertir();
    })

    //Guardo la URL de la API con los valores de cambio, y le paso el valor inicial elegido
    let URL = `https://v6.exchangerate-api.com/v6/78ebf190f1e57d5cf73fea9e/latest/${monedaInicial.val()}`

    function convertir() {
        let monto = $('.monto input');
        let montoAConvertir = monto.val();

        if (montoAConvertir == '' || montoAConvertir == '0') {
            monto.val('1')
            montoAConvertir = 1;
        }

        /*  fetch(URL).then(response => response.json())
        .then(result => {
            console.log(result.conversion_rates);
         }) */

        $.ajax({
            type: 'GET',
            url: URL,
            success: (response) => {
                let tipo = response.conversion_rates[monedaFinal.val()];
                let resultado = (montoAConvertir * tipo).toFixed(2);
                tipoCambio.html(`1 ${monedaInicial.val()} = ${tipo} ${monedaFinal.val()}`);
                equivalencia.html(`${montoAConvertir} ${monedaInicial.val()} = ${resultado} ${monedaFinal.val()}`);
            },
            error: () => {
                tipoCambio.html(`Hubo un error al procesar tu solicitud. Intenta nuevamente.`)
            }
        });
    }
})
/* Fin de JQuery */