// marker del nuevo pi
var formulario_cargar_punto_marker_punto = {};
// layer con la tolerancia
var formulario_cargar_punto_marker_punto_tolerancia = {};

// inicializar formulario
function inicializar_logistica_cargar_punto() {
    // inicializar inputs
    init_inpt_formulario_cargar_punto();

    // funciones de mapa
    formulario_cargar_punto_marker_punto = L.marker({
        lat: 0,
        lng: 0
    }, {}).bindTooltip("", {
        permanent: true
    });

    formulario_cargar_punto_marker_punto_tolerancia = L.circle({
        lat: 0,
        lng: 0
    }, {});

    modulo_mapa.off("click", formulario_cargar_punto_agregar_punto_al_mapa);
    modulo_mapa.on("click", formulario_cargar_punto_agregar_punto_al_mapa);
    document.getElementById('modulo_mapa').style.cursor = 'crosshair';

    // listener remover formulario
    $('form[id="' + formulario_carga_formulario_id + '"]').on("remove", function () {
        // remover marker
        modulo_mapa.removeLayer(formulario_cargar_punto_marker_punto);
        delete formulario_cargar_punto_marker_punto;

        modulo_mapa.removeLayer(formulario_cargar_punto_marker_punto_tolerancia);
        delete formulario_cargar_punto_marker_punto_tolerancia;

        // dejar de escuchar el evento 
        modulo_mapa.off("click", formulario_cargar_punto_agregar_punto_al_mapa);

        // cambiar cursor del mapa 
        document.getElementById('modulo_mapa').style.cursor = '';
    });
}

/* ----------------------------------- */
/* FUNCIONES PARA CARGAR EL FORMULARIO */
/* ----------------------------------- */

// validar formulario de logistica de cargar un punto
function formulario_validar_logistica_punto() {
    if ($("#slc-categoria li[name='pi-categoria'][aria-selected='true']").length === 0) {
        $("#slc-categoria-helptext").css("aria-hidden", "false");
        $("#slc-categoria-helptext").css("opacity", 1);

        return false;
    } else {
        $("#slc-categoria-helptext").css("aria-hidden", "true");
        $("#slc-categoria-helptext").css("opacity", 0);
    }

    return true;
}

// enviar formulario de carga de un punto
function formulario_enviar_logistica_punto() {
    var parametros = {};
    parametros.punto = $("#punto").val();
    parametros.latitud = $("#latitud").val();
    parametros.longitud = $("#longitud").val();
    parametros.descripcion = $("#descripcion").val();
    parametros.categoria = $("#slc-categoria li[name='pi-categoria'][aria-selected='true'] > div").attr("data-categoria");
    parametros.tolerancia = sldTolerancia.noUiSlider.get();

    formulario_de_carga_guardar(parametros);
}

/* /FUNCIONES PARA CARGAR EL FORMULARIO */

/* ------------------------- */
/* FUNCIONES PARA LOS INPUTS */
/* ------------------------- */

// inicializar inputs del formulario de carga de puntos de logistica
function init_inpt_formulario_cargar_punto() {
    // input para la descripcion
    init_inpt_formulario_cargar_punto_descripcion();

    // input categoria del punto
    init_inpt_formulario_cargar_punto_categoria();

    // input para la ubicacion
    init_inpt_formulario_cargar_punto_ubicacion();

    // input para la tolerancia
    init_inpt_formulario_cargar_punto_tolerancia();
}

// para la descripcion del punto
function init_inpt_formulario_cargar_punto_descripcion() {
    $("#descripcion").on("keyup", function () {
        if ($(this).val() === "") {
            formulario_cargar_punto_marker_punto.setTooltipContent(" ");
        } else {
            formulario_cargar_punto_marker_punto.setTooltipContent($(this).val());
        }
    });
}

var selectCategoria;

// input de la categoria a la que el punto pertenece
function init_inpt_formulario_cargar_punto_categoria() {
    selectCategoria = mdc.select.MDCSelect.attachTo(document.querySelector('#slc-categoria'));

    selectCategoria.listen('MDCSelect:change', (e) => {
        var indexOfChild = selectCategoria.foundation_.selectedIndex_ + 1;
        var liSelected = $("#slc-categoria li[name='pi-categoria']:nth-child(" + indexOfChild + ")");
        var divCategoria = liSelected.find("div:first")[0];
        var icono = $(divCategoria).attr("data-icono");
        var color = $(divCategoria).attr("data-color");
        var descripcion = $(divCategoria).attr("data-descripcion");
        var iconoURL = base_url + "/images/iconosTiposPI/" + icono + "/" + color.replace("#", "_") + ".png";

        $('#slc-categoria').find('li').attr('aria-selected', 'false');
        liSelected.attr('aria-selected', 'true');

        var iconoLayer = L.icon({
            iconUrl: iconoURL,
            iconSize: [32, 32]
        });

        $("#slc-categoria > span").text(descripcion);

        if ($.isFunction(formulario_cargar_punto_marker_punto.setIcon)) {
            formulario_cargar_punto_marker_punto.setIcon(iconoLayer);
        }
        if ($.isFunction(formulario_cargar_punto_marker_punto_tolerancia.setStyle)) {
            formulario_cargar_punto_marker_punto_tolerancia.setStyle({
                color: color
            });
        }
    });

    var categoria_selected = $('#slc-categoria').attr('data-categoria');
    if (categoria_selected !== '') {
        var divCategoriaSelected = $('#slc-categoria div[data-categoria="' + categoria_selected + '"]');
        divCategoriaSelected.closest("li").attr('aria-selected', 'true');
        selectCategoria.foundation_.selectedIndex_ = parseInt(divCategoriaSelected.attr("data-index"));
        selectCategoria.foundation_.adapter_.notifyChange();
    }
}

