var snackbar;

function inicializar_snackbar() {
    snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
}

function mensaje(mensaje, timeout) {
    var tiempoQueDura = 2750;
    if (typeof timeout !== 'undefined') {
        tiempoQueDura = timeout;
    }

    var data = {
        message: mensaje.toUpperCase(),
        timeout: tiempoQueDura,
        actionText: "CERRAR",
        actionHandler: function () {
            // accion al cerrar
        }
    };

    snackbar.show(data);
}