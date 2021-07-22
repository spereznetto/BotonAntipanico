// puntos de interes de la ruta
var formulario_cargar_ruta_puntos_array_markers = [];
// polyline que pasa por los puntos de la ruta (routing)
var formulario_cargar_ruta_polyline = [];

// inicializar formulario
function inicializar_logistica_cargar_ruta() {
    // inicializar inputs
    init_inpt_formulario_cargar_ruta();

    // listener on remove formulario
    $('form[id="' + formulario_carga_formulario_id + '"]').on("remove", function () {
        formulario_cargar_ruta_limpiar_vista_previa();
    });
}

/* ----------------------------------- */
/* FUNCIONES PARA CARGAR EL FORMULARIO */
/* ----------------------------------- */

// validar formulario de logistica de cargar una ruta
function formulario_validar_logistica_ruta() {
    if ($("#slc-puntos-seleccionados li").length < 2) {
        $('#slc-puntos-seleccionados-validate').tooltipster("open");
        setTimeout(function () {
            $('#slc-puntos-seleccionados-validate').tooltipster("close");
        }, 2750);

        return false;
    }

    return true;
}

// enviar formulario de carga de una ruta
function formulario_enviar_logistica_ruta() {
    var parametros = {};
    parametros.ruta = $("#ruta").val();
    parametros.descripcion = $("#descripcion").val();
    // color en hexa
    parametros.color = $("#slc-color li[aria-selected='true'] div").attr("data-color");

    parametros.puntos = [];
    $.each($("#slc-puntos-seleccionados li"), function () {
        parametros.puntos.push($(this).attr("data-id"));
    });

    // routing si/no
    parametros.routing = $('#checkbox-routing').prop('checked');

    // cargar opciones de routing
    if (parametros.routing) {
        parametros.routing_caracteristicas = {};

        parametros.routing_caracteristicas.vehiculo = $("#panel-routing > div.panel-secundario-body .btn-vehiculo.mdc-button--raised").attr("data-valor");

        parametros.routing_caracteristicas.evitar = [];
        $.each($("#panel-routing > div.panel-secundario-body .btn-excluir.mdc-button--excluir"), function (i, item) {
            parametros.routing_caracteristicas.evitar.push($(item).attr("data-valor"));
        });

        parametros.routing_caracteristicas.modo = "fastest";
        // si no es un camion leemos que elijio el usuario
        if (parametros.routing_caracteristicas.vehiculo !== "truck") {
            parametros.routing_caracteristicas.modo = $("#panel-routing > div.panel-secundario-body .btn-modo.mdc-button--raised").attr("data-valor");
        }

        parametros.routing_caracteristicas.trafico = $("#panel-routing > div.panel-secundario-body .btn-trafico.mdc-button--raised").attr("data-valor");

        parametros.routing_caracteristicas.grosor = (parseFloat($("#panel-routing #sld-grosor").attr("aria-valuenow")) / 10).toFixed(2);
        parametros.routing_caracteristicas.opacidad = (parseFloat($("#panel-routing #sld-opacidad").attr("aria-valuenow")) / 100).toFixed(2);
    }

    formulario_de_carga_guardar(parametros);
}

/* /FUNCIONES PARA CARGAR EL FORMULARIO */

/* ------------------------- */
/* FUNCIONES PARA LOS INPUTS */
/* ------------------------- */

// inicializar inputs del formulario de carga de ruta de logistica
function init_inpt_formulario_cargar_ruta() {
    // input para el color
    init_inpt_formulario_cargar_ruta_color();

    // input para los puntos de la ruta
    init_inpt_formulario_cargar_ruta_puntos();

    // input vista precia
    init_inpt_formulario_cargar_ruta_vista_previa();
}

var selectColor;

// inicializar selector de color de ruta
function init_inpt_formulario_cargar_ruta_color() {
    selectColor = mdc.select.MDCSelect.attachTo(document.querySelector('#slc-color'));

    selectColor.listen('MDCSelect:change', () => {
        var indexOfChild = selectColor.foundation_.selectedIndex_ + 1;
        var liSelected = $("#slc-color li[name='ruta-color']:nth-child(" + indexOfChild + ")");
        var divColor = liSelected.find("div:first")[0];
        var color = $(divColor).attr("data-color");
        $("#slc-color").css("background-color", color);

        $('#slc-color').find('li').attr('aria-selected', 'false');
        liSelected.attr('aria-selected', 'true');

        // cambiamos el color de los puntos seleccionados
        $(".punto-orden").css("background-color", color);
    });

    var color_seleccionado = $('#slc-color').attr('data-color');
    if (color_seleccionado !== '') {
        var divColorSelected = $('#slc-color div[data-color="' + color_seleccionado + '"]');
        divColorSelected.closest("li").attr('aria-selected', 'true');
        selectColor.foundation_.selectedIndex_ = parseInt(divColorSelected.attr("data-index"));
        selectColor.foundation_.adapter_.notifyChange();
    }
}

