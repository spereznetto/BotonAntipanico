/* ------------------------------------------------ */
/* FUNCIONES QUE ACTUAN SOBRE UN ITEM DE UN LISTADO */
/* ------------------------------------------------ */

function inicializar_listado_items() {
    // listados cuyos items (li) son clickables
    init_item_clickable();

    // boton de editar el item
    init_btn_editar();

    // boton buscar
    init_btn_buscar_en_mapa();

    // boton quitar del listado
    init_btn_quitar();

    // boton colapsable (ver mas)
    init_btn_colapsable();

    // checkbox agregar item al mapa
    init_chk_en_mapa();
}

// checkbox para agregar/quitar un item del mapa
function init_chk_en_mapa() {
    $('ul[name="listado-de-items"]').on('change sin_centrar sin_guardar sin_centrar_sin_guardar', 'input[type="checkbox"][name="chk_agregar_al_mapa"]', function (e) {
        var chkCaller = $(this);
        var item_id = chkCaller.val();
        var listado_container = chkCaller.closest('ul[name="listado-de-items"]');
        var controlador = listado_container.attr("data-controlador");
        var liParent = chkCaller.closest("li");
        var loadingGif = liParent.find("div[name='item-loading-gif']");
        var btnBuscar = liParent.find("i.listado-item-boton-buscar");

        // deshabilitar el caller hasta terminar el proceso
        chkCaller.prop("disabled", true);

        // mostrar un loading gif
        loadingGif.css("display", "flex");

        // al terminar el proceso
        var onComplete = function () {
            // habilitamos nuevamente el caller
            chkCaller.prop("disabled", false);

            // ocultamos el loading gif
            loadingGif.css("display", "none");
        };

        // true si hay que centrar el mapa en el item agregado o fasle caso contrario.
        var flag_centrar = true;
        // true si hay que guardar en la base de datos que el item esta agregado al mapa o false caso contrario.
        var flag_guardar = true;

        if (e.type === "sin_centrar") {
            flag_centrar = false;
        } else if (e.type === "sin_guardar") {
            flag_guardar = false;
        } else if (e.type === "sin_centrar_sin_guardar") {
            flag_centrar = false;
            flag_guardar = false;
        }

        // agregar al mapa si el estado del checkbox caller es true
        if (chkCaller.prop("checked")) {
            // si podemos agregar el item sin errores, habilitamos el boton de busqueda en el mapa
            var onSuccess = function () {
                btnBuscar.trigger('prender');
            };

            agregarItemAlMapa(controlador, item_id, flag_centrar, flag_guardar, onSuccess, onComplete);
        } else {
            // quitar del mapa si el estado del checkbox caller es false
            quitarItemDelMapa(controlador, item_id);

            // apagar el boton de busqueda
            btnBuscar.trigger('apagar');

            // en caso de error al no poder agregar el item
            var onError = function () {
                mensaje('ERROR: NO SE PUDO REMOVER DEL MAPA.');
            };
            // avisar a la base de datos que lo quitamos del mapa
            userMapaQuitarItem(modulo, controlador, item_id, function () {}, onError, onComplete, flag_guardar);
        }
    });
}

// inicializar listados cuyos items son clickables
function init_item_clickable() {
    $('ul[name="listado-de-items"][data-item-clickable="activado"]').on("click", "li", function (e) {
        var liCaller = $(this);
        var item_id = liCaller.attr("data-item");
        var listado_container = liCaller.closest('ul[name="listado-de-items"]');
        var controlador = listado_container.attr("data-controlador");
        var numero_panel = listado_container.attr("data-numero-panel");

        listadoCargarItem(controlador, numero_panel, item_id);
    });
}

// inicializar boton de editar un item
function init_btn_editar() {
    $('ul[name="listado-de-items"]').on("click", "i.listado-item-boton-editar", function () {
        var caller = $(this);
        var item_id = caller.attr("data-item");
        var listado_container = caller.closest('ul[name="listado-de-items"]');
        var controlador = listado_container.attr("data-controlador");
        var numero_panel = listado_container.attr("data-numero-panel");
        listadoCargarItem(controlador, numero_panel, item_id);
    });
}

// inicializar boton que centra el mapa en un item segun su tipo
function init_btn_buscar_en_mapa() {
    // agregamos estados al boton de busqueda
    // prender: se pone de color cuando el item que debe buscar se agrega al mapa
    // apagar: se pone gris cuando el item que debe buscar es removido del mapa
    $('ul[name="listado-de-items"]').on('prender apagar', 'i.listado-item-boton-buscar', function (e) {
        if (e.type === 'prender') {
            $(this).removeClass("boton-apagado");
        } else if (e.type === 'apagar') {
            if (!$(this).hasClass("boton-apagado")) {
                $(this).addClass("boton-apagado");
            }
        }
    });

    // inicializar accion del boton
    $('ul[name="listado-de-items"]').on("click", "i.listado-item-boton-buscar", function () {
        var caller = $(this);
        var listado_container = caller.closest('ul[name="listado-de-items"]');
        var controlador = listado_container.attr("data-controlador");
        var numero_panel = listado_container.attr("data-numero-panel");

        switch (modulo) {
            case "logistica":
                switch (controlador) {
                    case "movil":
                        buscar_dispositivo(caller.attr("data-item"));
                        break;
                    case "punto":
                        buscar_punto(caller.attr("data-latitud"), caller.attr("data-longitud"));
                        break;
                    case "ruta":
                        buscar_ruta(caller.attr("data-item"));
                        break;
                }
                break;
        }
    });
}