// para la ubicacion del punto en el mapa
function init_inpt_formulario_cargar_punto_ubicacion() {
    if ($("#punto").val().length > 0) {
        // posicion del punto a editar
        var latlng = {
            lat: parseFloat($("#latitud").val()),
            lng: parseFloat($("#longitud").val())
        };

        centrarMapaEn_LatitudLongitud(latlng.lat, latlng.lng);

        // cargar marker al mapa 
        setTimeout(function () {
            formulario_cargar_punto_agregar_marker_en_locacion(latlng);
        }, 250);
    }
}

function formulario_cargar_punto_agregar_punto_al_mapa(event) {
    // remover marker
    modulo_mapa.removeLayer(formulario_cargar_punto_marker_punto);
    delete formulario_cargar_punto_marker_punto;

    modulo_mapa.removeLayer(formulario_cargar_punto_marker_punto_tolerancia);
    delete formulario_cargar_punto_marker_punto_tolerancia;

    formulario_cargar_punto_agregar_marker_en_locacion(event.latlng);
}

function formulario_cargar_punto_agregar_marker_en_locacion(latlng) {
    var icono = $("#slc-categoria li[name='pi-categoria'][aria-selected='true'] > div").attr("data-icono");
    var color = $("#slc-categoria li[name='pi-categoria'][aria-selected='true'] > div").attr("data-color");

    // crear nuevo marker
    formulario_cargar_punto_marker_punto = L.marker(latlng, {
        icon: L.icon({
            iconUrl: base_url + "/js_logistica/leaflet/images/marker-icon.png",
            iconSize: [22, 32],
            iconAnchor: [12, 16]
        })
    }).bindTooltip("", {
        permanent: true
    }).addTo(modulo_mapa);

    // Agregamos un circulo con la tolerancia
    formulario_cargar_punto_marker_punto_tolerancia = L.circle(latlng, {
        radius: sldTolerancia.noUiSlider.get(),
        color: color,
        stroke: false
    }).addTo(modulo_mapa);

    // set cordenadas a los inputs latitud y longitud
    $("#latitud").focus().val(latlng.lat.toFixed(6)).blur();
    $("#longitud").focus().val(latlng.lng.toFixed(6)).blur();

    // set descripcion al label 
    formulario_cargar_punto_marker_punto.setTooltipContent($("#descripcion").val());

    // icono de la categoria    
    if (typeof icono !== 'undefined') {
        var iconoURL = base_url + "/images/iconosTiposPI/" + icono + "/" + color.replace("#", "_") + ".png";

        var iconoLayer = L.icon({
            iconUrl: iconoURL,
            iconSize: [32, 32]
        });

        formulario_cargar_punto_marker_punto.setIcon(iconoLayer);
    }
}

var sldTolerancia;

// para la tolerancia del punto
function init_inpt_formulario_cargar_punto_tolerancia() {
    sldTolerancia = document.getElementById('sld-tolerancia');

    var formatPipsTolerancia = {
        to: function (metros) {
            return metros;
        },
        from: function (metros) {
            return metros;
        }
    };

    noUiSlider.create(sldTolerancia, {
        // el color de la barra se muestra desde la izquierda pero no desde la derecha
        connect: [true, false],
        // metros de entrada  
        start: [$('#sld-tolerancia').attr('data-tolerancia')],
        // me muevo de a un metro
        step: 1,
        tooltips: [false],
        // puedo desplazar el rango completo
        behaviour: 'tap-drag',
        // desde 50 metros hasta 500 metros
        range: {
            'min': 50,
            'max': 500
        },
        // un pipe cada 100 metros
        pips: {
            mode: 'steps',
            filter: formulario_cargar_punto_tolerancia_pips,
            format: formatPipsTolerancia
        }
    });

    sldTolerancia.noUiSlider.on('update', function (values, handle) {
        if (typeof formulario_cargar_punto_marker_punto_tolerancia !== 'undefined' && $.isFunction(formulario_cargar_punto_marker_punto_tolerancia.setRadius)) {
            formulario_cargar_punto_marker_punto_tolerancia.setRadius(values[handle]);
        }
    });
}

function formulario_cargar_punto_tolerancia_pips(value) {
    if (value % 100 === 0 || value == 50) {
        // valor largo 
        return 1;
    } else {
        if (value % 25 === 0) {
            // valor largo
            return 2;
        }
    }

    // nada
    return 0;
}

/* /FUNCIONES PARA LOS INPUTS */