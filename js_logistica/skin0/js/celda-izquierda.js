var guardarPanelElegidoLogistica;
var rtime;
var timeout = false;
var delta = 200;

function inicializar_celdaizquierda() {
    // cada vez que el usuario toca un boton del tab bar de la celda izquierda
    $('div[name="celda-izquierda"] section[name="tabs-botones"]').on('click', 'button', function () {
        var button = $(this);
        var panel = button.attr("data-controls");

        // cerrar formularios de abm al cambiar el panel
        $.each($("div[id^='panel-'][id$='-abm']"), function () {
            cerrarPanel($(this).attr("id"));
        });

        $('div[name="celda-izquierda"] section[name="tabs-botones"] > button').removeClass("mdc-button--raised");
        button.addClass("mdc-button--raised");
        cambiarPanelElegido('div[name="celda-izquierda"]', panel);

        clearTimeout(guardarPanelElegidoLogistica);
        guardarPanelElegidoLogistica = setTimeout(function () {
            // recordamos el ultimo listado que eligio el usuario
            guardarPropiedadCSS(modulo + "_panel_elegido", panel);
        }, 5000);
    });

    // cuando cambia de tamaño la ventana    
    $('div[name="celda-izquierda"]').resizable({
        handles: 'e'
    }).on('resize', function (e) {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
        e.stopPropagation();
        refrescarTamanioDelMapa();
    });
}

var celdaIzquierdaAncho;

// cuando termina de mover guardamos el tamaño de la celda izquierda
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;

        var ancho_celda_izquierda = $("#celda-izquierda").width() + "px";
        clearTimeout(celdaIzquierdaAncho);
        celdaIzquierdaAncho = setTimeout(function () {
            guardarPropiedadCSS("celda_izquierda_ancho", ancho_celda_izquierda);
        }, 5000);
    }
}

// activa el panel seleccionado y desactiva los demas, dentro de un container
function cambiarPanelElegido(container, panel) {
    var panels = document.querySelector(container + ' .panels');

    var activePanel = panels.querySelector(container + ' .panel.active');
    if (activePanel) {
        activePanel.classList.remove('active');
    }

    var newActivePanel = panels.querySelector(panel);
    if (newActivePanel) {
        newActivePanel.classList.add('active');
    }
}