// inicializar listado para elegir puntos de la ruta
function init_inpt_formulario_cargar_ruta_puntos() {
    // actualizar alto del listado de puntos
    var interactiveListItems = document.querySelectorAll('#slc-puntos-usuario .mdc-list-item');
    for (var i = 0, li; li = interactiveListItems[i]; i++) {
        li.addEventListener('click', function (evt) {
            evt.preventDefault();
        });
    }

    // listener agregar puntos nuevos con click
    $("#slc-puntos-usuario li").on("click", function () {
        var punto = $(this).clone();
        var color = $("#slc-color").css("background-color");
        $(punto).prepend('<div class="punto-orden" style="background-color:' + color + ';"></div>');
        punto.appendTo("#slc-puntos-seleccionados");

        // scroll to last
        $("#slc-puntos-seleccionados").scrollTop($("#slc-puntos-seleccionados")[0].scrollHeight);

        // asignar el orden
        formulario_cargar_ruta_listado_puntos_ordenar();
    });

    // listener, remover puntos on click
    $("#slc-puntos-seleccionados").on("click", "li", function () {
        $(this).remove();

        // asignar el orden nuevo
        formulario_cargar_ruta_listado_puntos_ordenar();
    });

    // listado de puntos seleccionados sortable
    $("#slc-puntos-seleccionados").sortable({
        helper: 'clone',
        connectWith: "#slc-puntos-seleccionados",
        stop: function () {
            formulario_cargar_ruta_listado_puntos_ordenar();
        }
    });

    // buscador de puntos
    $("#buscador-de-puntos").on('input', function () {
        var texto = $(this).val().toLowerCase();

        $.each($("#slc-puntos-usuario > li"), function () {
            var li = $(this)[0];

            if ($(li).attr("data-descripcion").toLowerCase().indexOf(texto) >= 0) {
                $(li).css("display", "flex");
            } else {
                $(li).css("display", "none");
            }
        });
    });
}

// Orden en que se recorren los puntos
function formulario_cargar_ruta_listado_puntos_ordenar() {
    $.each($("#slc-puntos-seleccionados li"), function (i, item) {
        $(item).find(".punto-orden").empty().append('<span class="mdc-typography--caption">' + (i + 1) + '</span>');
    });
}

// inicializar ruta vista previa
function init_inpt_formulario_cargar_ruta_vista_previa() {
    // listener click al boton de previsualizar
    $(".btn-previsualizar").on("click", function () {
        formulario_cargar_ruta_limpiar_vista_previa();
        if (formulario_validar_logistica_ruta()) {
            formulario_cargar_ruta_previsualizar();
        }
    });
}

// limpiar vista previa de la ruta dibujada
function formulario_cargar_ruta_limpiar_vista_previa() {
    // borrar puntos del mapa
    $.each(formulario_cargar_ruta_puntos_array_markers, function (i, punto) {
        modulo_mapa.removeLayer(punto);
    });
    formulario_cargar_ruta_puntos_array_markers = [];

    // borrar routing
    modulo_mapa.removeLayer(formulario_cargar_ruta_polyline);
    formulario_cargar_ruta_polyline = [];
}

