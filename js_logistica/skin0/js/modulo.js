var modulo;
var usuario;
var base_url;
var rtimeContainer;
var timeoutContainer = false;
var deltaContainer = 200;

// variables globales
function inicializar_modulo(modulo_cargado, usuario_cargado, base_url_sistema) {
    modulo = modulo_cargado;
    usuario = usuario_cargado;
    base_url = base_url_sistema;

    // tamaño global: ajustamos el tamaño de todo el contenido, cuando cambia de tamaño la ventana
    $(window).resize(function () {
        rtimeContainer = new Date();
        if (timeoutContainer === false) {
            timeoutContainer = true;
            setTimeout(resizeContainerEnd, deltaContainer);
        }
    });

}

// cuando se termina de ajustar el tamaño de la ventana
function resizeContainerEnd() {
    if (new Date() - rtimeContainer < deltaContainer) {
        setTimeout(resizeContainerEnd, deltaContainer);
    } else {
        timeoutContainer = false;
        refrescarTamanioDelContainer();
    }
}

// refrescar el tamaño del contenido de la ventana
function refrescarTamanioDelContainer() {
    var pagina_altura = $(document).height();
    var toolbar_altura = $("#toolbar").height();
    var celda_izquierda_card = $('div[name="celda-izquierda-header"]').height();

    $('div[name="modulo-container"]').height(pagina_altura - toolbar_altura);
    $('div[name="celda-izquierda"] .panel').height(pagina_altura - toolbar_altura - celda_izquierda_card);
    refrescarTamanioDelMapa();
}