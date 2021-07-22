var toolbar_principal;
var celdaIzquierdaVisible;

function inicializar_toolbar() {
    toolbar_principal = window.basicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#basic-tab-bar'));

    switch (modulo) {
        case "rastreo":
            toolbar_principal.activeTabIndex = 0;
            break;
        case "logistica":
            toolbar_principal.activeTabIndex = 1;
            break;
        default:
            break;
    }

    // guardar el estado de la celda izquierda
    document.querySelector('#abrir-menu-derecho').addEventListener('click', function () {
        $('div[name="celda-izquierda"]').toggleClass("active");
        refrescarTamanioDelMapa();

        clearTimeout(celdaIzquierdaVisible);
        celdaIzquierdaVisible = setTimeout(function () {
            if ($('div[name="celda-izquierda"]').hasClass("active")) {
                guardarPropiedadCSS("celda_izquierda_visible", "active");
            } else {
                guardarPropiedadCSS("celda_izquierda_visible", " ");
            }
        }, 5000);
    });
}