// centra el mapa en un dispositivo segun el id recibido
function buscar_dispositivo(dispositivo_id) {
    var dispositivo_en_mapa = getDispositivoEnMapa(dispositivo_id);
    if (dispositivo_en_mapa) {
        var latlng = dispositivo_en_mapa.getLatLng();
        centrarMapaEn_LatitudLongitud(latlng.lat, latlng.lng);
        setTimeout(function () {
            showTouchMapAnimado(latlng.lat, latlng.lng);
        }, 200);
    } else {
        mensaje("EL MOVIL BUSCADO NO SE ENCUENTRA EN EL MAPA");
    }
}

// centra el mapa en un punto segun la latitud y la longitud recibidas
function buscar_punto(latitud, longitud) {
    centrarMapaEn_LatitudLongitud(latitud, longitud);
    setTimeout(function () {
        showTouchMapAnimado(latitud, longitud);
    }, 200);
}

// centra el mapa en una ruta, se tiene en cuenta si tiene o no tiene routing
function buscar_ruta(ruta_id) {
    var ruta_en_mapa = getRutaEnMapa(ruta_id);
    if (ruta_en_mapa) {
        if (ruta_en_mapa.polyline) {
            centrarMapaEn_LatitudLongitudArray(ruta_en_mapa.polyline.getLatLngs());
        } else {
            var array_puntos_ruta = getRutaPuntos(ruta_id);
            if (array_puntos_ruta) {
                centrarMapaEn_MarkerArray(array_puntos_ruta);
            } else {
                mensaje("LA RUTA BUSCADA NO POSEE PUNTOS EN EL MAPA");
            }
        }
    } else {
        mensaje("LA RUTA BUSCADA NO SE ENCUENTRA EN EL MAPA");
    }
}

// quitar item de un listado para un usuario en especifico
function init_btn_quitar() {
    // inicializar accion del boton
    $('ul[name="listado-de-items"]').on("click", "i.listado-item-boton-quitar", function () {
        var caller = $(this);
        var item_id = caller.attr("data-item");
        var listado_container = caller.closest('ul[name="listado-de-items"]');
        var listado_de = listado_container.attr("data-listado");
        var controlador = listado_container.attr("data-controlador");
        var numero_panel = listado_container.attr("data-numero-panel");

        switch (modulo) {
            case "logistica":
                switch (controlador) {
                    case "movil":
                        quitarItemDelMapa(controlador, caller.attr("data-dispositivo"));
                        break;
                }
                break;
        }

        // quitar del listado
        eliminarItemLista('#listado-' + listado_de, controlador + "_" + item_id);

        // animar boton de quitados del listado
        $('#filtros-listado-' + listado_de).find('span.filtros-btn-quitados').trigger("animarItemQuitado");

        // guardar en la base de datos que el usuario lo quito de la lista
        userListadoQuitarItem(modulo, listado_de, item_id);
    });
}

// boton que muestra un panel secundario debajo de un item del listado
function init_btn_colapsable() {
    $('ul[name="listado-de-items"]').on("click", "button.listado-item-boton-colapsable", function () {
        var buttonCaller = $(this);
        var liParent = buttonCaller.closest("li");
        var panelVerMas = liParent.find("div[name='item-panel-ver-mas']");
        var on_colapsar = buttonCaller.attr('data-on-colapsar');

        // si esta display none, lo mostramos
        if (panelVerMas.css("display") === "none") {
            buttonCaller.addClass("active");

            panelVerMas.css("display", "flex").animate({
                opacity: 1
            }, 350);
        } else {
            // si se esta mostrando lo ocultamos
            buttonCaller.removeClass("active");

            panelVerMas.css({
                "display": "none",
                "opacity": 0
            });

            // funcion caller al colapsar
            if (typeof window[on_colapsar] === 'function') {
                window[on_colapsar].call({
                    parent: liParent
                });
            }
        }
    });
}

/* /FUNCIONES QUE ACTUAN SOBRE UN ITEM DE UN LISTADO */

/* ---------- */
/* ITEM MOVIL */
/* ---------- */

// si al colapsar el item se estaba mostrando el historico del movil,
// removemos el historico del mapa
function remover_recorrido_historico() {
    // li que contiene el item que realizo el llamado
    var liParent = this.parent;

    var btnQuitarHistoricoDelMapa = $(liParent).find('i[name="boton-quitar-del-mapa"]');
    if (btnQuitarHistoricoDelMapa.length > 0) {
        btnQuitarHistoricoDelMapa.click();
    }
}

function remover_ruta_instrucciones() {
    // li que contiene el item que realizo el llamado
    var liParent = this.parent;

    var btnQuitarInstruccionesDelMapa = $(liParent).find('i[name="boton-quitar-del-mapa"]');
    if (btnQuitarInstruccionesDelMapa.length > 0) {
        btnQuitarInstruccionesDelMapa.click();
    }
}

function remover_recorrido_buscado() {
    // li que contiene el item que realizo el llamado
    var liParent = this.parent;

    var btnQuitarRecorridoDelMapa = $(liParent).find('i[name="boton-quitar-del-mapa"]');
    if (btnQuitarRecorridoDelMapa.length > 0) {
        btnQuitarRecorridoDelMapa.click();
    }
}

/* /ITEM MOVIL */