// previsualizar la ruta segun los parametros ingresados (no necesariamente los paramentros guardados)
function formulario_cargar_ruta_previsualizar() {
    // puntos seleccionados en la lista
    var puntos = $('#slc-puntos-seleccionados li');

    // formatear puntos para agregarlos al mapa
    puntos.each(function (i, punto) {
        var id = $(punto).attr("data-id");
        var icono = $(punto).attr("data-icono");
        var color = $(punto).attr("data-color");
        var latitud = parseFloat($(punto).attr("data-latitud")).toFixed(6);
        var longitud = parseFloat($(punto).attr("data-longitud")).toFixed(6);
        var latlng = {
            lat: latitud,
            lng: longitud
        };
        var orden = i + 1;

        var iconoURL = base_url + "/images/iconosTiposPI/" + icono + "/" + color.replace("#", "_") + ".png";
        var iconoLayer = L.icon({
            iconUrl: iconoURL,
            iconSize: [32, 32]
        });

        var markerPunto = [];
        // buscamos si el punto ya esta en el mapa
        $.each(formulario_cargar_ruta_puntos_array_markers, function (f, marker) {
            if (marker.options.id === id) {
                markerPunto = marker;
            }
        });

        // si el punto no esta en el mapa lo agregamos
        if (markerPunto.length === 0) {
            markerPunto = L.marker(latlng, {
                id: id,
                icon: iconoLayer,
                color: color,
                orden: [orden]
            }).bindTooltip("", {
                permanent: true,
                className: "labelNoArrow"
            });

            markerPunto.addTo(modulo_mapa);
            formulario_cargar_ruta_puntos_array_markers.push(markerPunto);
        } else {
            markerPunto.options.orden.push(orden);
        }

        formulario_carga_punto_editar_label(markerPunto);
    });

    // centramos el mapa en los puntos
    setTimeout(function () {
        centrarMapaEn_MarkerArray(formulario_cargar_ruta_puntos_array_markers);
    }, 350);

    var routing = $('#checkbox-routing').prop('checked'); // routing si/no
    if (routing) { // si esta habilitado mostramos la ruta calculada en el mapa
        var url_routing = "https://route.cit.api.here.com/routing/7.2/calculateroute.json";

        // ruta vehiculo
        var rutaVehiculo = $("#panel-routing > div.panel-secundario-body .btn-vehiculo.mdc-button--raised").attr("data-valor");

        // ruta excluir
        var rutaEvitar = "";
        $.each($("#panel-routing > div.panel-secundario-body .btn-excluir.mdc-button--excluir"), function (i, item) {
            rutaEvitar += $(item).attr("data-valor") + ":-2,";
        });
        // borrar la ultima ","
        rutaEvitar = rutaEvitar.replace(/,\s*$/, "");

        // ruta modo
        var rutaModo = "fastest";
        // si no es un camion leemos que elijio el usuario
        if (rutaVehiculo !== "truck") {
            rutaModo = $("#panel-routing > div.panel-secundario-body .btn-modo.mdc-button--raised").attr("data-valor");
        }

        // ruta trafico
        var rutaTrafico = $("#panel-routing > div.panel-secundario-body .btn-trafico.mdc-button--raised").attr("data-valor");

        // ruta color
        var rutaColor = $("#slc-color").css("background-color");

        // ruta grosor
        var rutaGrosor = (parseFloat($("#panel-routing #sld-grosor").attr("aria-valuenow")) / 10).toFixed(2);

        // ruta opacidad
        var rutaOpacidad = (parseFloat($("#panel-routing #sld-opacidad").attr("aria-valuenow")) / 100).toFixed(2);

        var parametros = {};
        //parametros.app_id = "kDw247ifuRx8FSdbfLCR";
        //parametros.app_code = "GA9UZVt8ou_tUlV4u5Q6jQ";
        parametros.app_id = "s09rHdXJFlM2k0CbVQgh";
        parametros.app_code = "v3NSGBFUbs8M2NtrTNNB0Q";
        parametros.jsonAttributes = "1";
        parametros.mode = rutaModo + ";" + rutaVehiculo + ";traffic:" + rutaTrafico + ";" + rutaEvitar;
        parametros.routeAttributes = "legs";
        parametros.legAttributes = "maneuvers";
        parametros.maneuverAttributes = "shape,action";
        parametros.language = "es-es";

        // puntos buscados 
        $.each(formulario_cargar_ruta_puntos_array_markers, function (h, punto) {
            // agregamos el punto en todos los orden que hay que recorrerlos
            punto.options.orden.forEach(function (orden) {
                parametros["waypoint" + (orden - 1)] = "geo!" + punto._latlng.lat + "," + punto._latlng.lng;
            });
        });

        $.ajax({
            url: url_routing,
            dataType: "JSON",
            type: "GET",
            data: parametros,
            success: function (respuesta) {
                formulario_cargar_ruta_dibujar_ruta_here_maps(respuesta, rutaColor, rutaGrosor, rutaOpacidad);
            },
            error: function () {
                mensaje("ROUTING: RUTA NO ENCONTRADA", 2750);
            },
            complete: function () {

            }
        });
    }
}

// el label contiene todos los orden de recorrido
function formulario_carga_punto_editar_label(marker) {
    var color = $("#slc-color").css("background-color") || marker.options.color;
    var divHtmlLabel = '';
    $.each(marker.options.orden, function (i, orden) {
        divHtmlLabel += '<div class="labelOrden" style="background-color:' + color + ';">' + orden + '</div>';
    });

    marker.setTooltipContent(divHtmlLabel);
}

// here maps JSON a LEAFLET ruta
function formulario_cargar_ruta_dibujar_ruta_here_maps(infoRuta, color, grosor, opacidad) {
    var camino_legs = infoRuta.response.route["0"].leg;

    var camino_puntos = [];
    $.each(camino_legs, function (i, leg) {
        var camino = leg.maneuver;
        $.each(camino, function (f, item) {
            $.each(item.shape, function (i, coordenadas) {
                var coord = coordenadas.split(',');
                camino_puntos.push({
                    lat: coord[0],
                    lng: coord[1]
                });
            });
        });
    });

    formulario_cargar_ruta_polyline = new L.Polyline(camino_puntos, {
        color: color,
        weight: grosor,
        opacity: opacidad,
        smoothFactor: 3
    });

    formulario_cargar_ruta_polyline.addTo(modulo_mapa);

    // centramos el mapa en el routing
    centrarMapaEn_LatitudLongitudArray(formulario_cargar_ruta_polyline.getLatLngs());
}

/* /FUNCIONES PARA LOS INPUTS */